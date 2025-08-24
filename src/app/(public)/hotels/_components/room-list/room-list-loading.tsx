import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {};

const RoomListLoading = (props: Props) => {
  const skeletonRows = [...Array(3)];
  return (
    <div className="overflow-x-auto">
      <Table className="w-full border-collapse">
        <TableHeader>
          <TableRow className="bg-primary border-b divide-x-2 hover:bg-primary">
            <TableHead className="px-6 py-2 text-left text-sm font-semibold text-white">
              Room Type
            </TableHead>
            <TableHead className="px-6 py-2 text-left text-sm font-semibold text-white">
              Guest
            </TableHead>
            <TableHead className="px-6 py-2 text-left text-sm font-semibold text-white">
              Price
            </TableHead>
            <TableHead className="px-6 py-2 text-right text-sm font-semibold text-white">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {skeletonRows.map((_, index) => (
            <TableRow key={index} className="border-b">
              <TableCell className="px-6 py-4">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-48" />
                <div className="flex gap-4 mt-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <Skeleton className="h-3 w-24 mb-1" />
                <Skeleton className="h-3 w-24 mb-1" />
                <Skeleton className="h-4 w-28 mt-2" />
                <Skeleton className="h-5 w-20 mt-2 rounded-full" />
              </TableCell>
              <TableCell className="px-6 py-4 text-right">
                <Skeleton className="h-8 w-24 ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RoomListLoading;
