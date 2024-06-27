import { useEffect, useState } from "react";

import diaryService from "./services/diaries";
import DiaryEntries from "./components/DiaryEntries";
import { DiaryEntry } from "./types";
import NewEntry from "./components/NewDiaryEntry";

function App() {
  const [diary, setDiary] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then((response) => {
      setDiary(response);
    });
  }, []);

  return (
    <div className="App">
      <NewEntry diary={diary} setDiary={setDiary} />
      <DiaryEntries diary={diary} />
    </div>
  );
}

export default App;
