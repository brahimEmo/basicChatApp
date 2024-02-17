import { DocumentData, Timestamp } from "firebase/firestore"

export type chatDoc = DocumentData & {
    authorId: string,
    authorName: string,
    content: string,
    creationTime: Timestamp,
    icon: string,
    type: 'string' | 'file',
    fileUrl: string,
}