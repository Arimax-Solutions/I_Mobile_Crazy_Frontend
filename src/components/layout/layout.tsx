import React from 'react';
import NavigationMenu from "../ui/navbar/navbar";
import { Outlet } from 'react-router-dom';

function Layout({ children }: any) {
    return (
        <div className="flex min-h-screen bg-[#14141E]">
            <div className="w-[10%]">
                <NavigationMenu />
            </div>
            <main
                className="w-[90%] flex-1 p-8 overflow-y-auto flex flex-col justify-start"
            >
                <div className="w-full max-w-full overflow-x-hidden">
                    <Outlet />
                </div>

            </main>
        </div>
    );
}

export default Layout;
