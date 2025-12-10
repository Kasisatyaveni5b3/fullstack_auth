import '../styles/globals.css';
import 'antd/dist/reset.css';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
