
import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Home;