import { ITodoItem } from "../props"; // Assuming the main props file defines ITodoItem

export interface ITodoListItemProps {
    item: ITodoItem;
    onItemPress?: (item: ITodoItem) => void;
    onCompleteToggle?: (item: ITodoItem) => void;
    onDelete?: (item: ITodoItem) => void; // New prop for the delete action
}
