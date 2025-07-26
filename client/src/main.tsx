import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router"
import Router from './Router.tsx'
import { Provider as ChrakaProvider } from './components/ui/provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ChrakaProvider>
        <RouterProvider router={Router} />
      </ChrakaProvider>
  </StrictMode>,
)
