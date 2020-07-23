import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import cx from 'classnames'
// import { testService } from '@src/api'

import './index.scss'

type P = RouteComponentProps & {}
type S = {}

class Index extends Component<P, S> {
  componentDidMount() {
    // this.fetchList()
    // this.props.history.push('/')\
  }

  getA = () => {
    console.log(1)
  }

  // fetchList = async () => {
  //     const res = await testService.getList()
  //     console.log('fetchList -> res', res)
  //     // 接口异常错误处理
  //     if (res.code !== 200) {
  //         /**
  //          *
  //          */
  //         return
  //     }
  //     // 接口请求成功
  // }

  render() {
    return <div className={cx('text')}>Index</div>
  }
}

export default withRouter(Index)
