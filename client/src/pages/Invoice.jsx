import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AlertCircle, Download } from "lucide-react";
import { Helmet } from "react-helmet";

import SheetDashboard from "@/components/modules/navbar/sheetDashboard";
import LogoutDropdown from "@/components/modules/navbar/logoutDropdown";
import Carderfly from "@/assets/svgs/carderfly";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import useStyle from "@/hooks/useStyle";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import NotFound from "./NotFound";
import { DownloadInvoicePdf } from "@/lib/DownloadInvoicePdf";

export default function Invoice() {
  const { subscribeId } = useParams();
  const { setStyle } = useStyle();
  const axiosPrivate = useAxiosPrivate();

  const [invoice, setInvoice] = useState();
  const [invoiceId, setInvoiceId] = useState();
  const [invoiceNumber, setInvoiceNumber] = useState();
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setStyle({
      iconSidebarDisplay: "lg:hidden",
      sidebarDisplay: "lg:block",
      sidebarDashboardPadding: "lg:pl-72",
      iconSidebarDashboardPadding: "sm:pl-14",
    });
  }, [setStyle]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const invoice = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          `/invoice/${subscribeId}/billing-invoice`,
          {
            signal: controller.signal,
          }
        );
        if (isMounted) {
          setInvoice(response?.data?.data?.invoice);
          setInvoiceId(response?.data?.data?._id);
          setInvoiceNumber(response?.data?.data?.invoiceNumber);
          setNotFound(false);
          setErrMsg("");
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        if (!err?.response) {
          setErrMsg("No Server Response.");
        } else if (
          err.response?.status === 400 ||
          err.response?.status === 404
        ) {
          setNotFound(true);
        } else {
          setErrMsg("Invoice retrieved failed.");
        }
      }
    };

    invoice();

    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (notFound) {
    return <NotFound />;
  }

  const getCurrencySymbol = () => {
    switch (invoice?.currency) {
      case "INR":
        return "₹";
      case "USD":
        return "$";
      default:
        return "";
    }
  };

  const create = new Date(invoice?.created_at * 1000);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedCreateDate = create.toLocaleDateString("en-US", options);

  const getPlanName = () => {
    switch (invoice?.notes?.planId) {
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

  return (
    <>
      <Helmet>
        <title>Invoice</title>
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
              <BreadcrumbPage>Invoice</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <LogoutDropdown />
      </header>

      {/* Error Message */}
      {errMsg ? (
        <Alert variant="destructive" className="mx-auto w-full max-w-[8.27in]">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errMsg}</AlertDescription>
        </Alert>
      ) : null}
      {loading ? (
        <SkeletonInvoice />
      ) : (
        <>
          <div className="mx-auto mt-4 flex w-full max-w-[8.27in] justify-end sm:mt-0">
            <Button
              onClick={() => DownloadInvoicePdf(invoiceId, invoiceNumber)}
            >
              <Download className="mr-2 h-4 w-4" />
              Download invoice
            </Button>
          </div>
          <Card
            id="invoice"
            className="mx-auto mb-6 mt-2 w-full max-w-[8.27in] rounded-lg p-4 shadow-lg sm:p-12"
          >
            <div className="w-full">
              <h4 className="mb-3 text-right text-2xl font-bold">
                Tax Invoice
              </h4>
              <p className="text-right">
                Invoice #: <span className="font-bold">{invoiceNumber}</span>
              </p>
              <p className="text-right">Date: {formattedCreateDate}</p>
            </div>
            <div className="w-full">
              <Link
                to="/dashboard"
                end
                className="group flex items-center gap-2 font-semibold"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
                  <Carderfly className="h-7 w-7 fill-white" />
                </div>
                <span className="text-lg font-bold">CARDERFLY</span>
              </Link>
              <div className="text-left">
                {/* <h2 className="text-2xl font-bold">Carderfly</h2> */}
                <p className="mt-6">GST No.: 24AKJPP3360K1ZY</p>
                <p>Montech Design</p>
                <p>A-422, Yash Plaza,</p>
                <p>Varachha Road, Surat, India.</p>
                <p>Email: info@carderfly.com</p>
              </div>
            </div>
            <Separator className="my-3 bg-black" />
            <div className="w-full">
              <p className="font-bold">Bill To:</p>
              <p>{invoice?.notes?.name}</p>
              <p>{invoice?.notes?.businessName}</p>
              <p>{invoice?.notes?.addressLine1}</p>
              <p>{invoice?.notes?.addressLine2}</p>
              <p>
                {invoice?.notes?.state}, {invoice?.notes?.country}.
              </p>
              <p>Phone: {invoice?.contact}</p>
              {/* {invoice?.email && <p>Email: {invoice?.email}</p>} */}
              {invoice?.notes?.taxNo && (
                <p>GST/Tax No: {invoice?.notes?.taxNo}</p>
              )}
            </div>
            <Separator className="my-3 bg-black" />
            <Table>
              <TableHeader className="bg-muted text-muted-foreground">
                <TableRow>
                  <TableHead className="p-2 text-left">Item</TableHead>
                  <TableHead className="p-2 text-right"></TableHead>
                  <TableHead className="p-2 text-right"></TableHead>
                  <TableHead className="p-2 text-right"></TableHead>
                  <TableHead className="p-2 text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-b">
                  <TableCell className="p-2 text-base">
                    {getPlanName()}
                  </TableCell>
                  <TableCell className="p-2 text-right"></TableCell>
                  <TableCell className="p-2 text-right"></TableCell>
                  <TableCell className="p-2 text-right"></TableCell>
                  <TableCell className="p-2 text-right text-base">
                    {getCurrencySymbol()}
                    {(invoice?.notes?.subTotal / 100).toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Separator />
            <div className="mt-3 w-full px-2">
              {invoice?.notes?.discount ? (
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-right text-muted-foreground">
                    {invoice?.notes?.coupon} ({invoice?.notes?.couponDiscount}%
                    off):
                  </p>
                  <p className="text-right">
                    -{getCurrencySymbol()}
                    {(invoice?.notes?.discount / 100).toFixed(2)}
                  </p>
                </div>
              ) : null}
              <div className="mt-3 grid grid-cols-2 gap-4">
                <p className="text-right text-muted-foreground">
                  Total including tax:
                </p>
                <p className="text-right font-bold">
                  {getCurrencySymbol()}
                  {(invoice?.notes?.total / 100).toFixed(2)}
                </p>
              </div>
              <Separator className="my-2" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p className="text-right text-muted-foreground">
                  Total excluding tax:
                </p>
                <p className="text-right">
                  {getCurrencySymbol()}
                  {(invoice?.notes?.totalExcludingTax / 100).toFixed(2)}
                </p>
              </div>
              {invoice?.notes?.cgst && invoice?.notes?.sgst ? (
                <>
                  <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                    <p className="text-right text-muted-foreground">
                      CGST ({invoice?.notes?.cgstPercentage}%):
                    </p>
                    <p className="text-right">
                      {getCurrencySymbol()}
                      {invoice?.notes?.cgst / 100}
                    </p>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                    <p className="text-right text-muted-foreground">
                      SGST ({invoice?.notes?.sgstPercentage}%):
                    </p>
                    <p className="text-right">
                      {getCurrencySymbol()}
                      {invoice?.notes?.sgst / 100}
                    </p>
                  </div>
                </>
              ) : null}

              {invoice?.notes?.igst ? (
                <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                  <p className="text-right text-muted-foreground">
                    IGST ({invoice?.notes?.igstPercentage}%):
                  </p>
                  <p className="text-right">
                    {getCurrencySymbol()}
                    {invoice?.notes?.igst / 100}
                  </p>
                </div>
              ) : null}
              <Separator className="my-2" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p className="text-right text-muted-foreground">Total:</p>
                <p className="text-right">
                  {getCurrencySymbol()}
                  {(invoice?.notes?.total / 100).toFixed(2)}
                </p>
              </div>
            </div>
            <CardFooter className="mt-64 p-0 text-[9px]">
              Terms: This invoice is valid only after payment credited in our
              account. Payment for this invoice is non refundable or/and non
              transferable in any circumstances.
            </CardFooter>
          </Card>
        </>
      )}
    </>
  );
}

const SkeletonInvoice = () => {
  return (
    <>
      <div className="mx-auto mt-4 flex w-full max-w-[8.27in] justify-end sm:mt-0">
        <Skeleton className="mb-2 h-8 w-[100px] rounded-md sm:w-[150px]" />
      </div>
      <Card className="mx-auto w-full max-w-[8.27in] rounded-lg p-8 shadow-lg">
        <div className="mb-8 grid grid-cols-2 gap-4">
          <Skeleton className="h-[60px] w-[120px] rounded-full" />
          <div className="text-right">
            <Skeleton className="mb-2 h-[28px] w-[100px] rounded-full sm:w-[150px]" />
            <Skeleton className="mb-1 h-[20px] w-[150px] rounded-full sm:w-[250px]" />
            <Skeleton className="w-[150px] rounded-full sm:w-[250px]" />
          </div>
        </div>
        <div className="mb-8 grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="mb-1 h-[20px] w-[80px] rounded-full" />
            <Skeleton className="h-[20px] w-[180px] rounded-full" />
          </div>
          <div className="text-right">
            <Skeleton className="mb-1 h-[20px] w-[40px] rounded-full" />
            <Skeleton className="h-[20px] w-[100px] rounded-full" />
          </div>
        </div>
        <div className="mb-8">
          <Skeleton className="mb-1 h-[20px] w-[60px] rounded-full" />
          <Skeleton className="mb-1 h-[20px] w-[120px] rounded-full" />
          <Skeleton className="h-[20px] w-[200px] rounded-full" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="p-2 text-left">
                <Skeleton className="h-[20px] w-full rounded-full" />
              </TableHead>
              <TableHead className="p-2 text-right">
                <Skeleton className="h-[20px] w-full rounded-full" />
              </TableHead>
              <TableHead className="p-2 text-right">
                <Skeleton className="h-[20px] w-full rounded-full" />
              </TableHead>
              <TableHead className="p-2 text-right">
                <Skeleton className="h-[20px] w-full rounded-full" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 1 }).map((_, index) => (
              <TableRow className="border-b" key={index}>
                <TableCell className="p-2">
                  <Skeleton className="h-[20px] w-full rounded-full" />
                </TableCell>
                <TableCell className="p-2 text-right">
                  <Skeleton className="h-[20px] w-full rounded-full" />
                </TableCell>
                <TableCell className="p-2 text-right">
                  <Skeleton className="h-[20px] w-full rounded-full" />
                </TableCell>
                <TableCell className="p-2 text-right">
                  <Skeleton className="h-[20px] w-full rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mb-8 grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="mb-1 h-[20px] w-[80px] rounded-full" />
            <Skeleton className="mb-1 h-[20px] w-[80px] rounded-full" />
            <Skeleton className="mb-1 h-[20px] w-[80px] rounded-full" />
          </div>
          <div className="text-right">
            <Skeleton className="mb-1 h-[20px] w-[80px] rounded-full" />
            <Skeleton className="mb-2 h-[20px] w-[80px] rounded-full" />
            <Skeleton className="mb-1 h-[28px] w-[120px] rounded-full" />
          </div>
        </div>
      </Card>
    </>
  );
};
