import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function EditCardButton({ cardId }) {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const cardData = useSelector((state) => state?.editCard?.card);

  const findById = (array, _id) => array.find((item) => item._id === _id);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^\+\d{2,3}\d{10}$/;
    return mobileRegex.test(mobile);
  };

  const handleGenerateCard = async () => {
    const publicLink = cardData.publicLink;
    const firstName = cardData.firstName;
    const lastName = cardData && cardData.lastName;
    const jobTitle = cardData && cardData.jobTitle;
    const businessName = cardData && cardData.businessName;
    const businessAddress = cardData && cardData.businessAddress;
    const businessDescription = cardData && cardData.businessDescription;

    const mobileAction = findById(cardData.primaryActions, "mobile");
    const emailAction = findById(cardData.primaryActions, "email");

    if (!publicLink || !publicLink.trim()) {
      setError("Please enter link");
    }

    if (!firstName || !firstName.trim()) {
      setError("Please enter First Name");
      return;
    }

    if (!lastName || !lastName.trim()) {
      setError("Please enter Last Name");
      return;
    }

    if (!jobTitle || !jobTitle.trim()) {
      setError("Please enter Job Title");
      return;
    }

    if (!businessName || !businessName.trim()) {
      setError("Please enter Business Name");
      return;
    }

    if (!businessAddress || !businessAddress.trim()) {
      setError("Please enter Business Address");
      return;
    }

    if (!businessDescription || !businessDescription.trim()) {
      setError("Please enter Business Description");
      return;
    }

    if (
      !mobileAction ||
      !emailAction ||
      !mobileAction.value.trim() ||
      !emailAction.value.trim()
    ) {
      setError("Please enter both mobile number and email.");
      return;
    }

    if (!validateMobile(mobileAction.value)) {
      setError("Please enter a valid mobile number.");
      return;
    }

    if (!validateEmail(emailAction.value)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await axiosPrivate.put(`/card/edit-card/${cardId}`, cardData);
      setLoading(false);
      toast({
        title: "Grate! Success.",
        description: "Card Update Successfully.",
      });
      setError("");
      navigate(`/view-card/${cardId}`)
    } catch (err) {
      setLoading(false);
      if (!err?.response) {
        setError("No server response");
      } else if (err.response?.status === 400) {
        setError("Public link is required.");
      } else if (err.response?.status === 409) {
        setError("Link already taken.");
      } else {
        setError("Card update failed.");
      }
    }
  };

  return (
    <>
      {error ? (
        <Alert variant="destructive" className="mb-4 sm:mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {/* Submit Button */}
      {loading ? (
        <Button disabled className="w-full">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button onClick={handleGenerateCard} type="submit" className="w-full">
          Update Card
        </Button>
      )}
    </>
  );
}
