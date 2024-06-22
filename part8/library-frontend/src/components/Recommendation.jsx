import { useQuery } from "@apollo/client";
import { ME, ALL_BOOKS } from "../queries";

const Recommendation = () => {
  const resultsUser = useQuery(ME);
  const genre = resultsUser.data?.me?.favoriteGenre || "";

  const resultsBooks = useQuery(ALL_BOOKS, {
    variables: { genre },
  });

  if (resultsUser.loading || resultsBooks.loading) {
    return <div>loading...</div>;
  }
  if (resultsUser.error) {
    return <div>Error loading user data: {resultsUser.error.message}</div>;
  }

  if (resultsBooks.error) {
    return <div>Error loading books data: {resultsBooks.error.message}</div>;
  }

  if (!genre) {
    return <div>No favorite genre found</div>;
  }

  const books = resultsBooks.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre: {genre}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b, index) => (
            <tr key={index}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendation;
