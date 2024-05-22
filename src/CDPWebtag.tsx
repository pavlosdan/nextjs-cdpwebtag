import { useEffect, useState } from 'react';
import Script from 'next/script';
import { fetchAccessToken, getCurrentDate, hashTokenWithDate } from './utils/fetchKey';
import { A1Config } from './types/a1Config';

const CDPWebtag = () => {
  const [config, setConfig] = useState<A1Config | null>(null);

  useEffect(() => {
    const setupConfig = async () => {
      try {
        const accessToken = await fetchAccessToken();
        const currentDate = getCurrentDate();
        const hashedKey = await hashTokenWithDate(accessToken, currentDate);

        const newConfig: A1Config = {
          key: hashedKey,
          domain: process.env.NEXT_PUBLIC_A1_DOMAIN!,
          tenantId: Number(process.env.NEXT_PUBLIC_A1_TENANT_ID),
          host: process.env.NEXT_PUBLIC_A1_HOST!,
        };

        setConfig(newConfig);
        if (typeof window !== 'undefined') {
          window.$A1Config = newConfig;
        }
      } catch (error) {
        console.error('Error setting up $A1Config:', error);
      }
    };

    setupConfig();

    // Refresh the key every 24 hours
    const interval = setInterval(setupConfig, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {config && (
        <Script id="cdp-config">
          {`
            var $A1Config = {
              key: "${config.key}",
              domain: "${config.domain}",
              tenantId: ${config.tenantId},
              host: "${config.host}"
            };
          `}
        </Script>
      )}
      <Script src="https://scripts.agilone.com/latest/a1.js" strategy="afterInteractive" />
    </>
  );
};

export default CDPWebtag;
