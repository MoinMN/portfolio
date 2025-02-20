import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, url }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* General Open Graph Meta */}
      <meta property="og:title" content={title} />
      <meta property="og:description"
        content="Discover my expertise in MERN Stack, Next.js, and full-stack web development. I specialize in building scalable, high-performance applications, delivering innovative solutions, and crafting seamless user experiences. Explore my projects, services, and technical skills." />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Moin MN | Portfolio | MERN Stack Developer" />

      {/* Facebook & WhatsApp (1200x630) */}
      <meta property="og:image" content="https://www.moinnaik.bio/meta/facebook-og.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter (X) (1200x675) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@yourTwitterHandle" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description"
        content="Discover my expertise in MERN Stack, Next.js, and full-stack web development. I specialize in building scalable, high-performance applications, delivering innovative solutions, and crafting seamless user experiences. Explore my projects, services, and technical skills." />
      <meta name="twitter:image" content="https://www.moinnaik.bio/meta/twitter-og.jpg" />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="675" />

      {/* LinkedIn (1200x627) */}
      <meta property="og:image" content="https://www.moinnaik.bio/meta/linkedin-og.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />

      {/* Instagram (1080x1920 for Stories) */}
      <meta property="og:image" content="https://www.moinnaik.bio/meta/instagram-og.jpg" />
      <meta property="og:image:width" content="1080" />
      <meta property="og:image:height" content="1920" />

      {/* WhatsApp (1200x630, same as Facebook) */}
      <meta property="og:image" content="https://www.moinnaik.bio/meta/whatsapp-og.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Pinterest (1000x1500) */}
      <meta property="og:image" content="https://www.moinnaik.bio/meta/pinterest-og.jpg" />
      <meta property="og:image:width" content="1000" />
      <meta property="og:image:height" content="1500" />
    </Helmet>
  );
};

export default SEO;
