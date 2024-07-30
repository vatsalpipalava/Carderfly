import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";

import { otpSchema } from "@/schemas/authSchema";
import axios from "@/api/axios";
import NotFound from "./NotFound";
import Loader from "@/components/modules/loader/loader";
import Carderfly from "@/assets/svgs/carderfly";

export function EmailVerification() {
  const { emailVerificationToken, userId } = useParams();

  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [notFoundLoading, setNotFoundLoading] = useState(true);
  const [email, setEmail] = useState();

  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    const verifyTokenAndGetUser = async () => {
      try {
        const response = await axios.get(
          `/user/tokenAndUserVerify/${emailVerificationToken}/${userId}`
        );
        setNotFoundLoading(false);
        setEmail(response.data.data.userEmail);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No server response.");
          setNotFound(true);
        } else if (err.response?.status === 401) {
          setNotFound(true);
        } else if (err.response?.status === 400) {
          setNotFound(true);
        } else {
          setErrMsg("Email verification page error.");
          setNotFound(true);
        }
        setNotFoundLoading(false);
      }
    };

    verifyTokenAndGetUser();
  }, [emailVerificationToken, userId]);

  const resendOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/user/resendOTP/${emailVerificationToken}/${userId}`
      );
      const newEmailVerificationToken =
        response.data.data.emailVerificationToken;
      const resUserId = response.data.data._id;
      setLoading(false);
      toast({
        title: "Grate! Success.",
        description: "OTP sent successfully.",
      });
      navigate(`/u/verify-email/${newEmailVerificationToken}/${resUserId}`);
    } catch (err) {
      setLoading(false);
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Session expired.");
      } else {
        setErrMsg("Resend OTP failed.");
      }
    }
  };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `/user/emailVerify/${emailVerificationToken}/${userId}`,
        {
          emailVerifyOTP: values.otp,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response?.status === 200) {
        setLoading(false);
        reset();
        toast({
          title: "Grate! Success.",
          description: "Email verification successfully.",
        });
        navigate("/login");
      }
    } catch (err) {
      setLoading(false);
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 410) {
        setErrMsg("OTP has expired, Resend it.");
        reset();
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid OTP.");
      } else {
        setErrMsg("Email verification failed.");
      }
    }
  };

  if (notFoundLoading) {
    return <Loader />;
  }

  if (notFound) {
    return <NotFound />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-1 p-4">
      <div className="flex h-14 items-center lg:h-[60px]">
        <Link
          to="/dashboard"
          end
          className="group flex items-center gap-2 font-semibold"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Carderfly className="h-[26px] w-[26px] fill-white" />
          </div>
          <span className="font-bold">CARDERFLY</span>
        </Link>
      </div>
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="mb-4 text-center text-2xl">
            Verify your email address
          </CardTitle>
          <CardDescription className="!mb-2 text-center">
            We have sent the verify email code to your email{" "}
            <span className="font-semibold text-primary">{email && email}</span>
            .
          </CardDescription>
          <CardDescription className="text-center">
            Please, check your inbox and enter the code below to complete your
            account registration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Error Message */}
          {errMsg ? (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errMsg}</AlertDescription>
            </Alert>
          ) : null}

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col items-center space-y-6"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel className="text-center">Code</FormLabel> */}
                    <FormControl>
                      <InputOTP maxLength={4} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              {loading ? (
                <Button disabled className="w-full">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              )}
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Haven&apos;t received it?
            {/* <Link to="/register" className="underline">
              Resend
            </Link> */}
            <Button
              onClick={resendOTP}
              variant="link"
              className="py-0 pl-1 pr-0"
            >
              Resend a new code..
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
