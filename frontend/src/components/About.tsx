import { email } from "../lib/constants";

const tags = ["React", "TypeScript", "Tailwind CSS", "Rust", "SQL", "Docker"];

export default function About() {
    return (
        <section aria-label="About me" className="space-y-8">
            <h2 className="text-sm font-mono text-gray-400 mb-8 uppercase tracking-widest">About Me</h2>

            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                    <div className="leading-relaxed space-y-2 text-zinc-300">
                        <p>Hi everyone! I'm yorunoken, a full stack engineer who builds and maintains cool projects.</p>
                        <p>I like spending my free time listening to music, playin video games and reading.</p>
                        <p>
                            I have type 1 diabetes. I have my own{" "}
                            <a className="text-blue-300" href="https://nightscout.yorunoken.com" target="_blank" rel="noopener noreferrer">
                                hosted instance of Nightscout
                            </a>{" "}
                            where I can easily follow my blood sugars.
                        </p>
                        <p className="text-zinc-400">If you’re hiring or want to collaborate, the fastest way to reach me is email.</p>
                    </div>

                    <div className="pt-5">
                        <a
                            href={`mailto:${email}`}
                            className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-mono text-white transition hover:bg-white/10 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
                        >
                            Contact me
                        </a>
                    </div>
                </div>

                <aside className="rounded-md border border-white/5 bg-white/2 p-5">
                    <div className="space-y-2">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Toolbox</p>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span key={tag} className="rounded-md border border-white/10 bg-white/3 px-2.5 py-1 text-xs font-mono text-zinc-300">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
}
