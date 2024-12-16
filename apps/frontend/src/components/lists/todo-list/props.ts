export interface ITodoItem {
    id: number;
    title: string;
    description?: string;
    dueDate?: string;
    isCompleted: boolean;
    completedAt: Date;
    onComplete?: (id: number, isCompleted: boolean) => void;
}

export interface ITodoListProps {
    todos: ITodoItem[];
    onItemPress?: (item: ITodoItem) => void;
    onAddPress?: () => void;
}
