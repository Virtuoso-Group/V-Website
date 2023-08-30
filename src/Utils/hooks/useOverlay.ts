import { useState } from "react";

const useOverlay = () =>
{
    const [isShown, setShown] = useState<boolean>(false)
    
    const show = () => setShown(true)
    const hide = () => setShown(false);

    return (
        {
            isShown,

            show, hide
        }
    )
}

export default useOverlay;