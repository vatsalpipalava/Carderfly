import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AlertCircle, Eye, EyeOff, Key, Loader2 } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

import useStyle from "@/hooks/useStyle";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { changePasswordSchema, settingsNameSchema } from "@/schemas/authSchema";

import LogoutDropdown from "@/components/modules/navbar/logoutDropdown";
import SheetDashboard from "@/components/modules/navbar/sheetDashboard";
import { Helmet } from "react-helmet";

export function Settings() {
  const { setStyle } = useStyle();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [user, setUser] = useState();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPasswordDescription, setShowNewPasswordDescription] =
    useState(true);

  const [changePwdLoading, setChangePwdLoading] = useState(false);
  const [changePwdErrMsg, setChangePwdErrMsg] = useState("");

  useEffect(() => {
    setStyle({
      iconSidebarDisplay: "lg:hidden",
      sidebarDisplay: "lg:block",
      sidebarDashboardPadding: "lg:pl-72",
      iconSidebarDashboardPadding: "sm:pl-14",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get("/user/profile", {
          signal: controller.signal,
        });
        if (isMounted) {
          setUser(response.data.data);
        }
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          console.error(error);
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nameForm = useForm({
    resolver: zodResolver(settingsNameSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const changePasswordForm = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const { reset: changePwdFormReset } = changePasswordForm;
  const newPassword = changePasswordForm.watch("newPassword");

  useEffect(() => {
    const isNewPasswordValid =
      changePasswordSchema.shape.newPassword.safeParse(newPassword).success;
    setShowNewPasswordDescription(!isNewPasswordValid);
  }, [newPassword]);

  useEffect(() => {
    if (user) {
      nameForm.reset({
        firstName: user?.firstName,
        lastName: user?.lastName,
      });
    }
  }, [user, nameForm]);

  function onSubmit(values) {
    console.log(values);
  }

  const onChangePassword = async (values) => {
    console.log("🚀 ~ onPasswordChange ~ values:", values);
    setChangePwdLoading(true);
    try {
      await axiosPrivate.post("/user/change-password", {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      setChangePwdLoading(false);
      changePwdFormReset();
      toast({
        title: "Grate! Success.",
        description: "Password changed successfully.",
      });
      setChangePwdErrMsg("");
      setIsDialogOpen(false);
    } catch (err) {
      setChangePwdLoading(false);
      if (!err?.response) {
        setChangePwdErrMsg("No server response.");
      } else if (err.response?.status === 401) {
        setChangePwdErrMsg("Invalid current password");
      } else {
        setChangePwdErrMsg("Password change failed.");
      }
    }
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  console.log(user);

  return (
    <>
      <Helmet>
        <title>Settings</title>
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
              <BreadcrumbPage>Setting</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <LogoutDropdown />
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link href="#" className="font-semibold text-primary">
              General
            </Link>
            {/* <Link href="#">Security</Link>
            <Link href="#">Integrations</Link>
            <Link href="#">Support</Link>
            <Link href="#">Organizations</Link>
            <Link href="#">Advanced</Link> */}
          </nav>
          <div className="grid gap-6">
            {/* Form */}
            <Form {...nameForm}>
              <form noValidate onSubmit={nameForm.handleSubmit(onSubmit)}>
                <Card x-chunk="dashboard-04-chunk-1">
                  <CardHeader>
                    <CardTitle>Name</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {/* First Name */}
                      <FormField
                        control={nameForm.control}
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

                      {/* Last Name */}
                      <FormField
                        control={nameForm.control}
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
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    {/* <Button>Save</Button> */}
                    <Button type="submit">Save</Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <Input disabled type="email" defaultValue={user?.email} />
              </CardContent>
            </Card>

            {user?.loginType === "EMAIL_PASSWORD" ? (
              <Card x-chunk="dashboard-04-chunk-2">
                <CardHeader className="flex flex-row">
                  <CardTitle>Password</CardTitle>
                  <Button className="!mt-0 ml-auto" onClick={handleDialogOpen}>
                    <Key className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>

                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                      </DialogHeader>

                      {changePwdErrMsg ? (
                        <DialogDescription>
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              {changePwdErrMsg}
                            </AlertDescription>
                          </Alert>
                        </DialogDescription>
                      ) : null}

                      <Form {...changePasswordForm}>
                        <form
                          noValidate
                          onSubmit={changePasswordForm.handleSubmit(
                            onChangePassword
                          )}
                        >
                          <div className="grid gap-4 py-4">
                            {/* New Password */}
                            <FormField
                              control={changePasswordForm.control}
                              name="currentPassword"
                              render={({ field }) => (
                                <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                                  <FormLabel className="text-right">
                                    Current Password
                                  </FormLabel>
                                  <FormControl>
                                    <div className="relative col-span-3 w-full">
                                      <Input
                                        type={
                                          showCurrentPassword
                                            ? "text"
                                            : "password"
                                        }
                                        className="w-full"
                                        {...field}
                                      />
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() =>
                                          setShowCurrentPassword(
                                            !showCurrentPassword
                                          )
                                        }
                                      >
                                        {showCurrentPassword ? (
                                          <EyeOff className="h-5 w-5" />
                                        ) : (
                                          <Eye className="h-5 w-5" />
                                        )}
                                      </Button>
                                    </div>
                                  </FormControl>
                                  <div className="col-span-1"></div>
                                  <FormMessage className="col-span-3" />
                                </FormItem>
                              )}
                            />

                            {/* New Password */}
                            <FormField
                              control={changePasswordForm.control}
                              name="newPassword"
                              render={({ field }) => (
                                <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0">
                                  <FormLabel className="text-right">
                                    New Password
                                  </FormLabel>
                                  <FormControl>
                                    <div className="relative col-span-3 w-full">
                                      <Input
                                        type={
                                          showNewPassword ? "text" : "password"
                                        }
                                        className="w-full"
                                        {...field}
                                      />
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() =>
                                          setShowNewPassword(!showNewPassword)
                                        }
                                      >
                                        {showNewPassword ? (
                                          <EyeOff className="h-5 w-5" />
                                        ) : (
                                          <Eye className="h-5 w-5" />
                                        )}
                                      </Button>
                                    </div>
                                  </FormControl>
                                  <div className="col-span-1"></div>
                                  <FormMessage className="col-span-3" />
                                  {showNewPasswordDescription && (
                                    <FormDescription className="col-span-4">
                                      <Alert className="bg-muted p-2">
                                        <AlertDescription>
                                          <ul className="ml-6 list-disc [&>li]:mt-2">
                                            <li className="!mt-0">
                                              8 to 24 characters.
                                            </li>
                                            <li>
                                              Must include uppercase and
                                              lowercase letters, a number and a
                                              special character.
                                            </li>
                                            <li>
                                              Allowed special characters:{" "}
                                              <span aria-label="exclamation mark">
                                                !
                                              </span>{" "}
                                              <span aria-label="at symbol">
                                                @
                                              </span>{" "}
                                              <span aria-label="hashtag">
                                                #
                                              </span>{" "}
                                              <span aria-label="dollar sign">
                                                $
                                              </span>{" "}
                                              <span aria-label="percent">
                                                %
                                              </span>
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
                          {/* </div> */}
                          <DialogFooter>
                            {changePwdLoading ? (
                              <Button disabled>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Please wait
                              </Button>
                            ) : (
                              <Button type="submit">Continue</Button>
                            )}
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <Input
                    disabled
                    type="password"
                    placeholder="Project Name"
                    defaultValue="********"
                  />
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
}
