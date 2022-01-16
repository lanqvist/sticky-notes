import { useCallback } from "react";
import { useLocalStorageForNotes } from "../../hooks/useLocalStorageForNotes";
import { INotes } from "../../types";
import Note from "../Note";

import plusIcon from "../../icons/plus.svg";

import { getInitialNoteState } from "./utils";

const StickyNotes: React.FC = () => {
  const [notes, setNotes] = useLocalStorageForNotes(getInitialNoteState());

  const onDeleteNote = useCallback(
    (id) => {
      setNotes((notes: INotes[]) => notes.filter((note) => note.id !== id));
    },
    [setNotes]
  );

  const onAddNote = useCallback(
    () => setNotes((notes: INotes[]) => [...notes, ...getInitialNoteState()]),
    [setNotes]
  );

  return (
    <>
      <div>
        <img
          src={plusIcon}
          alt="plus"
          onClick={onAddNote}
          className="plusIcon"
        />
        {notes.map((note: INotes) => (
          <Note
            id={note.id}
            key={note.key}
            text={note.text}
            position={note.position}
            onAddNote={onAddNote}
            onDeleteNote={onDeleteNote}
            styles={note.styles}
          />
        ))}
      </div>
    </>
  );
};

export default StickyNotes;
