import axios from "@/api/axios";

export async function DownloadInvoicePdf(invoiceId, invoiceNumber) {
  try {
    const response = await axios.get(`/invoice/pdf/${invoiceId}`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Invoice_${invoiceNumber}.pdf`);
    document.body.appendChild(link);
    link.click();
    // Cleanup after download
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error(error);
  }
}
