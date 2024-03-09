import Post from "../model/postModel.js";

export const createPost = async (req, res) => {

    try {
        const { title, content, image } = req.body;
        const author = req.user._id;



        const newPost = new Post({
            title,
            content,
            image,
            author
        });

        const savedPost = await newPost.save();

        if (!savedPost) {
            return res.status(500).json({ success: false, error: "Failed to save the post" });
        }

        res.status(201).json({ success: true, post: savedPost });

    } catch (error) {
        console.log("Hello world");
        console.log("Error in Create Post controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "_id username profilePic email");
        // const posts = await Post.find().populate("author");


        return res.status(200).json({ success: true, posts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Failed to fetch posts" });
    }
};