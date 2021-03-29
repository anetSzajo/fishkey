export type FlashcardModel = {
    documentId?: string;
    answer: string;
    category: string;
    question: string;
    stage: number | string;
    uid: string;
    isActive: true;
}

export const createFromFirestore = (data: any ): FlashcardModel => {
    return {...data,
        documentId: data.NO_ID_FIELD
    } as FlashcardModel
}