import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Card from '../component/CardBlock';
import { MagicCardsDto } from '../types/MagicCard';
import Container from '../pages/Container';
import '../styles/card.css';

const CardsPage = ({ cards }: { cards: [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8; // Number of cards per page

  // Calculate index of the first and last card on the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const totalPages = cards.length / cardsPerPage;
  const handlePageChange = ({ selected }: { selected: number }) => {
    onPageChange(selected + 1);
  };
  const onPageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    // <Container>
    <div className="container mx-auto px-4 py-8">
      <div className='mb-5'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Render cards for the current page */}
        
        {currentCards.map((card: MagicCardsDto) => (
          <Card card={card} key={card.name}></Card>
        ))}
        </div>
      </div>
      {/* Pagination */}
     
      <div>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        nextClassName={'page-item'}
        onPageChange={handlePageChange}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
        forcePage={currentPage - 1}
      />
      </div>
    </div>
    // </Container>
  );
};

export default CardsPage;
