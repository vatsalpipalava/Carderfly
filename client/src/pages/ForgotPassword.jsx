import { useState } from "react";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import axios from "@/api/axios";
import { forgotPasswordSchema } from "@/schemas/authSchema";
import Carderfly from "@/assets/svgs/carderfly";

export function ForgotPassword() {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { reset } = form;

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post(
        "/user/forgot-password",
        { email: values.email },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setLoading(false);
      toast({
        title: "Reset Password",
        description: "Reset password instruction send to your email.",
      });
      reset();
      setErrMsg("");
    } catch (err) {
      setLoading(false);
      if (!err?.response) {
        setErrMsg("No Server Response.");
      } else if (err.response?.status === 404) {
        setErrMsg("Email does not exist.");
      } else if (err.response?.status === 400) {
        setErrMsg(err.response?.data?.message);
      } else {
        setErrMsg("Reset password failed.");
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-1 p-4">
      <div className="flex h-14 items-center lg:h-[60px]">
        <Link
          to="/"
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
        <CardHeader className="pb-3">
          <CardTitle className="mb-3 text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your registered email and
            <br />
            we will send you a link to reset your password.
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
            <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                {/* Email */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="m@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                {loading ? (
                  <Button disabled className="w-full">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit" className="w-full">
                    Continue
                  </Button>
                )}
              </div>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
