const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const total = blogs.reduce(
    (accLikes, currentLikes) => accLikes + currentLikes.likes,
    0
  );
  return total;
};

const favouriteBlog = (blogs) => {
  const favBlog = blogs.reduce(
    (topBlog, currentBlog) =>
      topBlog.likes > currentBlog.likes ? topBlog : currentBlog,
    0
  );
  return favBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
