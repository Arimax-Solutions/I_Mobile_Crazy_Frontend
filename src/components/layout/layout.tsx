import React from 'react';
import NavigationMenu from "../ui/navbar/navbar";
import { Outlet } from 'react-router-dom';

function Layout({ children }: any) {
    return (

        <div className="flex h-screen bg-[#14141E]">
            <NavigationMenu />
            <Outlet />
        </div>

    )
}

export default Layout;