import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import plusIcon from "../../icons/plus.svg";
import trashIcon from "../../icons/trash.svg";

import "./Note.css";

interface IProps {
  id: string;
  onAddNote?: () => void;
  onDeleteNote: (id: string) => void;
  clientX: number;
  clientY: number;
  styles?: React.CSSProperties;
}

const Note: React.FC<IProps> = ({
  clientX,
  clientY,
  styles,
  id,
  onDeleteNote,
  onAddNote,
}) => {
  const isDragging = useRef(false);
  const dragHeadRef = useRef<any>(null);
  const noteRef = useRef<any>(null);

  const [positionX, setPositionX] = useState(clientX);
  const [positionY, setPositionY] = useState(clientY);

  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(200);

  const [zIndex, setZIndex] = useState<number | string>();

  const onMouseDown = useCallback((event) => {
    /* Сheck that the event is included in the ref, in order */
    /* to understand what exactly we will work with the correct note */
    if (dragHeadRef.current && dragHeadRef.current.contains(event.target)) {
      isDragging.current = true;

      setZIndex(1000);
    }
  }, []);

  const onMouseUp = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;

      setZIndex("auto");
    }
  }, []);

  const onMouseMove = useCallback((event) => {
    if (isDragging.current) {
      /* moving the note is done by calculating the movement of the cursor */
      /* probably not the best solution. */
      setPositionX((position) => position + event.movementX);
      setPositionY((position) => position + event.movementY);
    }
  }, []);

  const resizeObserver = useMemo(
    () =>
      new ResizeObserver((entries: any) => {
        const contentReact = entries[0].contentRect;

        setWidth(contentReact.width);
        setHeight(contentReact.height);
      }),
    []
  );

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);

    resizeObserver.observe(noteRef.current);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);

      resizeObserver.disconnect();
    };
  }, [onMouseMove, onMouseDown, onMouseUp, resizeObserver]);

  return (
    <div>
      <div
        className="note"
        ref={noteRef}
        style={{
          ...styles,
          height,
          width,
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
        <textarea className="textAreaNote" placeholder="Add your notes..." />
      </div>
    </div>
  );
};

export default Note;
