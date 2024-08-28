import React  from 'react';
import HoverVideoPlayer from "react-hover-video-player";


function ProjectCard({attributes}) {
    return (
        <>
            {!attributes.video?.data?.attributes?.url ?
                <div className="bg-background-125 rounded-2xl aspect-video overflow-hidden">
                    <img src={`${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}${attributes.cover?.data?.[0]?.attributes?.formats?.medium.url}`}
                         alt=""/>
                </div>
                :
                <HoverVideoPlayer
                    videoSrc={`${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}${attributes.video?.data?.attributes?.url}`}
                    playbackRangeStart={attributes.timestamp?.start || 0}
                    playbackRangeEnd={attributes.timestamp?.end || 10}
                    pausedOverlay={
                        <img
                            src={`${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}${attributes.cover?.data?.[0]?.attributes?.formats?.medium.url}`}
                            alt=""
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: 16,
                            }}
                        />
                    }
                    playbackStartDelay={100}
                    preload="metadata"
                    loadingOverlay={<div className="loading-overlay">
                        <Loading/>
                    </div>}

                    videoStyle={{
                        borderRadius: 16
                    }}
                />
            }
            <div>
                <h1 className="text-2xl font-bold tracking-wide">{attributes.title}</h1>
                <div className="flex flex-wrap items-center gap-2">
                    <span
                        className="bg-accent text-background-100
                        text-sm font-semibold border-accent border-2 py-1 px-2 rounded">{attributes.genre?.data.attributes?.name || 'Жанр'}
                    </span>
                    {attributes.roles?.data?.map((role) => (
                        <span key={role.id}
                              className="text-sm font-light text-accent bg-transparent border-accent border-2 py-1 px-2 rounded"
                        >{role.attributes.name}</span>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ProjectCard;