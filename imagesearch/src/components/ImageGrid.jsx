// src/components/ImageGrid.jsx
import React from 'react';
import ImageCard from './ImageCard';

const ImageGrid = ({ images, loading }) => {
  if (loading && images.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if ((!images || images.length === 0) && !loading) {
    return <p className="text-center text-gray-500 mt-4">No images found. Try a different search term.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}

      {loading && (
        <div className="col-span-full flex justify-center items-center mt-4">
          <div className="loading-spinner">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
