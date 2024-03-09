import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'

const Home = () => {

    const [isSignInClicked, setIsSignInClicked] = useState(true);

    const setSignIn = () => {
        setIsSignInClicked((prev) => (!prev))
    }


    return (

        <section className="bg-gradient-to-r from-fuchsia-600 to-purple-600 h-screen flex flex-col justify-center items-center text-center p-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">Welcome to Our Site!</h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white mt-4 md:mt-6 lg:mt-8">
                We provide the best services for you. SignUp and Join Now
            </p>
            <div className='flex gap-4'>
                <Dialog className="">
                    <DialogTrigger asChild>
                        <Button className="mt-8 text-white bg-gradient-to-br from-rose-300 via-violet-600 to-fuchsia-400 bg-clip-text border-white hover:text-pink" variant="outline">
                            Log In
                        </Button>
                    </DialogTrigger>
                    {/* <Login setSignIn={setSignIn} /> */}
                    {isSignInClicked ? (
                        <Login setSignIn={setSignIn} />
                    ) : (
                        <SignUp setSignIn={setSignIn} />
                    )}
                </Dialog>

                <Dialog className="">
                    <DialogTrigger asChild>
                        <Button className="mt-8 text-white bg-gradient-to-br from-rose-300 via-violet-600 to-fuchsia-400 bg-clip-text border-white hover:text-pink" variant="outline">
                            Sign Up
                        </Button>
                    </DialogTrigger>
                    {/* <SignUp setSignIn={setSignIn} /> */}
                    {!isSignInClicked ? (
                        <Login setSignIn={setSignIn} />
                    ) : (
                        <SignUp setSignIn={setSignIn} />
                    )}
                </Dialog>


            </div>
        </section>
    )
}

export default Home
