"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function FilePreview({ file, setFile }: {
    file: File | null,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
}) {

    const [imageSrc, setImageSrc] = useState(null);

    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className="h-64 w-full flex absolute bottom-[100%] bg-white" >
            <img 
                src={imageSrc ?? ''}
                className="h-60 w-[80%] max-w-[390px] my-2 mx-2 rounded-md object-contain" 
            />
            <X className='w-8 h-8' onClick={() => setFile(null)} />
        </div>
    )
}
