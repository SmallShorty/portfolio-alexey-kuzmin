import React, { useEffect, useState } from 'react';
import axios from "axios";

function Gallery({id}) {
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}/api/projects/${id}/?populate=gallery`)
            .then((response) => {
                const galleryData = response.data.data.attributes.gallery.data;
                const urls = galleryData.map(item => item.attributes.url);
                setPhotos(urls);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const openModal = (photo) => {
        setSelectedPhoto(photo);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPhoto(null);
    };

    // Function to handle clicks on the modal backdrop
    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    return (
        <div>
            <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 mx-5 mb-5`}>
                {photos.map((photo, index) => {
                    return (
                        <div key={index} className="relative overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <img
                                src={`${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}${photo}`}
                                alt={`Произошла ошибка при загрузке изображения`}
                                className="w-full h-auto aspect-video object-cover transition-opacity duration-300 hover:opacity-90 hover:cursor-pointer"
                                onClick={() => openModal(photo)} // Open modal on click
                            />
                        </div>
                    );
                })}
            </div>


            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
                    onClick={handleBackdropClick}
                >
                    <div className={`relative`}>
                        <button
                            className="absolute border-text-25 right-2 text-white text-2xl"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <img
                            src={`${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}${selectedPhoto}`}
                            alt={`Произошла ошибка при загрузке изображения`}
                            className="max-w-full max-h-full"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Gallery;