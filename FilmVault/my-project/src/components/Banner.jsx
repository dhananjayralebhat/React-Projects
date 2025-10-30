import React from 'react';

function Banner() {
  return (
    <div
      className='h-[60vh] width-[75vh] bg-cover bg-center flex items-end'
      style={{
        backgroundImage: "url('https://wallpapercave.com/wp/wp13669831.jpg')"
      }}
    >
      <div className="text-white text-xl text-center w-full bg-gray-900/60 p-4">
        Lokiverse
      </div>
    </div>
  );
}

export default Banner;
