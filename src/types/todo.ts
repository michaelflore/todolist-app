export interface TodoI {
    id: string;
    title: string;
    completed: boolean;
}

export interface TodoUpdatesI {
    title?: string;
    completed?: boolean;
}

export type filterStatusType = "pending" | "completed" | "";
