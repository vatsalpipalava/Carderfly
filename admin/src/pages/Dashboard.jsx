/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import {
  Activity,
  AlertCircle,
  CreditCard,
  DollarSign,
  Timer,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import SheetDashboard from "@/components/navbar/sheetDashboard";
import LogoutDropdown from "@/components/navbar/logoutDropdown";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

function SubscribeRow({ cardList }) {
  const start = new Date(cardList.startDate);
  const end = new Date(cardList.endDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedStartDate = start.toLocaleDateString("en-US", options);
  const formattedEndDate = end.toLocaleDateString("en-US", options);

  return (
    <TableRow className="h-24">
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="rounded-md">
            <AvatarImage src={cardList?.card?.profileImg} />
            <AvatarFallback>
              {cardList?.card?.firstName[0]}
              {cardList?.card?.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">
              {cardList?.card?.firstName} {cardList?.card?.lastName}
            </div>
            <div className="text-sm text-muted-foreground">
              {cardList?.card?.email}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="font-medium">{cardList?.card?.businessName}</div>
        <div className="text-sm text-muted-foreground">
          {cardList?.card?.jobTitle}
        </div>
      </TableCell>

      <TableCell>
        <Badge className="rounded-md text-xs" variant="outline">
          {cardList?.subscriptionPlanId}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <Timer className="mr-2 h-5 w-5 text-muted-foreground" />
          <div>{cardList?.subscriptionStatus}</div>
        </div>
      </TableCell>
      <TableCell>
        <p>{formattedStartDate}</p>
      </TableCell>
      <TableCell>
        <p>{formattedEndDate}</p>
      </TableCell>
    </TableRow>
  );
}

export function Dashboard() {
  const axiosPrivate = useAxiosPrivate();

  const [recentSubscriptionList, setRecentSubscriptionList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getRecentSubscription = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          "/admin-data/get-recent-subscribed-cards",
          {
            signal: controller.signal,
          }
        );
        if (isMounted) {
          setRecentSubscriptionList(response?.data?.data);
          setLoading(false);
          setErrMsg("");
        }
      } catch (err) {
        setLoading(false);
        if (!err?.response) {
          setErrMsg("No Server Response.");
        } else if (err.response?.status === 404) {
          setNotFound(true);
        } else {
          setErrMsg("Recent active card retrieved failed.");
        }
      }
    };

    getRecentSubscription();

    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (recentSubscriptionList.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [recentSubscriptionList]);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <header className="fixed top-0 z-50 flex h-14 w-full items-center gap-4 border-b bg-background px-4 md:w-[calc(100%-208px)] lg:h-[60px] lg:w-[calc(100%-256px)] lg:px-6">
        <SheetDashboard />
        <div className="w-full flex-1">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <LogoutDropdown />
      </header>
      <main className="flex flex-1 flex-col gap-4 px-4 pb-4 pt-[72px] lg:gap-6 lg:px-6 lg:pb-6 lg:pt-[84px]">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscriptions
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>

        {loading ? (
          <SkeletonCard />
        ) : (
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle>Recent Subscribed Card List</CardTitle>
              <CardDescription>
                See information about recent subscribed cards
              </CardDescription>
            </CardHeader>

            {/* Error Message */}
            {errMsg ? (
              <Alert variant="destructive" className="mx-auto mb-4 w-[97%]">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errMsg}</AlertDescription>
              </Alert>
            ) : null}

            <CardContent className="p-0">
              <div className="space-y-2 overflow-auto">
                <Table className="w-full">
                  <TableHeader className="bg-muted">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Started At</TableHead>
                      <TableHead>Ended At</TableHead>
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
                        {recentSubscriptionList.map((subscribed) => (
                          <SubscribeRow
                            key={subscribed._id}
                            cardList={subscribed}
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
        <CardTitle>Recent Subscribed Card List</CardTitle>
        <CardDescription>
          See information about recent subscribed cards
        </CardDescription>
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
