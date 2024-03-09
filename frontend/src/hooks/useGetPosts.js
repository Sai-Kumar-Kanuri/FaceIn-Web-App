import { useState, useEffect } from 'react';

const useGetPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading1, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const authToken = getCookie('jwt');

                const response = await fetch('/api/posts/all', {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Include the authentication token
                        // Add any additional headers if needed
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch posts');
                }

                setPosts(data.posts);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return { posts, loading1, error };
};

export default useGetPosts;

function getCookie(cookieName) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === cookieName) {
            return value;
        }
    }
    return null; // Cookie not found
}
