import { useState, useCallback, useMemo, useEffect, lazy, Suspense } from "react";

// Lazy load effect components for better initial load performance
const Snowflakes = lazy(() => import("../components/snowflakes"));
const Rain = lazy(() => import("../components/rain"));
const Leaves = lazy(() => import("../components/leaves"));

type WeatherType = "snow" | "rain" | "leaves";

const WEATHER_OPTIONS: WeatherType[] = ["snow", "rain", "leaves"];

const BACKGROUND_IMAGES = {
    snow: "https://yorunoken.s-ul.eu/ixnhcPA8",
    rain: "https://yorunoken.s-ul.eu/yyCyDMUB",
    leaves: "https://yorunoken.s-ul.eu/XYdxk4kI",
} as const;

export default function Effects() {
    const [weatherEffect, setWeatherEffect] = useState<WeatherType>(() => {
        const savedWeather = localStorage.getItem("weather");
        return (savedWeather as WeatherType) ?? "snow";
    });

    // Preload background images for smoother transitions
    useEffect(() => {
        Object.values(BACKGROUND_IMAGES).forEach((url) => {
            const img = new Image();
            img.src = url;
        });
    }, []);

    const selectWeather = useCallback(
        (weather: WeatherType) => {
            if (weather === weatherEffect) return;

            setWeatherEffect(weather);
            localStorage.setItem("weather", weather);
        },
        [weatherEffect]
    );

    const backgroundStyles = useMemo(
        () => ({
            snow: { backgroundImage: `url('${BACKGROUND_IMAGES.snow}')` },
            rain: { backgroundImage: `url('${BACKGROUND_IMAGES.rain}')` },
            leaves: { backgroundImage: `url('${BACKGROUND_IMAGES.leaves}')` },
        }),
        []
    );

    const weatherIcons = useMemo(
        () => ({
            snow: "❄️",
            rain: "🌧️",
            leaves: "🍂",
        }),
        []
    );

    return (
        <>
            <div
                className={`fixed inset-0 w-full h-full bg-center bg-no-repeat bg-cover brightness-50 blur-[5px] transition-opacity duration-700 ${weatherEffect === "snow" ? "opacity-100" : "opacity-0"}`}
                style={{ ...backgroundStyles.snow, willChange: "opacity" }}
            />
            <div
                className={`fixed inset-0 w-full h-full bg-center bg-no-repeat bg-cover brightness-50 blur-[5px] transition-opacity duration-700 ${weatherEffect === "rain" ? "opacity-100" : "opacity-0"}`}
                style={{ ...backgroundStyles.rain, willChange: "opacity" }}
            />
            <div
                className={`fixed inset-0 w-full h-full bg-center bg-no-repeat bg-cover brightness-50 blur-[5px] transition-opacity duration-700 ${weatherEffect === "leaves" ? "opacity-100" : "opacity-0"}`}
                style={{ ...backgroundStyles.leaves, willChange: "opacity" }}
            />

            {/* Weather effects with smooth opacity transitions */}
            <Suspense fallback={null}>
                <div className={`fixed inset-0 transition-opacity duration-700 ${weatherEffect === "snow" ? "opacity-100" : "opacity-0"} pointer-events-none`} style={{ willChange: "opacity" }}>
                    <Snowflakes />
                </div>
                <div className={`fixed inset-0 transition-opacity duration-700 ${weatherEffect === "rain" ? "opacity-100" : "opacity-0"} pointer-events-none`} style={{ willChange: "opacity" }}>
                    <Rain />
                </div>
                <div className={`fixed inset-0 transition-opacity duration-700 ${weatherEffect === "leaves" ? "opacity-100" : "opacity-0"} pointer-events-none`} style={{ willChange: "opacity" }}>
                    <Leaves />
                </div>
            </Suspense>

            <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-20 flex gap-1.5 sm:gap-2 bg-gray-900/90 p-1.5 sm:p-2 rounded-lg border border-gray-800 shadow-lg">
                {WEATHER_OPTIONS.map((weather) => (
                    <button
                        key={weather}
                        onClick={() => selectWeather(weather)}
                        className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded text-base sm:text-lg transition-all ${
                            weatherEffect === weather ? "bg-blue-600 text-white shadow-md" : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                        }`}
                        title={weather}
                        aria-label={`Switch to ${weather} effect`}
                    >
                        {weatherIcons[weather]}
                    </button>
                ))}
            </div>
        </>
    );
}
