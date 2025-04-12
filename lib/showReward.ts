export const showRewardAd = (rewardCoins: any, callbackfun: any): Promise<boolean> => {
    return new Promise((resolve) => {
        if (typeof window === 'undefined' || !(window as any).adsbygoogle) {
            console.warn('AdSense not available');
            resolve(false);
            return;
        }

        try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({
                type: 'reward',
                rewarded: true,
                onRewardedSlotReady: () => {
                    console.log('Reward ad slot is ready');
                },
                onRewardedSlotGranted: () => {
                    console.log('Reward granted', rewardCoins);
                    resolve(true);
                },
                onRewardedSlotClosed: () => {
                    console.log('Reward ad closed without reward');
                    callbackfun(true);
                    resolve(false);
                },
                onRewardedSlotError: (error: any) => {
                    console.error('Reward ad error:', error);
                    resolve(false);
                },
            });
        } catch (error) {
            console.error('Error showing reward ad:', error);
            resolve(false);
        }
    });
};