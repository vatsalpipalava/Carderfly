/* eslint-disable react-hooks/exhaustive-deps */
import { useToast } from "@/components/ui/use-toast";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { Helmet } from "react-helmet";
import CarderflyLogo from "../assets/images/Carderflylogo.png";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2, MailIcon, PhoneIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { countries } from "@/lib/country";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { checkoutSchema } from "@/schemas/checkoutSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDebounce } from "@/hooks/useDebounce";
import { Skeleton } from "@/components/ui/skeleton";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export function Payment() {
  const { cardId, planId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [card, setCard] = useState();
  const [invoice, setInvoice] = useState();
  const [validLoading, setValidLoading] = useState(false);
  const [validError, setValidError] = useState("");
  const [notFound, setNotFound] = useState(false);

  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [states, setStates] = useState([]);
  const [couponError, setCouponError] = useState("");

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const form = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      businessName: "",
      addressLine1: "",
      addressLine2: "",
      country: "",
      state: "",
      taxNo: "",
      couponCode: "",
    },
  });

  // Debounce values
  const debouncedTaxNo = useDebounce(form.watch("taxNo"));
  const debouncedCouponCode = useDebounce(form.watch("couponCode"));

  const handleCountrySelect = (code2) => {
    form.setValue("country", code2);
    const country = countries.find((c) => c.code2 === code2);
    setStates(country?.states || []);
    form.setValue("state", "");
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const checkValidSubscription = async () => {
      setValidLoading(true);
      try {
        const response = await axiosPrivate.get(
          `/subscribe/final-amount/card/${cardId}/${planId}?country=${form.getValues("country")}&state=${form.getValues("state")}&taxNo=${debouncedTaxNo}&coupon=${debouncedCouponCode}`,
          {
            signal: controller.signal,
          }
        );
        if (isMounted) {
          setValidLoading(false);
          setCard(response?.data?.data?.card);
          setInvoice(response?.data?.data?.invoice);

          // Check for invalid coupon
          if (
            response?.data?.data?.invoice?.discount === 0 &&
            debouncedCouponCode
          ) {
            setCouponError("Invalid Coupon Code.");
          } else {
            setCouponError(""); // Clear coupon error if valid
          }
        }
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
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [
    debouncedTaxNo,
    debouncedCouponCode,
    form.watch("country"),
    form.watch("state"),
  ]);

  useEffect(() => {
    if (debouncedCouponCode) {
      setCouponError(""); // Clear error when coupon code changes
    }
  }, [debouncedCouponCode]);

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

  // Helper function to return the currency symbol
  const getCurrencySymbol = () => {
    switch (invoice?.currency) {
      case "INR":
        return "₹";
      case "USD":
        return "$";
      default:
        return ""; // Handle other currencies as needed
    }
  };

  const getPlanName = () => {
    switch (invoice?.plan) {
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

  const firstNameInitial = card?.firstName
    ? card.firstName[0].toUpperCase()
    : "";
  const lastNameInitial = card?.lastName ? card.lastName[0].toUpperCase() : "";

  const onSubmit = async (data) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay failed to load!!");
      return;
    }

    console.log(data);
    console.log(invoice);

    setLoading(true);
    try {
      const response = await axiosPrivate.post(
        `/subscribe/checkout/subscription/card/${cardId}`,
        { invoice }
      );
      setLoading(false);
      setErrMsg("");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        one_click_checkout: true,
        name: "Carderfly",
        order_id: response.data.data.id,
        show_coupons: true,
        callback_url: `${import.meta.env.VITE_BACKEND_URL}/subscribe/payment-verification/${cardId}/${response.data.data.userId}`,
        prefill: {
          name: data.name,
        },
        notes: {
          cardId: cardId,
          userId: response.data.data.userId,
          name: data?.name,
          businessName: data?.businessName,
          addressLine1: data.addressLine1,
          addressLine2: data?.addressLine2,
          country: data.country,
          state: data.state,
          taxNo: data?.taxNo,
        },
        theme: {
          color: "#DC2626",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      setLoading(false);
      console.log(err);

      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400 || err.response?.status === 404) {
        setErrMsg("Cards not found.");
      } else if (err.response?.status === 409) {
        setErrMsg("Already Subscribed.");
      } else if (err.response?.data?.status) {
        setErrMsg(err.response?.data?.message?.description);
      } else {
        setErrMsg("Checkout failed.");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <header className="h-full w-full bg-background shadow-lg dark:shadow-[#212121]">
        <div className="mx-auto h-auto w-full max-w-6xl px-4 py-4 sm:px-6">
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
        <div className="mx-auto mt-6 w-full max-w-6xl px-6 md:px-4">
          <Alert variant="destructive" className="">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{validError}</AlertDescription>
          </Alert>
        </div>
      ) : null}

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 md:grid-cols-2">
        <div className="h-full w-full">
          <h2 className="mb-6 text-2xl font-bold">Billing Details</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Business Name */}
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Address */}
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Address line 1 *"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Address line 2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Country */}
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        Country <span className="text-red-500">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="justify-between"
                            >
                              {field.value
                                ? countries.find(
                                    (country) => country.code2 === field.value
                                  )?.name
                                : "Select Country..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search Country..." />
                            <CommandList>
                              <CommandEmpty>No country found.</CommandEmpty>
                              <CommandGroup>
                                {countries.map((country) => (
                                  <CommandItem
                                    key={country.code2}
                                    value={country.name}
                                    onSelect={() =>
                                      handleCountrySelect(country.code2)
                                    }
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        country.code2 === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {country.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* State */}
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        State <span className="text-red-500">*</span>
                      </FormLabel>
                      <Popover disabled={states.length === 0}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="justify-between"
                              disabled={states.length === 0}
                            >
                              {field.value
                                ? states.find(
                                    (state) => state.code === field.value
                                  )?.name
                                : "Select State..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput placeholder="Search State..." />
                            <CommandList>
                              <CommandEmpty>No state found.</CommandEmpty>
                              <CommandGroup>
                                {states.map((state) => (
                                  <CommandItem
                                    key={state.code}
                                    value={state.name}
                                    onSelect={() =>
                                      form.setValue("state", state.code)
                                    }
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        state.code === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {state.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* GST/Tax No */}
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="taxNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GST/Tax No.</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Coupon Code */}
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="couponCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coupon Code</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                      {couponError && (
                        <p className="text-sm text-red-500">{couponError}</p>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              {/* Error Message */}
              {errMsg ? (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errMsg}</AlertDescription>
                </Alert>
              ) : null}

              {/* Submit Button */}
              {loading ? (
                <Button disabled className="w-full">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  // disabled={!termsCheckedINR}
                  className="w-full"
                >
                  Checkout
                </Button>
              )}
            </form>
          </Form>
        </div>

        {validLoading ? (
          <SkeletonOrder />
        ) : (
          <div className="h-full w-full bg-muted">
            <div className="flex flex-col items-center rounded-lg p-4 md:p-6">
              <div className="mb-4 space-y-4">
                <h2 className="text-2xl font-bold">Order Summary</h2>
                <p className="text-muted-foreground">
                  Review the details of your order and complete the purchase.
                </p>
              </div>
              <img
                src={card?.backCoverImg}
                alt="Cover image"
                className="h-[100px] w-full rounded-t-lg object-cover"
              />
              <div className="mt-2 flex items-center space-x-4">
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
            <div className="p-4 md:p-6">
              <div className="mb-1 flex justify-between">
                <h5 className="text-md font-semibold">{getPlanName()}</h5>
                <p className="text-md">
                  {getCurrencySymbol()}
                  {(invoice?.subTotal / 100).toFixed(2)}
                </p>
              </div>
              {/* <div className="mb-1 flex justify-between">
              <h5 className="text-md font-semibold">Sub Total</h5>
              <p className="text-md">₹599.00</p>
            </div> */}
              <Separator className="my-2" />
              {invoice?.discount === 0 ? null : (
                <div className="mb-1 flex justify-between">
                  <h5 className="text-md font-semibold">
                    {invoice?.coupon?.code} ({invoice?.coupon?.discount}% off)
                  </h5>
                  <p className="text-md">
                    -{getCurrencySymbol()}
                    {(invoice?.discount / 100).toFixed(2)}
                  </p>
                </div>
              )}
              <div className="mb-1 flex justify-between">
                <h5 className="text-md font-semibold">Total including tax</h5>
                <p className="text-md">
                  {getCurrencySymbol()}
                  {(invoice?.total / 100).toFixed(2)}
                </p>
              </div>
              <Separator className="my-2" />
              <div className="mb-1 flex justify-between">
                <h5 className="text-md font-semibold">Total excluding tax</h5>
                <p className="text-md">
                  {getCurrencySymbol()}
                  {(invoice?.totalExcludingTax / 100).toFixed(2)}
                </p>
              </div>
              {invoice?.tax?.cgst === null &&
              invoice?.tax?.sgst === null ? null : (
                <>
                  <div className="mb-1 flex justify-between">
                    <h5 className="text-md font-semibold">
                      CGST ({invoice?.tax?.cgst?.taxPercentage}%)
                    </h5>
                    <p className="text-md">
                      {getCurrencySymbol()}
                      {(invoice?.tax?.cgst?.taxAmount / 100).toFixed(2)}
                    </p>
                  </div>
                  <div className="mb-1 flex justify-between">
                    <h5 className="text-md font-semibold">
                      SGST ({invoice?.tax?.sgst?.taxPercentage}%)
                    </h5>
                    <p className="text-md">
                      {getCurrencySymbol()}
                      {(invoice?.tax?.sgst?.taxAmount / 100).toFixed(2)}
                    </p>
                  </div>
                </>
              )}

              {invoice?.tax?.igst === null ? null : (
                <div className="flex justify-between">
                  <h5 className="text-md font-semibold">
                    IGST ({invoice?.tax?.igst?.taxPercentage}%)
                  </h5>
                  <p className="text-md">
                    {getCurrencySymbol()}
                    {(invoice?.tax?.igst?.taxAmount / 100).toFixed(2)}
                  </p>
                </div>
              )}

              <Separator className="my-4" />
              <div className="flex justify-between">
                <h5 className="text-lg font-bold">Total</h5>
                <p className="text-lg font-medium">
                  {getCurrencySymbol()}
                  {(invoice?.total / 100).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function SkeletonOrder() {
  return (
    <div className="flex flex-col items-center rounded-lg p-4 md:p-6">
      <div className="mb-4 space-y-4">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-[100px] w-full rounded-t-lg object-cover" />
      <div className="mt-2 flex items-center space-x-4">
        <Skeleton className="h-20 w-20 rounded-full border-2" />
        <div className="mt-4 space-y-1 text-sm">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      <div className="p-4 md:p-6">
        <div className="mb-1 flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-4 w-full" />
        <div className="mb-1 flex justify-between">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
