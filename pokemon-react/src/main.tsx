import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import Root from './routes/root.tsx';
import ErrorComp from './components/ErrorComp.tsx';
import PokemonList from './components/PokemonList.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PokemonDetail } from './components/PokemonDetail.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorComp />,
    children: [
      {
        path: "pokemons",
        element: <PokemonList />,
      },
      {
        path: "pokemons/:id",
        element: <PokemonDetail />,
      },

    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
