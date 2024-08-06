import React from 'react';
import NavigationMenu from "../ui/navbar/navbar";
import { Outlet } from 'react-router-dom';

function Layout({ children }: any) {
    return (
        <div className="flex min-h-screen bg-[#14141E]">
            <div className="w-full md:w-[25vw] lg:w-[20vw] xl:w-[15vw]">
                <NavigationMenu />
            </div>
            <main className="w-full max-w-[85%] flex-1 p-8 overflow-y-auto flex flex-col justify-start mx-auto">
                <div className="w-full overflow-x-hidden">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Layout;
