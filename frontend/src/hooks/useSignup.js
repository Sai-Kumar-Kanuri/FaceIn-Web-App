import { useAuthContext } from "@/context/context";
import { useState } from "react"
import toast from "react-hot-toast";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const signup = async ({ email, username, password, confirmPassword }) => {
        const success = handleInputErrors({ email, username, password, confirmPassword });
        if (!success) {
            return;
        }

        setLoading(true);

        try {

            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, username, password, confirmPassword })
            })

            const data = await res.json();

            if (data.error) {
                toast.error("User already exists");
                throw new Error(data.error)
            }

            localStorage.setItem("user-info", JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {

        } finally {
            setLoading(false);
        }


    }

    return { loading, signup }
}

export default useSignup;


function handleInputErrors({ email, username, password, confirmPassword }) {
    if (!email || !username || !password || !confirmPassword) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }


    return true;
}