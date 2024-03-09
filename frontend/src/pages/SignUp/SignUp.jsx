import React, { useState } from 'react';
import {
    DialogContent,
    DialogHeader,
    DialogFooter
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import useSignup from '@/hooks/useSignup';


const SignUp = ({ setSignIn }) => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { signup, loading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs)
    }
    return (
        <>

            <DialogContent className="sm:max-w-[750px] pt-0 px-0">
                <div className='bg-[#EFFFF4] py-4'>
                    <p className='text-[#008A45] px-4'>
                        Let's learn, share & inspire each other with our passion for computer engineering. Sign up now 🤘🏼
                    </p>
                </div>
                <DialogHeader className="px-6">

                    <div className='flex items-center justify-between px-4'>
                        <h1 className='text-2xl font-bold'>Create Account </h1>

                        <p>Already have an account? <a onClick={setSignIn} className=' cursor-pointer font-semibold text-[#2F6CE5]'>Sign In</a> </p>
                    </div>


                </DialogHeader>
                <div className='flex px-6'>
                    <div className='w-1/2 p-4'>
                        <form onSubmit={handleSubmit}>

                            {/* <Input
                                type="text"
                                placeholder="Full Name"
                                className="col-span-3 w-full rounded-sm"
                                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                            /> */}
                            <Input
                                type="text"
                                placeholder="Username"
                                className="col-span-3 w-full rounded-sm"
                                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                            />
                            <Input
                                type="email"
                                placeholder="Email"
                                className="col-span-3 w-full rounded-sm"
                                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                className="col-span-3 w-full rounded-sm"
                                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                            />
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                className="col-span-3 w-full rounded-sm"
                                onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                            />

                            <Button
                                type="submit"
                                className="w-full rounded-full my-6 bg-[#2F6CE5] text-white hover:bg-blue-700 hover:text-white"
                                variant="outline"
                                size="lg"
                            >
                                Create Account
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
                <DialogFooter className="px-6 pb-6 text-xs">
                    <p>By signing up, you agree to our Terms & conditions, Privacy policy</p>
                </DialogFooter>

            </DialogContent>




        </>
    )
}

export default SignUp
