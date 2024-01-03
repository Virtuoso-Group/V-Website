import { useCallback, useState } from "react";

export type Timestamp =
{
    value: number,

    update: (targetTimestamp: number) => void,
    reset: () => void
}

const useTimestamp = (): Timestamp =>
{
    const [value, setValue] = useState<number>(0);

    const update = useCallback((targetTimestamp: number) =>
    {
        if (targetTimestamp) 
        {
            setValue(targetTimestamp)  
        }
    }, [])
    
    const reset = useCallback(() => setValue(0), []);

    return {
        value,

        update, reset
    }
}

export default useTimestamp