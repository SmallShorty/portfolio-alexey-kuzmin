import React from 'react';
import VideoPlayer from "../components/VideoPlayer.jsx";
import {motion} from 'framer-motion';
import useFetch from "../hooks/useFetch.jsx";

const Hero = () => {
    const {
        loading,
        error,
        data
    } = useFetch(`${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}/api/hero-section?populate=*`);
    const {title = '', text = '', videos = []} = data?.attributes || {};


    return (
        <div id="home" className="relative h-screen overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
                {!loading &&
                    <VideoPlayer videos={videos.data?.map(video => video.attributes?.url)}/>

                }
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t
                to-transparent transparent from-black opacity-75"></div>
            </div>
            <motion.div
                className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-10 p-4 text-center"
                initial={{opacity: 0, y: 75}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: .75, delayChildren: 1}}
            >
                <h1 className="text-4xl font-extrabold leading-none md:text-5xl lg:text-6xl">{title}</h1>
                <p className="text-2xl font-bold sm:text-3xl md:text-4xl
                bg-gradient-to-r from-primary to-secondary
                animated-background bg-clip-text text-transparent bg-300%
                ">{text}</p>
            </motion.div>
        </div>
    );
};

export default Hero;