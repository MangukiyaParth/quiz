declare global {
    interface Window {
        googletag: any;
        adsbygoogle: any[];
    }
}

export const showRewardAd = (rewardCoins: any, callbackfun: any): Promise<boolean> => {
    return new Promise((resolve) => {
        if (typeof window === 'undefined' || !(window as any).adsbygoogle) {
            console.warn('AdSense not available');
            resolve(false);
            return;
        }

        try {
            window.googletag.cmd.push(function () {
                try {
                    const rewardedSlot = window.googletag.defineOutOfPageSlot('/23178317433/kaku_reward', window.googletag.enums.OutOfPageFormat.REWARDED).addService(window.googletag.pubads());
                    window.googletag.enableServices();
                    window.googletag.display(rewardedSlot);
                    window.googletag.pubads().addEventListener("rewardedSlotReady", function (evt: any) {
                        evt.makeRewardedVisible();
                    });
                    window.googletag.pubads().addEventListener("rewardedSlotClosed", function () {
                        window.googletag.destroySlots([rewardedSlot]);
                        const storedCoinData = sessionStorage.getItem('localCoins');
                        const coinData = storedCoinData ? JSON.parse(storedCoinData) : null;
                        const coins = coinData ? coinData.coins : 0;
                        
                        const newCoins = coins + rewardCoins;
                        sessionStorage.setItem('localCoins', JSON.stringify({ coins: newCoins }));
                        resolve(true);
                    });
                } catch (error) {
                    console.error("Error during ad setup:", error);
                }
    
            });
        } catch (error) {
            console.error('Error showing reward ad:', error);
            resolve(false);
        }
    });
};