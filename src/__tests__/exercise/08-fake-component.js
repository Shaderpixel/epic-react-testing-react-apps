// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'


test('exposes the count and increment/decrement functions', () => {
  let result
  function TestComponent(props) {
    result = useCounter(props);
    return null;
  }
  render(<TestComponent/>)
  console.log(result)


  // // initial state
  expect(result.count).toBe(0)
  act(() => result.increment());
  expect(result.count).toBe(1)
  act(() => result.decrement());
  expect(result.count).toBe(0)
})

/* eslint no-unused-vars:0 */
