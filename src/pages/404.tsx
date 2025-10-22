import Effects from "../components/effects";
import "../index.css";

export default function NotFound() {
    return (
        <main className="flex items-center justify-center min-h-screen p-4 sm:p-6">
            <Effects />
            <div className="bg-[#0a0a0a]/90 z-10 p-6 md:p-8 lg:p-12 rounded-lg shadow-xl max-w-2xl w-full text-white border border-gray-800">
                <div className="text-center">
                    <h1 className="text-8xl md:text-9xl font-bold text-gray-300 mb-4">404</h1>
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-200 mb-4">page not found</h2>
                    <p className="text-gray-400 leading-relaxed">uhh... this page doesn't exist.</p>
                    <p className="text-gray-400 mb-4 leading-relaxed">maybe you typed the wrong url?</p>
                    <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 border border-gray-700 hover:border-gray-600">
                        <span>Go Back</span>
                    </a>
                </div>
            </div>
        </main>
    );
}
