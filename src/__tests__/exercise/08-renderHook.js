// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {renderHook, act} from '@testing-library/react-hooks'
import useCounter from '../../components/use-counter'




test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(useCounter)
  expect(result.current.count).toBe(0)
  act(() => result.current.increment());
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const initialProps = {initialCount: 5}
  const {result} = renderHook(useCounter, {initialProps})
  expect(result.current.count).toBe(5)
  act(() => result.current.increment());
  expect(result.current.count).toBe(6)
  act(() => result.current.decrement());
  expect(result.current.count).toBe(5)
})

test('allows customization of the step', () => {
  const initialProps = {step: 3}
  const {result} = renderHook(() => useCounter(initialProps))

  expect(result.current.count).toBe(0)
  act(() => result.current.increment());
  expect(result.current.count).toBe(3)
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0)
})

test('the step can be changed', () => {
  // let initialProps = {step: 3}
  // const {result, rerender} = renderHook(() => useCounter(initialProps))
  const {result, rerender} = renderHook(useCounter, {initialProps: {step: 3}})

  expect(result.current.count).toBe(0)
  act(() => result.current.increment());
  expect(result.current.count).toBe(3)

  // changing steps by passing in new props
  // initialProps = {step: 2}
  rerender({step: 2})
  act(() => result.current.decrement());
  expect(result.current.count).toBe(1)
})

// /* eslint no-unused-vars:0 */
