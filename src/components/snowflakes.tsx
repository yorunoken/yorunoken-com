import { useEffect, useState, useRef } from "react";

export default function Snowflakes() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("resize", handleResize);

        const drawSnowflake = (x: number, y: number, size: number, rotation: number, opacity: number) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = "white";
            ctx.fillStyle = "white";
            ctx.lineWidth = size / 8;
            ctx.lineCap = "round";

            for (let i = 0; i < 6; i++) {
                ctx.rotate(Math.PI / 3);

                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, -size);
                ctx.stroke();

                for (let j = 1; j <= 3; j++) {
                    const branchY = (-size * j) / 3;
                    const branchLength = size / 4;
                    const branchAngle = Math.PI / 6;

                    ctx.beginPath();
                    ctx.moveTo(0, branchY);
                    ctx.lineTo(Math.sin(-branchAngle) * branchLength, branchY + Math.cos(-branchAngle) * branchLength);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(0, branchY);
                    ctx.lineTo(Math.sin(branchAngle) * branchLength, branchY + Math.cos(branchAngle) * branchLength);
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.arc(0, -size, size / 10, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.beginPath();
            ctx.arc(0, 0, size / 6, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        };

        const snowflakes = Array.from({ length: 80 }).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 6 + 4,
            speed: Math.random() * 1 + 0.3,
            sway: Math.random() * 0.5 + 0.2,
            swayOffset: Math.random() * 1000,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            opacity: Math.random() * 0.4 + 0.4,
            wind: Math.random() * 0.3,
        }));

        let animationFrameId: number;
        let time = 0;

        const animate = () => {
            time += 16;
            ctx.clearRect(0, 0, width, height);

            for (const s of snowflakes) {
                s.x += Math.sin(time / 1000 + s.swayOffset) * s.sway + s.wind;
                s.y += s.speed;
                s.rotation += s.rotationSpeed;

                if (s.y > height + s.size * 2) {
                    s.y = -s.size * 2;
                    s.x = Math.random() * width;
                }

                if (s.x > width + s.size * 2) {
                    s.x = -s.size * 2;
                } else if (s.x < -s.size * 2) {
                    s.x = width + s.size * 2;
                }

                drawSnowflake(s.x, s.y, s.size, s.rotation, s.opacity);
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} id="snowflakes-canvas" className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />;
}
