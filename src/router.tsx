import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./components/layouts/AppLayout";
import { AuthorizedLayout } from "./components/layouts/AuthorizedLayout";
import { AuthRoute } from "./routes/auth";
import { AppRoute } from "./routes";
import { CardsRoute } from "./routes/cards";
import { ShopRoute } from "./routes/shop";
import { GameRoute } from "./routes/game";

export const router = createBrowserRouter([
   {
      element: <AppLayout />,
      children: [
         {
            element: <AuthorizedLayout />,
            children: [
               {
                  path: "/",
                  element: <AppRoute />,
               },
               {
                  path: "/cards",
                  element: <CardsRoute />,
               },
               {
                  path: "/shop",
                  element: <ShopRoute />,
               },
               {
                  path: "/game/:id",
                  element: <GameRoute />,
               },
            ],
         },
         {
            path: "/auth",
            element: <AuthRoute />,
         },
      ],
   },
]);
