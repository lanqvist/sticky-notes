import { useCallback } from "react";
import { useLocalStorageForNotes } from "../../hooks/useLocalStorageForNotes";
import Note from "../Note";

import { AVAILABLE_COLORS } from "./const";
import {
  getInitialNoteState,
  getRandomBackgroundForNotes,
  getRandomIdNote,
  getRandomKeyNote,
} from "./utils";

import "./StickyNotes.css";
import { INotes } from "../../types";

const StickyNotes: React.FC = () => {
  const [notes, setNotes] = useLocalStorageForNotes("notes", [getInitialNoteState()]);

  const onDeleteNote = useCallback(
    (id) => {
      setNotes((notes: INotes[]) => notes.filter((note) => note.id !== id));
    },
    [setNotes]
  );

  const onAddNote = useCallback(
    () => setNotes((notes: INotes[]) => [...notes, getInitialNoteState()]),
    [setNotes]
  );

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.ctrlKey && event.button === 0) {
      const clientX = event.clientX;
      const clientY = event.clientY;

      return setNotes((notes: INotes[]) => [
        ...notes,
        {
          id: getRandomIdNote(),
          key: getRandomKeyNote(),
          clientX,
          clientY,
          styles: {
            background: AVAILABLE_COLORS[getRandomBackgroundForNotes()],
          },
        },
      ]);
    }
  };

  return (
    <>
      <div onMouseDown={onMouseDown} className="stickyContainer">
        {notes.map((note: INotes) => (
          <Note
            id={note.id}
            key={note.key}
            onAddNote={onAddNote}
            onDeleteNote={onDeleteNote}
            clientX={note.clientX}
            clientY={note.clientY}
            styles={note.styles}
          />
        ))}
      </div>
    </>
  );
};

export default StickyNotes;
