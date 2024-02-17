"use client";

import React from "react";
import { Button } from "./ui/button";

export default function EmojiGrid({ setMessage }: {
    setMessage: React.Dispatch<React.SetStateAction<string>>
}) {

    return (
        <div className="grid grid-cols-6 items-start w-full gap-2 absolute bottom-[100%] bg-white">
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                😊
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                😋
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                🦄
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                🚀
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                😁
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                😌
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                🐶
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                🍕
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                😂
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                😍
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                🐱
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                🍔
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                😉
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                😜
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                🐼
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                🍦
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                😎
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                😇
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                🐯
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                🍭
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                😋
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                😘
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                🐨
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                🍩
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                😍
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                😊
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                🐰
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => setMessage(value => value + e.target.innerText)} >
                🍫
            </Button>
        </div>
    )
}
