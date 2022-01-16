import { AVAILABLE_COLORS } from "./const";

export const getRandomBackgroundForNotes = () => Math.floor(Math.random() * 20);

export const getRandomIdNote = () =>
  `@@${Math.floor(Math.random() * 99999999)}`;
export const getRandomKeyNote = () =>
  `@${Math.floor(Math.random() * 99999999)}`;

export const getInitialNoteState = () => [
  {
    id: getRandomIdNote(),
    key: getRandomKeyNote(),
    text: "",
    position: {
      x: 0,
      y: 0,
    },
    styles: {
      background: AVAILABLE_COLORS[getRandomBackgroundForNotes()],
    },
  },
];
