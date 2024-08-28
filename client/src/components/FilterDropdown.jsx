import React, { useState, useEffect } from 'react';
import useFetch from "../hooks/useFetch.jsx";

function FilterDropdown({ url, summary, type, filters, setFilters }) {
    const { data, loading, error } = useFetch(url);
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionChange = (event) => {
        const { value, checked } = event.target;
        setFilters((prevFilters) => {
            const updatedOptions = checked
                ? [...prevFilters[type], value]
                : prevFilters[type].filter((option) => option !== value);
            return { ...prevFilters, [type]: updatedOptions };
        });
    };

    const handleDropdownClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-40 md:w-48">
            <div className="relative inline-block text-left w-full">
                <button
                    type="button"
                    className="flex justify-between w-full gap-x-1.5 rounded-md bg-background px-3 py-2 text-sm font-semibold text-text-100 shadow-sm ring-1 ring-inset ring-background-150 hover:bg-background-125"
                    id="menu-button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={handleDropdownClick}
                >
                    {summary}
                    <svg
                        className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'scale-y-[-1]' : 'scale-y-1'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div
                    className="absolute w-40 md:w-48 z-10 mt-2 origin-top-right rounded-md bg-background drop-shadow-lg ring-1 ring-inset ring-background-150 ring-opacity-60 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <ul>
                        {data.map((item) => (
                            <li key={item.id}>
                                <label className="flex items-center text-sm px-4 py-2 text-text-100 hyphens-auto hover:cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={item.attributes.name}
                                        checked={filters[type].includes(item.attributes.name)}
                                        onChange={handleOptionChange}
                                        className="appearance-none w-3 h-3 shrink-0 border-2 border-text-25 bg-background rounded-sm
                    checked:bg-accent checked:border-0 transition duration-300
                    checked:scale-90 hover:scale-110 hover:cursor-pointer"
                                    />
                                    <span className="ml-2">{item.attributes.name}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default FilterDropdown;