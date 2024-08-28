import React, {createRef, useEffect, useState} from 'react';
import {HiMenu} from "react-icons/hi";
import {AiOutlineClose} from "react-icons/ai";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const menuItems = [
        ['Главная', 'home'],
        ['О себе', 'about'],
        ['Проекты', 'projects'],
        ['Документация', 'docs'],
        ['Контакты', 'contacts']
    ];

    const handleScroll = () => {
        const newScrollYPosition = window.scrollY;
        setScrollPosition(newScrollYPosition);
    };

    const scrollToSelection = (id) => {
        setIsOpen(false);
        const anchor = document.querySelector(`#${id}`)
        if (anchor) {
            anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    };

    const toggleNavbar = () => {
        setIsOpen((prevState) => !prevState);
        document.body.style.overflow = isOpen ? 'scroll' : 'hidden';
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={`fixed justify-end top-0 right-0 z-50 flex items-center text-text`}>
            <ul className={`hidden text-lg tracking-wide px-10 md:flex transition-all duration-500 ease-in-out
             ${scrollPosition > 10 ? "bg-background-110 py-5 shadow-xl" : "py-2"}`}
            >
                {menuItems.map(([label, id], index) => (
                    <li onClick={() => scrollToSelection(id)} key={index}
                        className={`px-4 text-text font-semibold transition-colors duration-300 ease-in-out
                        hover:text-accent hover:cursor-pointer`}>
                        {label}
                    </li>
                ))}
            </ul>
            <div onClick={toggleNavbar} className="block z-20 m-5 md:hidden">
                {isOpen ?  <AiOutlineClose size={30}/> : <HiMenu size={30}/>}
            </div>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-10" onClick={toggleNavbar}></div>
            )}
            <div className={`fixed top-0 left-0 w-[60%] h-full bg-background text-text-100 z-20 p-4 transition-all duration-500 ease-in-out ${isOpen ? '' : 'translate-x-[-100%]'}`}>
                <ul className="space-y-2 text-lg font-semibold">
                    {menuItems.map(([label, id], index) => (
                        <React.Fragment key={index}>
                            <li onClick={() => {
                                toggleNavbar();
                                scrollToSelection(id);
                            }}
                                className={`text-text transition-colors duration-300 ease-in-out
            active:text-accent`}>
                                {label}
                            </li>
                            {index === menuItems.length - 2 && (
                                <div className="bg-background-150 w-full h-1 rounded-full"></div>
                            )}
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Navbar;