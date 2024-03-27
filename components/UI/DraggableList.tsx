import * as React from 'react';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
  Draggable,
} from 'react-beautiful-dnd';
import { ListItem, ListItemAvatar, makeStyles } from '@mui/material';
import styles from 'styles/UI/DraggableList.module.scss';

export type DraggableListProps = {
  children: React.ReactNode[];
  onDragEnd: OnDragEndResponder;
};

const DraggableList = React.memo(
  ({ onDragEnd, children }: DraggableListProps) => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable-list'>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ width: '100%' }}
            >
              {children &&
                children.map((item, index) => (
                  <Draggable
                    draggableId={`item-${index}`}
                    index={index}
                    key={index}
                  >
                    {(provided, snapshot) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={
                          snapshot.isDragging ? styles.draggingListItem : ''
                        }
                      >
                        {item}
                      </ListItem>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
);

DraggableList.displayName = 'DraggableList';
export default DraggableList;
