import axios from "@/api/axios";

export async function DownloadVcfTemplate(cardId, publicLink) {
  try {
    const response = await axios.get(`/card/vcf-download/${cardId}`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${publicLink}.vcf`);
    document.body.appendChild(link);
    link.click();
    // Cleanup after download
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error(error);
  }
}
