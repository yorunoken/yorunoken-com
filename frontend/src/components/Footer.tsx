import { donation, email, github, osu, twitter, youtube } from "../lib/constants";

export default function Footer() {
    return (
        <footer className="pt-12 border-t border-white/5 text-zinc-500 text-sm">
            <div className="flex flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex gap-6 font-mono text-xs uppercase tracking-wider">
                    <a href={`mailto:${email}`} className="hover:text-white hover:underline underline-offset-4 transition-all">
                        Email
                    </a>
                    <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer" className="hover:text-white hover:underline underline-offset-4 transition-all">
                        GitHub
                    </a>
                    <a href={`https://twitter.com/${twitter}`} className="hover:text-white hover:underline underline-offset-4 transition-all">
                        Twitter
                    </a>
                    <a href={`https://youtube.com/${youtube}`} className="hover:text-white hover:underline underline-offset-4 transition-all">
                        Youtube
                    </a>
                    <a href={`https://osu.ppy.sh/${osu}`} className="hover:text-white hover:underline underline-offset-4 transition-all">
                        osu!
                    </a>
                    <a href={donation} className="hover:text-white hover:underline underline-offset-4 transition-all">
                        Donate
                    </a>
                </div>
                <p className="font-mono text-xs">© {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
}
