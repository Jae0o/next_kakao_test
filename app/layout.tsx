import "../styles/Global.css";
import Script from "next/script";

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
        {children}
      </body>
    </html>
  );
}
