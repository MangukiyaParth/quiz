'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    googletag: any;
  }
}

const GoogleAds = () => {
  useEffect(() => {
    (window as any).googletag = (window as any).googletag || { cmd: [] };
    const googletag = (window as any).googletag;

    googletag.cmd.push(() => {
      const pubads = googletag.pubads();

      // Interstitial Ad
      const interstitialSlot = googletag.defineOutOfPageSlot('/22639388115/rewarded_web_example', googletag.enums.OutOfPageFormat.INTERSTITIAL).addService(pubads);

      // Anchor Ad (Bottom)
      const anchorSlot = googletag.defineOutOfPageSlot('/22639388115/web_anchor_example', googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR).addService(pubads);
      googletag.enableServices();
      
      if (interstitialSlot) {
        googletag.display(interstitialSlot);
      }

      pubads.addEventListener('slotOnload', (event: any) => {
        console.log('Ad loaded:', event.slot.getSlotElementId());
      });
    });
  }, []);

  return null; // No visual DOM element needed
};

export default GoogleAds;
