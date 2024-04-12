import SearchBar from '../component/SearchBar';
import tcgLogo from "../assets/tcg_logo.jpg";
const SearchCard = () => {
  return (
    // <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <>
       <nav className="bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <img className="text-white text-2xl font-bold" style={{width:'40%'}} src={tcgLogo}></img>
          </div>
          
        </div>
      </div>
    </nav>
      <SearchBar></SearchBar>
    </>
  );
};

export default SearchCard;