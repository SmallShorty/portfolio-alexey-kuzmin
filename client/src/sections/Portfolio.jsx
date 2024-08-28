import React, {memo, useEffect, useState} from 'react';
import useInfiniteScrollFetch from "../hooks/useInfiniteScrollFetch.jsx";
import {Link} from "react-router-dom";
import ProjectCard from "../components/ProjectCard.jsx";
import FilterDropdown from "../components/FilterDropdown.jsx";
import {AnimatePresence, motion} from "framer-motion";
import Loading from "../components/Loading.jsx";

const ProjectsCollection = memo(({projects}) => (
    <div
        className="w-full px-10 mb-10 grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {projects.map((project) => (
            <motion.div key={project.id}
                        layout
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.5}}>
                <Link to={`/project/${project.id}`} target="_blank">
                    <ProjectCard {...project} />
                </Link>
            </motion.div>
        ))}
    </div>
));

function Portfolio() {
    const {
        data,
        loading,
        error,
    } = useInfiniteScrollFetch(`${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}/api/projects`, 6, {
        populate: ['cover', 'video', 'roles', 'genre'],
    })
    const [filters, setFilters] = useState({roles: [], genres: []});

    const filteredProjects = data.filter((project) => {
        const projectRoles = project.attributes.roles.data.map(role => role.attributes.name);
        const projectGenres = project.attributes.genre.data.attributes.name;

        return filters.roles.length === 0 && filters.genres.length === 0 || filters.roles.some(role => projectRoles.includes(role)) || filters.genres.some(genre => projectGenres.includes(genre));
    });

    return (
        <div id="projects">
            <motion.div className="flex flex-row justify-center p-5 space-x-2">
                <FilterDropdown
                    url={`${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}/api/role-enums`}
                    summary={'Моя должность'}
                    type="roles"
                    filters={filters}
                    setFilters={setFilters}
                />
                <FilterDropdown
                    url={`${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}/api/genre-enums`}
                    summary={'Жанры'}
                    type="genres"
                    filters={filters}
                    setFilters={setFilters}
                />
            </motion.div>

            <AnimatePresence>
                <ProjectsCollection projects={filteredProjects}/>
            </AnimatePresence>
            {loading && <Loading/>}
        </div>
    );
}

export default Portfolio;