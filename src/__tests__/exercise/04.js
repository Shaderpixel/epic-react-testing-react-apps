// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker';
import {build, fake} from '@jackfranklin/test-data-bot'

// const buildLoginForm = (overrides) => ({
//   username: faker.internet.userName(),
//   password: faker.internet.password(),
//   ...overrides
// })

const loginFormBuilder = build('User', {
  fields: {
    username: fake(f => f.internet.password()),
    password: fake(f => f.internet.password())
  },
});


test('submitting the form calls onSubmit with username and password', () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // let submittedData = {}
  // const handleSubmit = data => (submittedData = data)
  const handleSubmit = jest.fn(); // indicate that the function is not important
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  //
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit}/>)
  // 🐨 get the username and password fields via `getByLabelText`
  const usernameField = screen.getByRole('textbox', {name: /username/i})
  const passwordField = screen.getByLabelText(/password/i)
  const submit = screen.getByRole('button', {name: /submit/i})
  const {username, password} = loginFormBuilder({overrides: {password: 'dudu'}});

  // 🐨 use userEvent.type to change the username and password fields to
  //    whatever you want
  userEvent.type(usernameField, username);
  userEvent.type(passwordField, password);
  userEvent.click(submit);
  // 🐨 click on the button with the text "Submit"
  //
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
  // expect(submittedData).toEqual({username: 'Rohan', password: 'woof'})
  expect(handleSubmit).toHaveBeenCalledWith({username, password})
  expect(handleSubmit).toHaveBeenCalledTimes(1);
})

/*
eslint
  no-unused-vars: "off",
*/
