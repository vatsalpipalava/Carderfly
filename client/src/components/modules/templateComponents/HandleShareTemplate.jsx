export async function HandleShareTemplate(cardPublicLink) {
  const shareData = {
    title: "Digital Card",
    text: "Check out this link!",
    url: `${import.meta.env.VITE_FRONTEND_URL}/${cardPublicLink}`,
  };

  try {
    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch((err) => {
          console.error("Error while using Web share API:", err);
        });
    } else {
      alert("Browser doesn't support this Share !");
    }
  } catch (error) {
    window.alert(error.message);
    console.error("Error sharing:", error.message);
  }
}
