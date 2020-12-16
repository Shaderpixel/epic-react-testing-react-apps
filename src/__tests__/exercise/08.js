// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()
const Counter = ({initialCount, step}) => {
  const {count, increment, decrement} = useCounter({initialCount, step})
  return (<>
    <span>Count: {count}</span>
    <button onClick={increment}>Increment</button>
    <button onClick={decrement}>Decrement</button>
    </>
  )
}

test('exposes the count and increment/decrement functions', () => {
  // 🐨 render the component
  // 🐨 get the elements you need using screen
  // 🐨 assert on the initial state of the hook
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  render(<Counter/>)
  let count = screen.getByText(/count:/i)
  const increment = screen.getByRole('button', {name: /increment/i,})
  const decrement = screen.getByRole('button', {name: /decrement/i,})

  // initial state
  expect(count).toHaveTextContent('0')

  userEvent.click(increment);
  expect(count).toHaveTextContent('1')

  userEvent.click(decrement);
  expect(count).toHaveTextContent('0')
})
test('test initial value and custom step', () => {
  render(<Counter step={3} initialCount={5}/>)
  let count = screen.getByText(/count:/i)
  const increment = screen.getByRole('button', {name: /increment/i,})
  const decrement = screen.getByRole('button', {name: /decrement/i,})

  // initial state
  expect(count).toHaveTextContent('5')
  // console.log(increment)
  userEvent.click(increment);
  expect(count).toHaveTextContent('8')

  userEvent.click(decrement);
  expect(count).toHaveTextContent('5')
})

/* eslint no-unused-vars:0 */
