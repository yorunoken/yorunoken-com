export interface Project {
    title: string;
    description: string;
    tags: string[];
    users?: number;
    usersPerMonth?: number;
    github?: string;
    link?: string;
    dates: string;
}

export const projects: Array<Project> = [
    {
        title: "osu!guessr",
        description: "Competitive guessing game featuring Background, Audio, and Skin modes with global leaderboards.",
        tags: ["React", "TypeScript", "Tailwind CSS", "Next.js", "MySQL", "Redis", "APIs", "Docker"],
        github: "https://github.com/yorunoken/osu-guessr",
        usersPerMonth: 700,
        users: 18000,
        link: "https://osuguessr.com",
        dates: "2025 - Present",
    },
    {
        title: "Hanami Bot",
        description: "A high-performance Discord bot for osu! featuring advanced score visualization, profile tracking, and interactive leaderboards.",
        tags: ["Bun", "TypeScript", "discord.js", "MySQL", "Redis", "osu! API"],
        github: "https://github.com/yorunoken/hanami-bot",
        usersPerMonth: 400,
        dates: "2022 - Present",
    },
    {
        title: "osu! map analyzer",
        description: "Rust library for osu! beatmap analysis, featuring automatic pattern classification and metric calculation.",
        tags: ["Rust", "osu!", "Analysis", "Algorithms", "Library"],
        github: "https://github.com/yorunoken/osu-map-analyzer-lib",
        dates: "2024",
    },
    {
        title: "Yorjik",
        description: "A Discord chatbot written in Rust that utilizes Markov chains to mimic user speech patterns by learning from server message history.",
        tags: ["Rust", "Serenity", "SQL", "Markov Chain", "Docker"],
        github: "https://github.com/yorunoken/yorjik",
        dates: "2024 - Present",
    },
    {
        title: "Rotten Apple",
        description: "A mod for the historic Minecraft version rd-132211 that renders the 'Bad Apple' animation in real-time using custom OpenGL hooks and tile manipulation.",
        tags: ["Java", "LWJGL", "OpenGL", "Modding", "Graphics"],
        github: "https://github.com/yorunoken/rotten-apple",
        dates: "2026",
    },
];

export const email = "me@yorunoken.com";
export const github = "yorunoken";
export const twitter = "_yorunoken";
export const youtube = "@yorunoken";
export const osu = "17279598";
export const donation = "https://buymeacoffee.com/yorunoken";
