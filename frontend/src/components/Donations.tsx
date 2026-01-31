import { useState } from "react";
import { wallets } from "../lib/constants";
import Copied from "../svg/Copied";
import Copy from "../svg/Copy";

export default function Donations() {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <section id="support">
            <h2 className="text-sm font-mono text-gray-400 mb-8 uppercase tracking-widest">Support</h2>

            <div className="grid gap-8">
                <div className="leading-relaxed space-y-2 text-zinc-300">
                    <p>If you find my projects useful, consider supporting my work to help keep the servers running.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {wallets.map((wallet, index) => (
                        <div key={index} className="group relative rounded-md border border-white/5 bg-white/2 p-4 transition-colors hover:bg-white/5">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-white">{wallet.name}</span>
                                    {wallet.network && <span className="text-xs text-zinc-500 font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/5">{wallet.network}</span>}
                                </div>
                            </div>

                            {wallet.address ? (
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 font-mono text-xs text-zinc-400 truncate bg-black/20 p-2 rounded border border-white/5">{wallet.address}</code>
                                    <button onClick={() => handleCopy(wallet.address!)} className="p-2 text-zinc-400 hover:text-white transition-colors" title="Copy address">
                                        {copied === wallet.address ? (
                                            <span className="text-green-400">
                                                <Copied />
                                            </span>
                                        ) : (
                                            <Copy />
                                        )}
                                    </button>
                                </div>
                            ) : wallet.link ? (
                                <a href={wallet.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-300 hover:text-blue-200 hover:underline gap-1 mt-1">
                                    Support on {wallet.name} ↗
                                </a>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
