import { Footer } from "@/components/modules/home/Footer";
import { Navbar } from "@/components/modules/navbar/navbarHome";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy</title>
      </Helmet>
      <main className="h-full w-full">
        <Navbar />
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <h6 className="mb-5 scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
            Privacy Policy
          </h6>
          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Definitions
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            The term &quot;Website&quot; refers to the Carderfly website &nbsp;
            <Link
              to="https://www.carderfly.com"
              target="_blank"
              className="text-base font-medium underline underline-offset-4"
            >
              Carderfly
            </Link>
            , developed and maintained by the Company, and accessed by users in
            accordance with this Privacy Policy.
          </p>
          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Introduction
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            This Privacy Policy outlines how Carderfly collects, protects, and
            uses your Personal Information when you use our website and related
            products and services. It also describes your choices regarding our
            use of your Personal Information and how you can access and update
            this information. By using our Services, you agree to the terms of
            this Policy. This Policy does not cover the practices of third-party
            companies or individuals that we do not control.
          </p>
          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Collection of Personal Information
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            You can access and use our Services without disclosing your
            identity. However, if you choose to use certain features, you may be
            asked to provide Personal Information such as your name and email
            address. We collect and store information that you voluntarily
            provide when you create an account, make a purchase, or complete
            online forms. This information may include:
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Selling, sublicensing, and/or otherwise commercializing any web
            application material;
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            • Personal details (e.g., name, photograph)
            <br />• Contact information (e.g., email address, physical address)
            <br />• Account details (e.g., username, password)
            <br />• Payment information
            <br />• Geolocation data (e.g., latitude and longitude)
            <br />• Features on your mobile device (e.g., contacts, calendar,
            gallery)
          </p>
          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            How We Use Your Information
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            We use your information to:
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            • Provide and improve our products and services
            <br />• Address your queries and provide customer support
            <br />• Share updates, offers, and other information about our
            products and services
            <br />• Prepare reports, analyze data, and gain insights to enhance
            our offerings
            <br />• Process financial transactions
            <br />• Consult with professionals (e.g., accountants, auditors,
            lawyers) for service-related advice
          </p>
          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Children&apos;s Privacy Policy
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            Carderfly&apos;s services are not intended for individuals under the
            age of 13. We do not knowingly collect information from anyone under
            13. If you are under 13, please do not provide any Personal
            Information on our Website.
          </p>
          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight">
            Responsibility for Card Content
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            The card creator is fully responsible for all details entered into
            the digital card, including but not limited to, name, contact
            number, address, location, email, social media links, website links,
            descriptions, and all images (personal photographs, product images,
            etc.).
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Carderfly does not verify the accuracy of the information provided
            and is not responsible for any incorrect or erroneous details
            submitted by the card creator.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Carderfly is not responsible for any consequences resulting from
            inaccuracies or misleading information provided by the card creator.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            The card creator must ensure that the details entered do not violate
            the laws or regulations of any country.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            The card creator must ensure that the information provided in the
            digital card is reviewed and approved by the individuals or entities
            whose details are shared, especially when sharing with third
            parties.
          </p>
          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight">
            Image Usage and Copyright
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            The card creator must ensure that all images used in the digital
            card are either owned by them or used with proper authorization.
            This includes personal photos, product images, and any other images.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Carderfly is not liable for any issues arising from the use of
            copyrighted or third-party images without proper consent. The card
            creator must ensure that all images comply with copyright laws and
            do not infringe on the rights of third parties.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Carderfly is not liable for any legal claims or disputes related to
            the use of copyrighted or unauthorized images.{" "}
          </p>
          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Automatic Collection of Information
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            We collect both Personal and Non-Personal Information. Non-Personal
            Information, such as IP address, cookies, access time, browser, and
            language, is collected automatically and used for our records. We do
            not share, sell, or transfer your Personal Data without consent. You
            have the right to request correction or deletion of your Personal
            Data and to restrict or suspend its processing under certain
            circumstances. We may process minimal user data necessary for
            maintaining our Services. Information collected automatically is
            used to detect abuse and generate statistical data about Service
            usage. This data is not aggregated in a way that identifies specific
            users.
          </p>
          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Links to Other Resources
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            Our Services may contain links to other websites or resources not
            owned or controlled by us. We are not responsible for the privacy
            practices of these third parties. We encourage you to review their
            privacy policies when you leave our Services.
          </p>
          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Information Security
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            We implement reasonable administrative, technical, and physical
            safeguards to protect your information from unauthorized access and
            disclosure. However, no method of data transmission over the
            Internet or wireless network is completely secure. While we strive
            to protect your Personal Information, we cannot guarantee its
            absolute security.
          </p>
          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Managing Information
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            We retain your Personal Data as long as your account is active and
            as reasonably necessary. We may retain it even after account closure
            to comply with legal obligations and enforce our agreements.
          </p>
          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Billing and Payments
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            We use third-party payment processors to handle your payment
            information securely. The use of your data by these processors is
            governed by their own privacy policies, which may differ from ours.
            We recommend reviewing their privacy policies.
          </p>
          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Changes and Amendments
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            We reserve the right to modify this Policy and its terms. Any
            material changes will be communicated to you via email or other
            contact methods. Updated versions of the Policy will take effect
            immediately upon posting. Continued use of our Services after
            changes indicates your acceptance of the revised Policy.
          </p>
          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Acceptance of This Policy
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            By accessing and using our Services, you acknowledge that you have
            read and agree to this Policy. If you do not agree to the terms, you
            should not use our Services.
          </p>
          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Contact Us
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            For any questions or clarifications regarding this Privacy Policy,
            please contact us at{" "}
            <Link
              to="mailto:info@carderfly.com"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              info@carderfly.com
            </Link>
            .
          </p>
          <p className="text-base italic leading-7 [&:not(:first-child)]:mt-2">
            Last updated: September 15, 2024
          </p>
        </div>
        <Footer />
      </main>
    </>
  );
}
