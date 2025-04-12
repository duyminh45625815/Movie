"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { Edit, Trash2, Search } from "lucide-react";
import FormAddMovie from "@/components/dashboard2/form.addFlims";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getFilms } from "@/lib/actions";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationLink,
} from "@/components/ui/pagination";
import { useMemo } from "react";
import {Film} from "@/types/index"

export default function FilmManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [films, setFilms] = useState<Film[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const filmsPerPage = 5;

    useEffect(() => {
        const fetchFilms = async () => {
            setLoading(true);
            try {
                const response = await getFilms();
                setFilms(response.results || []);
            } catch (error) {
                console.error("❌ Lỗi khi lấy danh sách phim:", error);
            }
            setLoading(false);
        };
        fetchFilms();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredFilms = useMemo(() => {
        if (!searchTerm) return films;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return films.filter((film) => film.title.toLowerCase().includes(lowerCaseSearch));
    }, [searchTerm, films]);

    const indexOfLastFilm = currentPage * filmsPerPage;
    const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
    const currentFilms = filteredFilms.slice(indexOfFirstFilm, indexOfLastFilm);
    const totalPages = Math.ceil(filteredFilms.length / filmsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="p-8 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">Film Management</h1>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                    <div className="md:flex sm:block justify-between items-center mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search films..."
                                className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                        <FormAddMovie />
                    </div>
                    {loading ? (
                        <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Image</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead className="hidden md:table-cell">Year</TableHead>
                                        <TableHead className="hidden md:table-cell">Description</TableHead>
                                        <TableHead className="hidden sm:table-cell">Age Limit</TableHead>
                                        <TableHead className="hidden lg:table-cell">Duration</TableHead>
                                        <TableHead className="hidden xl:table-cell">Release Date</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentFilms.map((film) => (
                                        <TableRow key={film._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <TableCell>
                                                <Image
                                                   src={`http://localhost:8080${film.image}`}

                                                    alt={`${film.title} poster`}
                                                    width={67}
                                                    height={100}
                                                    className="rounded-md shadow-md object-cover"
                                                />
                                            </TableCell>
                                            <TableCell className="font-semibold">{film.title}</TableCell>
                                            <TableCell className="font-medium hidden md:table-cell">{film.year}</TableCell>
                                            <TableCell className="hidden md:table-cell max-w-xs truncate">{film.description}</TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge variant={film.age >= 18 ? "destructive" : "secondary"}>{film.age}+</Badge>
                                            </TableCell>
                                            <TableCell className="hidden lg:table-cell">{film.timeLength} min</TableCell>
                                            <TableCell className="hidden xl:table-cell">{film.onStage}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem>
                                                            <Edit className="mr-2 h-4 w-4" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>

                {/* Phân trang */}
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => handlePageChange(currentPage - 1)}
                                aria-disabled={currentPage === 1}
                                className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                            />

                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i + 1}>
                                <PaginationLink isActive={currentPage === i + 1} onClick={() => handlePageChange(i + 1)}>
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => handlePageChange(currentPage + 1)}
                                aria-disabled={currentPage === totalPages}
                                className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
