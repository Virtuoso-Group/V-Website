import { useCallback, useState } from "react";

const useOverlay = () =>
{
    const [isOn, setState] = useState<boolean>(false)
    
    const show = useCallback(() => setState(true), [])
    const hide =  useCallback(() => setState(false), []);

    const toggle = useCallback(() => setState(value => !value), []);

    return (
        {
            isOn,

            toggle,
            show, hide
        }
    )
}

export default useOverlay;