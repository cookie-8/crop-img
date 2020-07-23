import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Index from '../../src/pages/error/404/index'


configure({ adapter: new Adapter() })

test('Jest-React-TypeScript 尝试运行', () => {
  const renderer = shallow(<Index/>)
  expect(renderer.text()).toEqual('Page Not Found') // Pass
})