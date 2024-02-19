"use client";

import { useState, useEffect, useRef } from 'react';
import { chatDoc, reactionDoc } from '@/lib/schema';
import { LikeEmoji, HeartEmoji, LaughingEmoji, Surprisedemojid, AngryEmoji } from './emoji';
import { cn } from '@/lib/utils';
import { User } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query, serverTimestamp, doc as _doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { BsEmojiSmile } from 'react-icons/bs';

export default function ChatMessage({ doc, user }: {
    doc: chatDoc,
    user: User | null
}) {

    const messageReactions = collection(db, 'chat', doc.id, 'reactions');
    const Query = query(messageReactions, orderBy('creationTime'));
    const [reactions, setReactions] = useState<reactionDoc[] | undefined>(undefined);
    const messageRef = useRef<HTMLDivElement | null>(null);
    const [showReactions, setShowReactions] = useState(false);

    const toggleReactions = () => {
        setShowReactions(!showReactions);
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(Query, (snapshot) => {
            const data: any = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setReactions(data);
        });

        return () => {
            unsubscribe();
        };
    }, [doc.id]);

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (messageRef.current && !messageRef.current.contains(event.target)) {
                setShowReactions(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const addReaction = async ({ type }: { type: number }) => {
        const data = {
            by: user?.displayName,
            creationTime: serverTimestamp(),
            type
        };

        try {
            const reactionDocRef = _doc(collection(db, 'chat', doc.id, 'reactions'), user?.uid);
            await setDoc(reactionDocRef, data);
        } catch (error) {
            console.error(error);
        }
    };

    const removeReaction = async () => {
        try {
            const reactionDocRef = _doc(collection(db, 'chat', doc.id, 'reactions'), user?.uid);
            await deleteDoc(reactionDocRef);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div ref={messageRef} className={cn("max-w-[300px] bg-white p-2 pb-6 rounded-br-3xl", {
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
            <div className="relative" >
                {doc.content}
                {doc.type === 'file' &&
                    <div className="mt-2 rounded-lg overflow-hidden" >
                        <img
                            src={doc.fileUrl ?? ""}
                        />
                    </div>
                }
                <div className="absolute bottom-[-20px] right-0" >
                    {
                        reactions && reactions.filter(reaction => reaction.id === user?.uid).map((reaction, index) => {

                            if (reaction) {
                                if (reaction.type === 0) {
                                    return <LikeEmoji key={index} subClassName='w-6 h-6 cursor-pointer' className='scale-[1.5]' onClick={removeReaction} />
                                }
                                if (reaction.type === 1) {
                                    return <HeartEmoji key={index} subClassName='w-6 h-6 cursor-pointer' className='scale-[1.5]' onClick={removeReaction} />
                                }
                                if (reaction.type === 2) {
                                    return <LaughingEmoji key={index} subClassName='w-6 h-6 cursor-pointer' className='scale-[1.5]' onClick={removeReaction} />
                                }
                                if (reaction.type === 3) {
                                    return <Surprisedemojid key={index} subClassName='w-6 h-6 cursor-pointer' className='scale-[1.5]' onClick={removeReaction} />
                                }
                                if (reaction.type === 4) {
                                    return <AngryEmoji key={index} subClassName='w-6 h-6 cursor-pointer' className='scale-[1.5]' onClick={removeReaction} />
                                }
                            }

                            return <BsEmojiSmile className="cursor-pointer" onClick={toggleReactions} key={index} />
                        })
                    }
                    {(!reactions || !reactions.length) && <BsEmojiSmile className="cursor-pointer" onClick={toggleReactions} />}
                    <div className={cn("absolute hidden gap-4 right-0 bg-white top-[16px] py-2 px-3 rounded-lg", {
                        'flex': showReactions
                    })} >
                        <LikeEmoji subClassName="cursor-pointer w-8 h-8" className='scale-[2]' onClick={() => addReaction({ type: 0 })} />
                        <HeartEmoji subClassName="cursor-pointer w-8 h-8" className='scale-[2]' onClick={() => addReaction({ type: 1 })} />
                        <LaughingEmoji subClassName="cursor-pointer w-8 h-8" className='scale-[2]' onClick={() => addReaction({ type: 2 })} />
                        <Surprisedemojid subClassName="cursor-pointer w-8 h-8" className='scale-[2]' onClick={() => addReaction({ type: 3 })} />
                        <AngryEmoji subClassName="cursor-pointer w-8 h-8" className='scale-[2]' onClick={() => addReaction({ type: 4 })} />
                    </div>
                </div>
                <div className=' absolute flex gap-1 bottom-[-25px]' >
                    {
                        reactions && reactions.map((reaction, index) => {
                            if (reaction.type === 0) {
                                const reacts = reactions.filter(reaction => reaction.type === 0);

                                return (
                                    <span className='flex font-semibold text-sm cursor-pointer relative group' key={index} >
                                        <LikeEmoji subClassName='w-6 h-6' /> {reacts.length > 99 ? '99++' : reacts.length}
                                        <span className=' absolute text-nowrap text-sm bg-black text-white py-1 px-2 rounded-lg opacity-75 bottom-[-32px] left-0 hidden group-hover:grid' >
                                            {reacts.slice(0, 5).map((react, index) => (
                                                <span key={index}>{react.by}</span>
                                            ))}
                                            {reacts.length > 5 && (
                                                <span>and {reacts.length - 5} more</span>
                                            )}
                                        </span>
                                    </span>
                                )
                            }
                            if (reaction.type === 1) {
                                const reacts = reactions.filter(reaction => reaction.type === 1);

                                return (
                                    <span className='flex font-semibold text-sm cursor-pointer relative group' key={index} >
                                        <HeartEmoji subClassName='w-6 h-6' /> {reacts.length > 99 ? '99++' : reacts.length}
                                        <span className=' absolute text-nowrap text-sm bg-black text-white py-1 px-2 rounded-lg opacity-75 bottom-[-32px] left-0 hidden group-hover:grid' >
                                            {
                                                reacts.map((react, index) => (
                                                    <span key={index} >{react.by}</span>
                                                ))
                                            }
                                        </span>
                                    </span>
                                )
                            }
                            if (reaction.type === 2) {
                                const reacts = reactions.filter(reaction => reaction.type === 2);

                                return (
                                    <span className='flex font-semibold text-sm cursor-pointer relative group' key={index} >
                                        <LaughingEmoji subClassName='w-6 h-6' /> {reacts.length > 99 ? '99++' : reacts.length}
                                        <span className=' absolute text-nowrap text-sm bg-black text-white py-1 px-2 rounded-lg opacity-75 bottom-[-32px] left-0 hidden group-hover:grid' >
                                            {
                                                reacts.map((react, index) => (
                                                    <span key={index} >{react.by}</span>
                                                ))
                                            }
                                        </span>
                                    </span>
                                )
                            }
                            if (reaction.type === 3) {
                                const reacts = reactions.filter(reaction => reaction.type === 3);

                                return (
                                    <span className='flex font-semibold text-sm cursor-pointer relative group' key={index} >
                                        <Surprisedemojid subClassName='w-6 h-6' /> {reacts.length > 99 ? '99++' : reacts.length}
                                        <span className=' absolute text-nowrap text-sm bg-black text-white py-1 px-2 rounded-lg opacity-75 bottom-[-32px] left-0 hidden group-hover:grid' >
                                            {
                                                reacts.map((react, index) => (
                                                    <span key={index} >{react.by}</span>
                                                ))
                                            }
                                        </span>
                                    </span>
                                )
                            }
                            if (reaction.type === 4) {
                                const reacts = reactions.filter(reaction => reaction.type === 4);

                                return (
                                    <span className='flex font-semibold text-sm cursor-pointer relative group' key={index} >
                                        <AngryEmoji subClassName='w-6 h-6' /> {reacts.length > 99 ? '99++' : reacts.length}
                                        <span className=' absolute text-nowrap text-sm bg-black text-white py-1 px-2 rounded-lg opacity-75 bottom-[-32px] left-0 hidden group-hover:grid' >
                                            {
                                                reacts.map((react, index) => (
                                                    <span key={index} >{react.by}</span>
                                                ))
                                            }
                                        </span>
                                    </span>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}
