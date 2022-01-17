import { INotes } from "../../types";
import Note from "../Note";

import plusIcon from "../../icons/plus.svg";

import { getInitialNoteState } from "./utils";
import { useCallback } from "react";
import { useLocalStorageForNotes } from "../../hooks/useLocalStorageForNotes";
import { getNewNotesList } from "../../utils/getNewNotesList";
import { ACTIONS_TYPE } from "../../constants";

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

  const onBlurText = useCallback(
    (event, noteId) => {
      setNotes((notes: INotes[]) =>
        getNewNotesList({
          actionType: ACTIONS_TYPE.setText,
          text: event.target.value,
          notes,
          noteId,
        })
      );
    },
    [setNotes]
  );

  const onChangePosition = useCallback(
    (noteId, x, y) => {
      setNotes((notes: INotes[]) =>
        getNewNotesList({
          actionType: ACTIONS_TYPE.setPosition,
          position: { x, y },
          notes,
          noteId,
        })
      );
    },
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
            onAddNote={onAddNote}
            onDeleteNote={onDeleteNote}
            onBlurText={onBlurText}
            onChangePosition={onChangePosition}
            position={note.position}
            styles={note.styles}
          />
        ))}
      </div>
    </>
  );
};

export default StickyNotes;
