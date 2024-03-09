import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from 'react';
import useCreatePost from "@/hooks/useCreatePost";
import useGetPosts from "@/hooks/useGetPosts";
import { differenceInMinutes, formatDistanceToNow } from 'date-fns';




const Posts = () => {

  const { loading, createpost } = useCreatePost();
  const { loading1, posts, error } = useGetPosts();

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    image: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setInputs({ ...inputs, image: file });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    createpost(inputs);

    setInputs({ inputs, title: "", content: "", image: null })
  }

  const getTimeAgo = (createdAt) => {
    const minutesAgo = differenceInMinutes(new Date(), new Date(createdAt));

    // Use formatDistanceToNow for a human-readable format
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  };

  return (
    <section className='bg-gradient-to-r from-fuchsia-600 to-purple-600 min-h-screen flex flex-col justify-center items-center p-4'>

      <Card className="min-w-screen md:min-w-[40%] mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:h-full m-3">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              Welcome!, Whats's On Your Mind....
            </div>
          </CardTitle>

        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="Title">Title</Label>
            <Input
              onChange={(e) => (setInputs({ ...inputs, title: e.target.value }))}
              type="text" id="text"
              value={inputs.title}
              placeholder="Title"
              className="mb-2"
            />
            <Label htmlFor="picture">Add to Your Post</Label>
            <Input
              id="picture"
              type="file"
              className="mb-4"
              onChange={handleFileChange}
            />

            <Textarea
              className="focus-visible:ring-transparent"
              placeholder="Type your message here."
              value={inputs.content}
              onChange={(e) => setInputs({ ...inputs, content: e.target.value })}
            />

            <Button
              type="submit"
              variant="outline"
              className="bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white hover:text-white mt-4">
              Post
            </Button>
          </form>
        </CardContent>

      </Card>

      {posts.map((post, index) => (
        <Card
          key={index}
          className=" min-w-screen md:min-w-[40%] mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:h-full m-3"

        >
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <span className="object-cover md:w-48 rounded-md bg-muted w-[192px] h-[192px]" />
            </div>
            <div className="p-8 m-2 w-full">
              <div className="flex items-center">
                <img
                  alt="Profile picture"
                  className="rounded-full"
                  height="40"
                  src={post.author.profilePic}
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width="40"
                />
                <div className="ml-4">
                  <div className=" capitalize tracking-wide text-sm text-black dark:text-white font-semibold">
                    {post.author.username}
                  </div>
                  <div className="text-gray-400 dark:text-gray-300">@{post.author.email}</div>
                </div>
              </div>

              <p className="mt-4 text-left mb-2 text-gray-500 dark:text-gray-300">
                {post.content}
              </p>
              {post.image !== "" && (
                <img
                  src={post.image}
                  className='h-full w-full rounded-sm '
                  alt='post'
                  style={{ height: '400px', width: '400px' }}
                />
              )}
              <div className="flex mt-6 justify-between items-center">
                <div className="flex space-x-2 text-gray-400 dark:text-gray-300">
                  <div className="flex items-center">
                    <HeartIcon className="h-6 w-6 text-red-500" />
                    <span className="ml-1 text-red-500">566</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircleIcon className="h-6 w-6 text-green-500" />
                    <span className="ml-1 text-green-500">241</span>
                  </div>
                  <div className="flex items-center">
                    <RepeatIcon className="h-6 w-6 text-blue-500" />
                    <span className="ml-1 text-blue-500">487</span>
                  </div>
                </div>
                <div className="text-gray-400 dark:text-gray-300 hidden md:block ">{getTimeAgo(post.createdAt)}</div>
              </div>
            </div>
          </div>
        </Card>
      ))}



    </section>
  )
}

export default Posts


function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}


function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
    </svg>
  )
}


function RepeatIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  )
}