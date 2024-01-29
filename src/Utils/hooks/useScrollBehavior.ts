import { RefObject, useCallback } from "react";

const useScrollBehavior = (ref: RefObject<HTMLElement>) =>
{
    const smoothScroll = useCallback(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: "center", inline: "center" }), []);

    const instantScroll = useCallback(() => ref.current?.scrollIntoView({ block: "center", inline: "center" }), []);

    return { smoothScroll, instantScroll }
}

export default useScrollBehavior