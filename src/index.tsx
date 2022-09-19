import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error";
import Root, { loader as rootLoader } from "./pages/root";
import Watch, { loader as watchLoader } from "./pages/watch";
import Inbox, { loader as inboxLoader } from "./pages/inbox";
import Profile from "./pages/profile";
import SignUpForm from "./pages/signup";
import SignIn from "./pages/sign-in";
import SignUpRoot from "./pages/signup-root";
import SignUpSuccess from "./pages/signup-success";

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
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Inbox />,
            loader: inboxLoader,
          },
          {
            path: "inbox",
            element: <Inbox />,
            loader: inboxLoader,
          },
          {
            path: "watch/:watchId",
            element: <Watch />,
            loader: watchLoader,
          },
          {
            path: "me",
            element: <Profile />,
          },
          {
            path: "sign-up",
            element: <SignUpRoot />,
            children: [
              {
                index: true,
                element: <SignUpForm />,
              },
              {
                path: "success",
                element: <SignUpSuccess />,
              },
            ],
          },
          {
            path: "sign-in",
            element: <SignIn />,
          },
        ],
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
