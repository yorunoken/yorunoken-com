import { serve } from "bun";
import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";

import index from "./index.html";

const rateLimiter = new RateLimiterMemory({
    points: 20,
    duration: 60,
});

function normalizeIp(ip: string) {
    return ip.startsWith("::ffff:") ? ip.slice(7) : ip;
}

function throttle(handler: (req: Request, server: Bun.Server<undefined>) => Response | Promise<Response>) {
    return async (req: Request, server: Bun.Server<undefined>) => {
        const forwarded = req.headers.get("x-forwarded-for");
        const ip = normalizeIp(forwarded?.split(",")[0]?.trim() || server.requestIP(req)?.address || "unknown");

        try {
            await rateLimiter.consume(ip);
            return handler(req, server);
        } catch (err) {
            if (err instanceof Error && err instanceof RateLimiterRes) {
                return new Response("Too Many Requests", { status: 429 });
            }
            return new Response("Internal Error", { status: 500 });
        }
    };
}

const PORT = process.env.PORT;
const server = serve({
    routes: {
        "/api/status": throttle(() => new Response("OK")),
        "/profile-pic": throttle(async (req) => {
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
        }),
        "/bg": throttle(async (req) => {
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
        }),
        "/*": index,
    },
    development: process.env.NODE_ENV !== "production" && {
        hmr: true,
        console: true,
    },
    port: PORT,
});

console.log(`Server running at ${server.url}`);
