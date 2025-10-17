import "../index.css";
import { FaGithub, FaTwitter, FaDiscord, FaYoutube, FaExternalLinkAlt } from "react-icons/fa";
import { SiOsu, SiBuymeacoffee } from "react-icons/si";

const projects = [
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
        title: "dotfiles",
        description: "My dotfiles for my Arch Linux setup.",
        github: "https://github.com/yorunoken/dotfiles",
        tags: ["Linux", "Arch", "Configuration"],
    },
];

const socials = [
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

export default function Home() {
    return (
        <main className="flex items-center justify-center min-h-screen p-4 sm:p-6">
            <div className="bg-[#0a0a0a] p-5 sm:p-6 md:p-8 lg:p-12 rounded-lg shadow-xl max-w-4xl w-full text-white border border-gray-800">
                <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-12">
                    <div className="flex-1 w-full">
                        {/* Mobile: Centered profile pic on top */}
                        <div className="flex flex-col items-center text-center mb-6 lg:hidden">
                            <img src="/profile-pic" alt="Profile Picture" className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover shadow-lg border-2 border-gray-800 mb-4" />
                            <div className="mb-2">
                                <h1 className="text-3xl sm:text-4xl font-bold mb-1">yorunoken</h1>
                                <a href="mailto://me@yorunoken.com" className="text-gray-500 text-sm hover:underline">
                                    me@yorunoken.com
                                </a>
                            </div>
                            <p className="text-gray-500 text-base">full-stack developer</p>
                            <p className="text-gray-500 text-base">insulin junkie</p>
                            <p className="text-gray-500 text-base">weeb</p>
                        </div>

                        <div className="hidden lg:flex text-left justify-between mb-2">
                            <div className="flex flex-col justify-center">
                                <div className="mb-2">
                                    <h1 className="text-4xl md:text-5xl font-bold">yorunoken</h1>
                                    <a href="mailto://me@yorunoken.com" className="text-gray-500 text-sm hover:underline">
                                        me@yorunoken.com
                                    </a>
                                </div>
                                <p className="text-gray-500 text-lg">full-stack developer</p>
                                <p className="text-gray-500 text-lg">insulin junkie</p>
                                <p className="text-gray-500 text-lg">weeb</p>
                            </div>
                            <img src="/profile-pic" alt="Profile Picture" className="w-48 h-48 xl:w-56 xl:h-56 rounded-full object-cover shadow-lg border-2 border-gray-800" />
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-200 text-center lg:text-left">About Me</h2>
                            <p className="text-gray-400 leading-relaxed text-center lg:text-left text-sm sm:text-base">
                                i love listening to music, playing games, and programing random stuff i find interesting.
                            </p>
                            <p className="text-gray-400 leading-relaxed text-center lg:text-left text-sm sm:text-base">
                                i like collecting plushies, figurines and keychains of anime/japanese characters i like =)
                            </p>
                            <p className="text-gray-400 leading-relaxed text-center lg:text-left text-sm sm:text-base">trying to navigate through life and complicated feelings.</p>
                        </div>

                        <div className="pb-6 pt-6 border-t border-gray-800">
                            <div className="mb-4 flex gap-2 items-center justify-center lg:justify-start">
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-200">Projects</h2>
                                <a href="https://github.com/yorunoken?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm hover:underline">
                                    more
                                </a>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                {projects.map((project, index) => (
                                    <div key={index} className="bg-gray-900 rounded-lg p-4 transition-all duration-300 border border-gray-800 hover:border-gray-700 group">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-base sm:text-lg font-semibold text-white">{project.title}</h3>
                                            <div className="flex gap-2 flex-shrink-0">
                                                {project.github && (
                                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="GitHub">
                                                        <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    </a>
                                                )}
                                                {project.website && (
                                                    <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors" title="Visit Website">
                                                        <FaExternalLinkAlt className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-xs sm:text-sm mb-3 leading-relaxed">{project.description}</p>
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                            {project.tags.map((tag, tagIndex) => (
                                                <span key={tagIndex} className="px-2 py-0.5 sm:py-1 text-xs rounded bg-gray-900 text-gray-300 border border-gray-700">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-800">
                            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-200 text-center lg:text-left">Socials</h2>
                            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                                {socials.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`p-2.5 sm:p-3 rounded-lg bg-gray-800 text-gray-400 ${social.hoverColor} ${social.hoverTextColor || "hover:text-white"} transition-all duration-300 group`}
                                            title={social.title}
                                        >
                                            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
