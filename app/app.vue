<script setup lang="ts">
import { projects } from "@@/server/utils/projects";
import { playlist } from "@@/server/utils/audio";

const { $device } = useNuxtApp();

const isDesktop = $device?.isDesktop ?? false;
const snowCount = isDesktop ? 200 : 50;

const glucose = ref("-");
const glucoseColor = ref("");
const visibleProjectsCount = ref(4);

const currentIndex = ref(0);
const isPlaying = ref(false);
const audioPlayer = ref<HTMLAudioElement | null>(null);
const musicVisible = ref(false);
const musicVolume = 0.15;
const musicCanPlay = ref(true);

// --- Glucose data ---
async function getGlucoseData() {
    const { data, error } = await useFetch("/api/glucose");
    if (error.value) {
        console.error(error.value);
        return;
    }
    if (!data.value) {
        console.log("No data received");
        return;
    }
    const value = data.value.sgv;
    glucoseColor.value =
        value < 60 ? "#5c1717" :
            value < 80 ? "#a22727" :
                value <= 160 ? "#3a9d23" :
                    value <= 220 ? "#e68a00" :
                        "#b34700";
    glucose.value = value.toLocaleString();
}

// --- Projects controls ---
function showMoreProjects() { visibleProjectsCount.value += 4; }
function showLessProjects() { visibleProjectsCount.value = 4; }

