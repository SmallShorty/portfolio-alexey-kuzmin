import React, {useEffect, useState} from 'react';
import useFetch from "../hooks/useFetch.jsx";
import Loading from "../components/Loading.jsx";


function Documentation() {
    const {data, loading, error} = useFetch(`${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}/api/docs?populate=file`)
    const [currentDoc, setCurrentDoc] = useState('');
    const [selectedId, setSelectedId] = useState(null);


    const handleSelectDoc = (url, id) => {
        setCurrentDoc(url);
        setSelectedId(id);
    };

    return (
        <div id="docs" className="flex items-center justify-center">
            <div className="flex flex-col md:flex-row shadow-xl mb-10">
                <div className="w-80 overflow-y-auto bg-background-125">
                    <ul className="p-4 h-36 md:h-full">
                        {loading ? <Loading/> :
                            data.map(item => (
                                <li key={item.id}
                                    onClick={() => handleSelectDoc(`${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}${item.attributes.file.data[0].attributes.url}`,
                                    item.id)}
                                    role="button"
                                className={`p-2 font-semibold rounded shadow ${selectedId === item.id && 'bg-background-150 shadow-2xl'}`}>
                                    {item.attributes.title}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <iframe src={currentDoc}
                className="
                w-full sm:w-80 lg:w-[1000px] lg:max-w-[1000px] h-[600px]"></iframe>
            </div>
        </div>
    );
}

export default Documentation;