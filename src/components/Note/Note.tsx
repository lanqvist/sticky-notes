import { useCallback, useEffect, useRef, useState } from "react";

import { IPosition } from "../../types";

import plusIcon from "../../icons/plus.svg";
import trashIcon from "../../icons/trash.svg";

import "./Note.css";

interface IProps {
  id: string;
  onAddNote?: () => void;
  onDeleteNote: (id: string) => void;
  onBlurText: (
    event: React.FocusEvent<HTMLTextAreaElement, Element>,
    noteId: string
  ) => void;
  onChangePosition: (noteId: string, x: number, y: number) => void;
  position: IPosition;
  styles?: React.CSSProperties;
  text: string;
}

const Note: React.FC<IProps> = ({
  styles,
  id,
  onAddNote,
  onDeleteNote,
  onBlurText,
  onChangePosition,
  position,
  text,
}) => {
  const isDragging = useRef(false);
  const dragHeadRef = useRef<any>(null);
  const noteRef = useRef<any>(null);

  const [noteText, setNoteText] = useState(text);

  const [positionX, setPositionX] = useState(position.x);
  const [positionY, setPositionY] = useState(position.y);

  const [zIndex, setZIndex] = useState<number | string>();

  const onMouseDown = useCallback((event) => {
    /* Сheck that the event is included in the ref, in order */
    /* to understand what exactly we will work with the correct note */
    if (event.target === dragHeadRef.current) {
      isDragging.current = true;

      setZIndex(1000);
    }
  }, []);

  const onMouseUp = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;

      setZIndex("auto");

      onChangePosition(id, positionX, positionY);
    }
  }, [id, onChangePosition, positionX, positionY]);

  const onMouseMove = useCallback((event) => {
    if (isDragging.current) {
      if (event.cancelable) {
        event.preventDefault();
        event.stopPropagation();

        /* moving the note is done by calculating the movement of the cursor */
        /* probably not the best solution. */
        setPositionX((positionX) => positionX + event.movementX);
        setPositionY((positionY) => positionY + event.movementY);
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove, onMouseDown, onMouseUp]);

  return (
    <div>
      <div
        className="note"
        ref={noteRef}
        style={{
          ...styles,
          height: 220,
          width: 220,
          transform: `translateX(${positionX}px) translateY(${positionY}px)`,
          zIndex,
        }}
      >
        <div className="head">
          <div className="plusIcon" onClick={onAddNote}>
            <img src={plusIcon} alt="plus" />
          </div>
          <div
            id={id}
            ref={dragHeadRef}
            className="placeToMove"
            onMouseMove={onMouseMove}
            onMouseDown={onMouseDown}
          />
          <div
            className="trashIcon"
            onClick={() => onDeleteNote(dragHeadRef.current?.id)}
          >
            <img src={trashIcon} alt="plus" />
          </div>
        </div>
        <textarea
          value={noteText}
          onChange={(event) => setNoteText(event.target.value)}
          onBlur={(event) => onBlurText(event, id)}
          className="textAreaNote"
          placeholder="Add your notes..."
        />
      </div>
    </div>
  );
};

export default Note;
