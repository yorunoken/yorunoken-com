import ResolvingTitle from "./ResolvingTitle";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 text-center mt-12 md:mt-24">
            <ResolvingTitle text="404" className="text-8xl font-bold tracking-tight text-white mb-2 font-mono" />
            <div className="space-y-2">
                <h2 className="text-2xl font-mono text-zinc-200">Page not found</h2>
                <p className="text-zinc-400 max-w-md mx-auto font-mono">The void you are looking for stares back.</p>
            </div>

            <a href="/" className="inline-flex items-center justify-center px-6 py-3 text-sm font-mono text-zinc-900 bg-zinc-100 hover:bg-zinc-300 transition-colors duration-200 rounded-sm">
                cd /home
            </a>
        </div>
    );
}
