import React from 'react'
import { Outlet } from 'react-router'
import { Provider } from './components/ui/provider'
import orsLogo from './assets/ors-192x192.png'

function Layout() {
    return (
        <Provider>
            <div>
                <img src={orsLogo} className="logo" alt="Online Rizz Shop logo" />
                <h1>Online Rizz Shop</h1>
            </div>

            <Outlet />
        </Provider>
    )
}

export default Layout