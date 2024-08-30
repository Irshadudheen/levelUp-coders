import React from 'react'
import PrevefrenceNav from './prevefrenceNav'
import Split from 'react-split'
const Playground = () => {
  return (
    <div className='flex flex-col bg-dark-layer-1 relative'>
      <PrevefrenceNav/>
      <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60,40]} minSize={60}>
        <div className="w-full overflow-auto"></div>
      </Split>

    </div>
  )
}

export default Playground