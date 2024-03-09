// import { useAuthContext } from '@/context/context';
import { uploadImage } from '@/firebase/firebase';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useCreatePost = () => {

    const [loading, setLoading] = useState(false);

    // const { setAuthUser } = useAuthContext()

    const createpost = async ({ title, content, image }) => {

        const success = handleInputErrors(title, content);

        if (!success) {
            return;
        }

        setLoading(true);

        try {
            let imageUrl = '';
            if (image) {
                imageUrl = await uploadImage(image);
            }

            console.log(imageUrl);

            const authToken = getCookie('jwt');

            const response = await fetch('/api/posts/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`, // Include the authentication token
                    // Add any additional headers if needed
                },
                body: JSON.stringify({
                    title,
                    content,
                    image: imageUrl,
                }),
            });

            if (response.ok) {
                // Perform any additional actions upon successful post creation
                toast.success('Post created successfully!');
            } else {
                // Handle API error
                const errorData = await response.json();
                console.error('Error creating post:', errorData.error || 'Unknown error');
                toast.error('An error occurred while creating the post. Please try again.');
            }

        } catch (error) {
            console.error('Error creating post:', error.message);
            toast.error('An error occurred while creating the post. Please try again.');

        } finally {
            setLoading(false);
        }

    }

    return { createpost, loading };
}

export default useCreatePost;


function handleInputErrors(title, content) {
    if (!title || !content) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}

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