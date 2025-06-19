'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    googletag: any;
  }
}

const GoogleAds = () => {
  useEffect(() => {
    window.googletag = window.googletag || { cmd: [] };

    window.googletag.cmd.push(() => {
      const pubads = window.googletag.pubads();

      // Interstitial Ad
      const interstitialSlot = window.googletag.defineOutOfPageSlot('/23302694015/QOOP-2', window.googletag.enums.OutOfPageFormat.INTERSTITIAL)?.addService(pubads);

      // Anchor Ad (Bottom)
      const anchorSlot = window.googletag.defineOutOfPageSlot('/23302694015/QOOP-3', window.googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR)?.addService(pubads);

      window.googletag.enableServices();

      if (interstitialSlot) {
        window.googletag.display(interstitialSlot);
      }

      if (anchorSlot) {
        window.googletag.display(anchorSlot);
      }

      pubads.addEventListener('slotOnload', (event: any) => {
        console.log('Ad loaded:', event.slot.getSlotElementId());
      });
    });
  }, []);

  return null; // No visual DOM element needed
};

export default GoogleAds;
