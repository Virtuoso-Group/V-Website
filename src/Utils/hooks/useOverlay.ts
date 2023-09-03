import { useState } from "react";

const useOverlay = () =>
{
    const [isShown, setShown] = useState<boolean>(false)
    
    const show = () => setShown(true)
    const hide = () => setShown(false);

    const toggle = () => isShown? hide(): show();

    return (
        {
            isShown,

            toggle,
            show, hide
        }
    )
}

export default useOverlay;