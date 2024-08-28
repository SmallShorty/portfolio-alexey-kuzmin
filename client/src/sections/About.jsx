import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import useFetch from "../hooks/useFetch.jsx";
import axios from "axios";
import {motion} from 'framer-motion';
import {getAge, getAgeText, getProjectsText} from "../utils/textUtils.jsx";
import Skeleton from "react-loading-skeleton";

export default function About() {
    const {
        loading,
        error,
        data
    } = useFetch(`${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}/api/about-me-section?populate=cover`);
    const [total, setTotal] = useState(null);

    useEffect(() => {
        const fetchTotal = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}/api/projects`);
                setTotal(response.data.meta.pagination.total);
            } catch (error) {
                console.log(error)
            }
        }
        fetchTotal();
    }, [])

    return (
        <section id="about" className="my-20 mx-10 min-h-96 relative">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <motion.div className="h-full mr-10 shadow-2xl bg-background-125">
                    <img
                        src={`${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}${data?.attributes.cover.data?.attributes.formats.medium.url}`}
                        className="w-full h-auto rounded-lg shadow-lg"
                        alt=''
                    />
                </motion.div>
                <div className={`md:w-1/2 mt-8 md:mt-0`}>
                    <h2 className="text-3xl font-bold">{data?.attributes.title || <Skeleton/>}</h2>
                    <p className="text-lg font-light mb-4 text-justify">{data?.attributes.description || <Skeleton/>}</p>
                    <div className="flex flex-row justify-evenly p-5 border-t-2 border-b-2 border-text-25">
                        <div className="flex flex-col">
              <span className="text-5xl">
                {total}
                  <span className="text-primary">+</span>
              </span>
                            <span className="text-base md:text-xl font-semibold">{getProjectsText(total)}</span>
                        </div>
                        <div className="flex flex-col">
              <span className="text-5xl">
                {getAge(data?.attributes.experience_date)}
                  <span className="text-primary">+</span>
              </span>
                            <span
                                className="text-base md:text-xl font-semibold">{getAgeText(getAge(data?.attributes.experience_date))} опыта</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}