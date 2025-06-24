import React from 'react';
import logo from '../../assets/logo.png'; // Adjust the path as necessary

const Logo = () => {
    return (
        <div className='flex items-center justify-center'>
            <img src={logo} alt="" />
            <h1 className='text-3xl -ml-2 font-extrabold'>GoFast</h1>
        </div>
    );
};

export default Logo;