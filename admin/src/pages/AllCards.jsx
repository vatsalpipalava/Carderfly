/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { AlertCircle, CirclePlus } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useDebounce } from "@/hooks/useDebounce";
import SheetDashboard from "@/components/navbar/sheetDashboard";
import LogoutDropdown from "@/components/navbar/logoutDropdown";

function AllCardsRow({ cardsList }) {
  return (
    <TableRow className="h-16">
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="rounded-md">
            <AvatarImage src={cardsList?.profileImg} />
            <AvatarFallback>
              {cardsList?.firstName[0]}
              {cardsList?.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">
              {cardsList?.firstName} {cardsList?.lastName}
            </div>
            <div className="text-sm text-muted-foreground">
              {cardsList?.email}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="font-medium">{cardsList?.businessName}</div>
        <div className="text-sm text-muted-foreground">
          {cardsList?.jobTitle}
        </div>
      </TableCell>

      <TableCell>
        <Badge
          className={`rounded-md text-xs ${cardsList?.isBlocked ? "bg-red-500" : cardsList?.isPublic ? "bg-green-500" : "bg-gray-500"}`}
        >
          {cardsList?.isBlocked
            ? "Blocked"
            : cardsList?.isPublic
              ? "Active"
              : "Inactive"}
        </Badge>
      </TableCell>
    </TableRow>
  );
}

export function AllCards() {
  const axiosPrivate = useAxiosPrivate();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [isPublics, setIsPublics] = useState(["true", "false"]);
  const [isBlocks, setIsBlocks] = useState(["true", "false"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [allCards, setAllCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAllCards = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          `/admin-data/get-all-cards?search=${debouncedSearch}&isPublic=${isPublics.join(",")}&isBlocked=${isBlocks.join(",")}&page=${currentPage}&limit=10`,
          {
            signal: controller.signal,
          }
        );
        if (isMounted) {
          setAllCards(response?.data?.data?.allCards);
          setTotalPages(response?.data?.data?.totalPages);
          setLoading(false);
          setErrMsg("");
        }
      } catch (err) {
        setLoading(false);
        if (!err?.response) {
          setErrMsg("No Server Response.");
        } else {
          setErrMsg("Invoices retrieved failed.");
        }
      }
    };

    getAllCards();

    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, isPublics, isBlocks, currentPage]);

  useEffect(() => {
    if (allCards.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [allCards]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleIsPublicFilterChange = (isPublics) => {
    setIsPublics((prevPublics) => {
      if (prevPublics.includes(isPublics)) {
        return prevPublics.filter((id) => id !== isPublics);
      } else {
        return [...prevPublics, isPublics];
      }
    });
  };

  const handleIsBlockedFilterChange = (isBlocks) => {
    setIsBlocks((prevBlocks) => {
      if (prevBlocks.includes(isBlocks)) {
        return prevBlocks.filter((id) => id !== isBlocks);
      } else {
        return [...prevBlocks, isBlocks];
      }
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    const paginationItems = [];

    if (totalPages > 3) {
      if (currentPage > 2) {
        // paginationItems.push(
        //   <PaginationItem key={1}>
        //     <PaginationLink onClick={() => handlePageChange(1)}>
        //       1
        //     </PaginationLink>
        //   </PaginationItem>
        // );
        paginationItems.push(<PaginationEllipsis key="start-ellipsis" />);
      }

      const startPage = Math.max(currentPage - 1, 1);
      const endPage = Math.min(currentPage + 1, totalPages);

      for (let page = startPage; page <= endPage; page++) {
        paginationItems.push(
          <PaginationItem
            className="cursor-pointer"
            key={page}
            active={currentPage === page}
          >
            <PaginationLink
              isActive={currentPage === page}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 1) {
        paginationItems.push(<PaginationEllipsis key="end-ellipsis" />);
        // paginationItems.push(
        //   <PaginationItem key={totalPages}>
        //     <PaginationLink onClick={() => handlePageChange(totalPages)}>
        //       {totalPages}
        //     </PaginationLink>
        //   </PaginationItem>
        // );
      }
    } else {
      for (let page = 1; page <= totalPages; page++) {
        paginationItems.push(
          <PaginationItem
            className="cursor-pointer"
            key={page}
            active={currentPage === page}
          >
            <PaginationLink
              isActive={currentPage === page}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return paginationItems;
  };

  return (
    <>
      <Helmet>
        <title>Cards | All</title>
      </Helmet>
      <header className="fixed top-0 z-50 flex h-14 w-full items-center gap-4 border-b bg-background px-4 md:w-[calc(100%-208px)] lg:h-[60px] lg:w-[calc(100%-256px)] lg:px-6">
        <SheetDashboard />
        <div className="w-full flex-1">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>Cards</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <LogoutDropdown />
      </header>
      <main className="flex flex-1 flex-col gap-4 px-4 pb-4 pt-[72px] lg:gap-6 lg:px-6 lg:pb-6 lg:pt-[84px]">
        {/* Error Message */}
        {errMsg ? (
          <Alert variant="destructive" className="mb-4 w-full">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errMsg}</AlertDescription>
          </Alert>
        ) : null}

        {loading ? (
          <SkeletonCard />
        ) : (
          <Card>
            <CardHeader className="px-6">
              <CardTitle>All Cards</CardTitle>
              <CardDescription>
                See information about all cards.
              </CardDescription>
            </CardHeader>
            <CardHeader className="pt-0">
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <Input
                  type="search"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Filter transactions..."
                  className="h-8 w-full sm:max-w-[250px]"
                />

                <div className="flex w-full items-center gap-2 sm:w-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="!mt-0 h-8 w-full border-dashed font-normal sm:w-auto"
                      >
                        <CirclePlus className="mr-2 size-4" />
                        Public
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-36">
                      <DropdownMenuLabel>Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuCheckboxItem
                          checked={isPublics.includes("true")}
                          onCheckedChange={() =>
                            handleIsPublicFilterChange("true")
                          }
                        >
                          Active
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={isPublics.includes("false")}
                          onCheckedChange={() =>
                            handleIsPublicFilterChange("false")
                          }
                        >
                          Inactive
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="!mt-0 h-8 w-full border-dashed font-normal sm:w-auto"
                      >
                        <CirclePlus className="mr-2 size-4" />
                        Blocked
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-36">
                      <DropdownMenuLabel>Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuCheckboxItem
                          checked={isBlocks.includes("true")}
                          onCheckedChange={() =>
                            handleIsBlockedFilterChange("true")
                          }
                        >
                          True
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={isBlocks.includes("false")}
                          onCheckedChange={() =>
                            handleIsBlockedFilterChange("false")
                          }
                        >
                          False
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="space-y-2 overflow-auto">
                <Table className="w-full">
                  <TableHeader className="bg-muted">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notFound ? (
                      <TableRow className="h-24 w-full">
                        <TableCell className="text-center" colSpan="4">
                          Not any cards.
                        </TableCell>
                      </TableRow>
                    ) : (
                      <>
                        {allCards.map((cards) => (
                          <AllCardsRow key={cards._id} cardsList={cards} />
                        ))}
                      </>
                    )}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination className="!my-0 py-4">
                    <PaginationContent>
                      <PaginationItem className="cursor-pointer">
                        <PaginationPrevious
                          onClick={() =>
                            handlePageChange(Math.max(1, currentPage - 1))
                          }
                        />
                      </PaginationItem>
                      {renderPaginationItems()}
                      <PaginationItem className="cursor-pointer">
                        <PaginationNext
                          onClick={() =>
                            handlePageChange(
                              Math.min(totalPages, currentPage + 1)
                            )
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}

const SkeletonCard = () => {
  return (
    <Card>
      <CardHeader className="px-4">
        <CardTitle>All Cards</CardTitle>
        <CardDescription>See information about all cards.</CardDescription>
      </CardHeader>

      <CardHeader className="hidden flex-col items-center px-4 pb-4 pt-2 sm:flex sm:flex-row sm:justify-between">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-8 w-[100px]" />
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-2 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="h-6 w-full min-w-8" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-6 w-full min-w-2" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-6 w-full min-w-1" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <SkeletonRow key={index} />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

const SkeletonRow = () => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-md" />
          <div>
            <Skeleton className="mb-1 h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </TableCell>

      <TableCell>
        <Skeleton className="mb-1 h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </TableCell>

      <TableCell>
        <Skeleton className="mx-auto h-4 w-20 text-center" />
      </TableCell>
    </TableRow>
  );
};
