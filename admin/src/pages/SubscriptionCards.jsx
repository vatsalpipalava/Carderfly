/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Ban,
  CirclePlus,
  Ellipsis,
  Eye,
  EyeOff,
  Loader2,
  Settings2,
  Timer,
  TriangleAlert,
} from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  DropdownMenuItem,
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
import { useToast } from "@/components/ui/use-toast";

import { useDebounce } from "@/hooks/useDebounce";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import SheetDashboard from "@/components/navbar/sheetDashboard";
import LogoutDropdown from "@/components/navbar/logoutDropdown";

function SubscriptionCardsRow({ cards, visibleColumns, triggerRefresh }) {
  const { toast } = useToast();
  const axiosPrivate = useAxiosPrivate();

  const [isOpen, setIsOpen] = useState(false);
  const [blockLoading, setBlockLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const start = new Date(cards?.startDate);
  const end = new Date(cards?.endDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedStartDate = start.toLocaleDateString("en-US", options);
  const formattedEndDate = end.toLocaleDateString("en-US", options);

  const handleBlock = async (cardId) => {
    setBlockLoading(true);
    try {
      await axiosPrivate.put(`/admin-data/block-card/${cardId}`, {});
      setBlockLoading(false);
      toast({
        title: "Grate! Success.",
        description: "Card Blocked Successfully.",
      });
      setIsOpen(false);
      triggerRefresh();
    } catch (err) {
      setBlockLoading(false);
      if (!err?.response) {
        setErrMsg("No server response.");
      } else if (err.response?.status === 400) {
        setErrMsg("Card does not exist.");
      } else if (err.response?.status === 404) {
        setErrMsg(err.response?.data?.message);
      } else {
        setErrMsg("Blocking Failed.");
      }
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <div className="flex items-center gap-3">
            <Avatar className="rounded-md">
              <AvatarImage src={cards?.card?.profileImg} />
              <AvatarFallback>
                {cards?.card?.firstName[0]}
                {cards?.card?.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">
                {cards?.card?.firstName} {cards?.card?.lastName}
              </div>
              <div className="text-sm text-muted-foreground">
                {cards?.card?.email}
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div className="font-medium">{cards?.card?.businessName}</div>
          <div className="text-sm text-muted-foreground">
            {cards?.card?.jobTitle}
          </div>
        </TableCell>
        {visibleColumns.plan && (
          <TableCell>
            <Badge className="rounded-md text-xs" variant="outline">
              {cards?.subscriptionPlanId}
            </Badge>
          </TableCell>
        )}
        {visibleColumns.status && (
          <TableCell>
            <div className="flex items-center">
              {cards?.card?.isBlocked ? (
                <>
                  <Ban className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>Blocked</div>
                </>
              ) : (
                <>
                  <Timer className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>{cards?.subscriptionStatus}</div>
                </>
              )}
            </div>
          </TableCell>
        )}
        {visibleColumns.startedAt && (
          <TableCell>
            <div className="text-center">{formattedStartDate}</div>
          </TableCell>
        )}
        {visibleColumns.expiredAt && (
          <TableCell>
            <div className="text-center">{formattedEndDate}</div>
          </TableCell>
        )}
        {visibleColumns.amount && (
          <TableCell className="text-right">
            {cards.subscriptionAmount}
          </TableCell>
        )}
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Ellipsis className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {cards?.card?.isBlocked ? (
                <DropdownMenuItem
                  className="cursor-pointer"
                  disabled
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <div className="flex items-center">
                    <Ban className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div>Already Blocked</div>
                  </div>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <div className="flex items-center">
                    <Ban className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div>Blocked</div>
                  </div>
                </DropdownMenuItem>
              )}

              <Link
                target="_blank"
                to={`${import.meta.env.VITE_CLIENT_FRONTEND_URL}/${cards?.card?.publicLink}`}
              >
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex items-center">
                    <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div>View Cards</div>
                  </div>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          {/* Error Message */}
          {errMsg ? (
            <Alert variant="destructive" className="w-full">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errMsg}</AlertDescription>
            </Alert>
          ) : null}

          <AlertDialogHeader className="items-center">
            <TriangleAlert className="h-10 w-10 text-destructive" />
            <AlertDialogTitle>Confirm Card Block</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to block this card?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="!justify-center">
            <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
            {blockLoading ? (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                className="w-full"
                variant="destructive"
                onClick={() => handleBlock(cards?.cardId)}
              >
                Block Card
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function SubscriptionCards() {
  const axiosPrivate = useAxiosPrivate();
  const [visibleColumns, setVisibleColumns] = useState({
    plan: true,
    status: false,
    startedAt: true,
    expiredAt: true,
    amount: false,
  });
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [planIds, setPlanIds] = useState(["starter", "standard", "premium"]);
  const [startDateSort, setStartDateSort] = useState("desc");
  const [endDateSort, setEndDateSort] = useState("desc");
  // const [statusIds, setStatusIds] = useState(["inProgress"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [subscriptionCards, setSubscriptionCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // &status=${statusIds.join(",")}

  const toggleColumn = (column) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSubscribeCards = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          `/admin-data/get-all-subscription-cards?search=${debouncedSearch}&planId=${planIds.join(",")}&startDateSort=${startDateSort}&endDateSort=${endDateSort}&page=${currentPage}&limit=10`,
          {
            signal: controller.signal,
          }
        );
        if (isMounted) {
          setSubscriptionCards(response?.data?.data?.subscriptionCards);
          setTotalPages(response?.data?.data?.totalPages);
          setLoading(false);
          setErrMsg("");
        }
      } catch (err) {
        setLoading(false);
        if (!err?.response) {
          setErrMsg("No Server Response.");
        } else {
          setErrMsg("Subscription cards retrieved failed.");
        }
      }
    };

    getSubscribeCards();

    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debouncedSearch,
    planIds,
    startDateSort,
    endDateSort,
    currentPage,
    refreshKey,
  ]);
  // statusIds

  useEffect(() => {
    if (subscriptionCards.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [subscriptionCards]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handlePlanFilterChange = (plan) => {
    setPlanIds((prevPlanIds) => {
      if (prevPlanIds.includes(plan)) {
        return prevPlanIds.filter((id) => id !== plan);
      } else {
        return [...prevPlanIds, plan];
      }
    });
  };
  // const handleStatusFilterChange = (status) => {
  //   setStatusIds((prevStatusIds) => {
  //     if (prevStatusIds.includes(status)) {
  //       return prevStatusIds.filter((id) => id !== status);
  //     } else {
  //       return [...prevStatusIds, status];
  //     }
  //   });
  // };

  const handleStartedAtFilterChange = (sort) => {
    setStartDateSort((prevSort) => (prevSort === sort ? "" : sort));
  };

  const handleEndAtFilterChange = (sort) => {
    setEndDateSort((prevSort) => (prevSort === sort ? "" : sort));
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

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <>
      <Helmet>
        <title>Cards | Subscription</title>
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
                <BreadcrumbPage>Subscription</BreadcrumbPage>
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
              <CardTitle>Subscription Cards</CardTitle>
              <CardDescription>
                See information about all subscribed cards.
              </CardDescription>
            </CardHeader>

            {/* Header Desktop */}
            <CardHeader className="hidden flex-row items-center justify-between px-4 pb-4 pt-2 sm:flex">
              <div className="flex items-center gap-2">
                <form>
                  <Input
                    type="search"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Filter transactions..."
                    className="h-8 w-full lg:max-w-[250px]"
                  />
                </form>
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="!mt-0 h-8 border-dashed font-normal"
                    >
                      <CirclePlus className="mr-2 size-4" />
                      Status
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-36">
                    <DropdownMenuLabel>Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuCheckboxItem
                        checked={statusIds.includes("inProgress")}
                        onCheckedChange={() =>
                          handleStatusFilterChange("inProgress")
                        }
                      >
                        In Progress
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={statusIds.includes("expired")}
                        onCheckedChange={() =>
                          handleStatusFilterChange("expired")
                        }
                      >
                        Expired
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu> */}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="!mt-0 h-8 border-dashed font-normal"
                    >
                      <CirclePlus className="mr-2 size-4" />
                      Plan
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-36">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuCheckboxItem
                        checked={planIds.includes("starter")}
                        onCheckedChange={() =>
                          handlePlanFilterChange("starter")
                        }
                      >
                        Starter
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={planIds.includes("standard")}
                        onCheckedChange={() =>
                          handlePlanFilterChange("standard")
                        }
                      >
                        Standard
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={planIds.includes("premium")}
                        onCheckedChange={() =>
                          handlePlanFilterChange("premium")
                        }
                      >
                        Premium
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="!mt-0 h-8 font-normal"
                  >
                    <Settings2 className="mr-2 size-4" />
                    View
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuCheckboxItem
                      checked={visibleColumns.plan}
                      onCheckedChange={() => toggleColumn("plan")}
                    >
                      Plan
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={visibleColumns.status}
                      onCheckedChange={() => toggleColumn("status")}
                    >
                      Status
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={visibleColumns.startedAt}
                      onCheckedChange={() => toggleColumn("startedAt")}
                    >
                      Started At
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={visibleColumns.expiredAt}
                      onCheckedChange={() => toggleColumn("expiredAt")}
                    >
                      Expired At
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={visibleColumns.amount}
                      onCheckedChange={() => toggleColumn("amount")}
                    >
                      Amount
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>

            {/* Header Mobile */}
            <CardHeader className="flex-col items-center justify-between gap-2 px-4 pb-4 pt-2 sm:hidden sm:px-6">
              <form className="w-full">
                <Input
                  type="search"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Filter transactions..."
                  className="h-8 w-full lg:max-w-[250px]"
                />
              </form>
              <div className="grid w-full grid-cols-2 items-center gap-2">
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="!mt-0 h-8 border-dashed font-normal"
                    >
                      <CirclePlus className="mr-2 size-4" />
                      Status
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-36">
                    <DropdownMenuLabel>Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuCheckboxItem
                        checked={statusIds.includes("inProgress")}
                        onCheckedChange={() =>
                          handleStatusFilterChange("inProgress")
                        }
                      >
                        In Progress
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={statusIds.includes("expired")}
                        onCheckedChange={() =>
                          handleStatusFilterChange("expired")
                        }
                      >
                        Expired
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu> */}

                {/* Plan */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="!mt-0 h-8 border-dashed font-normal"
                    >
                      <CirclePlus className="mr-2 size-4" />
                      Plan
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-36">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuCheckboxItem
                        checked={planIds.includes("starter")}
                        onCheckedChange={() =>
                          handlePlanFilterChange("starter")
                        }
                      >
                        Starter
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={planIds.includes("standard")}
                        onCheckedChange={() =>
                          handlePlanFilterChange("standard")
                        }
                      >
                        Standard
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={planIds.includes("premium")}
                        onCheckedChange={() =>
                          handlePlanFilterChange("premium")
                        }
                      >
                        Premium
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Toggle */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="!mt-0 h-8 font-normal"
                    >
                      <Settings2 className="mr-2 size-4" />
                      View
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuCheckboxItem
                        checked={visibleColumns.plan}
                        onCheckedChange={() => toggleColumn("plan")}
                      >
                        Plan
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={visibleColumns.status}
                        onCheckedChange={() => toggleColumn("status")}
                      >
                        Status
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={visibleColumns.startedAt}
                        onCheckedChange={() => toggleColumn("startedAt")}
                      >
                        Started At
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={visibleColumns.expiredAt}
                        onCheckedChange={() => toggleColumn("expiredAt")}
                      >
                        Expired At
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={visibleColumns.amount}
                        onCheckedChange={() => toggleColumn("amount")}
                      >
                        Amount
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="space-y-2 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Company</TableHead>
                      {visibleColumns.plan && <TableHead>Plan</TableHead>}
                      {visibleColumns.status && <TableHead>Status</TableHead>}
                      {visibleColumns.startedAt && (
                        <TableHead className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 data-[state=open]:bg-accent"
                              >
                                Started At
                                {/* <ArrowDown className="ml-2 h-4 w-4" /> */}
                                {startDateSort === "asc" && (
                                  <ArrowUp className="ml-2 h-4 w-4" />
                                )}
                                {startDateSort === "desc" && (
                                  <ArrowDown className="ml-2 h-4 w-4" />
                                )}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-32" align="start">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStartedAtFilterChange("asc")
                                }
                              >
                                <div className="flex items-center">
                                  <ArrowUp className="mr-2 h-4 w-4 text-muted-foreground/70" />
                                  <div>Asc</div>
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStartedAtFilterChange("desc")
                                }
                              >
                                <div className="flex items-center">
                                  <ArrowDown className="mr-2 h-4 w-4 text-muted-foreground/70" />
                                  <div>Desc</div>
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <div className="flex items-center">
                                  <EyeOff className="mr-2 h-4 w-4 text-muted-foreground/70" />
                                  <div>Hide</div>
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableHead>
                      )}
                      {visibleColumns.expiredAt && (
                        <TableHead className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 data-[state=open]:bg-accent"
                              >
                                Expired At
                                {endDateSort === "asc" && (
                                  <ArrowUp className="ml-2 h-4 w-4" />
                                )}
                                {endDateSort === "desc" && (
                                  <ArrowDown className="ml-2 h-4 w-4" />
                                )}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-32" align="start">
                              <DropdownMenuItem
                                onClick={() => handleEndAtFilterChange("asc")}
                              >
                                <div className="flex items-center">
                                  <ArrowUp className="mr-2 h-4 w-4 text-muted-foreground/70" />
                                  <div>Asc</div>
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEndAtFilterChange("desc")}
                              >
                                <div className="flex items-center">
                                  <ArrowDown className="mr-2 h-4 w-4 text-muted-foreground/70" />
                                  <div>Desc</div>
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <div className="flex items-center">
                                  <EyeOff className="mr-2 h-4 w-4 text-muted-foreground/70" />
                                  <div>Hide</div>
                                </div>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableHead>
                      )}
                      {visibleColumns.amount && (
                        <TableHead className="text-right">Amount</TableHead>
                      )}
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notFound ? (
                      <TableRow className="h-24 w-full">
                        <TableCell className="text-center" colSpan="8">
                          No results.
                        </TableCell>
                      </TableRow>
                    ) : (
                      <>
                        {subscriptionCards.map((subscriptionCard) => (
                          <SubscriptionCardsRow
                            key={subscriptionCard._id}
                            cards={subscriptionCard}
                            visibleColumns={visibleColumns}
                            triggerRefresh={triggerRefresh}
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
        <CardTitle>Subscription Cards</CardTitle>
        <CardDescription>
          See information about all subscribed cards.
        </CardDescription>
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

                <TableHead className="text-center">
                  <Skeleton className="h-6 w-full min-w-3" />
                </TableHead>

                <TableHead className="text-center">
                  <Skeleton className="h-6 w-full min-w-3" />
                </TableHead>

                <TableHead className="text-right">
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
        <Skeleton className="h-4 w-20" />
      </TableCell>

      <TableCell>
        <Skeleton className="mx-auto h-4 w-20 text-center" />
      </TableCell>

      <TableCell>
        <Skeleton className="mx-auto h-4 w-20 text-center" />
      </TableCell>

      <TableCell className="text-right">
        <Skeleton className="h-4 w-20" />
      </TableCell>
    </TableRow>
  );
};
