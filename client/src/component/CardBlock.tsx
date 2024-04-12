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
                {/* Card Details */}
                <div className="p-2">
                    <h3 className="text-l font-semibold mb-1">{card.name}</h3>
                    <p className="text-gray-600 mb-1 truncate">{card.set_name}</p>
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-600 text-sm font-semibold">{card.rarity}</p>
                        <p className="text-gray-600 text-sm font-semibold">{card.collector_number}</p>
                    </div>

                    {card.magic_related_card &&
                        <div className="flex justify-between items-center">
                            <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">{card.magic_related_card.magic_relatedcard_name}</span>
                            <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">{card.magic_related_card.color}</span>
                        </div>}
                </div>
            </div>
        </div>

    );
};

export default Card;