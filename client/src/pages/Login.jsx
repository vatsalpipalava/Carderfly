import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { loginSchema } from "@/schemas/authSchema";
import useAuth from "../hooks/useAuth";

import axios from "@/api/axios";
import Carderfly from "@/assets/svgs/carderfly";
import { Helmet } from "react-helmet";
const LOGIN_URL = "/user/login";

export function LoginForm() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { reset } = form;

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        LOGIN_URL,
        { email: values.email, password: values.password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setLoading(false);
      const accessToken = response?.data?.accessToken;
      setAuth({ email: values.email, accessToken });
      reset();
      setErrMsg("");
      navigate(from, { replace: true });
    } catch (err) {
      setLoading(false);
      if (!err?.response) {
        setErrMsg("No server response.");
      } else if (err.response?.status === 404) {
        setErrMsg("User does not exist.");
      } else if (err.response?.status === 400) {
        setErrMsg(err.response?.data?.message);
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized.");
      } else {
        setErrMsg("Login Failed.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    // try {
    //   const response = await axios.get("/user/google");
    //   console.log("🚀 ~ handleGoogleLogin ~ response:", response)
    //   const accessToken = response?.data?.accessToken;
    //   setAuth({ accessToken });
    //   navigate(from, { replace: true });
    // } catch (err) {
    //   if (!err?.response) {
    //     setErrMsg("No server response.");
    //   } else if (err.response?.status === 404) {
    //     setErrMsg("User does not exist.");
    //   } else if (err.response?.status === 400) {
    //     setErrMsg(err.response?.data?.message);
    //   } else {
    //     setErrMsg("Login Failed.");
    //   }
    // }
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/user/google`;
  };

  return (
    <>
      <Helmet>
        <title>Carderfly | Login</title>
      </Helmet>
      <div className="flex min-h-screen flex-col items-center justify-center gap-1 p-4">
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
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
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

                  {/* Password */}
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center">
                            <FormLabel>Password</FormLabel>
                            <Link
                              to="/forgot-password"
                              className="ml-auto inline-block text-sm underline"
                            >
                              Forgot your password?
                            </Link>
                          </div>
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
                      Login
                    </Button>
                  )}
                </div>
              </form>
            </Form>

            {/* Sign up with github */}
            <Button
              variant="outline"
              onClick={handleGoogleLogin}
              className="mt-4 w-full"
            >
              Login with Google
            </Button>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
