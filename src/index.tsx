import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import Root, { loader as rootLoader } from "./pages/root";
import Watch, { loader as watchLoader } from "./pages/watch";
// import Index from "./routes/index";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "watch/:watchId",
        element: <Watch />,
        loader: watchLoader,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
