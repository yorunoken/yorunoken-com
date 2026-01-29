import { useEffect, useMemo, useState } from "react";

type ResolvingTitleProps = {
    text: string;
    className?: string;
    scrambleDurationMs?: number;
    revealDurationMs?: number;
    charset?: string;
};

function usePrefersReducedMotion(): boolean {
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduced(mediaQuery.matches);

        update();
        mediaQuery.addEventListener("change", update);
        return () => mediaQuery.removeEventListener("change", update);
    }, []);

    return reduced;
}

function randomChar(charset: string): string {
    const index = Math.floor(Math.random() * charset.length);
    return charset[index] ?? "#";
}

export default function ResolvingTitle({
    text,
    className,
    scrambleDurationMs = 300,
    revealDurationMs = 800,
    charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{};:,.<>?/\\|~",
}: ResolvingTitleProps) {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [displayText, setDisplayText] = useState(() => text);

    const textChars = useMemo(() => text.split(""), [text]);

    useEffect(() => {
        if (prefersReducedMotion) return;

        let rafId = 0;
        const start = performance.now();
        const totalMs = scrambleDurationMs + revealDurationMs;

        const tick = (now: number) => {
            const elapsed = now - start;

            if (elapsed >= totalMs) {
                setDisplayText(text);
                return;
            }

            if (elapsed < scrambleDurationMs) {
                const scrambled = textChars.map((ch) => (ch === " " ? " " : randomChar(charset))).join("");
                setDisplayText(scrambled);
                rafId = requestAnimationFrame(tick);
                return;
            }

            const progress = (elapsed - scrambleDurationMs) / revealDurationMs;
            const revealedCount = Math.floor(progress * textChars.length);

            const resolving = textChars
                .map((ch, i) => {
                    if (ch === " ") return " ";
                    if (i < revealedCount) return ch;
                    return randomChar(charset);
                })
                .join("");

            setDisplayText(resolving);
            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [charset, prefersReducedMotion, revealDurationMs, scrambleDurationMs, text, textChars]);

    const renderedText = prefersReducedMotion ? text : displayText;

    return (
        <h1 className={`title-resolve ${className ?? ""}`.trim()} aria-label={text}>
            <span aria-hidden="true">{renderedText}</span>
        </h1>
    );
}
