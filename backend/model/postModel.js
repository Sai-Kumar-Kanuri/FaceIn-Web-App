import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String, // or use { data: Buffer, contentType: String } for binary image data
            // required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
        }
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
