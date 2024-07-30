import { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { AlertCircle, Loader2, CircleCheck, CircleX } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { linkSchema } from "@/schemas/cardSchema";
import { useDispatch } from "react-redux";
import { publicLink } from "@/slices/cardSlice";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export function CardLink() {
  const axiosPrivate = useAxiosPrivate();
  const [isValidLink, setIsValidLink] = useState(null);
  const [showLinkDescription, setShowLinkDescription] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  // const [link, setLink] = useState("");

  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      link: "",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axiosPrivate.post("/card/exist-card", {
        publicLink: values.link,
      });
      setLoading(false);
      if (response.status === 200) {
        // setLink(values.link);
        setSuccess(true);
        setErrMsg("");
        dispatch(publicLink(values.link));
      }
    } catch (err) {
      setLoading(false);
      setSuccess(false);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Link already taken.");
      } else {
        setErrMsg("Link check failed.");
      }
    }
  };

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "link") {
        try {
          linkSchema.parse({ link: value.link });
          setIsValidLink(true);
          setShowLinkDescription(false);
          setSuccess(null);
          setErrMsg("");
          dispatch(publicLink());
        } catch (e) {
          setIsValidLink(false);
          setShowLinkDescription(true);
          setSuccess(false);
          setErrMsg("");
          dispatch(publicLink());
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);
  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle>Link</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-4 sm:p-6">
        <main>
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
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <span className="absolute pl-3 text-gray-500 text-[0.875rem]">
                          carderfly.com/
                        </span>
                        <Input
                          placeholder="yourname"
                          {...field}
                          className="pl-[calc(12ch+0.70rem)] pr-10"
                        />
                        {success !== null && (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                            {success ? (
                              <CircleCheck className="h-6 w-6 text-green-700" />
                            ) : (
                              <CircleX className="h-6 w-6 text-red-700" />
                            )}
                          </span>
                        )}
                      </div>
                    </FormControl>

                    <FormDescription>
                      <>
                        <p className="mb-2">
                          This is your public display name.
                        </p>
                        {success !== null && (
                          <>
                            {success ? (
                              <p className="font-bold text-green-700">
                                Link is available.
                              </p>
                            ) : null}
                          </>
                        )}
                        {showLinkDescription && (
                          <Alert className="bg-muted p-2">
                            <AlertDescription>
                              <ul className="ml-6 list-disc [&>li]:mt-2">
                                <li className="!mt-0">
                                  Link must be at least 2 characters.
                                </li>
                                <li>
                                  Must include lowercase letters, numbers, and
                                  special characters.
                                </li>
                                <li>
                                  Allowed special characters:{" "}
                                  <span aria-label="underscore">_</span>
                                </li>
                              </ul>
                            </AlertDescription>
                          </Alert>
                        )}
                      </>
                    </FormDescription>

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
                <Button className="w-full" type="submit">
                  Check
                </Button>
              )}
            </form>
          </Form>
        </main>
      </CardContent>
    </Card>
  );
}
