import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router"
import Router from './Router.tsx'
import { Provider as ChakraUiProviderV3 } from './components/ui/provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraUiProviderV3>
        <RouterProvider router={Router} />
      </ChakraUiProviderV3>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
)
