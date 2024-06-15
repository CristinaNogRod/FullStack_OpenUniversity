import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Select from "react-select";

import { ADD_AUTHOR_YEAR, ALL_AUTHORS } from "../queries";

const AuthorsForm = ({ setError }) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  const { data, loading, error } = useQuery(ALL_AUTHORS);

  const [editYear] = useMutation(ADD_AUTHOR_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  // useEffect(() => {
  //   if (data && data.editAuthor === null) {
  //     setError("author not found");
  //   }
  // }, [data]);

  const submit = async (event) => {
    event.preventDefault();
    editYear({ variables: { name, setBornTo: year } });
    setName("");
    setYear("");
  };

  const authorOptions = loading
    ? []
    : data.allAuthors.map((author) => ({
        value: author.name,
        label: author.name,
      }));

  const handleSelectChange = (selectedOption) => {
    setName(selectedOption ? selectedOption.value : "");
  };

  return (
    <div>
      <h2>Set birth year</h2>
      <form
        onSubmit={(event) => {
          submit(event);
          handleSelectChange(null);
        }}
      >
        <div>
          name
          {/* <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          /> */}
          <Select
            value={
              authorOptions.find((option) => option.value === name) || null
            }
            onChange={handleSelectChange}
            options={authorOptions}
            isLoading={loading}
            placeholder="Select author"
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default AuthorsForm;
