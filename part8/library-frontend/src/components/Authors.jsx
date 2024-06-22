import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";

import AuthorsForm from "./AuthorsForm";

const Authors = ({ setError, token }) => {
  const results = useQuery(ALL_AUTHORS);

  if (results.loading) {
    return <div>loading...</div>;
  }

  const authors = results.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a, index) => (
            <tr key={index}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {token ? <AuthorsForm setError={setError} /> : null}
    </div>
  );
};

export default Authors;
