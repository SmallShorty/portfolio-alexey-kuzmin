import React, { useState, useEffect, useRef, useMemo } from 'react';

const VideoPlayer = ({ videos }) => {
    const [index, setIndex] = useState(0);
    const videoRef = useRef(null);
    const handleVideoEnded = () => {
        setIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const videoSource = useMemo(() => `${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}${videos[index]}`, [videos, index]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.src = videoSource;
        }
    }, [videoSource]);

    return (
        <video
            key={index}
            className={`absolute top-0 left-0 w-full h-full object-cover brightness-50`}
            ref={videoRef}
            autoPlay
            playsInline
            muted
            onEnded={handleVideoEnded}
        />
    );
};

export default VideoPlayer;
