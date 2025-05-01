import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router"
import Router from './Router.tsx'
import { Provider } from 'react-redux'
import { Store } from './redux/Store.ts'
import { Provider as ChrakaProvider } from './components/ui/provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={Store}>
      <ChrakaProvider>
        <RouterProvider router={Router} />
      </ChrakaProvider>
    </Provider>
  </StrictMode>,
)
