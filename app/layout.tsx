import { ReactNode } from "react";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeRegistry options={{ key: "ckp" }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
