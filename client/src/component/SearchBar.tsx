import { useState } from 'react';
import CardService from "../services/CardService";
import CardsPage from '../pages/CardsPage';

import LoadingSpinner from '../component/LoadingSpinner';

const SearchBar = () => {

  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setIsLoading(true);
    setQuery(value);
    // Debounce the search function to limit API requests
    debounceSearch(value);
  };

  const debounceSearch = (value: string) => {

    // Cancel the previous timeout if it exists
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout to call searchCards after 1000ms (1 second)
    const newTimeout = setTimeout(() => {
      searchCards(value);
    }, 1000);

    // Update the debounceTimeout state
    setDebounceTimeout(newTimeout);

  };

  const searchCards = async (value: string) => {
    try {
      // Make API request to Node endpoint
      CardService.getMagicRelatedCard({ search: value }).then((response: any) => {
        setCards(response.data);
        setIsLoading(false);
      })
        .catch((e: Error) => {
          console.log(e);
        });
    } catch (error) {
      console.error('Error searching cards:', error);
    }
  };

  return (
    <div>
      <input
        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal m-10"
        type="email"
        placeholder="Search for card..."
        onChange={handleChange}
        value={query}
      ></input>
      {
        isLoading ? <LoadingSpinner></LoadingSpinner> :
          cards.length > 0 ? <CardsPage cards={cards}></CardsPage>
            : <div className="p-8">
              <h1 className="text-3xl font-bold text-center text-orange-600 mb-4">Welcome to TCG Machines</h1>
              <p className="text-lg text-gray-700 mb-2">Find out your favourite Magic card using search on top</p>
            </div>
      }
    </div>
  );
};

export default SearchBar;