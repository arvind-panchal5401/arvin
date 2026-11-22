import { useEffect, useRef, useState } from "react";
import { init } from "../services/mediaPipe";

export default function FaceExpression() {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const animationRef = useRef(null);
    const streamRef = useRef(null);
    const [expression, setExpression] = useState("Detecting...");
    const [error, setError] = useState("");

    useEffect(() => {
        let isActive = true;

        const releaseResources = () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
                landmarkerRef.current = null;
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
                streamRef.current = null;
            }
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        };

        init({
            landmarkerRef,
            videoRef,
            setStream: streamRef,
            setExpression,
            animationRef,
            isActive: () => isActive
        }).catch((initializationError) => {
            if (isActive) {
                releaseResources();
                setError(initializationError instanceof Error
                    ? initializationError.message
                    : "Unable to initialize face detection.");
            }
        });

        return () => {
            isActive = false;
            releaseResources();
        };
    }, []);
    return (
        <div style={{ textAlign: "center" }}>
            <video
                ref={videoRef}
                style={{ width: "400px", borderRadius: "12px" }}
                playsInline
            />
            <h2 aria-live="polite">{error ? "Face detection unavailable" : expression}</h2>
            {error && <p role="alert">{error}</p>}
        </div>
    );
}