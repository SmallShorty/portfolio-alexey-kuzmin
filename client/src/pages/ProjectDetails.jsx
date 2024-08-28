import React from 'react';
import {Link, useParams} from 'react-router-dom';
import useFetch from "../hooks/useFetch.jsx";
import {Helmet} from "react-helmet";
import Gallery from "../components/Gallery.jsx";
import Loading from "../components/Loading.jsx";

function ProjectDetails() {
    const { id } = useParams();
    const { loading, data, error } = useFetch(`${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}/api/projects/${id}?populate=*`);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const attributes  = data.attributes || {};


    return (
        <>
            <Helmet>
                <title>{`Проект | ${attributes.title}`}</title>
            </Helmet>

            <div className="flex flex-col md:flex-row md:items-center m-5 md:m-20">
                <div className="md:w-2/5 mb-8">
                    <p className="flex text-4xl font-extrabold leading-none tracking-tight md:text-5xl text-text-100">{attributes.title}</p>
                    <div className="mt-4">
                        <p className="text-lg text-text-100">{attributes.directors && `Режиссёр: ${attributes.directors.map(i => i.name).join(', ')}`}</p>
                        <p className="text-lg text-text-100">{attributes.producers && `Продюссер: ${attributes.producers.map(i => i.name).join(', ')}`}</p>
                        <p className="text-lg text-text-100">{`Моя должность: ${attributes.roles.data.map(i => i.attributes.name).join(', ')}`}</p>
                        {/*<p className="text-lg text-text-100">{attributes.stage && `Этап производства: ${attributes.stage}`}</p>*/}
                        {/*<p className="text-lg text-text-100">{attributes.release_date ? `Дата релиза: ${attributes.release_date}` : ''}</p>*/}
                    </div>
                </div>

                <div className="md:w-3/5 flex justify-center items-center aspect-video relative bg-background-125 overflow-hidden rounded-lg shadow-lg">
                    {attributes.video?.data?.attributes?.url ? (
                        <video src={`${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}${attributes.video?.data?.attributes?.url}`} controls></video>
                    ) : (
                        <div className="space-y-3 text-center">
                            <Loading/>
                            <p>
                                {`Данный проект находится на этапе ${attributes.stage}`}
                                <br/>
                                {`Релиз запланирован на ${attributes.release_date}`}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <Gallery id={id}/>
        </>
    );
}

export default ProjectDetails;