import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";

import AuthorsForm from "./AuthorsForm";

const Authors = ({ setError }) => {
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
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <AuthorsForm setError={setError} />
    </div>
  );
};

export default Authors;
