import { projects } from "../lib/constants";

export default function Projects() {
    return (
        <section>
            <h2 className="text-sm font-mono text-gray-400 mb-8 uppercase tracking-widest">Projects</h2>
            <div className="space-y-12">
                {projects.map((project, index) => (
                    <div key={index} className="group md:grid md:grid-cols-4 md:gap-4 flex flex-col gap-2">
                        <div className="text-sm text-gray-500 font-mono pt-1 w-full shrink-0">{project.dates}</div>

                        <div className="md:col-span-3">
                            <h3 className={`text-base font-medium text-white mb-2 ${project.link && "group-hover:text-blue-200"} transition-colors flex items-center gap-2`}>
                                {project.link ? (
                                    <>
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4 decoration-zinc-600">
                                            {project.title}
                                        </a>
                                        <span className="text-gray-600 text-xs font-normal">↗</span>
                                    </>
                                ) : (
                                    project.title
                                )}
                            </h3>

                            <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-lg">{project.description}</p>

                            <div className="flex items-center flex-wrap gap-4 text-xs text-gray-500 font-mono mb-4">
                                {project.users && (
                                    <div className="flex items-center gap-1.5 text-gray-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                        {project.users.toLocaleString()}+ users
                                    </div>
                                )}
                                {project.usersPerMonth && (
                                    <div className="flex items-center gap-1.5 text-gray-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                        {project.usersPerMonth.toLocaleString()}+ users/month
                                    </div>
                                )}
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                        github-repo
                                    </a>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className="px-2 py-1 bg-white/5 border border-white/5 text-xs rounded-md text-zinc-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
