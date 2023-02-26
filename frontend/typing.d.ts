declare global {
    type UseDevice = () => {
        isMobileOrTablet: boolean;
    };
    const useDevice: UseDevice;
}
