import React, { useEffect, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';

const CalendarOverlayGrid = ({ calendarRef }) => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    if (!calendarRef?.current) return;

    const slotElements = calendarRef.current.querySelectorAll('.rbc-time-slot');
    console.log('Found slotElements:', slotElements.length);

    const newSlots = [];

    slotElements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const parentCol = el.closest('[class*=rbc-day-slot]');
      const colIndex = Array.from(parentCol?.parentElement?.children || []).indexOf(parentCol);
      const timeLabel = el.innerText.trim();

      if (rect.width > 0 && rect.height > 0 && timeLabel) {
        newSlots.push({
          id: `col-${colIndex}-${timeLabel.replace(/\s/g, '')}`,
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        });
      }
    });

    console.log('Generated droppable slots:', newSlots);
    setSlots(newSlots);
  }, [calendarRef]);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 5, pointerEvents: 'none' }}>
      {slots.map((slot) => (
        <DroppableOverlay key={slot.id} id={slot.id} {...slot} />
      ))}
    </div>
  );
};

const DroppableOverlay = ({ id, top, left, width, height }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        position: 'absolute',
        top,
        left,
        width,
        height,
        backgroundColor: isOver ? 'rgba(0,255,0,0.3)' : 'rgba(255,0,0,0.1)',
        border: isOver ? '2px dashed green' : '1px dashed red',
        pointerEvents: 'auto',
        transition: 'background-color 0.2s ease',
      }}
    />
  );
};

export default CalendarOverlayGrid;