// --- Snowflakes ---
function snowFlakes() {
    const snowContainer = document.getElementById("snow-container");
    if (!snowContainer) return;
    for (let i = 0; i < snowCount; i++) {
        const snowflake = document.createElement("div");
        snowflake.className = "snowflake";
        snowflake.textContent = "❄";
        const depth = Math.floor(Math.random() * 3) + 1;
        snowflake.dataset.depth = depth.toString();
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.fontSize = `${Math.random() * 12 + 10}px`;
        const duration = (depth === 1 ? 10 : depth === 2 ? 18 : 25) + Math.random() * 5;
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${Math.random() * 10}s`;
        snowContainer.appendChild(snowflake);
    }
}

// --- Audio player controls ---
function loadCurrentSong(showController = true) {
    if (!audioPlayer.value) return;
    const currentSong = playlist[currentIndex.value];
    if (!currentSong) return;
    audioPlayer.value.src = "/audio/" + currentSong.fileName;
    audioPlayer.value.volume = musicVolume;
    audioPlayer.value.load();

    const currentSongText = document.getElementById("current-song");
    if (currentSongText) {
        currentSongText.textContent = `${currentSong.author} - ${currentSong.title}`;
    }

    if (showController) {
        musicVisible.value = true;
    }
}

function fadeVolume(targetVolume: number, duration = 200, onComplete?: () => void) {
    if (!audioPlayer.value) return;
    const audio = audioPlayer.value;
    const steps = 10;
    const stepTime = duration / steps;
    let step = 0;
    const startVolume = audio.volume;

    const fadeInterval = setInterval(() => {
        step++;
        const newVolume = startVolume + (targetVolume - startVolume) * (step / steps);
        audio.volume = Math.min(Math.max(newVolume, 0), musicVolume);
        if (step >= steps) {
            clearInterval(fadeInterval);
            if (onComplete) onComplete();
        }
    }, stepTime);
}

function play() {
    if (!audioPlayer.value) return;
    const audio = audioPlayer.value;
    audio.volume = 0;
    audio.play();
    isPlaying.value = true;
    musicVisible.value = true;

    fadeVolume(musicVolume, 200, () => {
        setTimeout(() => {
            musicVisible.value = false;
        }, 3000);
    });
}

function pause() {
    if (!audioPlayer.value) return;
    fadeVolume(0, 200, () => {
        audioPlayer.value?.pause();
        isPlaying.value = false;
        musicVisible.value = false;
    });
}

function pauseStop() {
    if (isPlaying.value) {
        pause();
    } else {
        if (!audioPlayer.value?.src) {
            loadCurrentSong();
        }
        play();
    }
}

function next() {
    currentIndex.value = (currentIndex.value + 1) % playlist.length;
    loadCurrentSong();
    play();
}

function prev() {
    currentIndex.value = (currentIndex.value - 1 + playlist.length) % playlist.length;
    loadCurrentSong();
    play();
}

function onSongEnded() {
    next();
}

// --- Autoplay test and control ---
async function testAutoplay() {
    if (!audioPlayer.value) return;
    const audio = audioPlayer.value;
    audio.muted = true;
    audio.volume = 0;
    loadCurrentSong(false);

    try {
        await audio.play();
        musicCanPlay.value = true;

        audio.muted = false;
        fadeVolume(musicVolume, 200, () => {
            setTimeout(() => {
                musicVisible.value = false;
            }, 3000);
        });
        isPlaying.value = true;
        musicVisible.value = true;
    } catch {
        musicCanPlay.value = false;
        audio.muted = false;
        audio.pause();
    }
}

async function startMusic() {
    currentIndex.value = Math.floor(Math.random() * playlist.length);
    loadCurrentSong();
    try {
        await audioPlayer.value?.play();
        isPlaying.value = true;
        musicCanPlay.value = true;
        musicVisible.value = true;

        setTimeout(() => {
            if (isPlaying.value) {
                musicVisible.value = false;
            }
        }, 3000);

    } catch {
        musicCanPlay.value = false;
    }
}
// --- Initialization ---
getGlucoseData();
onMounted(() => {
    snowFlakes();
    testAutoplay();
});
</script>

<template>
    <div id="snow-container"></div>
    <div v-if="!musicCanPlay" class="overlay"></div>
    <div v-if="!musicCanPlay" class="music-prompt">
        <h2>Enjoy the Full Experience</h2>
        <p>
            This website feels way better with music on.<br>
            Want to start it now? (You can turn it off anytime)<br><br>
            If you prefer not to see this popup every time, you can enable autoplay permissions for this site in your
            browser settings.
        </p>
        <button @click="startMusic">Yes, play music</button>
    </div>

    <main>
        <section class="music-wrapper" role="region" aria-label="Music player controls">
            <div class="music-handle" aria-hidden="true"></div>
            <audio ref="audioPlayer" @ended="onSongEnded" aria-live="polite"></audio>
            <section class="music" :class="{ visible: musicVisible }">
                <span class="now-playing">
                    Now Playing:
                    <span id="current-song" class="current-song" aria-live="polite"></span>
                </span>
                <ul class="controlller" role="list">
                    <li role="button" tabindex="0" @click="prev" @keydown.enter="prev" aria-label="Previous">
                        <span class="fa fa-backward" aria-hidden="true"></span>
                    </li>
                    <li v-if="isPlaying" role="button" tabindex="0" @click="pauseStop" @keydown.enter="pauseStop"
                        aria-label="Pause">
                        <span class="fa fa-pause" aria-hidden="true"></span>
                    </li>
                    <li v-if="!isPlaying" role="button" tabindex="0" @click="pauseStop" @keydown.enter="pauseStop"
                        aria-label="Play">
                        <span class="fa fa-play" aria-hidden="true"></span>
                    </li>
                    <li role="button" tabindex="0" @click="next" @keydown.enter="next" aria-label="Next">
                        <span class="fa fa-forward" aria-hidden="true"></span>
                    </li>
                </ul>
            </section>
        </section>

        <section class="info-card">
            <div class="top">
                <img src="/images/pfp.png" class="pfp" />
                <div class="info">
                    <p class="name">yorunoken</p>
                    <p class="role">Computer Programmer</p>
                    <p class="email"><a href="mailto:me@yorunoken.com">me@yorunoken.com</a></p>
                </div>
            </div>
            <div class="bottom">
                <p class="desc">Hello! I'm a university student. I love programming, listening to music and
                    playing games. I'm a blind duck 🦆</p>
                <p class="desc">I suffer from an autoimmune disease called Type 1 Diabetes</p>
                <ul class="social">
                    <a href="https://twitter.com/_yorunoken" target="_blank" rel="noopener noreferrer">
                        <li class="twitter">
                            <span class="fab fa-twitter"></span>
                            <h3>Twitter</h3>
                        </li>
                    </a>
                    <a href="https://discord.com/users/372343076578131968" target="_blank" rel="noopener noreferrer">
                        <li class="discord">
                            <span class="fab fa-discord"></span>
                            <h3>Discord</h3>
                        </li>
                    </a>
                    <a href="https://osu.ppy.sh/u/17279598" target="_blank" rel="noopener noreferrer">
                        <li class="osu">
                            <span class="fas fa-circle"></span>
                            <h3>osu!</h3>
                        </li>
                    </a>
                    <a href="https://github.com/yorunoken" target="_blank" rel="noopener noreferrer">
                        <li class="github">
                            <span class="fab fa-github"></span>
                            <h3>Github</h3>
                        </li>
                    </a>
                    <a href="https://www.youtube.com/@yorunoken" target="_blank" rel="noopener noreferrer">

                        <li class="youtube">
                            <span class="fab fa-youtube"></span>
                            <h3>Youtube</h3>
                        </li>
                    </a>
                </ul>
            </div>
        </section>

        <section class="diabetes-section">
            <h2>About My Type 1 Diabetes</h2>
            <p>
                Managing Type 1 Diabetes is a big part of my daily life. I continuously monitor my glucose levels to
                stay healthy.
            </p>

            <div class="glucose-display">
                <div class="glucose-label">Current Glucose Level:</div>
                <div class="glucose-value" :style="{ color: glucoseColor }">{{ glucose }}</div>
                <div class="unit">mg/dL</div>
            </div>
        </section>

        <section class="projects-section">
            <h2>My Projects</h2>
            <div class="projects-list">
                <div class="project-card" v-for="project in projects.slice(0, visibleProjectsCount)" :key="project.id">
                    <h3>{{ project.title }}</h3>
                    <p>{{ project.description }}</p>
                    <div class="project-links">
                        <a v-if="project.website" :href="project.website" target="_blank" rel="noopener noreferrer">View
                            Website</a>
                        <a v-if="project.github" :href="project.github" target="_blank" rel="noopener noreferrer">View
                            Source Code</a>
                    </div>
                </div>
            </div>
            <button v-if="visibleProjectsCount < projects.length" @click="showMoreProjects" class="show-btn">
                Show More
            </button>
            <button v-if="visibleProjectsCount >= projects.length" @click="showLessProjects" class="show-btn">
                Show Less
            </button>
        </section>

        <p class="footer">Made with <span>LOVE</span> and attention by yorunoken</p>
    </main>
</template>

<style lang="css">
* {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: "Segoe UI", sans-serif;
    background: linear-gradient(135deg, #2f2f2f, #eee);
    background-size: 400% 400%;
    animation: gradientShift 30s ease infinite;
    color: #222;
    position: relative;
    overflow-y: auto;
}

@keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.footer {
    color: #f0f0f5;
    margin-top: 3rem;
}

.footer span {
    color: #d43f3f;
    font-weight: bold;

}

main {
    margin-top: 5rem;
    margin-bottom: 4rem;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

#snow-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 0;
}

.snowflake {
    position: fixed;
    top: -30px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    user-select: none;
    pointer-events: none;
    animation-name: snowFall;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    will-change: transform;
}

.snowflake[data-depth="1"] {
    opacity: 0.9;
    z-index: 0;
}

.snowflake[data-depth="2"] {
    opacity: 0.6;
    z-index: -1;
    filter: blur(0.5px);
}

.snowflake[data-depth="3"] {
    opacity: 0.4;
    z-index: -2;
    filter: blur(1px);
}


@keyframes snowFall {
    0% {
        transform: translateX(0) translateY(-30px);
        opacity: 1;
    }

    50% {
        transform: translateX(15px) translateY(50vh);
    }

    100% {
        transform: translateX(0) translateY(100vh);
        opacity: 0.6;
    }
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9998;
}

.music-prompt {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fafafa;
    padding: 2.5rem 3rem;
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
    z-index: 9999;
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 420px;
    width: 90%;
    color: #333;
    animation: fadeIn 0.35s ease forwards;
}

.music-prompt h2 {
    margin-bottom: 1.2rem;
    font-weight: 700;
    font-size: 1.5rem;
}

.music-prompt p {
    font-size: 1rem;
    margin-bottom: 2rem;
    line-height: 1.5;
    color: #444;
    white-space: pre-line;
}

.music-prompt button {
    background: #d43f3f;
    color: white;
    border: none;
    padding: 0.9rem 2rem;
    font-size: 1.15rem;
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
    box-shadow: 0 3px 8px rgba(212, 63, 63, 0.5);
}

.music-prompt button:hover {
    background: #b23434;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translate(-50%, -55%);
    }

    to {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
}

.music-wrapper {
    position: fixed;
    top: 0;
    width: 400px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: auto;
    z-index: 1000;
    background: transparent;
    cursor: default;
    transition: border-color 0.3s ease;
}

.music-wrapper:hover .music {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
}

.music-handle {
    position: fixed;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 5px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.15);
    cursor: pointer;
    transition: background 0.3s ease, box-shadow 0.3s ease;
    z-index: 1001;
    pointer-events: auto;
}

.music-handle:hover {
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
}

.music {
    width: 95%;
    background: rgba(207, 207, 207, 0.7);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);

    border-radius: 8px;
    padding: 1.2rem 1.8rem;
    color: #222;
    font-family: "Segoe UI", sans-serif;
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
    z-index: 1;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.music {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-100%);
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.music.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
}

.music .now-playing {
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 0.6rem;
    text-align: center;
    color: #222;
}

.music .now-playing {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.6rem;
    text-align: center;
    color: #333;
}

.music .current-song {
    font-weight: bold;
    color: #333;
    margin-left: 0.3rem;
}

.music .controlller {
    display: flex;
    gap: 2.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
}

.music .controlller li {
    cursor: pointer;
    font-size: 2.4rem;
    color: #666;
    transition: color 0.3s ease;
    outline-offset: 3px;
}

.music .controlller li:hover {
    color: #d43f3f;
    border-radius: 4px;
}

.info-card,
.diabetes-section,
.projects-section {
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);

    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    font-family: "Segoe UI", sans-serif;

    position: relative;
    z-index: 1;
}

.info-card {
    border-radius: 10px;
    padding: 2rem;
    width: 90%;
    max-width: 800px;
    color: #111;
}

.top {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.pfp {
    width: 80px;
    height: 80px;
    border-radius: 1rem;
    object-fit: cover;
    border: 2px solid #111;
}

.info .name {
    color: #111;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
}

.info .role {
    color: #444;
    font-size: 1rem;
    margin: 0;
}

.info .email {
    margin-top: 0.3rem;
    font-size: 0.9rem;
    color: #555;
}

.info .email a {
    color: #d43f3f;
    text-decoration: none;
}

.info .email a:hover {
    text-decoration: underline;
}

.bottom .desc {
    font-size: 1rem;
    margin: 1rem 0;
    line-height: 1.4;
    color: #222;
}

.social {
    display: flex;
    gap: 1.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
    /* allow wrapping */
    overflow-x: auto;
    /* allow horizontal scroll if needed */
    gap: 1rem;
    max-width: 100%;
}

.social li {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    cursor: pointer;
    transition: color 0.3s ease;

    flex: 0 0 auto;
    /* prevent shrinking too small */
    min-width: 60px;
    text-align: center;
}

.social a {
    text-decoration: none;
    color: inherit;
}

.social li span {
    background: rgba(0, 0, 0, 0.1);
    color: #111;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
}

.social li h3 {
    font-size: 0.9rem;
    margin: 0;
    user-select: none;
}

.social li:hover h3 {
    color: #00d8ff;
}

.social li.twitter:hover span {
    background: #1DA1F2;
    color: white;
}

.social li.discord:hover span {
    background: #5865F2;
    color: white;
}

.social li.osu:hover span {
    background: #F76C6C;
    color: white;
}

.social li.github:hover span {
    background: #333;
    color: white;
}

.social li.youtube:hover span {
    background: #ff4141;
    color: white;
}

.social li.twitter:hover h3 {
    color: #1DA1F2;
}

.social li.discord:hover h3 {
    color: #5865F2;
}

.social li.osu:hover h3 {
    color: #fc7777;
}

.social li.github:hover h3 {
    color: #333;
}

.social li.youtube:hover h3 {
    color: #ff4141;
}

.diabetes-section {
    border-radius: 10px;
    padding: 1.5rem 2rem;
    max-width: 700px;
    margin-top: 2rem;
    color: #111;
}

.diabetes-section h2 {
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
    font-weight: 700;
    color: #d43f3f;
}

.diabetes-section p {
    font-size: 1rem;
    margin-bottom: 1rem;
}

.glucose-display {
    display: flex;
    align-items: baseline;
    gap: 0.4rem;
    font-size: 2.8rem;
    font-weight: 900;
    font-family: "Segoe UI Black", sans-serif;
    min-width: 90px;
    color: inherit;
}

.glucose-label {
    font-weight: 600;
    font-size: 1rem;
    color: #555;
    flex: 1;
}

.glucose-value {
    font-size: 2.5rem;
    font-weight: 900;
    min-width: 80px;
    text-align: right;
}

.unit {
    font-size: 1rem;
    font-weight: 600;
    color: #777;
}

.projects-section {
    border-radius: 12px;
    padding: 1.8rem 2.4rem;
    width: 700px;
    margin-top: 2.5rem;
    color: #111;
    font-family: "Segoe UI", sans-serif;
}

.projects-section h2 {
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
    font-weight: 700;
    color: #d43f3f;
}

.projects-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.project-card {
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);

    border-radius: 8px;
    padding: 1rem 1.5rem;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
}

.project-card:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.project-card h3 {
    margin: 0 0 0.3rem 0;
    color: #333;
}

.project-card p {
    margin: 0 0 0.6rem 0;
    color: #555;
    line-height: 1.3;
}

.project-card a {
    font-weight: 600;
    color: #d43f3f;
    text-decoration: none;
}

.project-card a:hover {
    text-decoration: underline;
}

.project-links a {
    margin-right: 1rem;
    display: inline-block;
}

.project-links a:last-child {
    margin-right: 0;
}

.show-btn {
    margin-top: 1.2rem;
    padding: 0.75rem 1.5rem;
    background-color: #d43f3f;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 700;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.show-btn:hover {
    background-color: #b23434;
    outline: none;
    box-shadow: 0 0 6px #b23434;
}

@media (max-width: 768px) {

    html,
    body {
        font-size: 14px;
        background-size: 300% 300%;
    }

    main {
        margin-top: 3rem;
        margin-bottom: 2rem;
        padding: 0 1rem;
    }

    .info-card,
    .diabetes-section,
    .projects-section {
        width: 100%;
        max-width: 100%;
        padding: 1.5rem 1rem;
        margin: 1rem 0;
        box-sizing: border-box;
    }

    .projects-section {
        padding: 1.5rem 1rem;
    }

    .social {
        gap: 0.75rem;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    .social li {
        min-width: 50px;
        font-size: 0.85rem;
    }

    .music-wrapper {
        height: 0px;
    }

    .music-handle {
        display: none;
    }

    .music {
        position: fixed;
        bottom: 0px;
        left: 0;
        width: 100vw;
        max-width: 100%;
        border-radius: 0;
        padding: 1rem 1.5rem;
        box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
        background: rgba(250, 250, 250, 0.95);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 1rem;
        opacity: 1 !important;
        pointer-events: auto !important;
        transform: translateY(0) !important;
    }

    .music .now-playing {
        font-size: 1rem;
        margin-bottom: 0;
        color: #d43f3f;
        font-weight: 700;
        flex: 1;
        text-align: left;
        padding-left: 0.5rem;
    }

    .music .controlller {
        gap: 1.5rem;
    }

    .music .controlller li {
        font-size: 1.8rem;
    }

    .footer {
        margin-top: 0rem;
        font-size: 0.9rem;
    }
}
</style>
