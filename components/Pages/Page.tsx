import Head from "next/head";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function Page({
  title,
  content,
  showNav = true,
  showFooter = true,
  children,
}: {
  title: string;
  content: string;
  showNav?: boolean;
  showFooter?: boolean;
  children: any;
}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />

        <link rel="icon" type="image/png" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col h-screen">
        {showNav && <Navbar />}
        <main className="lg:mx-32 md:mx-18 mx-10 py-5">{children}</main>
        {/* div below stretches out pages to take up the whole screen */}
        <div className="flex flex-grow"></div>
        {showFooter && <Footer />}
      </div>
    </div>
  );
}
