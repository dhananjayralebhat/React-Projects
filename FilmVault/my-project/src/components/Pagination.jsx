import React from 'react';

function Pagination({ handlePrev, handleForw, pageNo }) { // props destructured
  return (
    <div className="bg-gray-400 p-4 mt-8 flex justify-center items-center space-x-8">
      <div onClick={handlePrev} className="px-8 cursor-pointer" role="button" tabIndex={0} onKeyPress={handlePrev}>
        <i className="fa-solid fa-arrow-left"></i>
      </div>
      <div className="font-bold">{pageNo}</div>
      <div onClick={handleForw} className="px-8 cursor-pointer" role="button" tabIndex={0} onKeyPress={handleForw}>
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
}

export default Pagination;
