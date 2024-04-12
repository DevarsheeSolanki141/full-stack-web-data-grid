export interface MagicRelatedCardsDto {
    id: number;
    component: string;
    name: string;
    typeLine: string;
    color: string
    magicCardId: number;
    parentCardId: number;
    image_uris:{
        normal:string
    }
}