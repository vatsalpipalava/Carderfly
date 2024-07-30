/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useStyle from "@/hooks/useStyle";
import SheetDashboard from "@/components/modules/navbar/sheetDashboard";
import LogoutDropdown from "@/components/modules/navbar/logoutDropdown";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuRadioGroup,
  // DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CirclePlus,
  Download,
  Ellipsis,
  EyeOff,
  NotebookText,
  Settings2,
  Timer,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/hooks/useDebounce";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

function TransactionRow({ transaction, visibleColumns }) {
  // const [status, setStatus] = useState("");

  // useEffect(() => {
  //   const now = new Date();
  //   const endDate = new Date(transaction.endDate);

  //   if (endDate >= now) {
  //     setStatus("In Progress");
  //   } else {
  //     setStatus("Expired");
  //   }
  // }, [transaction.endDate]);

  const start = new Date(transaction.startDate);
  const end = new Date(transaction.endDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedStartDate = start.toLocaleDateString("en-US", options);
  const formattedEndDate = end.toLocaleDateString("en-US", options);

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="rounded-md">
            <AvatarImage src={transaction.card.profileImg} />
            <AvatarFallback>
              {transaction.card.firstName[0]}
              {transaction.card.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">
              {transaction.card.firstName} {transaction.card.lastName}
            </div>
            <div className="text-sm text-muted-foreground">
              {transaction.card.email}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="font-medium">{transaction.card.businessName}</div>
        <div className="text-sm text-muted-foreground">
          {transaction.card.jobTitle}
        </div>
      </TableCell>
      {visibleColumns.plan && (
        <TableCell>
          <Badge className="rounded-md text-xs" variant="outline">
            {transaction.subscriptionPlanId}
          </Badge>
        </TableCell>
      )}
      {visibleColumns.status && (
        <TableCell>
          <div className="flex items-center">
            <Timer className="mr-2 h-5 w-5 text-muted-foreground" />
            <div>{transaction.subscriptionStatus}</div>
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
          {transaction.subscriptionAmount}
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
            <Link to={`/dashboard/invoice/${transaction._id}`}>
            <DropdownMenuItem>
              <div className="flex items-center">
                <NotebookText className="mr-2 h-4 w-4 text-muted-foreground" />
                <div>Open Invoice</div>
              </div>
            </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <div className="flex items-center">
                <Download className="mr-2 h-4 w-4 text-muted-foreground" />
                <div>Download Invoice</div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export function Transactions() {
  const { setStyle } = useStyle();
  const axiosPrivate = useAxiosPrivate();
  const [visibleColumns, setVisibleColumns] = useState({
    plan: true,
    status: true,
    startedAt: true,
    expiredAt: true,
    amount: true,
  });
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [planIds, setPlanIds] = useState(["starter", "standard", "premium"]);
  const [startDateSort, setStartDateSort] = useState("desc");
  const [endDateSort, setEndDateSort] = useState("desc");
  const [statusIds, setStatusIds] = useState(["inProgress", "expired"]);
  console.log("🚀 ~ Transactions ~ statusIds:", statusIds);

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [notFound, setNotFound] = useState(false);

  const toggleColumn = (column) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  useEffect(() => {
    setStyle({
      iconSidebarDisplay: "lg:hidden",
      sidebarDisplay: "lg:block",
      sidebarDashboardPadding: "lg:pl-72",
      iconSidebarDashboardPadding: "sm:pl-14",
    });
  }, [setStyle]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getInvoices = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          `/invoice/get-invoices?search=${debouncedSearch}&planId=${planIds.join(",")}&status=${statusIds.join(",")}&startDateSort=${startDateSort}&endDateSort=${endDateSort}`,
          {
            signal: controller.signal,
          }
        );
        if (isMounted) {
          console.log(response?.data?.data);
          setInvoices(response?.data?.data);
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

    getInvoices();

    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, planIds, startDateSort, endDateSort, statusIds]);

  useEffect(() => {
    if (invoices.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [invoices]);

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
  const handleStatusFilterChange = (status) => {
    setStatusIds((prevStatusIds) => {
      if (prevStatusIds.includes(status)) {
        return prevStatusIds.filter((id) => id !== status);
      } else {
        return [...prevStatusIds, status];
      }
    });
  };

  const handleStartedAtFilterChange = (sort) => {
    setStartDateSort((prevSort) => (prevSort === sort ? "" : sort));
  };

  const handleEndAtFilterChange = (sort) => {
    setEndDateSort((prevSort) => (prevSort === sort ? "" : sort));
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 py-3 sm:h-auto">
        <SheetDashboard />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Transactions</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <LogoutDropdown />
      </header>
      <main className="mt-6 px-2 pb-2 sm:mt-0 sm:px-6 sm:pb-6">
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
            <CardHeader className="px-4">
              <CardTitle>Transactions</CardTitle>
              <CardDescription>Recent orders from your store.</CardDescription>
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
                <DropdownMenu>
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
                </DropdownMenu>
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
                    {/* <DropdownMenuCheckboxItem
                        checked={visibleColumns.role}
                        onCheckedChange={() => toggleColumn("role")}
                      >
                        Role
                      </DropdownMenuCheckboxItem> */}
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
              <div className="grid w-full grid-cols-3 items-center gap-2">
                <DropdownMenu>
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
                </DropdownMenu>

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
                      {/* <DropdownMenuCheckboxItem
                        checked={visibleColumns.role}
                        onCheckedChange={() => toggleColumn("role")}
                      >
                        Role
                      </DropdownMenuCheckboxItem> */}
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
                              {/* <DropdownMenuRadioGroup
                                value={startDateSort}
                                onValueChange={setStartDateSort}
                              >
                                <DropdownMenuRadioItem value="asc">
                                  <div className="flex items-center">
                                    <ArrowUp className="mr-2 h-4 w-4 text-muted-foreground/70" />
                                    <div>Asc</div>
                                  </div>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="desc">
                                  <div className="flex items-center">
                                    <ArrowDown className="mr-2 h-4 w-4 text-muted-foreground/70" />
                                    <div>Desc</div>
                                  </div>
                                </DropdownMenuRadioItem>
                              </DropdownMenuRadioGroup> */}
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
                                {/* <ArrowDown className="ml-2 h-4 w-4" /> */}
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
                              {/* <DropdownMenuRadioGroup
                                value={endDateSort}
                                onValueChange={setEndDateSort}
                              >
                                <DropdownMenuRadioItem value="asc">
                                  <div className="flex items-center">
                                    <ArrowUp className="mr-2 h-4 w-4 text-muted-foreground/70" />
                                    <div>Asc</div>
                                  </div>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="desc">
                                  <div className="flex items-center">
                                    <ArrowDown className="mr-2 h-4 w-4 text-muted-foreground/70" />
                                    <div>Desc</div>
                                  </div>
                                </DropdownMenuRadioItem>
                              </DropdownMenuRadioGroup> */}
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
                        {invoices.map((invoice) => (
                          <TransactionRow
                            key={invoice._id}
                            transaction={invoice}
                            visibleColumns={visibleColumns}
                          />
                        ))}
                      </>
                    )}
                  </TableBody>
                </Table>
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
        <CardTitle>Transactions</CardTitle>
        <CardDescription>Recent orders from your store.</CardDescription>
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

                <TableHead className="text-center">
                  <Skeleton className="h-6 w-full min-w-3" />
                </TableHead>

                <TableHead className="text-center">
                  <Skeleton className="h-6 w-full min-w-3" />
                </TableHead>

                <TableHead className="text-right">
                  <Skeleton className="h-6 w-full min-w-3" />
                </TableHead>

                <TableHead className="text-right">
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
        <Skeleton className="h-4 w-20" />
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

      <TableCell>
        <Skeleton className="mx-auto h-4 w-20 text-center" />
      </TableCell>

      <TableCell className="text-right">
        <Skeleton className="h-4 w-20" />
      </TableCell>

      <TableCell className="text-right">
        <Skeleton className="mx-auto h-8 w-8" />
      </TableCell>
    </TableRow>
  );
};

export default Transactions;
