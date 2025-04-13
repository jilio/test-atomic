import { PostsApi } from "api";
import { createRoute } from "atomic-router";
import { Link } from "atomic-router-react";

const route = createRoute();
const goToPostsRoute = createRoute();

const Page = () => {
	console.log("ale");
	return (
		<div>
			<h1>This is home page</h1>
			<Link to={goToPostsRoute} onMouseEnter={() => PostsApi.getPostsFx()}>
				Go to posts
			</Link>
			<br />
			<br />
			<Link to="/asdfasdf">Non-existing page</Link>
		</div>
	);
};

export const HomePage = {
	route,
	goToPostsRoute,
	Page,
};
