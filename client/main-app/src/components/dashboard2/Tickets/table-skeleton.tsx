import type { FC } from "react"
import { TableRow, TableCell } from "@/components/ui/table"

interface TableSkeletonProps {
  rowCount: number
}

export const TableSkeleton: FC<TableSkeletonProps> = ({ rowCount }) => {
  return (
    <>
      {Array(rowCount)
        .fill(0)
        .map((_, index) => (
          <TableRow key={index} className="animate-pulse">
            <TableCell>
              <div className="h-4 w-16 bg-muted rounded"></div>
            </TableCell>
            <TableCell>
              <div className="h-6 w-24 bg-muted rounded"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 w-32 bg-muted rounded"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 w-28 bg-muted rounded"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 w-28 bg-muted rounded"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 w-12 bg-muted rounded"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 w-20 bg-muted rounded"></div>
            </TableCell>
            <TableCell>
              <div className="h-8 w-8 bg-muted rounded-full"></div>
            </TableCell>
          </TableRow>
        ))}
    </>
  )
}

