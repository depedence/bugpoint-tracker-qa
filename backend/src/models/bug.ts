export interface Bug {
    id: string;
    title: string;
    description: string;
    status: 'open' | 'closed';
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
}
