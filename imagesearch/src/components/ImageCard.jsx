import React, { useEffect, useState } from 'react'
import ImageModel from "./ImageModel"

const ImageCard = ({image}) => {
  const [isModelOpen, setIsModelOpen] = useState(false);

  useEffect(() => {
    const preload = new Image();
    preload.src = image.src.large;
  },[image.src.large]);

  const handleCloseModel = () => {
    setIsModelOpen(false);
  }

  const handleViewOriginal = () => {
    window.open(image.url, "_blank");
    setIsModelOpen(false);
  }

  return (
   <>
    <div onClick={()=>setIsModelOpen(true)} className='bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105'>
        <img src={image.src.medium} alt={image.alt || "pexels image"} className='w-full h-48 object-cover'/>
      
    </div>
    <ImageModel handleViewOriginal={handleViewOriginal} image={image} isOpen={isModelOpen} onClose={handleCloseModel}/>
   </>
  )
}

export default ImageCard
