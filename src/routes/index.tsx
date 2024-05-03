import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "@/pages";

const Routes = () => {
    const routesForPublic = [
        {
            path: "/",
            element: <Home />,
        },
    ];

    const router = createBrowserRouter([...routesForPublic]);

    return <RouterProvider router={router} />;
};

export default Routes;
