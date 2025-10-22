import "../index.css";

import { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { projects, socials, statusColors, statusLabels, type Status } from "../utils";

import Effects from "../components/effects";

export default function Home() {
    const [statusIndicator, setStatusIndicator] = useState<Status>("offline");
    const [status, setStatus] = useState<string | null>(null);
    const [weatherEffect, setWeatherEffect] = useState<"snow" | "rain" | "leaves">(() => {
        const savedWeather = localStorage.getItem("weather");
        return (savedWeather as "snow" | "rain" | "leaves") ?? "snow";
    });

    function selectWeather(weather: "snow" | "rain" | "leaves") {
        if (weather === weatherEffect) return;

        setWeatherEffect(weather);
        localStorage.setItem("weather", weather);
    }

    useEffect(() => {
        async function getStatus() {
            const res = await fetch("/status");
            if (!res.ok) {
                return;
            }

            const data = await res.json();
            setStatus(data.status);
            setStatusIndicator(data.indicator);
        }

        getStatus();
    }, []);

    return (
        <main className="flex items-center justify-center min-h-screen p-4 sm:p-6">
            <Effects />
            <div className="bg-[#0a0a0a]/90 z-10 p-5 sm:p-6 md:p-8 lg:p-12 rounded-lg shadow-xl max-w-4xl w-full text-white border border-gray-800">
                <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-12">
                    <div className="flex-1 w-full">
                        <div className="flex flex-col items-center text-center mb-6 lg:hidden px-4">
                            <div className="relative mb-5 group/status">
                                <img src="/profile-pic" alt="Profile Picture" className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-lg border-2 border-gray-800" />
                                <div
                                    className={`absolute bottom-1 right-1 w-5 h-5 sm:w-6 sm:h-6 ${statusColors[statusIndicator]} rounded-full border-3 border-[#0a0a0a]`}
                                    title={statusLabels[statusIndicator]}
                                ></div>

                                {status && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <div className="px-3 py-1 bg-gray-900 rounded-full border border-gray-700 flex items-center justify-start gap-2 cursor-pointer hover:border-gray-600 transition-all duration-300 shadow-md max-w-[160px] sm:max-w-[200px] overflow-hidden group-hover/status:max-w-full">
                                            <div className="overflow-hidden transition-all duration-500 ease-in-out origin-left fade-out group-hover/status:mask-none flex items-center">
                                                <span className="text-[11px] sm:text-xs text-gray-400 group-hover/status:text-gray-300 transition-colors whitespace-nowrap leading-none">{status}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <h1 className="text-2xl sm:text-3xl font-bold mb-1">yorunoken</h1>
                                <a href="mailto:me@yorunoken.com" className="text-gray-500 text-sm hover:underline break-all">
                                    me@yorunoken.com
                                </a>
                            </div>

                            <div className="flex flex-col gap-1 text-gray-500 text-sm sm:text-base">
                                <p>full-stack developer</p>
                                <p>insulin junkie</p>
                                <p>weeb</p>
                            </div>
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
                            <div className="relative group/status">
                                <img src="/profile-pic" alt="Profile Picture" className="w-48 h-48 xl:w-56 xl:h-56 rounded-full object-cover shadow-lg border-2 border-gray-800" />
                                <div className={`absolute bottom-2 right-2 w-12 h-12 ${statusColors[statusIndicator]} rounded-full border-6 border-[#0a0a0a]`} title={statusLabels[statusIndicator]}></div>
                                {status && (
                                    <div className="absolute -top-3 -left-3">
                                        <div className="px-3 py-1 bg-gray-900 rounded-2xl border border-gray-700 flex items-center gap-2 cursor-pointer hover:border-gray-600 transition-all duration-300 shadow-lg max-w-[180px] group-hover/status:max-w-full group-hover/status:xl:max-w-full">
                                            <div className="overflow-hidden transition-all duration-500 ease-in-out origin-left fade-out group-hover/status:mask-none flex items-center">
                                                <span className="text-xs xl:text-sm text-gray-400 group-hover/status:text-gray-300 transition-colors whitespace-nowrap">{status}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
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
                                            <div className="flex gap-2 shrink-0">
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
