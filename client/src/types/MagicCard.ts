export interface SearchDto {
    search: string;
}

export interface MagicCardsDto {
        name: string;
        set_name:string;
        rarity:string;
        image_uris:{
            normal: string
        };
        collector_number:number
   
}