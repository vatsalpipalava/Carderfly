import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import {
  AlertCircle,
  Check,
  CrownIcon,
  EllipsisVertical,
  Eye,
  LinkIcon,
  ListFilter,
  Loader2,
  PencilLine,
  Search,
  Trash2,
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  CardFooter,
  CardHeader,
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
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

import useStyle from "@/hooks/useStyle";
import SheetDashboard from "@/components/modules/navbar/sheetDashboard";
import LogoutDropdown from "@/components/modules/navbar/logoutDropdown";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useDebounce } from "@/hooks/useDebounce";

function MyCards() {
  const { toast } = useToast();
  const { setStyle } = useStyle();
  const axiosPrivate = useAxiosPrivate();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [copiedStates, setCopiedStates] = useState({});

  const [isOpen, setIsOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteErrMsg, setDeleteErrMsg] = useState("");
  const [deleteRefresh, setDeleteRefresh] = useState(false);

  const [filters, setFilters] = useState({
    active: true,
    inactive: true,
    blocked: true,
  });

  useEffect(() => {
    setStyle({
      iconSidebarDisplay: "lg:flex",
      sidebarDisplay: "lg:hidden",
      sidebarDashboardPadding: "",
      iconSidebarDashboardPadding: "sm:pl-14",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCards = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          // "/card/get-cards?search=" + debouncedSearch,
          `/card/get-cards?search=${debouncedSearch}&active=${filters.active}&inactive=${filters.inactive}&blocked=${filters.blocked}`,
          {
            signal: controller.signal,
          }
        );
        if (isMounted) {
          setCards(response?.data?.data?.cards);
          setLoading(false);
          setNotFound(false);
          setErrMsg("");
        }
      } catch (err) {
        setLoading(false);
        if (!err?.response) {
          console.error("Error fetching cards:", err);
          setErrMsg("No Server Response.");
        } else if (err.response?.status === 404) {
          setNotFound(true);
        } else {
          setErrMsg("Cards retrieved failed.");
        }
      }
    };

    getCards();

    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, filters, deleteRefresh]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCopy = (publicLink) => {
    const copyText = `${import.meta.env.VITE_FRONTEND_URL}/${publicLink}`;

    // Fallback for all devices
    const textArea = document.createElement("textarea");
    textArea.value = copyText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setCopiedStates({ ...copiedStates, [publicLink]: true });
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [publicLink]: false });
    }, 3000); // Reset copied state after 3000 milliseconds
  };

  const handleDelete = async (cardId) => {
    setDeleteLoading(true);
    setDeleteErrMsg("");
    setDeleteRefresh(false);
    try {
      await axiosPrivate.delete(`/card/delete-card/${cardId}`);
      setDeleteLoading(false);
      toast({
        description: "Card Deleted Successfully.",
      });
      setIsOpen(false);
      setDeleteRefresh(true);
    } catch (err) {
      setDeleteLoading(false);
      if (!err?.response) {
        setDeleteErrMsg("No server response.");
      } else if (err.response?.status === 400) {
        setDeleteErrMsg(err.response?.data?.message);
      } else {
        setDeleteErrMsg("Delete Card Failed.");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>My Cards</title>
      </Helmet>
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
              <BreadcrumbPage>My Cards</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <LogoutDropdown />
      </header>
      <div className="mt-4 px-4 sm:mt-0 sm:px-6">
        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:gap-6">
          <h3 className="scroll-m-20 text-left text-2xl font-semibold">
            My Cards
          </h3>
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 gap-3 text-sm"
                >
                  <ListFilter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuLabel>Filters</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuCheckboxItem
                    checked={filters.active}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({ ...prev, active: checked }))
                    }
                  >
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.inactive}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({ ...prev, inactive: checked }))
                    }
                  >
                    Inactive
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.blocked}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({ ...prev, blocked: checked }))
                    }
                  >
                    Blocked
                  </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="relative ml-auto w-full flex-1 md:grow-0">
              <form>
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  value={search}
                  onChange={handleSearchChange}
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
              </form>
            </div>
          </div>
        </div>
        <Separator className="mt-4 sm:mt-6" />
      </div>

      <div className="px-4 sm:px-6">
        {/* Error Message */}
        {errMsg ? (
          <Alert variant="destructive" className="w-full">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errMsg}</AlertDescription>
          </Alert>
        ) : null}
      </div>

      {loading ? (
        <main className="mb-4 grid flex-1 grid-cols-1 items-start gap-4 p-4 sm:mb-6 sm:grid-cols-2 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </main>
      ) : notFound ? (
        <div className="flex h-[73vh] w-full items-center justify-center">
          <div className="border-b pb-2 text-lg font-semibold">
            Card Not Found.
          </div>
        </div>
      ) : (
        <main className="mb-4 grid flex-1 grid-cols-1 items-start gap-4 p-4 sm:mb-6 sm:grid-cols-2 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3">
          {cards.map((card) => {
            const mobileAction = card?.primaryActions.find(
              (action) => action._id === "mobile"
            );
            const emailAction = card?.primaryActions.find(
              (action) => action._id === "email"
            );
            const firstNameInitial = card?.firstName
              ? card.firstName[0].toUpperCase()
              : "";
            const lastNameInitial = card?.lastName
              ? card.lastName[0].toUpperCase()
              : "";
            return (
              <Card key={card._id}>
                <CardHeader className="p-0">
                  <div className="relative mb-16">
                    <img
                      src={card?.backCoverImg}
                      alt="Image"
                      className="aspect-[3/1] rounded-t-lg object-cover"
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="absolute right-4 top-4 z-20 bg-transparent text-white dark:text-black dark:hover:text-white"
                          variant="outline"
                          size="icon"
                        >
                          <EllipsisVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-auto" align="end">
                        <DropdownMenuLabel>Action</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <Link to={`/dashboard/edit-card/${card._id}`}>
                            <DropdownMenuItem>
                              <PencilLine className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                          </Link>

                          <Link to={`/view-card/${card._id}`} target="_blank">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View</span>
                            </DropdownMenuItem>
                          </Link>

                          {!card?.isPublic && !card?.isBlocked ? (
                            <DropdownMenuItem
                              className="cursor-pointer focus:bg-red-200"
                              onClick={() => {
                                setIsOpen(true);
                              }}
                            >
                              <div className="flex items-center">
                                <Trash2 className="mr-2 h-4 w-4 text-muted-foreground" />
                                <div>Delete</div>
                              </div>
                            </DropdownMenuItem>
                          ) : null}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {card.isPublic ? (
                      <Badge className="absolute left-4 top-4 z-20 bg-green-500">
                        Active
                      </Badge>
                    ) : (
                      card.isBlocked && (
                        <Badge
                          variant="destructive"
                          className="absolute left-4 top-4 z-20"
                        >
                          Block
                        </Badge>
                      )
                    )}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform">
                      <Avatar className="h-32 w-32 border-[6px] border-background">
                        <AvatarImage src={card?.profileImg} />
                        <AvatarFallback className="text-3xl">{`${firstNameInitial}${lastNameInitial}`}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </CardHeader>

                {/* Delete Alert */}
                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                  <AlertDialogContent>
                    {/* Error Message */}
                    {deleteErrMsg ? (
                      <Alert variant="destructive" className="w-full">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{deleteErrMsg}</AlertDescription>
                      </Alert>
                    ) : null}

                    <AlertDialogHeader className="items-center">
                      <TriangleAlert className="h-10 w-10 text-destructive" />
                      <AlertDialogTitle>Confirm Card Delete</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this card?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="!justify-center">
                      <AlertDialogCancel className="w-full">
                        Cancel
                      </AlertDialogCancel>
                      {deleteLoading ? (
                        <Button disabled className="w-full">
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Please wait
                        </Button>
                      ) : (
                        <Button
                          className="w-full"
                          variant="destructive"
                          onClick={() => handleDelete(card?._id)}
                        >
                          Delete Card
                        </Button>
                      )}
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <CardContent className="w-full p-4">
                  <h3 className="mb-1 scroll-m-20 text-center text-2xl font-semibold tracking-tight">
                    {card?.firstName} {card?.lastName}
                  </h3>
                  <p className="mb-3 text-center italic">{card?.jobTitle}</p>
                  <p className="mb-1 text-center">{mobileAction?.value}</p>
                  <p className="mb-1 text-center">{emailAction?.value}</p>
                  {/* <p className="mb-1 text-center">
                    {new Date(card?.createdAt).toLocaleString()}
                  </p>
                  <p className="mb-1 text-center">
                    {new Date(card?.updatedAt).toLocaleString()}
                  </p> */}
                </CardContent>
                <Separator />
                <CardFooter className="p-4">
                  {card.isBlocked ? (
                    <div className="flex h-10 w-full items-center justify-center">
                      <p className="text-destructive">Your card is blocked!</p>
                    </div>
                  ) : (
                    <>
                      {card.isPublic === false ? (
                        <Button
                          variant="outline"
                          asChild
                          className="w-full border-2 border-yellow-500 bg-background text-yellow-500 hover:border-orange-500 hover:bg-background hover:text-orange-500"
                        >
                          <Link to={`/checkout/card/subscribe/${card._id}`}>
                            <CrownIcon className="mr-2 h-5 w-5" />
                            Subscribe
                          </Link>
                        </Button>
                      ) : (
                        <>
                          {copiedStates[card.publicLink] ? (
                            <div className="flex w-full items-center gap-2">
                              <TooltipProvider>
                                <Tooltip delayDuration={0}>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="!h-10 !w-[46.78px] border-2"
                                    >
                                      <Check className="h-5 w-5" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Copied!</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <Input
                                type="link"
                                readOnly
                                placeholder="Email"
                                defaultValue={`carderfly.com/${card?.publicLink}`}
                                className="border-2 border-border"
                              />
                            </div>
                          ) : (
                            <div className="flex w-full items-center gap-2">
                              <TooltipProvider>
                                <Tooltip delayDuration={0}>
                                  <TooltipTrigger asChild>
                                    <Button
                                      onMouseLeave={() =>
                                        setCopiedStates({
                                          ...copiedStates,
                                          [card.publicLink]: false,
                                        })
                                      }
                                      onClick={() =>
                                        handleCopy(card.publicLink)
                                      }
                                      variant="outline"
                                      size="icon"
                                      className="!h-10 !w-[46.78px] border-2"
                                    >
                                      <LinkIcon className="h-5 w-5" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Copy Link</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <Input
                                type="link"
                                readOnly
                                placeholder="Email"
                                defaultValue={`carderfly.com/${card?.publicLink}`}
                                className="border-2 border-border"
                              />
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </main>
      )}
    </>
  );
}

const SkeletonCard = () => (
  <Card>
    <CardHeader className="p-0">
      <Skeleton className="aspect-[3/1] h-[125px] w-full rounded-t-lg" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform">
        <Skeleton className="aspect-square h-32 w-32 rounded-full" />
      </div>
    </CardHeader>
    <CardContent className="w-full p-4">
      <Skeleton className="mx-auto mb-2 h-6 w-full max-w-48" />
      <Skeleton className="mx-auto mb-3 h-4 w-full max-w-32" />
      <Skeleton className="mx-auto mb-2 h-4 w-full max-w-36" />
      <Skeleton className="mx-auto h-4 w-full max-w-48" />
    </CardContent>
  </Card>
);

export default MyCards;
