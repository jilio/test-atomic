import { attach, createEffect, createStore } from "effector";

const slugs = ["foo", "bar", "baz"];

const posts = {
	foo: { slug: "foo", title: "Foo post", text: "Hoho you found me!" },
	bar: { slug: "bar", title: "Bar post", text: "Hoho you found me!" },
	baz: { slug: "baz", title: "Baz post", text: "Hoho you found me!" },
} as const;

type Post = (typeof posts)[keyof typeof posts];
type Slug = keyof typeof posts;

// Create a store to cache the posts
const $posts = createStore<Post[] | null>(null);

// Base effect for fetching posts (without caching)
const fetchPostsBaseFx = createEffect(() => {
	console.log("Fetching posts data");
	return new Promise<Post[]>((r) =>
		setTimeout(
			r,
			800,
			slugs.map((slug) => posts[slug as Slug]),
		),
	);
});

// Use attach to create the main effect with caching
const getPostsFx = attach({
	source: $posts,
	effect: (posts: Post[] | null) => {
		if (posts !== null) {
			console.log("Using cached posts data");
			return Promise.resolve(posts);
		}
		return fetchPostsBaseFx();
	},
});

// Update the store when the effect completes
$posts.on(getPostsFx.doneData, (_, payload) => payload);

const getPostFx = createEffect((slug: string) => {
	return new Promise<Post>((res, rej) =>
		setTimeout(() => {
			if (slug in posts) {
				return res(posts[slug as Slug]);
			}
			rej();
		}, 1000),
	);
});

export const PostsApi = {
	getPostsFx,
	getPostFx,
	$posts, // Export the store as well
};
