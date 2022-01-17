import { useState } from "react";
import { getInitialNoteState } from "../components/StickyNotes/utils";
import { LOCAL_STORAGE_NOTES_KEY } from "../constants";
import { INotes } from "../types";

/* store all our notes in local storage, but so far it only remembers the position at the initialization stage */
export const useLocalStorageForNotes = (initialValue: INotes[]) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const notes = window.localStorage.getItem(LOCAL_STORAGE_NOTES_KEY);
      /* set initial value to LC */
      if (notes) {
        return JSON.parse(notes);
      }

      window.localStorage.setItem(
        LOCAL_STORAGE_NOTES_KEY,
        JSON.stringify(getInitialNoteState())
      );

      return initialValue;
    } catch (error) {
      console.log(error);

      return initialValue;
    }
  });

  const setValue = (value: INotes[]) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      window.localStorage.setItem(
        LOCAL_STORAGE_NOTES_KEY,
        JSON.stringify(valueToStore)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};
