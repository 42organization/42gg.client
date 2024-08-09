import { useEffect } from 'react';

interface DraggableProps {
  dragStyles: { readonly [key: string]: string };
  parentSelector: string;
  deps: unknown[];
  callback: (target: HTMLElement) => void;
  dragging: { current: HTMLElement | null };
}

const useDraggable = ({
  dragStyles,
  parentSelector,
  deps,
  callback,
  dragging,
}: DraggableProps) => {
  useEffect(() => {
    const parent = document.querySelector(parentSelector) as HTMLElement;
    if (!parent) return;
    const handleDragStart = (e: DragEvent) => {
      dragging.current = e.target as HTMLElement;
      dragging.current.classList.add(dragStyles.dragging);
      const dropzone = Array.from(
        document.getElementsByClassName(dragStyles.dropzone)
      );
      dropzone.length &&
        dropzone.forEach((el) => {
          el.classList.add(dragStyles.dropzoneColor);
        });
      return;
    };
    const handleDragEnd = (e: DragEvent) => {
      e.preventDefault();
      const dropzone = Array.from(
        document.getElementsByClassName(dragStyles.dropzone)
      );
      dropzone.length &&
        dropzone.forEach((el) => {
          el.classList.remove(dragStyles.dropzoneColor);
          el.classList.remove(dragStyles.hovered);
        });
    };
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      return;
    };
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      const li =
        e.target && e.target instanceof HTMLElement
          ? e.target.closest('li')
          : null;
      if (li && li.classList.contains(dragStyles.dropzone)) {
        li.classList.add(dragStyles.hovered);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      const li =
        e.target && e.target instanceof HTMLLIElement ? e.target : null;
      if (li && li.classList.contains(dragStyles.hovered)) {
        li.classList.remove(dragStyles.hovered);
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      dragging.current?.classList.remove(dragStyles.dragging);
      let target = e.target;
      if (
        e.target &&
        e.target instanceof HTMLElement &&
        !e.target.classList.contains(dragStyles.dropzone)
      ) {
        target = e.target.closest(`.${dragStyles.dropzone}`);
      }
      if (
        !target ||
        !(target instanceof HTMLElement) ||
        !target.classList.contains(dragStyles.dropzone)
      )
        if (!target) return;
      callback(target as HTMLElement);
      dragging.current = null;
      return target;
    };

    parent.addEventListener('dragstart', handleDragStart);
    parent.addEventListener('dragend', handleDragEnd);
    parent.addEventListener('dragover', handleDragOver);
    parent.addEventListener('dragenter', handleDragEnter);
    parent.addEventListener('dragleave', handleDragLeave);
    parent.addEventListener('drop', handleDrop);
    return () => {
      parent.removeEventListener('dragstart', handleDragStart);
      parent.removeEventListener('dragend', handleDragEnd);
      parent.removeEventListener('dragover', handleDragOver);
      parent.removeEventListener('dragenter', handleDragEnter);
      parent.removeEventListener('dragleave', handleDragLeave);
      parent.removeEventListener('drop', handleDrop);
    };
  }, [dragStyles, deps]);
};

export default useDraggable;
