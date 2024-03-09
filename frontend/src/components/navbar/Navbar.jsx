import { ChevronDown, LogOut, Menu, Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog";
import Login from '@/pages/Login/Login';
import SignUp from '@/pages/SignUp/SignUp';
import { useAuthContext } from '@/context/context';
import useLogOut from '@/hooks/useLogOut';

const Navbar = () => {

    const { authUser } = useAuthContext();

    console.log(authUser);

    const { logout } = useLogOut()

    const [state, setState] = useState(false);
    const [isSignInClicked, setIsSignInClicked] = useState(false);

    const setSignIn = () => {
        setIsSignInClicked((prev) => (!prev))
    }


    return (
        <div>

            <nav className=" bg-white w-full border-b md:border-0">
                <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                    <div className="flex items-center justify-between py-3 md:py-3 md:block">
                        <a href="/">
                            <h1 className="text-3xl font-bold bg-gradient-to-br from-rose-300 via-violet-600 to-fuchsia-400 bg-clip-text text-transparent">FaceIN</h1>
                        </a>
                        <div className="md:hidden">
                            <button
                                className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                                onClick={() => setState(!state)}
                            >
                                <Menu />
                            </button>
                        </div>
                    </div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-2 md:block md:pb-0 md:mt-0 ${state ? "block" : "hidden"
                            }`}
                    >
                        {authUser && (
                            <ul className="justify-center items-center space-y-2 md:flex md:justify-end md:space-x-2 md:space-y-0">
                                <form className="flex items-center space-x-2 border-2 rounded-full p-2 ">
                                    <Search className="h-5 w-5 flex-none text-gray-300" />
                                    <input
                                        className="w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto"
                                        type="text"
                                        placeholder="Search"
                                    />
                                </form>

                                <Button onClick={logout} variant="outline" className="flex gap-2 hover:text-blue-700 text-indigo-600 font-semibold"><LogOut /> <span>Log Out</span></Button>

                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex items-center justify-between gap-4 hover:text-blue-700 text-indigo-600 hover:bg-gray-100 px-2 py-1 rounded-xl">
                                        <Avatar>
                                            <AvatarImage src={authUser.profilePic} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <span className='font-bold'>{authUser.username}</span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>My Account</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </ul>
                        )}

                        {!authUser && (
                            <ul className="justify-center items-center space-y-2 md:flex md:justify-end md:space-x-2 md:space-y-0">
                                <form className="flex items-center space-x-2 border-2 rounded-full p-2 ">
                                    <Search className="h-5 w-5 flex-none text-gray-300" />
                                    <input
                                        className="w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto"
                                        type="text"
                                        placeholder="Search"
                                    />
                                </form>

                                <Dialog className="">
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className='flex items-center justify-center cursor-pointer border-none'>
                                            Create account. <span className=' text-blue-700 font-semibold cursor-pointer ml-1'>It’s free!</span> <ChevronDown />
                                        </Button>
                                    </DialogTrigger>
                                    {!isSignInClicked ? (
                                        <Login setSignIn={setSignIn} />
                                    ) : (
                                        <SignUp setSignIn={setSignIn} />
                                    )}
                                </Dialog>

                            </ul>
                        )}

                    </div>
                </div>
            </nav>
            <div>
                <hr />
            </div>

        </div>
    )
}

export default Navbar
