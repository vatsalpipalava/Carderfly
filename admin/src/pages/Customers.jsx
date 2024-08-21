/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { AlertCircle, CirclePlus, LogIn } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
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

import { useDebounce } from "@/hooks/useDebounce";
import SheetDashboard from "@/components/navbar/sheetDashboard";
import LogoutDropdown from "@/components/navbar/logoutDropdown";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

function CustomerRow({ customerList }) {
  return (
    <TableRow className="h-16">
      <TableCell className="min-w-36">
        <div className="font-medium">
          {customerList?.firstName} {customerList?.lastName}
        </div>
      </TableCell>
      <TableCell>
        <div className="font-medium">{customerList?.email}</div>
      </TableCell>

      <TableCell>
        <div className="flex items-center">
          <LogIn className="mr-2 h-5 w-5 text-muted-foreground" />
          <div className="font-medium">{customerList?.loginType}</div>
        </div>
      </TableCell>

      <TableCell>
        <Badge className="rounded-md text-xs" variant="outline">
          {customerList?.isEmailVerified ? "True" : "False"}
        </Badge>
      </TableCell>
    </TableRow>
  );
}

export function Customers() {
  const axiosPrivate = useAxiosPrivate();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [loginTypes, setLoginTypes] = useState(["EMAIL_PASSWORD", "GOOGLE"]);
  const [isEmailVerifies, setIsEmailVerifies] = useState(["true", "false"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCustomers = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          `/admin-data/get-all-customers?search=${debouncedSearch}&loginType=${loginTypes.join(",")}&isEmailVerified=${isEmailVerifies.join(",")}&page=${currentPage}&limit=10`,
          {
            signal: controller.signal,
          }
        );
        if (isMounted) {
          setCustomers(response?.data?.data?.users);
          setTotalPages(response?.data?.data?.totalPages);
          setLoading(false);
          setErrMsg("");
        }
      } catch (err) {
        setLoading(false);
        if (!err?.response) {
          // console.error("Error fetching cards:", err);
          setErrMsg("No Server Response.");
        } else {
          setErrMsg("Invoices retrieved failed.");
        }
      }
    };

    getCustomers();

    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, loginTypes, isEmailVerifies, currentPage]);

  useEffect(() => {
    if (customers.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [customers]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleLoginTypeFilterChange = (type) => {
    setLoginTypes((prevLoginTypes) => {
      if (prevLoginTypes.includes(type)) {
        return prevLoginTypes.filter((id) => id !== type);
      } else {
        return [...prevLoginTypes, type];
      }
    });
  };

  const handleEmailVerifiedFilterChange = (verified) => {
    setIsEmailVerifies((prevEmailVerifies) => {
      if (prevEmailVerifies.includes(verified)) {
        return prevEmailVerifies.filter((id) => id !== verified);
      } else {
        return [...prevEmailVerifies, verified];
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
        <title>Customers</title>
      </Helmet>
      <header className="fixed top-0 z-50 flex h-14 w-full items-center gap-4 border-b bg-background px-4 md:w-[calc(100%-208px)] lg:h-[60px] lg:w-[calc(100%-256px)] lg:px-6">
        <SheetDashboard />
        <div className="w-full flex-1">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Customers</BreadcrumbPage>
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
              <CardTitle>Customers</CardTitle>
              <CardDescription>
                See information about all customers.
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
                        Login Type
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-40">
                      <DropdownMenuLabel>Types</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuCheckboxItem
                          checked={loginTypes.includes("EMAIL_PASSWORD")}
                          onCheckedChange={() =>
                            handleLoginTypeFilterChange("EMAIL_PASSWORD")
                          }
                        >
                          Email Password
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={loginTypes.includes("GOOGLE")}
                          onCheckedChange={() =>
                            handleLoginTypeFilterChange("GOOGLE")
                          }
                        >
                          Google
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
                        Email Verification
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-36">
                      <DropdownMenuLabel>Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuCheckboxItem
                          checked={isEmailVerifies.includes("true")}
                          onCheckedChange={() =>
                            handleEmailVerifiedFilterChange("true")
                          }
                        >
                          True
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={isEmailVerifies.includes("false")}
                          onCheckedChange={() =>
                            handleEmailVerifiedFilterChange("false")
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
                      <TableHead className="min-w-36">Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Login Type</TableHead>
                      <TableHead>Email Verified</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notFound ? (
                      <TableRow className="h-24 w-full">
                        <TableCell className="text-center" colSpan="4">
                          Not any registered customers.
                        </TableCell>
                      </TableRow>
                    ) : (
                      <>
                        {customers.map((customer) => (
                          <CustomerRow
                            key={customer._id}
                            customerList={customer}
                          />
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
        <CardTitle>Customers</CardTitle>
        <CardDescription>See information about all customers.</CardDescription>
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
                <TableHead>
                  <Skeleton className="h-6 w-full min-w-3" />
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
        <Skeleton className="h-4 w-20" />
      </TableCell>

      <TableCell>
        <Skeleton className="mx-auto h-4 w-20 text-center" />
      </TableCell>

      <TableCell>
        <div className="flex items-center">
          <Skeleton className="mr-2 h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </TableCell>

      <TableCell>
        <Skeleton className="mx-auto h-4 w-20 text-center" />
      </TableCell>
    </TableRow>
  );
};
