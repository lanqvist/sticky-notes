import { LOCAL_STORAGE_NOTES_KEY } from "../constants";
import { INotes, IPosition } from "../types";

interface IProps {
  noteId: string;
  text?: string;
  position?: IPosition;
}

export const setNoteToLocalStorage = ({ noteId, text, position }: IProps) => {
  const notes = JSON.parse(
    window.localStorage.getItem(LOCAL_STORAGE_NOTES_KEY) ?? ""
  );

  const modifiedListNotes = notes?.map((note: INotes) => {
    if (note.id === noteId) {
      /* mini reducer */
      if (position) {
        return { ...note, ...{ position } };
      }

      if (text) {
        return { ...note, ...{ text } };
      }
    }

    return note;
  });

  return window.localStorage.setItem(
    LOCAL_STORAGE_NOTES_KEY,
    JSON.stringify(modifiedListNotes)
  );
};
