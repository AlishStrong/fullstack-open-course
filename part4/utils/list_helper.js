const dummy = blogs => {
	return 1;
};

const totalLikes = blogs => {
	return blogs.length > 0 ? blogs.reduce((prev, curr) => prev + curr.likes, 0) : 0;
};

const favoriteBlog = blogs => {
	if (blogs.length > 0) {
		if (blogs.length === 1) {
			return blogs[0];
		} else {
			return blogs.sort(({ likes: a }, { likes: b }) => b - a)[0];
		}
	} else {
		return {};
	}
};

const mostBlogs = blogs => {
	const authors = Array.from(new Set(blogs.map(b => b.author)))
		.map(author => new Object({ author, blogs: 0 }));
	return blogs.reduce((pr, cr) => {
		const foundInd = pr.findIndex(a => a.author === cr.author);
		if (foundInd >= 0) {
			const author = pr[foundInd];
			author.blogs += 1;
			pr.splice(foundInd, 1, author);
		}
		return pr;
	}, authors).sort(({ blogs: a }, { blogs: b }) => b - a)[0];
};

const mostLikes = blogs => {
	const mostLikedBlogAuthor = blogs.sort(({ likes: a }, { likes: b }) => b - a)[0].author;
	return blogs.reduce((pr, cr) => {
		if (cr.author === mostLikedBlogAuthor) {
			pr.likes += cr.likes;
		}
		return pr;
	}, { author: mostLikedBlogAuthor, likes: 0 });
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
};
