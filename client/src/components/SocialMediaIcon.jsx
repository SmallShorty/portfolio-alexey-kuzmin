import React from 'react';

function SocialMediaIcon({data}) {
    return (
        <>
            <a href={data.attributes.link} target="_blank" rel="noopener noreferrer">
                <img
                    src={`${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}${data.attributes.icon.data.attributes.url}`}
                    alt={data.attributes.name}
                    className="h-10 hover:scale-110 transform transition duration-500 cursor-pointer"
                />
            </a>
        </>
    );
}

export default SocialMediaIcon;