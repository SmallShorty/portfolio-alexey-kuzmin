import React, {useEffect, useState} from 'react';
import {MdLocalPhone, MdOutlineMailOutline} from "react-icons/md";
import ContactIcon from "../components/ContactIcon.jsx";
import axios from "axios";
import SocialMediaIcon from "../components/SocialMediaIcon.jsx";
import {motion} from "framer-motion";

function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [socialMedias, setSocialMedias] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch contacts
                const contactsResponse = await axios.get(`${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}/api/contact`);
                setContacts(contactsResponse.data);

                // Fetch social media data
                const socialMediasResponse = await axios.get(`${import.meta.env.VITE_PUBLIC_STRAPI_API_URL}/api/social-medias?populate=icon`);
                setSocialMedias(socialMediasResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <motion.footer id="contacts"
                       layout
                       className="p-5 md:px-40 md:py-10 w-full flex items-center justify-between border-t-2 border-b-2 border-text-25">
            <div className="space-y-3">
                <span className="text-3xl font-bold tracking-wide">Связаться со мной</span>
                <div className="flex flex-row gap-2">
                    {socialMedias.data?.map((item, index) => (
                        <SocialMediaIcon key={index} data={item}/>
                    ))}
                </div>
            </div>
            <div className="flex gap-8 flex-col md:flex-row items-center">
                <ContactIcon data={contacts.data?.attributes.phone} icon={MdLocalPhone}
                             className="flex items-center text-xl"/>
                <ContactIcon data={contacts.data?.attributes.phone} icon={MdOutlineMailOutline}
                             className="flex items-center text-xl"/>
            </div>
        </motion.footer>

    );
}

export default Contacts;
