"use client";

import { usePathname } from "next/navigation";
import WebSiteNav from "./WebSiteNav";

const NavBar = () => {
  const pathName = usePathname();

  if (pathName === "/landing-page/") {
    return null;
  } else if (pathName === "/thank-you/") {
    return null;
  } else {
    return <WebSiteNav />;
  }
};

export default NavBar;
