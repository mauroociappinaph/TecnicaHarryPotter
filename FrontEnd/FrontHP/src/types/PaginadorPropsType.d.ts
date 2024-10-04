export interface PaginadorProps {
    itemsPerPage: number;
    totalItems: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
}