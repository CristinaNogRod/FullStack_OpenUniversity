import { useState } from "react";
import axios from "axios";
import diaryService from "../services/diaries";
import { DiaryEntry, Visibility, Weather } from "../types";
import Notification from "./Notification";

const NewEntry = ({
  diary,
  setDiary,
}: {
  diary: DiaryEntry[];
  setDiary: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}) => {
  const [notification, setNotification] = useState<string | null>(null);

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    diaryService
      .create({
        date: formData.get("date") as string,
        visibility: formData.get("visibility") as Visibility,
        weather: formData.get("weather") as Weather,
        comment: formData.get("comment") as string,
      })
      .then((entry) => {
        setDiary(diary.concat(entry));
        form.reset();
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setNotification(error.response?.data as string);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        } else {
          setNotification("An error occurred while creating the diary entry.");
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        }
      });
  };

  return (
    <div>
      <h1>Add new entry</h1>

      {notification ? <Notification notification={notification} /> : null}

      <form onSubmit={addEntry}>
        <div>
          <label>date</label>
          <input type="date" name="date" />
        </div>
        <div>
          <label>visibility</label>
          <input type="text" name="visibility" />
        </div>
        <div>
          <label>weather</label>
          <input type="text" name="weather" />
        </div>
        <div>
          <label>comment</label>
          <input type="text" name="comment" />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewEntry;
