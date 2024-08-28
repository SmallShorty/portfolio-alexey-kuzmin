import React from 'react';
import Navbar from "../components/Navbar.jsx";
import {About, Contacts, Documentation, Hero, Portfolio} from "../sections/_index.js";
import {LayoutGroup} from "framer-motion";

function Home() {
    return (
        <>
            <Navbar/>
            <LayoutGroup>
                <Hero id="home"/>
                <About  id="about"/>
                <Portfolio id="projects"/>
                <Documentation id="docs"/>
                <Contacts id="contacts"/>
            </LayoutGroup>

        </>
    );
}

export default Home;