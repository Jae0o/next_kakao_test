import '../styles/Global.css';
import Script from 'next/script';

export const metadata = {
  title: 'KaKao Map Test',
  description: 'Demo Test',
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
        {/* 반드시 한번은 script를 호출해야 정상적인 Map 사용 가능 */}
        <Script src={KAKAO_URL} strategy={'beforeInteractive'} />
        {children}
      </body>
    </html>
  );
}
