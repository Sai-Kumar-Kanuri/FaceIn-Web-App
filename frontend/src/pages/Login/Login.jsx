import React, { useState } from 'react';
import {
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import useLogin from '@/hooks/useLogin';

// const Login = () => {
//     return (
//         <div>
//             <Dialog className="">
//                 <DialogTrigger asChild>
//                     <Button variant="outline" className='flex items-center justify-center cursor-pointer border-none'>
//                         Create account. <span className=' text-blue-700 font-semibold cursor-pointer ml-1'>It’s free!</span> <img src='/navbar/arrow.png' alt='arrow' />
//                     </Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-[750px] pt-0 px-0">
//                     <div className='bg-[#EFFFF4] py-4'>
//                         <p className='text-[#008A45] px-4'>
//                             Let's learn, share & inspire each other with our passion for computer engineering. Sign up now 🤘🏼
//                         </p>
//                     </div>
//                     <DialogHeader className="px-6">

//                         <div className='flex items-center justify-between px-4'>
//                             <h1 className='text-2xl font-bold'>Create Account </h1>

//                             <p>Don’t have an account yet? <a className=' cursor-pointer font-semibold text-[#2F6CE5]'>Create new for free! </a> </p>
//                         </div>


//                     </DialogHeader>
//                     <div className='flex px-6'>
//                         <div className='w-1/2 p-4'>
//                             <form>

//                                 <Input id="username" type="text" placeholder="Username" className="col-span-3 w-full rounded-sm" />
//                                 <Input id="password" type="password" placeholder="Password" className="col-span-3 w-full rounded-sm" />

//                                 <Button
//                                     className="w-full rounded-full my-6 bg-[#2F6CE5] text-white hover:bg-blue-700 hover:text-white"
//                                     variant="outline"
//                                     size="lg"
//                                 >
//                                     Create Account
//                                 </Button>
//                             </form>

//                             <div className='flex flex-col gap-2'>
//                                 <Button
//                                     className="w-full flex items-center justify-center gap-4"
//                                     variant="outline"
//                                     size="lg"
//                                 >
//                                     <FaFacebook className='text-blue-700' size={24} />
//                                     Sign up with Facebook
//                                 </Button>
//                                 <Button
//                                     className="w-full flex items-center justify-center gap-4"
//                                     variant="outline"
//                                     size="lg"
//                                 >
//                                     <FcGoogle size={24} />
//                                     Sign up with Google
//                                 </Button>
//                             </div>
//                         </div>

//                         <div>
//                             <img src="/auth/img1.png" alt="bg-image" />
//                         </div>
//                     </div>

//                 </DialogContent>

//             </Dialog>

//         </div>
//     )
// }

const Login = ({ setSignIn }) => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const { login, loading } = useLogin();

    const handleSigIn = async (e) => {
        e.preventDefault();
        await login({ username, password })
    }

    return (
        <>
            <DialogContent className="sm:max-w-[750px] pt-0 px-0">
                <div className='bg-[#EFFFF4] py-4'>
                    <p className='text-[#008A45] px-4'>
                        Helps you connect and share with the people in your life. Sign up now 🤘🏼
                    </p>
                </div>
                <DialogHeader className="px-6">

                    <div className='flex items-center justify-between px-4'>
                        <h1 className='text-2xl font-bold'>Sign In  </h1>

                        <p>Don’t have an account yet? <a onClick={setSignIn} className=' cursor-pointer font-semibold text-[#2F6CE5]'>Create new for free! </a> </p>
                    </div>

                </DialogHeader>
                <div className='flex px-6'>
                    <div className='w-1/2 p-4'>
                        <form onSubmit={handleSigIn}>

                            <Input
                                id="username"
                                type="text"
                                placeholder="Username"
                                className="col-span-3 w-full rounded-sm"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                className="col-span-3 w-full rounded-sm"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button
                                className="w-full rounded-full my-6 bg-[#2F6CE5] text-white hover:bg-blue-700 hover:text-white"
                                variant="outline"
                                size="lg"

                            >
                                Sign In
                            </Button>
                        </form>

                        <div className='flex flex-col gap-2'>
                            <Button
                                className="w-full flex items-center justify-center gap-4"
                                variant="outline"
                                size="lg"
                            >
                                <FaFacebook className='text-blue-700' size={24} />
                                Sign up with Facebook
                            </Button>
                            <Button
                                className="w-full flex items-center justify-center gap-4"
                                variant="outline"
                                size="lg"
                            >
                                <FcGoogle size={24} />
                                Sign up with Google
                            </Button>
                        </div>
                    </div>

                    <div>
                        <img src="/auth/img1.png" alt="bg-image" />
                    </div>
                </div>

            </DialogContent>

        </>

    )
}

export default Login
