import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ''
}) => {
  const getPaginationItems = () => {
    const items: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      // When on page 1, show first 5 pages
      if (currentPage <= 3) {
        for (let i = 1; i <= Math.min(5, totalPages); i++) {
          items.push(i);
        }
        // Add ellipsis and last page if there are more pages
        if (totalPages > 5) {
          items.push('ellipsis-end');
          items.push(totalPages);
        }
      } else {
        // Calculate the start and end of the window around current page
        const windowStart = Math.max(1, currentPage - 2);
        const windowEnd = Math.min(totalPages, currentPage + 2);
        
        // Add pages in the window around current page
        for (let i = windowStart; i <= windowEnd; i++) {
          items.push(i);
        }
        
        // Add ellipsis and last page if needed
        if (windowEnd < totalPages) {
          if (windowEnd < totalPages - 1) {
            items.push('ellipsis-end');
          }
          items.push(totalPages);
        }
      }
    }
    
    return items;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`pagination-controls ${className}`}>
      {/* Previous Button */}
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-nav"
        aria-label="Previous page"
      >
        &#8249;
      </button>
      
      {/* Page Numbers */}
      <div className="pagination-numbers">
        {getPaginationItems().map((item, index) => {
          if (typeof item === 'string') {
            // Render ellipsis
            return (
              <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                ...
              </span>
            );
          } else {
            // Render page number
            return (
              <button
                key={item}
                onClick={() => onPageChange(item)}
                className={`pagination-number ${currentPage === item ? 'active' : ''}`}
                aria-label={`Go to page ${item}`}
                aria-current={currentPage === item ? 'page' : undefined}
              >
                {item}
              </button>
            );
          }
        })}
      </div>
      
      {/* Next Button */}
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-nav"
        aria-label="Next page"
      >
        &#8250;
      </button>
    </div>
  );
};

export default Pagination;
