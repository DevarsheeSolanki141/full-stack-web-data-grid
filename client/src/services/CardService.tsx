import http from "../http-common";
import { SearchDto } from "../types/MagicCard";

const getMagicRelatedCard = (search: SearchDto) => {
    return http.post("/fetch-magic-card", search);
};

const CardService = {
    getMagicRelatedCard
}
export default CardService;