import { Footer } from "@/components/modules/home/Footer";
import { Navbar } from "@/components/modules/navbar/navbarHome";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms Of Services</title>
      </Helmet>
      <main className="h-full w-full">
        <Navbar />
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <h1 className="mb-5 scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
            Terms of service
          </h1>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            These Terms and Conditions outline the rules and regulations for the
            use of our web application, located at{" "}
            <Link
              to="https://www.carderfly.com"
              target="_blank"
              className="text-base font-medium underline underline-offset-4"
            >
              Carderfly
            </Link>
            . By accessing this web application, we assume you accept these
            terms and conditions. Do not continue to use Carderfly if you do not
            agree to take all of the terms and conditions stated on this page.
          </p>
          <h2 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Definitions
          </h2>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            <span className="font-medium">Carderfly:</span> refers to our web
            application.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            <span className="font-medium">User Content:</span> encompasses any
            material, including but not limited to text, images, videos, or
            other media, generated, uploaded, or transmitted through Carderfly.
          </p>
          <h2 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            License
          </h2>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            Unless otherwise stated, Carderfly and/or its licensors own the
            intellectual property rights for all material on our web
            application. All intellectual property rights are reserved. You may
            access this from Carderfly for your own personal use subjected to
            restrictions set in these terms and conditions.
          </p>
          <h2 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Restrictions
          </h2>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            Publishing any web application material in any other media;{" "}
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Selling, sublicensing, and/or otherwise commercializing any web
            application material;
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Using this web application in any way that is or may be damaging to
            Carderfly;
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Engaging in any data mining, data harvesting, data extracting, or
            any other similar activity in relation to Carderfly;
          </p>
          <h2 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Account Registration
          </h2>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            When registering an account on Carderfly, you agree to provide
            accurate and up-to-date information, including but not limited to
            your username, email address, and password.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities that occur under your
            account.
          </p>
          <h2 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            User Responsibilities
          </h2>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            Use the platform in compliance with all applicable laws and
            regulations;
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Refrain from generating or uploading content that violates any laws,
            infringes upon the rights of others, or is considered inappropriate
            or offensive.
          </p>
          <h2 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            User Content Ownership
          </h2>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            Any content generated, uploaded, or transmitted through Carderfly
            remains the sole property of the user.
          </p>
          <h3 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight">
            License Grant
          </h3>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            By utilizing Carderfly, you provide us with a global, non-exclusive,
            royalty-free license to utilize, modify, adapt, publish, translate,
            distribute, and showcase the content you submit.
          </p>
          <h3 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight">
            User Content Guidelines
          </h3>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            When utilizing our web application, you are obligated to refrain
            from generating or uploading content that violates any pertinent
            laws, infringes upon the rights of others, or is considered
            inappropriate or offensive.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            While users maintain ownership of their generated content on
            Carderfly, they grant us a non-exclusive license to utilize, modify,
            adapt, publish, translate, and distribute it to facilitate our
            services.
          </p>
          <h2 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Subscription Services
          </h2>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            Carderfly provides subscription services granting access to specific
            features and functionalities of our web application.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            By subscribing to our services, you acknowledge and agree to abide
            by the subscription fees as detailed in the pricing plans available
            on our website.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Subscriptions are set to automatically terminate upon the conclusion
            of the subscription period. Once a subscription is purchased, it
            remains active until the end of the subscription term, at which
            point it will be automatically cancelled. Please note that
            subscription fees are non-refundable.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Carderfly reserves the right to discontinue its services at any
            time. In the event of such discontinuation, customers will not be
            entitled to any refunds or reimbursements for any remaining
            subscription periods.
          </p>
          <h2 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Payment and Billing
          </h2>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            Payment for subscription services is processed securely through our
            third-party payment processor.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            You agree to provide accurate and complete billing information and
            to promptly update such information as necessary to ensure
            uninterrupted service.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Carderfly is not responsible for any unauthorized charges or billing
            errors resulting from inaccurate billing information provided by the
            user.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            All fees are non-refundable unless otherwise stated. You authorize
            us to charge your chosen payment method for the subscription fees
            and any applicable taxes.
          </p>
          <h2 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Intellectual Property
          </h2>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            All intellectual property rights related to Carderfly, including but
            not limited to trademarks, logos, and software, are owned by
            Carderfly or its licensors.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            You may not use, reproduce, or distribute any copyrighted materials
            from our web application without prior written consent.
          </p>
          <h2 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Your Content
          </h2>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            In these terms and conditions, &quot;Your Content&quot; shall mean
            any audio, video, text, images, or other material you choose to
            display on Carderfly. By displaying Your Content, you grant
            Carderfly a non-exclusive, worldwide irrevocable, sub licensable
            license to use, reproduce, adapt, publish, translate, and distribute
            it in any and all media.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Your Content must be your own and must not be invading any
            third-party&apos;s rights. Carderfly reserves the right to remove
            any of Your Content from this web application at any time without
            notice.
          </p>
          <h2 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            No warranties
          </h2>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            This web application is provided &quot;as is,&quot; with all faults,
            and Carderfly expresses no representations or warranties, of any
            kind related to this web application or the materials contained on
            this web application. Also, nothing contained on this web
            application shall be interpreted as advising you.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            During periods of maintenance, the application may be temporarily
            unavailable. Carderfly does not guarantee uninterrupted service
            during maintenance activities.
          </p>
          <h2 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Limitation of liability
          </h2>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            In no event shall Carderfly, nor any of its officers, directors, and
            employees, shall be held liable for anything arising out of or in
            any way connected with your use of this web application whether such
            liability is under contract.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Carderfly, including its officers, directors, and employees, shall
            not be held liable for any indirect, consequential, or special
            liability arising out of or in any way related to your use of this
            web application.
          </p>
          <h2 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Variation of Terms
          </h2>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            Carderfly is permitted to revise these terms at any time as it sees
            fit, and by using this web application you are expected to review
            these terms regularly.
          </p>

          <h2 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Assignment{" "}
          </h2>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            The Carderfly is allowed to assign, transfer, and subcontract its
            rights and/or obligations under these terms without any
            notification. However, you are not allowed to assign, transfer, or
            subcontract any of your rights and/or obligations under these terms.
          </p>

          <h2 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Changes to Terms
          </h2>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            Carderfly reserves the right to modify or update these Terms and
            Conditions at any time without prior notice. It is your
            responsibility to review these terms periodically for any changes.
          </p>

          <h2 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Entire Agreement
          </h2>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            These terms constitute the entire agreement between Carderfly and
            you in relation to your use of this web application and supersede
            all prior agreements and understandings.
          </p>
        </div>
        <Footer />
      </main>
    </>
  );
}
