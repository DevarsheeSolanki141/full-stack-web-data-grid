export interface MagiccardsDto {
    id: string;
    name: string;
}

export interface MagicRelatedCardsDto {
    id: number;
    component: string;
    name: string;
    typeLine: string;
    color: string
    magicCardId: number;
    parentCardId: number;
}