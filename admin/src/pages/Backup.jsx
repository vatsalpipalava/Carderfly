import { useState } from "react";
import { Helmet } from "react-helmet";

import { AlertCircle, DatabaseBackup, ImageDown, Loader2 } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import SheetDashboard from "@/components/navbar/sheetDashboard";
import LogoutDropdown from "@/components/navbar/logoutDropdown";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export function Backup() {
  const { toast } = useToast();
  const axiosPrivate = useAxiosPrivate();

  const [dbLoading, setDbLoading] = useState(false);
  const [dbErrMsg, setDbErrMsg] = useState("");

  const [imageLoading, setImageLoading] = useState(false);
  const [imageErrMsg, setImageErrMsg] = useState("");

  const handleDbBackup = async () => {
    setDbLoading(true);
    try {
      const date = new Date().toISOString().split("T")[0];
      const zipFileName = `carderfly-db-${date}.zip`;

      const response = await axiosPrivate.get("/backup/export/db", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", zipFileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setDbLoading(false);
      toast({
        title: "Grate! Success.",
        description: "Backup file download successfully.",
      });
    } catch (err) {
      setDbLoading(false);
      if (!err?.response) {
        setDbErrMsg("No server response.");
      } else if (err.response?.status === 404) {
        setDbErrMsg("No collections found in the database.");
      } else if (err.response?.status === 500) {
        setDbErrMsg(err.response?.data?.message);
      } else {
        setDbErrMsg("Backup Failed.");
      }
    }
  };

  const handleImageBackup = async () => {
    setImageLoading(true);
    try {
      const date = new Date().toISOString().split("T")[0];
      const zipFileName = `carderfly-images-${date}.zip`;

      const response = await axiosPrivate.get("/backup/export/images", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", zipFileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setImageLoading(false);
      toast({
        title: "Grate! Success.",
        description: "Backup images download successfully.",
      });
    } catch (err) {
      setDbLoading(false);
      if (!err?.response) {
        setImageErrMsg("No server response.");
      } else if (err.response?.status === 404) {
        setImageErrMsg("Uploads directory not found.");
      } else if (err.response?.status === 500) {
        setImageErrMsg(err.response?.data?.message);
      } else {
        setImageErrMsg("Backup Failed.");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Backup</title>
      </Helmet>
      <header className="fixed top-0 z-50 flex h-14 w-full items-center gap-4 border-b bg-background px-4 md:w-[calc(100%-208px)] lg:h-[60px] lg:w-[calc(100%-256px)] lg:px-6">
        <SheetDashboard />
        <div className="w-full flex-1">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Backup</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <LogoutDropdown />
      </header>
      <main className="flex flex-1 flex-col gap-4 px-4 pb-4 pt-[72px] lg:gap-6 lg:px-6 lg:pb-6 lg:pt-[84px]">
        {/* Error Message */}
        {dbErrMsg ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{dbErrMsg}</AlertDescription>
          </Alert>
        ) : null}

        {imageErrMsg ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{imageErrMsg}</AlertDescription>
          </Alert>
        ) : null}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {dbLoading ? (
            <Button
              disabled
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={handleDbBackup}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              <DatabaseBackup className="mr-2 h-5 w-5" /> Database Backup
            </Button>
          )}

          {imageLoading ? (
            <Button
              disabled
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={handleImageBackup}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              <ImageDown className="mr-2 h-5 w-5" /> Images Backup
            </Button>
          )}
        </div>
      </main>
    </>
  );
}
