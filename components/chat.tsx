"use client";

import { BsSend } from "react-icons/bs";
import { collection, addDoc, serverTimestamp, orderBy, query } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { auth, db } from "@/lib/firebase";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { cn } from "@/lib/utils";
import { chatDoc } from "@/lib/schema";
import { User, signOut } from "firebase/auth";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

export default function Chat({ user }: {
    user: User | null
}) {

    const form = useForm({
        defaultValues: {
            message: '',
        }
    });

    const chatMessagesRef = collection(db, 'chat');
    const Query = query(chatMessagesRef, orderBy('creationTime'));
    const [chatData]: [chatData: chatDoc[] | undefined] = useCollectionData(Query);
    const [isPending, startTransition] = useTransition();

    const handleFormSubmit = ({ message }: { message: string }) => {

        if (!user || isPending) return;

        if (message.trim().length > 1) {
            startTransition(async () => {
                const data: chatDoc = {
                    authorId: user.uid,
                    authorName: user.displayName as string,
                    content: message,
                    icon: user.photoURL as string,
                    creationTime: serverTimestamp() as any,
                    type: 'string',
                    fileUrl: null as any,
                };

                try {
                    await addDoc(collection(db, 'chat'), data);
                    form.reset();
                } catch (error) {
                    throw Error(error as string);
                }
            })
        }
    };

    return (
        <main className="bg-D9 w-full h-svh pt-3 px-4 pb-9 flex flex-col" >
            <section className="py-4 px-4 flex justify-between items-center" >
                <div className="w-12 h-12 border-4 bg-black rounded-full">
                    <img
                        src={user?.photoURL ?? ""}
                        className="w-full h-full rounded-full overflow-hidden"
                        alt="User Icon"
                    />
                </div>
                <Button onClick={() => signOut(auth)} >Log out</Button>
            </section>
            <section className="flex flex-1 flex-col gap-2 overflow-y-scroll py-4" >
                {chatData?.map((doc, index) => (
                    <div key={index} className={cn("max-w-[300px] bg-white p-2 rounded-br-3xl", {
                        'bg-blue-300 ml-auto rounded-br-none rounded-bl-3xl': doc.authorId === user?.uid
                    })} >
                        <div className="flex items-center gap-2" >
                            <div className="w-8 h-8 border-4 bg-black rounded-full">
                                <img
                                    src={doc.icon}
                                    className="w-full h-full rounded-full overflow-hidden"
                                    alt="User Icon"
                                />
                            </div>
                            <span className=" text-sm font-bold" >{doc.authorName}</span>
                            <span className=" text-xs font-semibold" >{doc.creationTime?.toDate().getFullYear()}-{doc.creationTime?.toDate().getMonth() + 1}-{doc.creationTime?.toDate().getDate()}</span>
                        </div>
                        <div>
                            {doc.content}
                            {doc.type === 'file' &&
                                <div className="mt-2 rounded-lg overflow-hidden" >
                                    <img
                                        src={doc.fileUrl ?? ""}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                ))}
            </section>
            <section className="bg-white rounded-t-none rounded-b-2xl relative" >
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className='flex flex-col gap-4 pb-2' >
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            className="placeholder:text-black font-semibold pt-4 min-h-[40px] border-none resize-none disabled:hidden"
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Write here ..."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size='icon' disabled={isPending} className="ml-auto mr-4 mt-[-1em]" >
                            <BsSend className={cn("w-6 h-6 cursor-pointer", { "fill-gray-500": isPending })} />
                        </Button>
                    </form>
                </Form>
            </section>
        </main>
    );
}
