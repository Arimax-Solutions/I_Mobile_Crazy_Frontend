import React from 'react';
import NavigationMenu from "../ui/navbar/navbar";
import { Outlet } from 'react-router-dom';

function Layout({ children }: any) {
    return (
        <div className="flex min-h-screen bg-[#14141E]">
            <NavigationMenu />
            <main
                style={{
                    flex: 1,
                    padding: '20px 300px',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                }}
                className="flex-1 overflow-auto"
            >
                <div style={{ width: '1750px', maxWidth: '1750px' }}>
                    <Outlet />
                </div>
            </main>
        </div>

    )
}

export default Layout;