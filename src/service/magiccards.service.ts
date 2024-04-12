import { MagicRelatedCardsDto, MagiccardsDto } from "../model/magiccards.model";
import dotenv from 'dotenv';
import axios from "axios";
import PrismaSingleton from "../lib/prisma";

export class magiccardsService {

    //get cards from Scryfall API
    async getCardsFromScryfall(search: string) {
        try {
            //get API url from .env file
            const apiUrl = process.env.SCRYFALL_API_URL;

            let url = apiUrl + encodeURIComponent(search);

            const { data, status } = await axios({
                method: 'get',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            return data

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    async fetchMagicCards(search: string) {
        try {
            dotenv.config();
            const cards = await this.getCardsFromScryfall(search);
            const magicCardRecordArr = await Promise.all(cards.data.map(async (card: MagiccardsDto) => {
                const result = await this.getMagicRelatedcardsFromPrisma(card.id, card.name);
                // if (result !== undefined) { 
                //     console.log(result);
                    
                    return result;
                // }

            }));
            // const result = cards.data.filter(card => {
            //     card
            // })
            return cards.data;
        } catch (error) {
            console.error("An unexpected error occurred:", error);
            return error;
        }
    }

    //get magicrelatedrecords from prisma
    async getMagicRelatedcardsFromPrisma(scryfallId: string, cardName: string) {
        try {
            //get prisma instance from given file.
            const prisma = PrismaSingleton.getInstance();
           
            
            //fetch id from Magiccard table from scryfallId and card name
            let magiccarid: Array<any> = await prisma.$queryRaw`SELECT id FROM magiccards where name = ${cardName} and scryfallId = ${scryfallId}`;
            magiccarid = magiccarid[0].id;

            const magicrelatedrecords: Array<MagicRelatedCardsDto> = await prisma.$queryRaw`SELECT * FROM magicrelatedcards where parentCardId = ${magiccarid}`;
            let maxRelatedCard: MagicRelatedCardsDto[];
            maxRelatedCard = await this.getMaxRelatedCards(magicrelatedrecords);

            return maxRelatedCard;

        } catch (error) {
            console.log(error)
        }
    }


    async getMaxRelatedCards(magicrelatedrecords: Array<MagicRelatedCardsDto>) {
        try {
            const colorOccurrences: { [color: string]: number } = {};

            // Count occurrences of each color
            magicrelatedrecords.forEach(record => {
                colorOccurrences[record.color] = (colorOccurrences[record.color] || 0) + 1;
            });

            // Find max number of occurrences
            const maxOccurrences = Math.max(...Object.values(colorOccurrences));

            // Find colors with max occurrences
            const colorsWithMaxOccurrences = Object.entries(colorOccurrences)
                .filter(([color, occurrences]) => occurrences === maxOccurrences)
                .map(([color]) => color);

            let result: MagicRelatedCardsDto[];

            if (colorsWithMaxOccurrences.length > 1) {
                // If there are multiple colors with max occurrences, find the related cards with the highest magicCardId
                const filteredRecords = magicrelatedrecords.filter(record => colorsWithMaxOccurrences.includes(record.color));
                const maxMagicCardId = Math.max(...filteredRecords.map(record => record.magicCardId));
                result = filteredRecords.filter(record => record.magicCardId === maxMagicCardId);
                return result;
            } else if (colorsWithMaxOccurrences.length === 1) {
                // If there is only one color with max occurrences, directly filter related cards by that color
                result = magicrelatedrecords.filter(record => record.color === colorsWithMaxOccurrences[0]);
                return result;
            }

        } catch (error) {
            throw new Error('Error occurred while processing magic related cards: ' + error);
        }
    }

}

//export the class
export const magiccardsServices = new magiccardsService()