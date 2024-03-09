import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenandSetCookie from "../utils/generateToken.js";

export const SignUp = async (req, res) => {

    try {
        const { email, username, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don' match" })
        }

        const user = await User.findOne({ username });

        if (user) {
           return res.status(200).json({ error: "User already Exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // const profilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const profilePic = `https://avatar.iran.liara.run/username?username=${username}`;

        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            profilePic: profilePic,
        })

        console.log(newUser);

        if (newUser) {
            generateTokenandSetCookie(newUser._id, res)

            newUser.save();

            return res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: "Invalid User Data" })
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const Login = async (req, res) => {
    try {

        const { username, password } = req.body;

        const user = await User.findOne({ username });

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenandSetCookie(user._id, res);

        return res.status(200).json({
            _id: user._id,
            email: user.email,
            username: user.username,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const Logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}