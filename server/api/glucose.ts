import type { GlucoseEntry } from "~~/types/glucose";

export default eventHandler(async (event) => {
    const method = event.node.req.method;

    if (method === "GET") {
        const response = await fetch(`${process.env.NIGHTSCOUT_URL}/api/v1/entries?count=1`, {
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw createError({
                statusCode: 500,
                statusMessage: "No data found.",
            });
        }

        const data = await response.json().catch((error) => {
            throw createError({
                statusCode: 500,
                statusMessage: "Error while converting response into JSON: " + error,
            });
        });

        // Return the first and only object in the array
        return data[0] as GlucoseEntry;
    }

    throw createError({
        statusCode: 405,
        statusMessage: `Method ${method} not allowed. Please use GET.`,
    });
});
