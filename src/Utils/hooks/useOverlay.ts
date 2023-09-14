import { useCallback, useState } from "react";

const useOverlay = () =>
{
    const [isShown, setShown] = useState<boolean>(false)
    
    const show = useCallback(() => setShown(true), [])
    const hide =  useCallback(() => setShown(false), []);

    const toggle = useCallback(() => setShown(value => !value), []);

    return (
        {
            isShown,

            toggle,
            show, hide
        }
    )
}

export default useOverlay;