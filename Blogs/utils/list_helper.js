const totalLikes = (blogs) => {
    let sum = 0
    if (blogs.length === 0) {
        return sum
    }
    for (const blog of blogs) {
        sum += blog.likes
    }
    return sum
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    let favorite = blogs[0]
    for (const blog of blogs) {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }
    }
    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    let authorAndBlogsCount = []
    let mostBlogsCount = 0
    let mostBlogsAuthor = ''
    for (const blog of blogs) {
        authorAndBlogsCount[blog.author] = authorAndBlogsCount[blog.author] ? authorAndBlogsCount[blog.author] += 1 : 1
        if (authorAndBlogsCount[blog.author] > mostBlogsCount) {
            mostBlogsCount = authorAndBlogsCount[blog.author]
            mostBlogsAuthor = blog.author
        }
    }

    return {
        author: mostBlogsAuthor,
        count: mostBlogsCount,
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    let authorAndLikesCount = []
    let mostLikesCount = 0
    let mostLikesAuthor = ''
    for (const blog of blogs) {
        authorAndLikesCount[blog.author] = authorAndLikesCount[blog.author] ? authorAndLikesCount[blog.author] += blog.likes : blog.likes
        if (authorAndLikesCount[blog.author] > mostLikesCount) {
            mostLikesCount = authorAndLikesCount[blog.author]
            mostLikesAuthor = blog.author
        }
    }

    return {
        author: mostLikesAuthor,
        count: mostLikesCount,
    }
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}