export const showRewardAd = (rewardCoins: any, callbackfun: any): Promise<boolean> => {
    return new Promise((resolve) => {
        const googletag = (window as any).googletag;
        if (!googletag || !googletag.cmd) {
            console.error("Google Ad Manager is not properly initialized.");
            resolve(false);
            return; 
        }

        try {
            googletag.cmd.push(function () {
                try {
                    const rewardedSlot = googletag.defineOutOfPageSlot('/23178317433/kaku_reward', googletag.enums.OutOfPageFormat.REWARDED).addService(googletag.pubads());
                    googletag.enableServices();
                    googletag.display(rewardedSlot);
                    googletag.pubads().addEventListener("rewardedSlotReady", function (evt: any) {
                        evt.makeRewardedVisible();
                    });
                    googletag.pubads().addEventListener("rewardedSlotClosed", function () {
                        googletag.destroySlots([rewardedSlot]);
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