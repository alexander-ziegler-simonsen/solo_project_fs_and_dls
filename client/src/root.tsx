import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";
import { Provider } from "./components/ui/provider";

export function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>Online Rizz Shop</title>
                <Meta />
                <Links />
            </head>
            <body>
                <Provider>
                    {children}
                    <ScrollRestoration />
                    <Scripts />
                </Provider>
            </body>
        </html>
    );
}

export default function Root() {
    return <Outlet />;
}
