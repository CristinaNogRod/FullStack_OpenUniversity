import { useDispatch } from "react-redux";
import { increaseLike, newComment } from "../reducers/blogReducer";

const SingleBlog = ({ blog }) => {
  const dispatch = useDispatch();

  const handleLikes = (event) => {
    event.preventDefault();
    dispatch(increaseLike(blog));
  };

  const handleComment = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    event.target.comment.value = "";
    dispatch(newComment(blog, comment));
  };

  // const handleDelete = (event) => {
  //   event.preventDefault();
  //   if (window.confirm("Do you want to delete this blog?")) {
  //     dispatch(removeBlog(blog.id));
  //   }
  // };

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      {blog.url}
      <br />
      likes {blog.likes}
      <button onClick={handleLikes}> likes </button>
      <br />
      {blog.user ? <span>added by {blog.user.name}</span> : null}
      {/* {user && blog.user && user.username === blog.user.username ? (
            <button onClick={handleDelete}> remove </button>
        ) : null} */}
      <h2>comments</h2>
      <form onSubmit={handleComment}>
        <input type="text" name="comment" />
        <button type="submit">add comment</button>
      </form>
      {blog.comments ? (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>no comments</p>
      )}
    </div>
  );
};

export default SingleBlog;
