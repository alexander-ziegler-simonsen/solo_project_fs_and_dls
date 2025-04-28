import React from 'react'
import { Outlet } from 'react-router'
import { Provider } from './components/ui/provider'
import orsLogo from './assets/ors-192x192.png'

function Layout() {
    return (
        <Provider>
            <div id="header">
                <h1>Online Rizz Shop</h1> <img src={orsLogo} width={50} className="logo" alt="Online Rizz Shop logo" />
            </div>

            <div id="main">
                <Outlet />
            </div>

            <div id="footer">
                <p>this website is copyrighted by me, do not steal..... I will know if you did.</p>
            </div>
        </Provider >
    )
}

export default Layout