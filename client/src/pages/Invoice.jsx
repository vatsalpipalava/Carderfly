import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AlertCircle, Download } from "lucide-react";

import useStyle from "@/hooks/useStyle";

import SheetDashboard from "@/components/modules/navbar/sheetDashboard";
import LogoutDropdown from "@/components/modules/navbar/logoutDropdown";
import Carderfly from "@/assets/svgs/carderfly";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import NotFound from "./NotFound";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

export default function Invoice() {
  const { subscribeId } = useParams();
  const { setStyle } = useStyle();
  const axiosPrivate = useAxiosPrivate();

  const [invoice, setInvoice] = useState();
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
          setInvoice(response?.data?.data);
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

  const create = new Date(invoice?.created * 1000);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedCreateDate = create.toLocaleDateString("en-US", options);

  return (
    <>
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
            <Button asChild>
              <Link to={invoice?.hosted_invoice_url} target="_blank">
                <Download className="mr-2 h-4 w-4" />
                Download invoice
              </Link>
            </Button>
          </div>
          <Card className="mx-auto mb-6 mt-2 w-full max-w-[8.27in] rounded-lg p-4 shadow-lg sm:p-6">
            <div className="mb-8 grid grid-cols-2 gap-4">
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
              <div className="text-right">
                <h2 className="text-2xl font-bold">Carderfly</h2>
                <p className="text-muted-foreground">
                  123 Main St, Anytown USA 12345
                </p>
                <p className="text-muted-foreground">Phone: (555) 555-5555</p>
                <p className="text-muted-foreground">
                  Email: info@carderfly.com
                </p>
              </div>
            </div>
            <div className="mb-8 grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground">Invoice #:</p>
                <p className="font-bold">{invoice?.number}</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground">Date:</p>
                <p className="font-bold">{formattedCreateDate}</p>
              </div>
            </div>
            <div className="mb-8">
              <p className="text-muted-foreground">Bill To:</p>
              <p className="font-bold">{invoice?.customer_name}</p>
              <p>{invoice?.customer_address?.line1}</p>
              <p>{invoice?.customer_address?.line2}</p>
              <p>
                {invoice?.customer_address?.city} -{" "}
                {invoice?.customer_address?.postal_code},{" "}
                {invoice?.customer_address?.state},{" "}
                {invoice?.customer_address?.country}.
              </p>
              <p>Phone: {invoice?.customer_phone}</p>
              <p>Email: {invoice?.customer_email}</p>
            </div>
            <Table>
              <TableHeader className="bg-muted text-muted-foreground">
                <TableRow>
                  <TableHead className="p-2 text-left">Item</TableHead>
                  <TableHead className="p-2 text-right">Qty</TableHead>
                  <TableHead className="p-2 text-right">Unit Price</TableHead>
                  <TableHead className="p-2 text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-b">
                  <TableCell className="p-2">
                    {invoice?.lines?.data[0]?.price?.lookup_key}
                  </TableCell>
                  <TableCell className="p-2 text-right">
                    {invoice?.lines?.data[0]?.quantity}
                  </TableCell>
                  <TableCell className="p-2 text-right">
                    ₹{invoice?.lines.data[0]?.price?.unit_amount / 100}.00
                  </TableCell>
                  <TableCell className="p-2 text-right">
                    ₹{invoice?.lines.data[0]?.amount / 100}.00
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Separator />
            <div className="mb-8 mt-6 grid grid-cols-2 gap-4">
              <div className="text-right">
                <p className="text-muted-foreground">CGST (9%):</p>
                <p className="font-bold">$9.00</p>
                <p className="text-muted-foreground">SGST (9%):</p>
                <p className="font-bold">$9.00</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground">Subtotal:</p>
                <p className="font-bold">₹{invoice?.subtotal / 100}</p>
                <p className="text-muted-foreground">Round off:</p>
                <p className="font-bold">$0.06</p>
                <p className="text-muted-foreground">Total:</p>
                <p className="text-2xl font-bold">₹{invoice?.total / 100}.00</p>
              </div>
            </div>
            <Separator />
            <div className="mb-8 mt-6 grid grid-cols-1 text-right">
              <p className="text-muted-foreground">Amount paid:</p>
              <p className="font-bold">₹{invoice?.amount_paid / 100}.00</p>
              <p className="text-muted-foreground">Amount due:</p>
              <p className="font-bold">₹0.00</p>
            </div>
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
            <Skeleton className="mb-1 h-[20px] w-[80px] rounded-full" />
          </div>
          <div className="text-right">
            <Skeleton className="mb-1 h-[20px] w-[80px] rounded-full" />
            <Skeleton className="mb-1 h-[20px] w-[80px] rounded-full" />
            <Skeleton className="mb-1 h-[20px] w-[80px] rounded-full" />
            <Skeleton className="mb-2 h-[20px] w-[80px] rounded-full" />
            <Skeleton className="mb-1 h-[28px] w-[120px] rounded-full" />
          </div>
        </div>
      </Card>
    </>
  );
};
