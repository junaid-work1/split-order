import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Login from 'pages/auth/login/Login'
import { store } from 'redux/store/store'

const handleClick = () => {
  const signInBtn = screen.getByRole('button')
  userEvent.click(signInBtn)
}
const loginForm = ({ email, password }) => {
  const emailInputElement = screen.getByLabelText('Email address')
  const passwordInputElement = screen.getByLabelText('Password')

  if (email) {
    userEvent.type(emailInputElement, email)
  }

  if (password) {
    userEvent.type(passwordInputElement, password)
  }

  return { emailInputElement, passwordInputElement }
}

describe('Login Test Unit', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )
  })

  test('should be empty inputs on initial render', () => {
    const emailInputElement = screen.getByLabelText('Email address')
    const passwordInputElement = screen.getByLabelText('Password')

    expect(emailInputElement.value).toBe('')
    expect(passwordInputElement.value).toBe('')
  })

  test('should be able to type an email address', () => {
    const { emailInputElement } = loginForm({ email: 'junaidkhan6212@gmail.com' })
    expect(emailInputElement.value).toBe('junaidkhan6212@gmail.com')
  })

  test('should be able to type a password', () => {
    const { passwordInputElement } = loginForm({ password: '1234' })
    expect(passwordInputElement.value).toBe('1234')
  })

  describe('login page error handling tests', () => {
    test('should show an error message on invalid email', () => {
      const emailErrorElement = screen.queryByText(/"email" must be a valid email/i)
      expect(emailErrorElement).toBeNull()

      loginForm({ email: 'junaidkhan6212gmail.com' })
      handleClick()

      const emailErrorElementAgain = screen.queryByText(/"email" must be a valid email/i)
      expect(emailErrorElementAgain).toBeInTheDocument()
    })

    test('should show an error message on invalid password', () => {
      const passwordErrorElement = screen.queryByText(
        /"password" length must be at least 4 characters long/i
      )
      expect(passwordErrorElement).toBeNull()

      loginForm({ password: '123' })
      handleClick()

      const passwordErrorElementAgain = screen.queryByText(
        /"password" length must be at least 4 characters long/i
      )
      expect(passwordErrorElementAgain).toBeInTheDocument()
    })

    test('should show error message if email or password is incorrect', () => {
      loginForm({ email: 'junaidkhan6212@gmail.com', password: '1234' })
      handleClick()

      const emailErrorElement = screen.queryByText(
        /The email or password you entered is incorrect./i
      )
      expect(emailErrorElement).toBeInTheDocument()
    })
  })
})
