export interface IComment {
    id: number
    contact: string
    description: string
    image?: string | null
    postId: number
    userId: number
}