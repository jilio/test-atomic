import { PostsApi } from "api";
import { chainRoute, createRoute } from "atomic-router";
import { createRouteView, Link } from "atomic-router-react";
import { attach, restore } from "effector";
import { useList } from "effector-react";

const route = createRoute();
const goToHomeRoute = createRoute();

const getPostsFx = attach({
	effect: PostsApi.getPostsFx,
});

const $posts = restore(getPostsFx, []);

const postsLoadedRoute = chainRoute({
	route,
	beforeOpen: getPostsFx,
});

const Page = () => {
	console.log("posts");
	return (
		<div>
			<h1>This is posts page</h1>
			<Link to={goToHomeRoute}>Go to home</Link>
			<br />
			<br />
			<Posts />
		</div>
	);
};

const Posts = createRouteView({
	route: postsLoadedRoute,
	view: () => {
		return useList($posts, (post) => {
			return (
				<article>
					<h2>{post.title}</h2>
				</article>
			);
		});
	},
	otherwise: () => "Loading...",
});

export const PostsPage = {
	route,
	goToHomeRoute,
	Page,
};
