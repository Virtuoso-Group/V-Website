import { ReactNode } from 'react'
import { useWebsiteContext } from './WebsiteLayout'

type Props = {
    children: ReactNode,
    className?: string
}

const PageContainer = (props: Props) => {

  const { selectedtrack } = useWebsiteContext();

  return (
    <div className={`min-h-full w-full ${!!selectedtrack? "pb-[9rem]": "pb-[2rem]"} ${props.className}`}>
        {props.children}
    </div>
  )
}

export default PageContainer;