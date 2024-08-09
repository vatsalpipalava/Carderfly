import { Helmet } from "react-helmet";

// eslint-disable-next-line react/prop-types
function HelmetLayout({ title, description, imageUrl, pageUrl, children }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="350" />
        <meta property="og:image:height" content="350" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "url": ${pageUrl},
              "logo": ${imageUrl}
            }
          `}
        </script>
      </Helmet>
      {children}
    </>
  );
}

export default HelmetLayout;
