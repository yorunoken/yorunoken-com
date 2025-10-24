import { FaGithub, FaTwitter, FaDiscord, FaYoutube, FaExternalLinkAlt } from "react-icons/fa";
import { SiOsu, SiBuymeacoffee } from "react-icons/si";

export type Status = "online" | "offline" | "dnd" | "idle";

export const projects = [
    {
        title: "HanamiBot",
        description: "A powerful Discord bot developed for osu!",
        github: "https://github.com/yorunoken/HanamiBot",
        website: "https://hanami.yorunoken.com",
        tags: ["Discord", "osu!", "TypeScript"],
    },
    {
        title: "YAUS",
        description: "Yet another URL shortener.",
        github: "https://github.com/yorunoken/YAUS",
        website: "https://short.yorunoken.com",
        tags: ["URL Shortener", "Web Service"],
    },
    {
        title: "osu!guessr",
        description: "A fast paced guessing game, made for osu! players, by an osu! player.",
        github: "https://github.com/yorunoken/osu-guessr",
        website: "https://osuguessr.com/",
        tags: ["Linux", "Arch", "Configuration"],
    },
];

export const socials = [
    {
        title: "GitHub",
        href: "https://github.com/yorunoken",
        icon: FaGithub,
        hoverColor: "hover:bg-[#24292e]",
    },
    {
        title: "Twitter",
        href: "https://twitter.com/_yorunoken",
        icon: FaTwitter,
        hoverColor: "hover:bg-[#1DA1F2]",
    },
    {
        title: "Discord",
        href: "https://discord.com/users/372343076578131968",
        icon: FaDiscord,
        hoverColor: "hover:bg-[#5865F2]",
    },
    {
        title: "osu!",
        href: "https://osu.ppy.sh/u/17279598",
        icon: SiOsu,
        hoverColor: "hover:bg-[#FF66AB]",
    },
    {
        title: "YouTube",
        href: "https://www.youtube.com/@yorunoken",
        icon: FaYoutube,
        hoverColor: "hover:bg-[#FF0000]",
    },
    {
        title: "Buy Me a Coffee",
        href: "https://buymeacoffee.com/yorunoken",
        icon: SiBuymeacoffee,
        hoverColor: "hover:bg-[#FFDD00]",
        hoverTextColor: "hover:text-black",
    },
];

export const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-500",
    dnd: "bg-red-500",
    idle: "bg-yellow-500",
};

export const statusLabels = {
    online: "Online",
    offline: "Offline",
    dnd: "Do Not Disturb",
    idle: "idle",
};
