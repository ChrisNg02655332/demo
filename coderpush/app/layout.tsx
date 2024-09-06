import './global.css';
import { NavLinks } from './ui/nav-links';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        /></head>
      <body>
        <NavLinks />
        <main>{children}</main>
      </body>
    </html>
  );
}
