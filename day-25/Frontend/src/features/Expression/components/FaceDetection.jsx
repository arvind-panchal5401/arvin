import { useEffect, useRef, useState } from "react";
import { detect, init } from "../services/mediaPipe";

export default function FaceExpression() {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const animationRef = useRef(null);
    const setStrem = useRef()
    const [expression, setExpression] = useState("Detecting...");
   
    useEffect(() => {
   
        init({landmarkerRef,videoRef,setStrem});
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);
    return (
        <div style={{ textAlign: "center" }}>
            <video
                ref={videoRef}
                style={{ width: "400px", borderRadius: "12px" }}
                playsInline
            />
            <h2>{expression}</h2>
            <button onClick={()=>{detect({landmarkerRef,videoRef,setExpression})}}>Detected Expression</button>
        </div>
    );
}