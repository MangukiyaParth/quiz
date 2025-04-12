'use client';
import React, { use, useEffect } from 'react';

type AdBannerProps = {
    adFormat: string,
    adSlot: string,
    adFullWidthResponse: boolean
}

const AdBanner = ({adSlot, adFormat, adFullWidthResponse}: AdBannerProps) => {
    useEffect(() => {
        try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        }
        catch (e) {
            console.error("AdSense error: ", e);
        }
    }, []);
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-1062876328695660"
      data-ad-slot={adSlot} // Replace with your ad slot ID
      data-ad-format={adFormat} // Replace with your ad format
      data-full-width-responsive={adFullWidthResponse ? "true" : "false"} // Set to true or false based on your requirement
    >

    </ins>
  )
}

export default AdBanner