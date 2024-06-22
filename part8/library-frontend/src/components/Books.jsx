import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = () => {
  const [genre, setGenre] = useState("");
  const results = useQuery(ALL_BOOKS, {
    variables: { genre },
  });

  if (results.loading) {
    return <div>loading...</div>;
  }

  const books = results.data.allBooks;

  if (books.length === 0) {
    return <div>There are no books</div>;
  }

  const genres = results.data.allBooks.map((b) => b.genres).flat();
  const uniqueGenres = [...new Set(genres)];

  return (
    <div>
      <h2>books</h2>

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

      <div>
        {uniqueGenres.map((genre, index) => (
          <button key={index} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
