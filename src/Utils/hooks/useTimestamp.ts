import { useState } from "react";

const useTimestamp = () =>
{
    const [value, setValue] = useState<number>(0);

    const update = (targetTimestamp: number) =>
    {
        if (targetTimestamp) 
        {
            setValue(targetTimestamp * 1000)  
        }
    }
    
    const reset = () => setValue(0);

    return {
        value,

        update, reset
    }
}

export default useTimestamp