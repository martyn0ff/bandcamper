import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import Root from "./routes/root";
// import Index from "./routes/index";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    // children: [
    //   {
    //     errorElement: <ErrorPage />,
    //     children: [
    //       { index: true, element: <Index /> },
    //       {
    //         path: "children/:childId",
    //         element: <Child1 />,
    //         // loader: (some loader)
    //         // action: (some action)
    //       },
    //       {
    //         path: "children/:childId/edit",
    //         element: <Child2 />,
    //         // loader: (some loader)
    //         // action: (some action)
    //       },
    //       {
    //         path: "contacts/:contactId/destroy",
    //         element: <Child3 />,
    //         // loader: (some loader)
    //         // action: (some action)
    //       },
    //     ],
    //   },
    // ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
