import { MagicCardsDto } from "../types/MagicCard";
import NoImg from "../assets/no_image.jpg";
import '../styles/card.css';

const Card = ({ card }: { card: MagicCardsDto }) => {
    return (
        <div className="max-w-xs card bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform-gpu hover:scale-105">
            <div className="row w-full">
                {card.image_uris ?
                    <img className="card-img h-auto" src={card.image_uris?.normal
                    } alt={card.name} /> :
                    <img className="card-img h-auto" src={NoImg
                    } alt={card.name} />
                }

                <div>
                    <div className="px-3 py-2">
                        <div className="font-bold text-l mb-2">{card.name}</div>
                        <p className="text-gray-700 text-base">{card.set_name}</p>
                    </div>
                    <div className="px-3 py-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{card.rarity}</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{card.collector_number}</span>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Card;