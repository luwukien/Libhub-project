import React, { useState, useRef, useEffect } from 'react';
import { FaRegFileImage } from 'react-icons/fa6';
import { MdDeleteOutline } from 'react-icons/md';

const ImageSelector = ({ image, setImage, handleDeleteImg }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setImageUrl("");
        }
    };

    const handleUrlChange = (event) => {
        const url = event.target.value;
        setImageUrl(url);
        setImage(url);
        setPreviewUrl(url);
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
        setImageUrl("");
        handleDeleteImg();
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    useEffect(() => {
        if (typeof image === "string") {
            setPreviewUrl(image);
        } else if (image) {
            setPreviewUrl(URL.createObjectURL(image));
        } else {
            setPreviewUrl(null);
        }
        return () => {
            if (previewUrl && typeof previewUrl !== "string") {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [image]);

    return (
        <div className="flex flex-col gap-3">
            <input
                type="text"
                className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={handleUrlChange}
            />

            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!previewUrl ? (
                <button
                    className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50"
                    onClick={onChooseFile}
                >
                    <FaRegFileImage className="text-xl text-black" />
                    <p className="text-sm text-slate-500">Browse Image</p>
                </button>
            ) : (
                <div className="w-full relative">
                    <img src={previewUrl} alt="Selected" className="w-full h-[300px] object-cover rounded-lg" />
                    <button className="btn-small btn-delete absolute top-2 right-2" onClick={handleRemoveImage}>
                        <MdDeleteOutline className="text-lg" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageSelector;
