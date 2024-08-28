import React from 'react';

function ContactIcon({data, icon: Icon}) {
    const [copied, setCopied] = React.useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(data);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    return (
        <div onClick={handleCopy}
             className="relative flex justify-center drop-shadow-md cursor-pointer hover:scale-105 transform transition duration-500">
            <div
                className="absolute top-2 left-2 h-32 md:h-48 aspect-square rounded-tl-lg rounded-br-lg flex justify-center items-center bg-accent z-[-1]"></div>
            <div className="h-32 md:h-48 aspect-square rounded-tl-lg rounded-br-lg flex flex-col justify-center items-center bg-background border-[3px] border-accent
            hover:bg-background-110
            active:bg-background-125">
                <Icon size={60}/>
                <span className="text-sm md:text-base">{copied ? "Скопированно!" : data}</span>
            </div>
        </div>
    );
}

export default ContactIcon;