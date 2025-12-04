import { Elysia } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import index from "./index.html";

const rateLimiter = rateLimit({ generator: cloudflareGenerator, max: 60 });
function cloudflareGenerator(req: Request) {
    const ip = req.headers.get("x-forwarded-for") ?? "";
    return ip;
}

const PORT = process.env.PORT ?? 3000;
const app = new Elysia()
    .use(rateLimiter)
    .get("/api/health", function () {
        return new Response("OK");
    })
    .get("/profile-pic", async function () {
        const res = await fetch("https://api.lanyard.rest/v1/users/372343076578131968");
        const json = await res.json();

        const userId = json.data.discord_user.id;
        const avatarHash = json.data.discord_user.avatar;

        const isAnimated = avatarHash.startsWith("a_");
        const extension = isAnimated ? "gif" : "png";
        const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${extension}?size=1024`;

        const imageRes = await fetch(avatarUrl);
        const imageBlob = await imageRes.blob();

        return new Response(imageBlob, {
            headers: {
                "Content-Type": imageRes.headers.get("Content-Type") || `image/${extension}`,
                "Cache-Control": "public, max-age=3600",
            },
        });
    })
    .get("/status", async function () {
        const res = await fetch("https://api.lanyard.rest/v1/users/372343076578131968");
        const json = await res.json();

        const indicator = json.data.discord_status;
        const status = json.data.activities?.find((x: { name: string }) => x.name === "Custom Status")?.state;

        return new Response(
            JSON.stringify({
                status,
                indicator,
            }),
            { headers: { "Content-Type": "application/json" } }
        );
    })
    .get("/bg", async function () {
        const res = await fetch(`${process.env.NIGHTSCOUT_URL}/api/v1/entries.json?count=2`);
        const data = await res.json();

        const delta = data[0].sgv - data[1].sgv;
        return new Response(
            JSON.stringify({
                glucose: data[0].sgv,
                delta,
            }),
            { headers: { "Content-Type": "application/json" } }
        );
    })
    .get("/*", index)
    .listen(PORT);

console.log(`Server running at http://${app.server?.hostname}:${app.server?.port}`);
