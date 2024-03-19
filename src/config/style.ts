export const websitePadding = "px-5 SD:px-10 HD:px-20";


// TODO: this file will evolve over time.

export enum Breakpoint
{
    SMALLEST = "SMALLEST",
    SD = "SD",
    XGA = "XGA",
    HD = "HD",
    FHD = "FHD",
    "2K" = "2K",
    "4K" = "4K",
    "8K" = "8K"
}

// type Device = "mobile" | "desktop"

export enum DeviceType 
{
    MOBILE = "MOBILE",
    DESKTOP = "DESKTOP"
}

// TODO: we need to find a way to turn this into a source-of-truth for multiple files like Tailwind and whatever hook that needs it.
export const breakpoints: { [index in Breakpoint]: number } = 
{
    [Breakpoint.SMALLEST]: 0,

    [Breakpoint.SD]: 640,

    [Breakpoint.XGA]: 1024,
    
    [Breakpoint.HD]: 1280,
   
    [Breakpoint.FHD]: 1920,
   
    [Breakpoint["2K"]]: 2560,

   [Breakpoint["4K"]]: 3840,
    
   [Breakpoint["8K"]]: 7680
};



const breakpointsArr: number[] = Object.values(breakpoints);




// This gets the current device type based on the inner width of the viewport.
// TODO: there is probably a better name for this. I'm just too tired to come up with one.
export const getDeviceType = (currentWidth: number): DeviceType =>
{
   return (breakpoints[Breakpoint.SD] <= currentWidth)? DeviceType.DESKTOP : DeviceType.MOBILE
}

export const getCurrentBreakpoint = (currentWidth: number): Breakpoint =>
{
    return Breakpoint.SMALLEST
}