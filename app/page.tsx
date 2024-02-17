"use client";

import Chat from "@/components/chat";
import SignupOptions from "@/components/signupOptions";
import { auth } from "@/lib/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function page() {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    if (!user) return ( <SignupOptions /> )

    return (
        <Chat user={user} />
    )
}
