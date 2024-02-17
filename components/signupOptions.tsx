"use client"

import { Button } from "./ui/button";
import { BsGoogle } from "react-icons/bs";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function SignupOptions() {

        const signInWithGoogle = async () => {
            const provider = new GoogleAuthProvider();
            try {
                await signInWithPopup(auth, provider);
            } catch (error) {
                console.error('Google Sign-In Error:', error);
            }
        };

        return (
            <main className=" h-svh bg-D9 flex items-center justify-center" >
                <div className="grid justify-items-center gap-4" >
                    <h2 className=" text-center text-2xl font-bold" >In order to be able to join the chat, you must signup</h2>
                    <Button className="flex gap-4 items-center" onClick={signInWithGoogle} >
                        <BsGoogle />
                        <p>Continue with Google</p>
                    </Button>
                </div>
            </main>
        )
    }
