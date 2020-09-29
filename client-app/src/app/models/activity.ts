export interface IActivity {
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    city: string;
    venue: string;
    comments: IComment[];
}

export interface IComment {
    id: string;
    createdAt: Date;
    body: string;
    username: string;
    displayName: string;
    image: string;
}

export interface ICommentTransport {
    activityId: string;
    body: string;
}