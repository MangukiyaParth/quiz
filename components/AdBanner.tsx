'use client';
import React, { use, useEffect } from 'react';

type AdBannerProps = {
    id: string,
    slot_id: string,
    size: any
}

const AdBanner = ({id, slot_id, size}: AdBannerProps) => {
	useEffect(() => {
		(window as any).googletag = (window as any).googletag || { cmd: [] };
        const googletag = (window as any).googletag;

		googletag.cmd.push(function() {
			if (googletag.pubads().getSlots().some((slot: { getSlotElementId: () => string; }) => slot.getSlotElementId() === id)) {
				const oldSlot = googletag.pubads().getSlots().find((slot: any) => slot.getSlotElementId() === id);
				googletag.destroySlots([oldSlot]);
			}
            googletag.defineSlot(id, size, slot_id).addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
            googletag.display(slot_id);
        });
	}, []);
	return (
		<div id={slot_id} style={{ minWidth: '250px', minHeight: '250px', width: 'fit-content', display: 'flex', justifyContent: 'center' }} />
	)
}

export default AdBanner