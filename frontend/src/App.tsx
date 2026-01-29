import About from "./components/About";
import Projects from "./components/Projects";
import ResolvingTitle from "./components/ResolvingTitle";
import Footer from "./components/Footer";
import Quotes from "./components/Quotes";

export default function App() {
    return (
        <main className="min-h-screen w-full bg-[#111] text-zinc-100 p-6 md:p-10 font-sans antialiased selection:bg-blue-500/30">
            <div className="max-w-4xl mx-auto space-y-18">
                <header className="space-y-2 mt-6 md:mt-12">
                    <div className="space-y-4">
                        <ResolvingTitle text="yorunoken" className="text-4xl font-bold tracking-tight text-white mb-2" />
                        <p className="text-lg text-zinc-400 font-mono">Software Engineer & Full Stack Developer</p>
                    </div>

                    <Quotes />
                </header>

                <About />

                <Projects />

                <Footer />
            </div>
        </main>
    );
}
