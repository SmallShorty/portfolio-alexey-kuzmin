import { useState, useEffect } from 'react';
import axios from 'axios';

const useInfiniteScrollFetch = (url, itemsPerPage = 10, params = {}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [pagination, setPagination] = useState({
        start: 0,
        limit: itemsPerPage,
        total: 0
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${url}?pagination[start]=${pagination.start}&pagination[limit]=${itemsPerPage || pagination.limit}`, {
                params: {
                    ...params,
                },
            });
            setData([...data, ...response.data.data]);
            setPagination({
                start: response.data.meta.pagination.start + itemsPerPage,
                total: response.data.meta.pagination.total
            })

            setHasMore(pagination.start + itemsPerPage <= response.data.meta.pagination.total)
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const scrollHandler = () => {
        if (hasMore && !loading) {
            const scrollPosition = window.scrollY + window.innerHeight;
            const contentHeight = document.body.offsetHeight;
            if (scrollPosition >= contentHeight - 200) {
                fetchData();
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, [hasMore, loading]);

    return { data, loading, error };
};

export default useInfiniteScrollFetch;