import { useCallback, useState } from "react";

export type Overlay =
{
    isOn: boolean, 
    show: () => void,
    hide: () => void,

    toggle: () => void
}

export const defaultValue: Overlay = 
{
    isOn: false,
    hide: () => {},
    show: () => {},
    toggle: () => {}
}

const useOverlay = (): Overlay =>
{
    const [isOn, setState] = useState<boolean>(false)
    
    const show = useCallback(() => setState(true), [])
    const hide =  useCallback(() => setState(false), []);

    const toggle = useCallback(() => setState(value => !value), []);

    return (
        {
            isOn,

            toggle, show, hide
        })
}

export default useOverlay;