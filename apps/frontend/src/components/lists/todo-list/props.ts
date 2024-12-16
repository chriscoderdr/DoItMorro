export interface ITodoItem {
    id: number;
    title: string;
    description?: string;
    dueDate?: string;
    isCompleted: boolean;
    completedAt: Date;
    createdAt: string;
    updatedAt: string;
}

export interface ITodoListProps {
    todos: ITodoItem[];
    onItemPress?: (item: ITodoItem) => void;
    onAddPress?: () => void;
    onDeleteItem?: (item: ITodoItem) => void;
}
