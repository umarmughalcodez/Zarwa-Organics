// components/admin/OrdersPagination.tsx
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OrdersPaginationProps {
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
}

export function OrdersPagination({
  pagination,
  onPageChange,
}: OrdersPaginationProps) {
  const { page, totalPages, totalCount } = pagination;

  if (totalPages <= 1) return null;

  return (
    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
      <div className="text-sm text-gray-700">
        Showing {(page - 1) * pagination.limit + 1} to{" "}
        {Math.min(page * pagination.limit, totalCount)} of {totalCount} results
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Page numbers */}
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (page <= 3) {
            pageNum = i + 1;
          } else if (page >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = page - 2 + i;
          }

          return (
            <Button
              key={pageNum}
              variant={page === pageNum ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(pageNum)}
              className={page === pageNum ? "bg-[#8BBE67] text-white" : ""}
            >
              {pageNum}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
