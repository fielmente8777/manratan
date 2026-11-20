import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 90],
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      {
        source: "/rooms-&-suites",
        destination: "/accommodation",
      },
      {
        source: "/rooms-%26-suites",
        destination: "/accommodation",
      },
      {
        source: "/rooms-&-suites/:path*",
        destination: "/accommodation/:path*",
      },
      {
        source: "/rooms-%26-suites/:path*",
        destination: "/accommodation/:path*",
      },
      {
        source: "/rooms-and-suites",
        destination: "/accommodation",
      },
      {
        source: "/rooms-and-suites/:path*",
        destination: "/accommodation/:path*",
      },
      {
        source: "/weddings-&-events",
        destination: "/events",
      },
      {
        source: "/weddings-%26-events",
        destination: "/events",
      },
      {
        source: "/weddings-&-events/:path*",
        destination: "/events/:path*",
      },
      {
        source: "/weddings-%26-events/:path*",
        destination: "/events/:path*",
      },
      {
        source: "/weddings-and-events",
        destination: "/events",
      },
      {
        source: "/weddings-and-events/:path*",
        destination: "/events/:path*",
      },
      {
        source: "/contact-us",
        destination: "/contactus",
      },
      {
        source: "/contact-us/:path*",
        destination: "/contactus/:path*",
      },
      {
        source: "/journal",
        destination: "/blogs",
      },
      {
        source: "/journal/:path*",
        destination: "/blogs/:path*",
      },
      {
        source: "/jounal",
        destination: "/blogs",
      },
      {
        source: "/jounal/:path*",
        destination: "/blogs/:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/blogs",
        destination: "/journal",
        permanent: false,
      },
      {
        source: "/blogs/:path*",
        destination: "/journal/:path*",
        permanent: false,
      },
      {
        source: "/jounal",
        destination: "/journal",
        permanent: false,
      },
      {
        source: "/jounal/:path*",
        destination: "/journal/:path*",
        permanent: false,
      },
      {
        source: "/contactus",
        destination: "/contact-us",
        permanent: false,
      },
      {
        source: "/contactus/:path*",
        destination: "/contact-us/:path*",
        permanent: false,
      },
      {
        source: "/contact",
        destination: "/contact-us",
        permanent: false,
      },
      {
        source: "/events",
        destination: "/weddings-&-events",
        permanent: false,
      },
      {
        source: "/events/:path*",
        destination: "/weddings-&-events/:path*",
        permanent: false,
      },
      {
        source: "/wedding",
        destination: "/weddings-&-events",
        permanent: false,
      },
      {
        source: "/accommodation",
        destination: "/rooms-&-suites",
        permanent: false,
      },
      {
        source: "/accommodation/:path*",
        destination: "/rooms-&-suites/:path*",
        permanent: false,
      },
      {
        source: "/rooms",
        destination: "/rooms-&-suites",
        permanent: false,
      },
      {
        source: "/rooms/:path*",
        destination: "/rooms-&-suites/:path*",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
