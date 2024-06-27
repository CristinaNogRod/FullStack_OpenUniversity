import { NonSensitiveDiaryEntry } from "../types";

const Entry = ({ entry }: { entry: NonSensitiveDiaryEntry }) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <p>weather: {entry.weather}</p>
      <p>visibility: {entry.visibility}</p>
    </div>
  );
};

const DiaryEntries = ({ diary }: { diary: NonSensitiveDiaryEntry[] }) => {
  return (
    <div>
      <h1>Diary Entries</h1>
      {diary.map((entry, index) => (
        <Entry key={index} entry={entry} />
      ))}
    </div>
  );
};

export default DiaryEntries;
