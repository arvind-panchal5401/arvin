import { useEffect, useRef, useState } from "react";
import { SongContext } from "../song.context";
import "./Player.scss";
import { useSong } from "../Hooks/useSong";

const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function SkipIcon({ direction }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={direction === "backward" ? "M19 5v14l-11-7 11-7Z" : "M5 5v14l11-7L5 5Z"} />
            <path d={direction === "backward" ? "M5 5v14" : "M19 5v14"} />
            <text x="7" y="15">5</text>
        </svg>
    );
}

const Player = () => {
    const { song } = useSong(SongContext);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [error, setError] = useState("");

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.pause();
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setError("");
    }, [song?.url]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = playbackRate;
        }
    }, [playbackRate]);

    async function togglePlayback() {
        const audio = audioRef.current;
        if (!audio || !song?.url) return;

        setError("");
        if (audio.paused) {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch {
                setIsPlaying(false);
                setError("Playback could not start. Please try again.");
            }
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    }

    function seekTo(time) {
        const audio = audioRef.current;
        if (!audio) return;

        const upperBound = Number.isFinite(audio.duration) ? audio.duration : time;
        const nextTime = Math.max(0, Math.min(time, upperBound));
        audio.currentTime = nextTime;
        setCurrentTime(nextTime);
    }

    function skipBy(seconds) {
        seekTo((audioRef.current?.currentTime || 0) + seconds);
    }

    return (
        <section className="player-card" aria-label="Music player">
            <audio
                ref={audioRef}
                src={song?.url || undefined}
                preload="metadata"
                onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
                onEnded={() => setIsPlaying(false)}
                onError={() => {
                    if (song?.url) setError("This song could not be loaded.");
                }}
            />

            <div className="player-heading">
                <span className="player-eyebrow">NOW PLAYING</span>
                <label className="speed-control">
                    <span>Speed</span>
                    <select
                        aria-label="Playback speed"
                        value={playbackRate}
                        onChange={(event) => setPlaybackRate(Number(event.target.value))}
                    >
                        {playbackSpeeds.map((speed) => (
                            <option key={speed} value={speed}>{speed}x</option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="player-track">
                <div className="player-artwork">
                    {song?.posterUrl ? (
                        <img src={song.posterUrl} alt="" />
                    ) : (
                        <span aria-hidden="true">♫</span>
                    )}
                </div>
                <div className="player-track-info">
                    <h2>{song?.title || "No song selected"}</h2>
                    <p>{song?.mood ? `${song.mood} mood` : "Your next favorite is waiting"}</p>
                </div>
                <span className={`playing-indicator${isPlaying ? " is-playing" : ""}`} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                </span>
            </div>

            <div className="player-progress">
                <input
                    type="range"
                    aria-label="Song progress"
                    min="0"
                    max={duration || 0}
                    step="0.1"
                    value={Math.min(currentTime, duration || 0)}
                    disabled={!song?.url || !duration}
                    onChange={(event) => seekTo(Number(event.target.value))}
                />
                <div className="player-time">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            <div className="player-controls">
                <button
                    className="skip-button"
                    type="button"
                    aria-label="Back 5 seconds"
                    title="Back 5 seconds"
                    disabled={!song?.url}
                    onClick={() => skipBy(-5)}
                >
                    <SkipIcon direction="backward" />
                </button>
                <button
                    className="play-button"
                    type="button"
                    aria-label={isPlaying ? "Pause" : "Play"}
                    disabled={!song?.url}
                    onClick={togglePlayback}
                >
                    {isPlaying ? (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8 5h3v14H8zM15 5h3v14h-3z" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="m8 5 12 7-12 7V5Z" />
                        </svg>
                    )}
                </button>
                <button
                    className="skip-button"
                    type="button"
                    aria-label="Forward 5 seconds"
                    title="Forward 5 seconds"
                    disabled={!song?.url}
                    onClick={() => skipBy(5)}
                >
                    <SkipIcon direction="forward" />
                </button>
            </div>

            {error && <p className="player-error" role="status">{error}</p>}
        </section>
    );
};

export default Player;
