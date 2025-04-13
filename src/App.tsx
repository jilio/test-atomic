import { Route, RouterProvider } from "atomic-router-react";
import { attachLogger } from "effector-logger";
import { HomePage } from "pages/home";
import { PostsPage } from "pages/posts";
import { router } from "routing";

attachLogger();

export default function App() {
	return (
		<div>
			<h1 className="p-8 font-bold text-3xl">Jilio React Starter!</h1>
			<RouterProvider router={router}>
				<Route route={HomePage.route} view={HomePage.Page} />
				<Route route={PostsPage.route} view={PostsPage.Page} />
			</RouterProvider>
		</div>
	);
}
