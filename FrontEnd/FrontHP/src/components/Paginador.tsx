import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import { useMemo } from "react";

interface PaginadorProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

export default function Paginador({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}: PaginadorProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 5;

  // Calcula el rango de páginas visibles usando useMemo
  const pageNumbers = useMemo(() => {
    const numbers = [];
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      numbers.push(i);
    }
    return numbers;
  }, [currentPage, maxVisiblePages, totalPages]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage > 1 ? (
            <PaginationPrevious
              href="#"
              onClick={() => paginate(currentPage - 1)}
            />
          ) : (
            <span className="text-gray-400 cursor-not-allowed">Anterior</span>
          )}
        </PaginationItem>

        {pageNumbers[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => paginate(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {pageNumbers.map((number) => (
          <PaginationItem key={number}>
            <PaginationLink
              href="#"
              onClick={() => paginate(number)}
              className={`${
                currentPage === number
                  ? "bg-indigo-500 text-white font-bold"
                  : ""
              } px-3 py-1 rounded`}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => paginate(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          {currentPage < totalPages ? (
            <PaginationNext
              href="#"
              onClick={() => paginate(currentPage + 1)}
            />
          ) : (
            <span className="text-gray-400 cursor-not-allowed">Siguiente</span>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
