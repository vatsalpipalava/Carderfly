import { Footer } from "@/components/modules/home/Footer";
import { Navbar } from "@/components/modules/navbar/navbarHome";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export function TermsAndConditions() {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions</title>
      </Helmet>
      <main className="h-full w-full">
        <Navbar />
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <h6 className="mb-5 scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
            Terms & Conditions
          </h6>
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
          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Our Disclosures
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            We reserve the right to modify these Terms, remove features or
            functionality from the Platform, or alter your Membership at any
            time.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            We are not liable for Consequential Loss, losses caused by
            Third-Party Services, or any loss or corruption of data.{" "}
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            We may terminate a Subscription immediately to address issues like
            account duplication or if we find misuse of the Platform.{" "}
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Subscriptions automatically terminate at the end of their designated
            period. Once purchased, a subscription remains active for its full
            term, after which it will be automatically canceled. Please note
            that subscription fees are non-refundable. All Fees and Product Fees
            are non-refundable and non-transferable.
          </p>
          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Introduction
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            We offer a cloud-based, software-as-a-service platform that enables
            individuals and businesses to manage and share identity profiles, as
            well as receive and organize contact information.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            If you are using the Platform on behalf of your employer or a
            business entity, you personally confirm that you are authorized to
            act on their behalf and have the authority to bind both the entity
            and its personnel to these Terms.
          </p>

          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Acceptance and Platform Use
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            By registering on or using the Platform, you agree to these Terms.
            As long as you comply with these Terms, we grant you a personal,
            non-exclusive, royalty-free, worldwide, and non-transferable to use
            our Platform. Any other use is prohibited without our prior written
            consent. When using the Platform, you must not engage in or attempt
            any unlawful or inappropriate actions, including:
            <br />
            (a) Violating an individual&apos;s privacy (such as uploading
            personal information without consent) or infringing any other legal
            rights;
            <br />
            (b) Using the Platform to defame, harass, threaten, or offend
            anyone, including sending unsolicited electronic messages;
            <br />
            (c) Tampering with or modifying the Platform (including transmitting
            viruses or using trojan horses);
            <br />
            (d) Employing data mining, robots, screen scraping, or similar data
            extraction tools on the Platform; or
            <br />
            (e) Helping or enabling a third party to engage in any of the above
            actions.
          </p>

          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Carderfly Services
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            In exchange for your payment of the Fees, we agree to provide you
            access to the Platform, support services outlined in this section,
            and any other services specified in your Account.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            We will make every effort to ensure the Platform is available at all
            times. However, there may be periods of scheduled or emergency
            maintenance during which the Platform may be temporarily
            unavailable.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            If you encounter issues accessing the Platform or have any
            questions, please contact us at info@carderfly.com. We will aim to
            respond to support requests within a reasonable timeframe.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            You acknowledge that the Platform may depend on or integrate with
            third-party systems (Third Party Services), which we do not control.
            To the fullest extent allowed, we are not liable for any issues
            arising from Third Party Services or any Platform unavailability
            caused by their failure.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            You also acknowledge that data loss is an inherent risk of using
            software. If you input any data into the Platform, you agree to
            maintain backup copies of your data.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            If your account is used for business purposes, you acknowledge that
            your employer, business entity, or third parties may access your
            data and other details related to your use of the Platform.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            We are not liable for any data loss or corruption, or for Platform
            unavailability due to scheduled or emergency maintenance.
          </p>
          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Products
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            You will be charged for Products based on the specifications you
            select on our website (Product Fee).
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Service of Products will active eonce the full Product Fee has been
            paid.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Once an order for Products is placed, it cannot be cancelled. The
            order will automatically terminate at the end of the
            product/subscription period.
          </p>

          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Shipping (No Shipping Required)
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            No shipping is required with Carderfly&apos;s digital business card
            service. Everything is provided online, without the need for
            physical delivery.
          </p>

          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight">
            Accounts
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            To access the Platform&apos;s features, you must register and create
            an account (Account).
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            When registering, you are required to provide basic information,
            including your email address. All personal information you share
            will be handled in accordance with our Privacy Policy.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            You agree to provide accurate, up-to-date information for your
            Account and to keep your Account password private. Your Account is
            personal and should not be shared or transferred to others.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            You are responsible for maintaining the confidentiality of your
            Account details, including your email and password, and will be held
            accountable for any activity, including purchases, made through your
            Account. Notify us immediately if you suspect unauthorized use of
            your Account.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            You agree to use the Platform in compliance with all applicable
            terms and condition Additionally, you must not generate or upload
            content that violates any laws, infringes on the rights of others,
            or is deemed inappropriate or offensive.
          </p>

          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight">
            Memberships
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            Your Product/Subscription will remain active until the expiration
            date unless it is suspended or terminated in accordance with these
            Terms. You cannot cancel your product/subscription during this
            period; it will automatically terminate at the end of the current
            term. You may purchase a new product/subscription after your current
            one ends.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            The payment methods available for the Fees are listed on the
            Platform. We may utilize a third-party provider, such as Razorpay,
            for payment processing. You acknowledge that we do not control the
            actions of these third-party providers, and your use of their
            payment services may be subject to additional terms and conditions.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            There is no free trial option for your subscription. You are
            required to purchase a product/subscription in order to share
            digital business cards with others.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Upon registering your Carderfly account, you will have access to our
            dashboard, where you can create a digital business card. All
            features for creation are enabled; however, your public Carderfly
            link will not be accessible until you purchase a
            product/subscription plan to share your digital business cards.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            You must not attempt to pay the Fees through fraudulent or unlawful
            means. We do not store any credit card / debit card and other
            payment option information; all payment details are collected and
            processed by our third-party payment processors.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            You cannot upgrade your current product/subscription. However, you
            may purchase a higher subscription after your existing
            product/subscription expires.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            As per our terms and condition, once paid, the Fees and Product Fees
            / subscription fees are non-refundable / non-cancellable /
            non-transferable.
          </p>

          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Our Intellectual Property
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            We grant you permission to use Our Intellectual Property solely for
            your limited commercial purposes. You must not exploit Our
            Intellectual Property for any other reason or permit, assist, or
            facilitate such use by any third party. Your use must be restricted
            to devices that you control or have approved.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            You must not, directly or indirectly:
            <br />
            (a) allow any individual or entity other than authorized users to
            access and use the Platform or Products;
            <br />
            (b) attempt to gain unauthorized access to any part of the Platform
            or its associated systems or networks;
            <br />
            (c) use or access our Intellectual Property except as permitted by
            these Terms;
            <br />
            (d) modify, copy, or create derivative works based on our Platform
            or Products, or any part, feature, or function of them;
            <br />
            (e) reverse engineer, disassemble, or decompile any portion of the
            Platform or Products, or attempt to discover or recreate their
            source code for the purpose of (1) copying ideas, features,
            functions, or graphics, (2) developing competing products or
            services, or (3) conducting competitive analyses;
            <br />
            (f) remove, obscure, or alter any proprietary notices related to the
            Platform or Products;
            <br />
            (g) send or store malicious code;
            <br />
            (h) use or allow others to use the Platform or Products in violation
            of applicable laws;
            <br />
            (i) use or permit others to use the Platform or Products in any
            manner not described in these Terms.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            You must not, without our prior written consent:
            <br />
            (a) copy, in whole or in part, any of Our Intellectual Property;
            <br />
            (b) reproduce, retransmit, distribute, disseminate, sell, publish,
            broadcast, or circulate any of Our Intellectual Property to third
            parties; or
            <br />
            (c) infringe upon any intellectual property rights associated with
            the Platform, including (but not limited to) altering or modifying
            Our Intellectual Property, framing or embedding it on another
            website, or creating derivative works based on it.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            This clause does not restrict your ability to publish, post, or
            repost Our Intellectual Property on your social media accounts or
            blogs, provided that:
            <br />
            (a) you do not claim ownership of Our Intellectual Property;
            <br />
            (b) unless explicitly agreed upon in writing, you do not imply that
            you are endorsed or approved by us;
            <br />
            (c) you do not damage or exploit our reputation, including in any
            illegal, unfair, misleading, or deceptive manner; and
            <br />
            (d) you comply with all other terms outlined in these Terms.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            All intellectual property rights related to Carderfly, including but
            not limited to trademarks, logos, and software, are owned by
            Carderfly.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            You may not use, reproduce, or distribute any copyrighted materials
            from our web application without prior written consent.
          </p>

          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Your Data
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            You grant us an unlimited, worldwide, perpetual, royalty-free, and
            assignable to copy, transmit, store, back up, and/or otherwise
            access or use Your Data and the Output Data for the following
            purposes:
            <br />
            (a) to communicate with you, including sending information we
            believe may be of interest to you;
            <br />
            (b) to provide the Platform to you and fulfill our obligations under
            these Terms;
            <br />
            (c) to diagnose issues with the Platform;
            <br />
            (d) to enhance and modify the Platform;
            <br />
            (e) to perform analytics;
            <br />
            (f) to develop other services, provided that we de-identify Your
            Data; and
            <br />
            (g) as reasonably required to fulfill our obligations under these
            Terms.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            You agree that you are solely responsible for all of Your Data made
            available on or through the Platform. You represent and warrant
            that:
            <br />
            (a) you are either the sole and exclusive owner of Your Data, or you
            have all rights, consents and releases necessary to grant us the
            rights to Your Data as contemplated by these Terms; and
            <br />
            (b) neither Your Data, nor its posting, uploading, publication,
            submission, or transmission on, through, or by means of our Platform
            will infringe, misappropriate, or violate any third party&apos;s
            intellectual property rights, publicity or privacy rights.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            You acknowledge and agree that we may monitor, analyze, and compile
            statistical and performance information based on and related to your
            use of the Platform, in an aggregated and anonymized format
            (Analytics). You further acknowledge that we own all rights to the
            Analytics and may use them for our internal business purposes,
            provided that the Analytics do not contain any identifying
            information.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            We do not endorse or approve any of Your Data and are not
            responsible for it.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            You acknowledge that the Platform&apos;s integrity and the accuracy
            of the Output Data depend on the accuracy and completeness of Your
            Data. Providing inaccurate or incomplete data may affect the use,
            output, and operation of the Platform.
          </p>

          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Warranties
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            You represent, warrant, and agree that:
            <br />
            (a) you will not use our Platform, including Our Intellectual
            Property, in any manner that competes with our business;
            <br />
            (b) there are no legal restrictions preventing you from entering
            into these Terms;
            <br />
            (c) all information and documentation you provide to us in
            connection with these Terms is accurate, correct, and complete; and
            <br />
            (d) you have not relied on any representations or warranties made by
            us regarding the Platform (including its fitness or suitability for
            your specific purposes), unless explicitly stated in these Terms.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            This web application is provided &quot;as is,&quot; with all faults,
            and Carderfly makes no representations or warranties of any kind
            regarding this web application or the materials contained within it.
            Additionally, nothing on this web application should be interpreted
            as offering you advice.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            During maintenance periods, the application may be temporarily
            unavailable. Carderfly does not guarantee uninterrupted service
            during these maintenance activities.
          </p>

          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Liability
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            To the fullest extent allowed (a) You agree to compensate us for any
            costs or damages we incur due to your violation of the Acceptance
            and Platform use or the Intellectual Property of these Terms. (b)
            Neither party will be responsible for any consequential losses.
          </p>

          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Termination
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            Cancellation of Subscription: You cannot cancel your
            product/subscription during its term; it will automatically
            terminate on the expiration date.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Our platform does not offer an auto-renewable product/subscription
            feature. We reserve the right to block your card during the
            subscription period if we detect inappropriate content (e.g.,
            sensitive material, copyright violations). If your card is blocked,
            it will be marked as &quot;Blocked&quot; on your dashboard. In the
            event of a card suspension, any payments made to us (including Fees
            and Product Fees) are non-refundable. After your card is blocked,
            please provide the necessary information and contact us to request
            unblocking. We will review the situation before unblocking your
            card.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            If we suspect that you are violating these Terms, we may suspend
            your access to the Platform while we investigate the suspected
            breach.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            We may terminate a services immediately to resolve a system issue,
            such as account duplication, or if you are found to be misusing the
            Platform.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Upon the expiration or termination of your Subscription:
            <br />
            (a) your access to public links for sharing digital cards will be
            removed;
            <br />
            (b) you acknowledge that, except in cases of termination due to our
            Termination for Convenience or breach of these Terms, and to the
            fullest extent permitted by law, any payments made to us (including
            Fees and Product Fees) are non-refundable;
            <br />
            (c) if we terminate your Membership for any reason other than a
            Termination for Convenience, you also agree to compensate us for any
            reasonable additional costs directly resulting from that
            termination.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Carderfly reserves the right to discontinue its services at any
            time. In such cases, customers will not be entitled to any refunds
            or reimbursements for any remaining subscription periods.
          </p>

          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Payment and Billing
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            Payments for product/subscription services are securely processed
            through our third-party payment processor. You agree to provide
            accurate and complete billing information and to promptly update
            this information as needed to ensure uninterrupted service.
            Carderfly is not liable for any unauthorized charges or billing
            errors resulting from inaccurate billing information provided by
            you. All fees are non-refundable.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            You authorize us to charge your selected payment method for product/
            subscription fees and any applicable taxes.
          </p>

          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Refund and Cancellation
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            Subscriptions automatically terminate at the end of their designated
            period. Once purchased, a subscription remains active for its full
            term, after which it will be automatically canceled. You do not
            cancel subscription or upgrade subscription. Please note that
            subscription fees are non-refundable. All Fees and Product Fees are
            non-refundable and non-transferable.
          </p>

          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            General
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            Publicity: With your prior written consent, you agree that we may
            advertise or publicize your status as a user of our Platform,
            including on our website or in our promotional materials.
          </p>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-0">
            Third-Party Sites: The Platform may contain links to websites
            operated by third parties. Unless stated otherwise, we do not
            control, endorse, or approve the content of those websites, nor are
            we responsible for it. We recommend that you conduct your own
            investigations regarding the suitability of those websites. If you
            purchase goods or services from a third-party website linked from
            the Platform, the third party, not us, provides those goods and
            services to you.
          </p>

          <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight first:mt-0">
            Changes to Terms
          </h6>
          <p className="text-base leading-7 [&:not(:first-child)]:mt-2">
            Carderfly reserves the right to modify or update these Terms and
            Conditions at any time without prior notice. It is your
            responsibility to periodically review these terms for any changes.
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
