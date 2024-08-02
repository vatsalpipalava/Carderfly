import { Link, useParams } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CarderflyLogo from "../assets/images/Carderflylogo.png";
import { useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import NotFound from "./NotFound";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  CircleCheckIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function Success() {
  const { cardId, sessionId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [card, setCard] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const success = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          `/subscribe/payment/success/card/${cardId}/${sessionId}`
        );
        setLoading(false);
        setCard(response?.data?.data);
      } catch (err) {
        setLoading(false);
        if (!err?.response) {
          setError("No Server Response.");
        } else if (err.response?.status === 400) {
          setNotFound(true);
        } else if (err.response?.status === 404) {
          setNotFound(true);
        } else {
          setError("Card Validation Check failed.");
        }
      }
    };

    success();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (notFound) {
    return <NotFound />;
  }

  const firstNameInitial = card?.firstName
    ? card.firstName[0].toUpperCase()
    : "";
  const lastNameInitial = card?.lastName ? card.lastName[0].toUpperCase() : "";

  return (
    <>
      <header className="fixed left-0 top-0 z-50 h-28 w-full bg-background shadow-lg dark:shadow-[#212121]">
        <div className="mx-auto h-auto w-full max-w-6xl px-4 py-8 sm:px-6">
          <Link to="/dashboard">
            <div className="flex h-auto w-auto items-center justify-start gap-6">
              <img
                src={CarderflyLogo}
                className="h-auto w-12 object-cover"
                alt="logo"
              />
              <h3 className="scroll-m-20 text-[1.7rem] font-semibold tracking-wide">
                CARDERFLY
              </h3>
            </div>
          </Link>
        </div>
      </header>
      {error ? (
        <Alert variant="destructive" className="mx-auto mt-36 w-full max-w-6xl">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      {loading ? (
        <div className="mt-32 flex h-screen w-full items-center justify-center sm:mt-16 md:mt-0">
          <div className="w-full max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 rounded-lg bg-card p-8 shadow-lg dark:shadow-[#353535] md:grid-cols-2">
              <div className="flex flex-col items-center justify-center space-y-6">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="space-y-2 text-center">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-10 w-40 rounded-md" />
              </div>
              <div className="flex h-full flex-col items-center justify-center space-y-6">
                <Skeleton className="h-[150px] w-full rounded-t-lg" />
                <div className="mt-4 flex items-center space-x-4">
                  <Skeleton className="h-20 w-20 rounded-full border-2" />
                  <div className="mt-4 space-y-1 text-sm">
                    <Skeleton className="h-6 w-36" />
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-32 flex h-screen w-full items-center justify-center sm:mt-16 md:mt-0">
          <div className="w-full max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 rounded-lg bg-card p-8 shadow-lg dark:shadow-[#353535] md:grid-cols-2">
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="animate-bounce">
                  <CircleCheckIcon className="h-20 w-20 text-green-500" />
                </div>
                <div className="space-y-2 text-center">
                  <h2 className="text-3xl font-bold">Subscription Created</h2>
                  <p className="text-muted-foreground">
                    Congratulations! You have successfully created a new
                    subscription.
                  </p>
                </div>
                <Link
                  to="/"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Go to Dashboard
                </Link>
                <Link
                  to="/"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Go to Dashboard
                </Link>
              </div>
              <div className="flex h-full flex-col items-center justify-center space-y-6">
                <img
                  src={card?.backCoverImg}
                  alt="Cover image"
                  className="h-[150px] w-full rounded-t-lg object-cover"
                />
                <div className="mt-4 flex items-center space-x-4">
                  <Avatar className="h-20 w-20 border-2">
                    <AvatarImage src={card?.profileImg} />
                    <AvatarFallback>{`${firstNameInitial}${lastNameInitial}`}</AvatarFallback>
                  </Avatar>
                  <div className="mt-4 space-y-1 text-sm">
                    <div className="text-lg font-semibold">
                      {card?.firstName} {card?.lastName}
                    </div>
                    <div className="text-muted-foreground">
                      <PhoneIcon className="mr-2 inline h-4 w-4" />
                      {card?.mobile}
                    </div>
                    <div className="text-muted-foreground">
                      <MailIcon className="mr-2 inline h-4 w-4" />
                      {card?.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
