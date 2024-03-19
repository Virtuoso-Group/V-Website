import { useEffect, useState } from "react";
import { DeviceType, getDeviceType } from "./style";


// TODO: this may evolve to dynamically cover breakpoints in general.
// For now, device type will suffice (again, device type sounds vague).

const useDeviceType = (): DeviceType => 
{
    const [deviceType, setDeviceType] = useState<DeviceType>(DeviceType.DESKTOP);

    /* 
        I wrote the update function this way to gurantee that only the new value will rerender
        the component that uses this hook.
    */
    const updateDeviceType = (value: DeviceType) =>
    {
        setDeviceType(oldDeviceType =>
        {
            if (oldDeviceType !== value) 
            {
                return value
            }
            else
            {
                return oldDeviceType
            }
        })

    }
    
    useEffect(() => 
    {
        const handleResize = () =>
        {
            const newDeviceType = getDeviceType(window.innerWidth);

            updateDeviceType(newDeviceType)
        }

        window.addEventListener("resize", handleResize);

        return () => 
        {
            window.removeEventListener("resize", handleResize)
        }
    }, []);


    return deviceType;
}

export default useDeviceType