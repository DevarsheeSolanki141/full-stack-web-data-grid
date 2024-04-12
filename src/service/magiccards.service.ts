import { MagicRelatedCardsDto } from "../model/magiccards.model";
import dotenv from 'dotenv';
import axios from "axios";
import PrismaSingleton from "../lib/prisma";

export class magiccardsService {

    async fetchMagicCards(search: string) {
        try {
            dotenv.config();
            const cards = await this.getCardsFromScryfall(search);
            const magicCardRecordArr = await Promise.all(cards.data.map(async (card: MagicRelatedCardsDto) => {
                const result = await this.getMagicRelatedcardsFromPrisma(card);
                return result;
            }));

            return magicCardRecordArr;
        } catch (error) {
            console.error("An unexpected error occurred:", error);
            return error;
        }
    }

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
            console.error("An unexpected error occurred:", error);
            return error;
        }
    }

    //get magicrelatedrecords from prisma
    async getMagicRelatedcardsFromPrisma(card: MagicRelatedCardsDto) {
        try {
            // Get Prisma instance
            const prisma = PrismaSingleton.getInstance();

            // Get card details
            const { id: scryfallId, name: cardName } = card;

            // Fetch ID from Magiccard table based on scryfallId and card name
            const result: MagicRelatedCardsDto[] = await prisma.$queryRaw`SELECT id FROM magiccards WHERE name = ${cardName} AND scryfallId = ${scryfallId}`;

            if (result.length > 0) {
                const magiccarId = result[0].id;

                // Fetch related magic cards
                const magicrelatedrecords: MagicRelatedCardsDto[] = await prisma.$queryRaw`
                    SELECT magicCardId, color,name as magic_relatedcard_name, COUNT(*) AS colorCount
                    FROM magicrelatedcards
                    WHERE magicrelatedcards.parentCardId = ${magiccarId}
                    GROUP BY color 
                    HAVING COUNT(*) = (
                        SELECT MAX(colorCount)
                        FROM (
                            SELECT COUNT(*) AS colorCount
                            FROM magicrelatedcards
                            WHERE magicrelatedcards.parentCardId = ${magiccarId}
                            GROUP BY color
                        ) AS maxCounts
                    )
                    ORDER BY magicCardId DESC
                    LIMIT 1
                `;

                if (magicrelatedrecords.length > 0) {
                    const magicrelatedcard = magicrelatedrecords[0];
                    // Serialize the data to JSON
                    const serializedData = JSON.stringify(magicrelatedcard, (key, value) => {
                        // Convert BigInt values to strings
                        if (typeof value === 'bigint') {
                            return value.toString();
                        }
                        return value; // Return other values as is
                    });

                    return { ...card, magic_related_card: JSON.parse(serializedData) };
                } else {
                    return card;
                }
            } else {
                return card;
            }
        } catch (error) {
            throw error;
        }
    }

}

export const magiccardsServices = new magiccardsService()