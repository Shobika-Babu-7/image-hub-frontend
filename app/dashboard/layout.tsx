import Header from "../components/Header/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <Header></Header>
          <div className="p-8">{children}</div>
      </body>
    </html>
  );
}
