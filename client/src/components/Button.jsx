import React from 'react';

const Button = () => {
  return (
    <button className="bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transform transition-all duration-300 hover:translate-y-[-1px] hover:border-b-4 hover:border-blue-800 active:translate-y-0 active:border-b-2 active:border-blue-800">
      <span className="mr-2">Get started</span>
      <kbd className="bg-blue-600 text-white px-2 py-1 rounded-md shadow-inner">
        G
      </kbd>
    </button>
  );
};

export default Button;
