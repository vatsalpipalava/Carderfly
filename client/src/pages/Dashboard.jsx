/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
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
  CardFooter,
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
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

function TransactionRow({ cardList }) {
  const start = new Date(cardList.startDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedStartDate = start.toLocaleDateString("en-US", options);

  const getPlanName = () => {
    switch (cardList.subscriptionPlanId) {
      case "inr_premium":
        return "Premium";
      case "usd_premium":
        return "Premium";
      case "inr_standard":
        return "Standard";
      case "usd_standard":
        return "Standard";
      case "inr_starter":
        return "Starter";
      case "usd_starter":
        return "Starter";
      default:
        break;
    }
  };

  return (
    <TableRow className="h-24">
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="rounded-md">
            <AvatarImage src={cardList.card.profileImg} />
            <AvatarFallback>
              {cardList.card.firstName[0]}
              {cardList.card.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">
              {cardList.card.firstName} {cardList.card.lastName}
            </div>
            <div className="text-sm text-muted-foreground">
              {cardList.card.email}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="font-medium">{cardList.card.businessName}</div>
        <div className="text-sm text-muted-foreground">
          {cardList.card.jobTitle}
        </div>
      </TableCell>

      <TableCell>
        <Badge className="rounded-md text-xs" variant="outline">
          {getPlanName()}
        </Badge>
      </TableCell>
      <TableCell>
        <p>{formattedStartDate}</p>
      </TableCell>
    </TableRow>
  );
}

function Dashboard() {
  const { setStyle } = useStyle();
  const axiosPrivate = useAxiosPrivate();

  const [subscriptionList, setSubscriptionList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setStyle({
      iconSidebarDisplay: "lg:hidden",
      sidebarDisplay: "lg:block",
      sidebarDashboardPadding: "lg:pl-72",
      iconSidebarDashboardPadding: "sm:pl-14",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getInvoices = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          "/subscribe/recent-subscribe-dashboard",
          {
            signal: controller.signal,
          }
        );
        if (isMounted) {
          setSubscriptionList(response?.data?.data);
          setLoading(false);
          setErrMsg("");
        }
      } catch (err) {
        setLoading(false);
        if (!err?.response) {
          setErrMsg("No Server Response.");
        } else {
          setErrMsg("Recent active card retrieved failed.");
        }
      }
    };

    getInvoices();

    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (subscriptionList.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [subscriptionList]);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 py-3 sm:h-auto">
        <SheetDashboard />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <LogoutDropdown />
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Create Cards</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Introducing Our Dynamic cards for Seamless Management and
                  Insightful Analysis.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link to="/dashboard/create-card">Create new card</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
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
              <CardTitle>Subscribed Card List</CardTitle>
              <CardDescription>Recent cards from yours.</CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              <div className="space-y-2 overflow-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Started At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notFound ? (
                      <TableRow className="h-24 w-full">
                        <TableCell className="text-center" colSpan="8">
                          Not any recent subscribed card.
                        </TableCell>
                      </TableRow>
                    ) : (
                      <>
                        {subscriptionList.map((subscribe) => (
                          <TransactionRow
                            key={subscribe._id}
                            cardList={subscribe}
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
        <CardTitle>Subscribed Card List</CardTitle>
        <CardDescription>Recent cards from yours.</CardDescription>
      </CardHeader>

      <CardHeader className="hidden flex-col items-center px-4 pb-4 pt-2 sm:flex sm:flex-row sm:justify-between">
        <Skeleton className="h-8 w-[250px]" />
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
              {Array.from({ length: 5 }).map((_, index) => (
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
    </TableRow>
  );
};

export default Dashboard;
