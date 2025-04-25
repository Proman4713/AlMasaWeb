import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";

import stylesheet from "./app.css?url";
import { AppThemeProvider } from "./contexts/colors";
import { LocaleProvider } from "./contexts/localeManagement";

export const links = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Audiowide&family=Orbitron:wght@400..900&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Ubuntu+Sans:ital,wght@0,100..800;1,100..800&family=Roboto:ital,wght@0,100..900;1,100..900&family=Jersey+25&display=swap",
	},
	{ rel: "stylesheet", href: stylesheet },
	{ rel: "icon", href: "/favicon.ico" },
	{ rel: "apple-touch-icon", href: "/logo192.png" }
];

export function Layout({ children }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* Embed Data */}
					{/* Twitter, not X */}
					<meta content="summary" property="twitter:card" />
					<meta content="Al-Masa Egypt" property="twitter:title" />
					<meta content="/lockup.png" property="twitter:image" />

					{/* Open Graph */}
					<meta content="Al-Masa Egypt" property="og:site_name" />
					<meta content="Al-Masa Egypt Store" property="og:title" />
					<meta property="og:description" content="Al-Masa is a leading company in technology and security in Egypt. Established in 2007, we have grown to become one of the largest companies in the Egyptian market." />

					<meta content="/logo_original.png" property="og:image" />
					<meta name="theme-color" content="#f48420" />

					<meta content="https://almasa-egypt.com/" property="og:url" />
					<meta property="og:type" content="website" />

					{/* Miscellaneous */}
					<meta name="keywords" content="Al-Masa Egypt, Al-Masa Egypt Web, Al-Masa Egypt Store, Technical Accessories, Computer parts, Laptops, Laptops in Egypt, Egypt" />
					<meta name="description" content="Al-Masa is a leading company in technology and security in Egypt. Established in 2007, we have grown to become one of the largest companies in the Egyptian market." />
					<meta name="author" content="Al-Masa Egypt" />
				{/* End Embed Data */}
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <>
		<AppThemeProvider>
			<LocaleProvider>
				<Outlet />
			</LocaleProvider>
		</AppThemeProvider>
	</>;
}

export function ErrorBoundary({ error }) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main>
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre>
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
