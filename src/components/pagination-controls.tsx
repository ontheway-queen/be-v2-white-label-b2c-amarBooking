import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PaginationEllipsis } from './ui/pagination';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
};

export const PaginationControls = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
}: PaginationProps) => {
  const maxVisible = 5;

  const generatePageButtons = () => {
    const pages = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    // Adjust if we're near the end
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // Show first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(
        <Button
          size={'sm'}
          key={1}
          variant={currentPage === 1 ? 'default' : 'outline'}
          onClick={() => onPageChange(1)}
        >
          1
        </Button>
      );

      if (startPage > 2) {
        pages.push(<PaginationEllipsis key='start-ellipsis' />);
      }
    }

    // Middle page buttons
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          size={'sm'}
          key={i}
          variant={i === currentPage ? 'default' : 'outline'}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>
      );
    }

    // Show last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<PaginationEllipsis key='end-ellipsis' />);
      }

      pages.push(
        <Button
          size={'sm'}
          key={totalPages}
          variant={currentPage === totalPages ? 'default' : 'outline'}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  return (
    <div className='flex items-center justify-between mt-4 gap-4 flex-wrap'>
      <div className='flex items-center gap-2 flex-wrap'>
        <Button
          size={'sm'}
          variant='outline'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>

        {generatePageButtons()}

        <Button
          size={'sm'}
          variant='outline'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      <div className='flex items-center gap-2'>
        <span className='text-sm'>Rows per page:</span>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger className='w-[80px]'>
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
