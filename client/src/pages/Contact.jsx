import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navbar } from "@/components/modules/navbar/navbarHome";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { contactSchema } from "@/schemas/contactSchema";
import { useToast } from "@/components/ui/use-toast";
import { Footer } from "@/components/modules/home/Footer";
import axios from "@/api/axios";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

export function Contact() {
  const recaptchaRef = useRef();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    try {
      await axios.post(
        "/contact/contact-form",
        {
          name: values.name,
          email: values.email,
          message: values.message,
          recaptchaToken: recaptchaToken,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setIsSubmitting(false);
      form.reset();
      recaptchaRef.current?.reset();
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
    <main>
      <Navbar />
      <div className="bg-grid-small-black/[0.1] dark:bg-grid-small-white/[0.1] mx-auto flex h-full w-full max-w-[1280px] flex-col px-4 sm:px-6">
        <div className="flex items-center justify-center py-14">
          <Card className="w-full max-w-xl">
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Your Email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your Message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={`${import.meta.env.VITE_GOOGLE_CAPTCHA_SITE_KEY}`}
                    onChange={handleRecaptchaChange}
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  );
}
