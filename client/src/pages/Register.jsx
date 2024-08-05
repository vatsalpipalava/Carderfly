import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "@/api/axios";

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

import { registerSchema } from "@/schemas/authSchema";
import Carderfly from "@/assets/svgs/carderfly";
import { Helmet } from "react-helmet";

const REGISTER_URL = "/user/register";

export function RegisterForm() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordDescription, setShowPasswordDescription] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const { reset } = form;
  const password = form.watch("password");

  useEffect(() => {
    const isPasswordValid =
      registerSchema.shape.password.safeParse(password).success;
    setShowPasswordDescription(!isPasswordValid);
  }, [password]);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(REGISTER_URL, values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setLoading(false);
      reset(); // Reset form fields
      const emailVerificationToken = response.data.data.emailVerificationToken;
      const userId = response.data.data._id;
      toast({
        title: "Grate! Success.",
        description: "Please, verify your email.",
      });
      navigate(`/u/verify-email/${emailVerificationToken}/${userId}`);
      setErrMsg("");
      // setSuccess(true);
    } catch (err) {
      setLoading(false);
      if (!err?.response) {
        setErrMsg("No Server Response.");
      } else if (err.response?.status === 409) {
        setErrMsg("Email already exist.");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  const handleGoogleLogin = async () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/user/google`;
  };

  return (
    <>
      <Helmet>
        <title>Carderfly | Register</title>
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
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
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
                <div className="grid gap-1">
                  {/* First Name - Last Name */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* First Name */}
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Max" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Last Name */}
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Robinson" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

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
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            {/* <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          /> */}
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
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
                                    <li className="!mt-0">
                                      8 to 24 characters.
                                    </li>
                                    <li>
                                      Must include uppercase and lowercase
                                      letters, a number and a special character.
                                    </li>
                                    <li>
                                      Allowed special characters:{" "}
                                      <span aria-label="exclamation mark">
                                        !
                                      </span>{" "}
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
                    <Button type="submit" className="mt-3 w-full">
                      Create an account
                    </Button>
                  )}
                </div>
              </form>
            </Form>

            {/* Sign up with github */}
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="mt-4 w-full"
            >
              Sign up with Google
            </Button>

            {/* Already have an account */}
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
