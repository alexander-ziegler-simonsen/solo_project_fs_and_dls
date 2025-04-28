import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router"
import Router from './Router.tsx'
import { Provider } from 'react-redux'
import Store from './Store.ts'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={Router} />
    </Provider>
  </StrictMode>,
)
