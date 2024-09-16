import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";

import {
  AlertCircle,
  DollarSign,
  IndianRupee,
  MailIcon,
  PhoneIcon,
} from "lucide-react";
import CarderflyLogo from "../assets/images/Carderflylogo.png";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

import { inrPlanSchema, usdPlanSchema } from "@/schemas/cardSchema";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import NotFound from "./NotFound";
import { getUserLocation } from "@/api/userLocation";

export function Checkout() {
  const { cardId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [card, setCard] = useState();
  const [validLoading, setValidLoading] = useState(false);
  const [validError, setValidError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [defaultCurrency, setDefaultCurrency] = useState("USD");

  const inrForm = useForm({
    resolver: zodResolver(inrPlanSchema),
    defaultValues: {
      type: "inr_standard",
      terms: false,
    },
  });

  const usdForm = useForm({
    resolver: zodResolver(usdPlanSchema),
    defaultValues: {
      type: "usd_standard",
      terms: false,
    },
  });

  useEffect(() => {
    const checkValidSubscription = async () => {
      setValidLoading(true);
      try {
        const response = await axiosPrivate.get(
          `/subscribe/card/subscription-valid/${cardId}`
        );
        setValidLoading(false);
        setCard(response?.data?.data);
      } catch (err) {
        setValidLoading(false);
        if (!err?.response) {
          setValidError("No Server Response.");
        } else if (err.response?.status === 400) {
          setNotFound(true);
        } else if (err.response?.status === 404) {
          setNotFound(true);
        } else if (err.response?.status === 409) {
          setAlreadySubscribed(true);
        } else {
          setValidError("Card Validation Check failed.");
        }
      }
    };

    checkValidSubscription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const setCurrencyBasedOnLocation = async () => {
      const country = await getUserLocation();
      if (country === "IN") {
        setDefaultCurrency("INR");
      } else {
        setDefaultCurrency("USD");
      }
    };

    setCurrencyBasedOnLocation();
  }, []);

  if (notFound) {
    return <NotFound />;
  }

  if (alreadySubscribed) {
    toast({
      title: "Grate! Success.",
      description: "Subscription already active.",
    });
    navigate(`/${cardId}`);
  }

  const termsCheckedINR = inrForm.watch("terms");
  const termsCheckedUSD = usdForm.watch("terms");

  const onSubmit = async (data) => {
    navigate(`/checkout/card/subscribe/${cardId}/${data.type}`);
  };

  const firstNameInitial = card?.firstName
    ? card.firstName[0].toUpperCase()
    : "";
  const lastNameInitial = card?.lastName ? card.lastName[0].toUpperCase() : "";

  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
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
      {validError ? (
        <Alert variant="destructive" className="mx-auto mt-36 w-full max-w-6xl">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{validError}</AlertDescription>
        </Alert>
      ) : null}
      {validLoading ? (
        <div className="mx-auto mt-28 grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <Skeleton className="mx-auto h-8 w-32" />
              <Skeleton className="mx-auto h-4 w-64" />
            </div>

            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-12 w-full rounded-md" />
                  <Skeleton className="mx-auto h-6 w-32" />
                </div>
              ))}

              <div className="space-y-3">
                <Skeleton className="inline-block h-6 w-6" />
                <Skeleton className="ml-2 inline-block h-4 w-64" />
              </div>

              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg p-6">
            <div className="mb-4 space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-[150px] w-full rounded-t-lg" />
            <div className="mt-4 flex items-center space-x-4">
              <Skeleton className="h-16 w-16 rounded-full border" />
              <div className="mt-4 space-y-1 text-sm">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="mt-6 flex flex-col items-center space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-28 grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Checkout</h1>
              <p className="text-muted-foreground">
                Select your subscription plan and complete your purchase.
              </p>
            </div>

            <Tabs
              value={defaultCurrency}
              onValueChange={setDefaultCurrency}
              className="h-full w-full"
            >
              <TabsList className="grid h-auto w-full grid-cols-2">
                <TabsTrigger value="INR" className="group gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary group-data-[state=active]:border-transparent group-data-[state=active]:bg-primary">
                    <IndianRupee className="h-4 w-4 text-primary group-data-[state=active]:text-white" />
                  </div>
                  <p className="text-lg">INR</p>
                </TabsTrigger>
                <TabsTrigger value="USD" className="group gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary group-data-[state=active]:border-transparent group-data-[state=active]:bg-primary">
                    <DollarSign className="h-4 w-4 text-primary group-data-[state=active]:text-white" />
                  </div>
                  <p className="text-lg">USD</p>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="INR">
                {/* INR */}
                <Form {...inrForm}>
                  <form onSubmit={inrForm.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                      <FormField
                        control={inrForm.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <div className="grid gap-2">
                                  {/* Starter */}
                                  <FormItem>
                                    <FormLabel className="border-accent*40 flex cursor-pointer items-center justify-between gap-4 rounded-md border-2 bg-popover p-4 hover:border-accent hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                      <div className="grid gap-1">
                                        <div className="font-semibold">
                                          Starter
                                        </div>
                                        <div className="text-4xl font-bold">
                                          ₹399
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                          3 Months
                                        </p>
                                      </div>
                                      <FormControl>
                                        <RadioGroupItem value="inr_starter" />
                                      </FormControl>
                                    </FormLabel>
                                  </FormItem>

                                  {/* 6 Month */}
                                  <FormItem>
                                    <FormLabel className="border-accent*40 flex cursor-pointer items-center justify-between gap-4 rounded-md border-2 bg-popover p-4 hover:border-accent hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                      <div className="grid gap-1">
                                        <div className="font-semibold">
                                          Standard
                                        </div>
                                        <div className="text-4xl font-bold">
                                          ₹599
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                          6 Months
                                        </p>
                                      </div>
                                      <FormControl>
                                        <RadioGroupItem value="inr_standard" />
                                      </FormControl>
                                    </FormLabel>
                                  </FormItem>

                                  {/* 12 Month */}
                                  <FormItem>
                                    <FormLabel className="border-accent*40 flex cursor-pointer items-center justify-between gap-4 rounded-md border-2 bg-popover p-4 hover:border-accent hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                      <div className="grid gap-1">
                                        <div className="font-semibold">
                                          Premium
                                        </div>
                                        <div className="text-4xl font-bold">
                                          ₹999
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                          12 Months
                                        </p>
                                      </div>
                                      <FormControl>
                                        <RadioGroupItem value="inr_premium" />
                                      </FormControl>
                                    </FormLabel>
                                  </FormItem>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Terms */}
                      <FormField
                        control={inrForm.control}
                        name="terms"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="!mt-0">
                                I agree to the&nbsp;
                                <Link
                                  to="/terms-conditions"
                                  className="underline underline-offset-2"
                                >
                                  Terms and Conditions
                                </Link>
                                &nbsp;&&nbsp;
                                <Link
                                  to="/privacy-policy"
                                  className="underline underline-offset-2"
                                >
                                  Privacy Policy
                                </Link>
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={!termsCheckedINR}
                        className="w-full"
                      >
                        Next
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="USD">
                <Form {...usdForm}>
                  <form onSubmit={usdForm.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                      {/* USD */}
                      <FormField
                        control={usdForm.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <div className="grid gap-2">
                                  {/* Starter */}
                                  <FormItem>
                                    <FormLabel className="border-accent*40 flex cursor-pointer items-center justify-between gap-4 rounded-md border-2 bg-popover p-4 hover:border-accent hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                      <div className="grid gap-1">
                                        <div className="font-semibold">
                                          Starter
                                        </div>
                                        <div className="text-4xl font-bold">
                                          $7
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                          3 Months
                                        </p>
                                      </div>
                                      <FormControl>
                                        <RadioGroupItem value="usd_starter" />
                                      </FormControl>
                                    </FormLabel>
                                  </FormItem>

                                  {/* 6 Month */}
                                  <FormItem>
                                    <FormLabel className="border-accent*40 flex cursor-pointer items-center justify-between gap-4 rounded-md border-2 bg-popover p-4 hover:border-accent hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                      <div className="grid gap-1">
                                        <div className="font-semibold">
                                          Standard
                                        </div>
                                        <div className="text-4xl font-bold">
                                          $10
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                          6 Months
                                        </p>
                                      </div>
                                      <FormControl>
                                        <RadioGroupItem value="usd_standard" />
                                      </FormControl>
                                    </FormLabel>
                                  </FormItem>
                                  {/* 12 Month */}
                                  <FormItem>
                                    <FormLabel className="border-accent*40 flex cursor-pointer items-center justify-between gap-4 rounded-md border-2 bg-popover p-4 hover:border-accent hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                      <div className="grid gap-1">
                                        <div className="font-semibold">
                                          Premium
                                        </div>
                                        <div className="text-4xl font-bold">
                                          $15
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                          12 Months
                                        </p>
                                      </div>
                                      <FormControl>
                                        <RadioGroupItem value="usd_premium" />
                                      </FormControl>
                                    </FormLabel>
                                  </FormItem>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Terms */}
                      <FormField
                        control={usdForm.control}
                        name="terms"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="!mt-0">
                                I agree to the&nbsp;
                                <Link
                                  to="/terms-conditions"
                                  className="underline underline-offset-2"
                                >
                                  Terms and Conditions
                                </Link>
                                &nbsp;&&nbsp;
                                <Link
                                  to="/privacy-policy"
                                  className="underline underline-offset-2"
                                >
                                  Privacy Policy
                                </Link>
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={!termsCheckedUSD}
                        className="w-full"
                      >
                        Complete Purchase
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-muted p-6">
            <div className="mb-4 space-y-4">
              <h2 className="text-2xl font-bold">Order Summary</h2>
              <p className="text-muted-foreground">
                Review the details of your order and complete the purchase.
              </p>
            </div>
            <img
              src={card?.backCoverImg}
              alt="Cover image"
              className="h-[150px] w-full rounded-t-lg object-cover"
            />
            <div className="mt-4 flex items-center space-x-4">
              <Avatar className="h-20 w-20 border-2">
                <AvatarImage src={card?.profileImg} />
                <AvatarFallback className="text-2xl">{`${firstNameInitial}${lastNameInitial}`}</AvatarFallback>
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
      )}
    </>
  );
}
