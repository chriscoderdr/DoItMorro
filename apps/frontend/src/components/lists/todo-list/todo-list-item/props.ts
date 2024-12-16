import { ITodoItem } from "../props"; // Assuming the main props file defines ITodoItem

export interface ITodoListItemProps {
    item: ITodoItem;
    onItemPress?: (item: ITodoItem) => void;
    onCompleteToggle?: (id: number, isCompleted: boolean) => void;
    onDelete?: (item: ITodoItem) => void; // New prop for the delete action
}
