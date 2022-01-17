import { getInitialNoteState } from "../components/StickyNotes/utils";
import { ACTIONS_TYPE } from "../constants";
import { INotes, IPosition } from "../types";

interface INewNotesArgs {
  actionType: string;
  notes: INotes[];
  noteId?: string;
  text?: string;
  position?: IPosition;
}

export const getNewNotesList = ({
  notes,
  noteId,
  text,
  position,
  actionType,
}: INewNotesArgs) => {
  if (actionType === ACTIONS_TYPE.addNote) {
    return [...notes, ...getInitialNoteState()];
  }

  if (actionType === ACTIONS_TYPE.deleteNote) {
    return notes.filter((note: INotes) => note.id !== noteId);
  }

  if (notes) {
    return notes?.map((note: INotes) => {
      if (note.id === noteId) {
        if (actionType === ACTIONS_TYPE.setPosition) {
          return { ...note, ...{ position } };
        }

        if (actionType === ACTIONS_TYPE.setText) {
          return { ...note, ...{ text } };
        }
      }

      return note;
    });
  }

  return notes;
};
