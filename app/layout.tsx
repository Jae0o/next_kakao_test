import "../styles/Global.css";
import Script from "next/script";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "KaKao Map Test",
  description: "Demo Test",
};

const KAKAO_URL = process.env.DB_KAKAO_API_URL;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Script src={KAKAO_URL} strategy={"beforeInteractive"} />

        <Navbar />
        {children}
      </body>
    </html>
  );
}
