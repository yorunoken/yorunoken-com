import index from "./index.html";

import { serve } from "bun";

const PORT = process.env.PORT;
const server = serve({
    routes: {
        "/api/status": new Response("OK"),
        "/*": index,
    },
    development: process.env.NODE_ENV !== "production" && {
        hmr: true,
        console: true,
    },
    port: PORT,
});

console.log(`Server running at ${server.url}`);