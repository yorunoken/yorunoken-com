import { useEffect, useRef, useState } from "react";

const quotes = ["Writing code and learning new technologies every day.", "The grind never stops.", "Everyday is a new opportunity for something great."];

const CYCLE_MS = 10000;
const CHAR_STEP_MS = 20;
const EMPTY_PAUSE_MS = 2000;

type Phase = "idle" | "deleting" | "pause" | "typing";

export default function Quotes() {
    const [index, setIndex] = useState(() => Math.floor(Math.random() * quotes.length));
    const [text, setText] = useState(() => quotes[index]);

    const indexRef = useRef(index);
    const nextIndexRef = useRef((index + 1) % quotes.length);
    const phaseRef = useRef<Phase>("idle");
    const typePosRef = useRef(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        indexRef.current = index;
        nextIndexRef.current = (index + 1) % quotes.length;
    }, [index]);

    useEffect(() => {
        const clearTimer = () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        };

        const schedule = (ms: number, fn: () => void) => {
            clearTimer();
            timeoutRef.current = setTimeout(fn, ms);
        };

        const startCycle = () => {
            phaseRef.current = "deleting";
            schedule(CHAR_STEP_MS, step);
        };

        const step = () => {
            if (phaseRef.current === "deleting") {
                setText((prev) => {
                    if (prev.length <= 1) {
                        phaseRef.current = "pause";
                        schedule(EMPTY_PAUSE_MS, step);
                        return "";
                    }
                    schedule(CHAR_STEP_MS, step);
                    return prev.slice(0, -1);
                });
                return;
            }

            if (phaseRef.current === "pause") {
                phaseRef.current = "typing";
                typePosRef.current = 0;
                schedule(CHAR_STEP_MS, step);
                return;
            }

            if (phaseRef.current === "typing") {
                const nextQuote = quotes[nextIndexRef.current] ?? "";
                typePosRef.current += 1;
                const nextText = nextQuote.slice(0, typePosRef.current);
                setText(nextText);

                if (typePosRef.current >= nextQuote.length) {
                    setIndex(nextIndexRef.current);
                    phaseRef.current = "idle";
                    schedule(CYCLE_MS, startCycle);
                    return;
                }

                schedule(CHAR_STEP_MS, step);
            }
        };

        // kick off the first rotation after the hold
        schedule(CYCLE_MS, startCycle);
        return clearTimer;
    }, []);

    return (
        <div className="flex items-center gap-2 text-sm font-mono text-zinc-500 h-6">
            <span className="text-blue-400">~</span>
            <span className="flex items-center transition-opacity duration-500">
                {text}
                <span className="animate-cursor-blink w-2 h-4 bg-zinc-500 block"></span>
            </span>
        </div>
    );
}
