import React from 'react';
import Layout from "./layout/layout";
import TopNavbar from './TopNavbar';

function Home(){
    return (
        <div className='m-4'>
            <TopNavbar />
            <p className='text-white'>Home page</p>
        </div>
            
    );
}

export default Home;