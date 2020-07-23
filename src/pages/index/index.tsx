import React, { FC, useState, useEffect, createRef, useRef, CSSProperties } from 'react'
// import { withRouter, RouteComponentProps } from 'react-router-dom'
// import cx from 'classnames'
// import { testService } from '@src/api'
import { throttle } from '@src/utils'

import './index.scss'

enum ELEM {
  A = 1,
  B,
  C,
  D,
}
interface P {
  fixArea?: boolean
  cropWidth?: number
  cropHeight?: number
  style?: CSSProperties
}

const CropImg: FC<P> = ({ fixArea = true, cropWidth = 100, cropHeight = 100, style = {} }) => {
  const [point, setPoint] = useState(() => ({ left: null, right: null, top: null, bottom: null }))
  const ref = useRef<HTMLDivElement>(null)
  const refCtr = useRef<HTMLDivElement>(null)
  const refC = useRef(null)
  const refL = useRef(null)

  function dealPoistion(
    { ele, x: preX, y: preY }: { ele: number; x: number; y: number },
    { x: nextX, y: nextY }: { x: number; y: number },
  ) {
    // const diffX = preX - nextX
    // const diffY = preY - nextY

    switch (ele) {
      case ELEM.A:
        setPoint({
          ...point,
          left:
            nextX + cropWidth > point.right
              ? point.right - cropWidth
              : nextX >= refL.current.left
              ? nextX - refL.current.left
              : 0,
          top:
            nextY + cropHeight > point.bottom
              ? point.bottom - cropHeight
              : nextY >= refL.current.top
              ? nextY - refL.current.top
              : 0,
        })
        break
      case ELEM.B:
        setPoint({
          ...point,
          right:
            nextX - cropWidth < point.left
              ? point.left + cropWidth
              : nextX <= refL.current.right
              ? nextX - refL.current.left
              : refL.current.right - refL.current.left,
          top:
            nextY + cropHeight > point.bottom
              ? point.bottom - cropHeight
              : nextY >= refL.current.top
              ? nextY - refL.current.top
              : 0,
        })
        break
      case ELEM.C:
        setPoint({
          ...point,
          left:
            nextX + cropWidth > point.right
              ? point.right - cropWidth
              : nextX >= refL.current.left
              ? nextX - refL.current.left
              : 0,
          bottom:
            nextY - cropHeight < refL.current.top + point.top
              ? point.top + cropHeight
              : nextY <= refL.current.bottom
              ? nextY - refL.current.top
              : refL.current.bottom - refL.current.top,
        })
        break
      case ELEM.D:
        setPoint({
          ...point,
          right:
            nextX - cropWidth < point.left
              ? point.left + cropWidth
              : nextX <= refL.current.right
              ? nextX - refL.current.left
              : refL.current.right - refL.current.left,
          bottom:
            nextY - cropHeight < refL.current.top + point.top
              ? point.top + cropHeight
              : nextY <= refL.current.bottom
              ? nextY - refL.current.top
              : refL.current.bottom - refL.current.top,
        })
        break
    }
  }

  const touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const { ele } = (e.target as HTMLDivElement).dataset
    if (!ele) return

    refC.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, ele: +ele }
  }

  const touchMove = throttle((e: React.TouchEvent<HTMLDivElement>) => {
    const { ele } = (e.target as HTMLDivElement).dataset

    if (!ele) {
      return
    }
    const { clientX, clientY } = e.touches[0]

    dealPoistion(refC.current, { x: clientX, y: clientY })
  }, 300)

  useEffect(() => {
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = ref.current
    setPoint({
      left: offsetLeft,
      right: offsetLeft + offsetWidth,
      top: offsetTop,
      bottom: offsetHeight + offsetTop,
    })
    // 获取ctr数据
    const { left, right, top, bottom } = refCtr.current.getBoundingClientRect()
    refL.current = { left, right, top, bottom }
  }, [])

  return (
    <div className="ctr" ref={refCtr} style={style}>
      <div
        className="crop-box"
        ref={ref}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        style={
          point.left !== null && point.left >= 0
            ? {
                left: (point.left | 0) + 'px',
                top: (point.top | 0) + 'px',
                width: ((point.right - point.left) | 0) + 'px',
                height: ((point.bottom - point.top) | 0) + 'px',
              }
            : {}
        }
      >
        {!fixArea && (
          <>
            <div className="txt-size">
              {(point.right - point.left) | 0}x{(point.bottom - point.top) | 0}
            </div>
            <span className="corner lt" data-ele={ELEM.A}></span>
            <span className="corner rt" data-ele={ELEM.B}></span>
            <span className="corner lb" data-ele={ELEM.C}></span>
            <span className="corner rb" data-ele={ELEM.D}></span>
          </>
        )}
      </div>
    </div>
  )
}

export default CropImg
