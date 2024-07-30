import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import axios from "@/api/axios";
import NotFound from "./NotFound";
import Loader from "@/components/modules/loader/loader";
import { resetPasswordSchema } from "@/schemas/authSchema";
import Carderfly from "@/assets/svgs/carderfly";

export function ResetPassword() {
  const { forgotPasswordToken } = useParams();

  const navigate = useNavigate();
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordDescription, setShowPasswordDescription] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [notFoundLoading, setNotFoundLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const { reset } = form;
  const password = form.watch("password");

  useEffect(() => {
    const isPasswordValid =
      resetPasswordSchema.shape.password.safeParse(password).success;
    setShowPasswordDescription(!isPasswordValid);
  }, [password]);

  useEffect(() => {
    const verifyResetPasswordToken = async () => {
      try {
        await axios.get(
          `/user/verifyForgotPasswordToken/${forgotPasswordToken}`
        );
        setNotFoundLoading(false);
        setNotFound(false);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No server response.");
          setNotFound(true);
        } else if (
          err.response?.status === 401 ||
          err.response?.status === 400
        ) {
          setNotFound(true);
        } else {
          setErrMsg("Forget password verification page error.");
          setNotFound(true);
        }
        setNotFoundLoading(false);
      }
    };

    verifyResetPasswordToken();
  }, [forgotPasswordToken]);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post(
        `/user/resetPassword/${forgotPasswordToken}`,
        {
          password: values.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setLoading(false);
      reset();
      toast({
        title: "Grate! Success.",
        description: "Password reset successfully.",
      });
      navigate("/login");
    } catch (err) {
      setLoading(false);
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid or expire forgot password token.");
      } else if (err.response?.status === 400) {
        setErrMsg("Invalid token.");
      } else {
        setErrMsg("Reset password failed.");
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
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter a new password to reset your account password.
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
                {/* Password */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          {/* <Input
                            type="password"
                            {...field}
                          /> */}
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                        {showPasswordDescription && (
                          <FormDescription>
                            <Alert className="bg-muted p-2">
                              <AlertDescription>
                                <ul className="ml-6 list-disc [&>li]:mt-2">
                                  <li className="!mt-0">8 to 24 characters.</li>
                                  <li>
                                    Must include uppercase and lowercase
                                    letters, a number and a special character.
                                  </li>
                                  <li>
                                    Allowed special characters:{" "}
                                    <span aria-label="exclamation mark">!</span>{" "}
                                    <span aria-label="at symbol">@</span>{" "}
                                    <span aria-label="hashtag">#</span>{" "}
                                    <span aria-label="dollar sign">$</span>{" "}
                                    <span aria-label="percent">%</span>
                                  </li>
                                </ul>
                              </AlertDescription>
                            </Alert>
                          </FormDescription>
                        )}
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
                    Reset Password
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
