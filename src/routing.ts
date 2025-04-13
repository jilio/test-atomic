import { createHistoryRouter } from "atomic-router";
import { createBrowserHistory } from "history";
import { HomePage } from "pages/home";
import { PostsPage } from "pages/posts";

export const routes = [
	{ path: "/", route: [HomePage.route, PostsPage.goToHomeRoute] },
	{ path: "/posts", route: [PostsPage.route, HomePage.goToPostsRoute] },
];

export const history = createBrowserHistory();

export const router = createHistoryRouter({
	routes,
	// notFoundRoute: HomePage.route,
});

router.setHistory(history);
