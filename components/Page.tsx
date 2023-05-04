import Head from "next/head";

export default function Page({
  title,
  content,
  children,
}: {
  title: string;
  content: string;
  children: any;
}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <main className="lg:mx-32 md:mx-18 mx-10 flex-grow">{children}</main>
    </div>
  );
}
