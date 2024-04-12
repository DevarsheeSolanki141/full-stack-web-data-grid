import SearchBar from '../component/SearchBar';
import tcgLogo from "../assets/tcg_logo.jpg";
const SearchCard = () => {
  return (
    <>
      <nav className="bg-gray-800 shadow">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <img className="text-white text-2xl font-bold" style={{ width: '40%' }} src={tcgLogo}></img>
            </div>

          </div>
        </div>
      </nav>
      <SearchBar></SearchBar>
    </>
  );
};

export default SearchCard;