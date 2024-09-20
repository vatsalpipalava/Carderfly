import { useState, useEffect } from "react"; //useRef
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet";
// import ReCAPTCHA from "react-google-recaptcha";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

import useStyle from "@/hooks/useStyle";
import { supportSchema } from "@/schemas/contactSchema";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import LogoutDropdown from "@/components/modules/navbar/logoutDropdown";
import SheetDashboard from "@/components/modules/navbar/sheetDashboard";

export function Support() {
  const { setStyle } = useStyle();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setStyle({
      iconSidebarDisplay: "lg:hidden",
      sidebarDisplay: "lg:block",
      sidebarDashboardPadding: "lg:pl-72",
      iconSidebarDashboardPadding: "sm:pl-14",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const recaptchaRef = useRef();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  // const [recaptchaToken, setRecaptchaToken] = useState("");

  // const handleRecaptchaChange = (token) => {
  //   setRecaptchaToken(token);
  // };

  const form = useForm({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    try {
      await axiosPrivate.post("/contact/support-form", {
        message: values.message,
        // recaptchaToken: recaptchaToken,
      });
      setIsSubmitting(false);
      form.reset();
      // recaptchaRef.current?.reset();
      toast({
        description: "Message sent successfully!",
      });
    } catch (err) {
      setIsSubmitting(false);
      if (!err?.response) {
        setErrMsg("No server response.");
      } else if (err.response?.status === 400) {
        setErrMsg("reCAPTCHA verification failed");
      } else {
        setErrMsg("Message send failed.");
      }
    }
  }
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 py-3 sm:h-auto">
        <SheetDashboard />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Support</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <LogoutDropdown />
      </header>
      <main className="flex h-full w-full flex-col items-center justify-center p-4">
        <Card className="mt-6 w-full max-w-xl">
          {/* Error Message */}
          {errMsg ? (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errMsg}</AlertDescription>
            </Alert>
          ) : null}
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>
              If you have any query, drop a message.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          className="h-48"
                          placeholder="Your Message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={`${import.meta.env.VITE_GOOGLE_CAPTCHA_SITE_KEY}`}
                  onChange={handleRecaptchaChange}
                /> */}
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <p className="mt-2 text-sm text-muted-foreground">
          Please check your inbox and spam folder for our reply.
        </p>
      </main>
    </>
  );
}
