// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'

jest.mock('react-use-geolocation'); //mocking the entire lib's APIs

test('displays the users current location', async () => {
  const fakePosition = {coords: {
    latitude: 43.7958508,
    longitude: -79.3240118
  }}

  let setReturnValue;
  const useMockCurrentPosition = () => {
    const [state, setState] = React.useState([]); // getCurrentPosition returns an array [position, error], setting the initial value to an empty array will set position and error to undefined, thus showing the spinner
    setReturnValue = setState;
    return state
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location/>)

  // 🐨 Don't have the position yet at this point, verify the loading spinner is showing up
  expect(screen.getByLabelText('loading...')).toBeInTheDocument();


  act(() => {
    setReturnValue([fakePosition]) // setState to fakePosition and trigger a re-render
  })

  // 🐨 verify the loading spinner is no longer in the document
    expect(screen.queryByLabelText('loading...')).not.toBeInTheDocument();
  // 🐨 verify the latitude and longitude appear correctly
    expect(screen.getByText(/latitude:/i)).toHaveTextContent(`Latitude: ${fakePosition.coords.latitude}`)
    expect(screen.getByText(/Longitude:/i)).toHaveTextContent(`Longitude: ${fakePosition.coords.longitude}`)
})

/*
eslint
  no-unused-vars: "off",
*/
