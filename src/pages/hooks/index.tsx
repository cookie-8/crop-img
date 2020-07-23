import React, { FC, useState } from 'react'

interface P {
  a: number
}

const MyHook: FC<P> = () => {
  const [num, setNum] = useState(0)

  const addNum = () => {
    setNum(num + 1)
  }

  return (
    <div>
      <p>{num}</p>
      <button onClick={addNum}>add</button>
    </div>
  )
}

export default MyHook
