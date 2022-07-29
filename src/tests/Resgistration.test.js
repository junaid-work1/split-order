import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Registration from '../pages/auth/registration/Registration'

const handleClick = () => {
  const registerBtn = screen.getByRole('button')
  userEvent.click(registerBtn)
}

const registrationForm = ({ name, email, password, confirmPassword }) => {
  const nameInputElement = screen.getByLabelText('name')
  const emailInputElement = screen.getByLabelText('email')
  const passwordInputElement = screen.getByLabelText('password')
  const confirmPasswordInputElement = screen.getByLabelText('confirmPassword')

  if (name) {
    userEvent.type(nameInputElement, name)
  }

  if (email) {
    userEvent.type(emailInputElement, email)
  }

  if (password) {
    userEvent.type(passwordInputElement, password)
  }

  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword)
  }

  return { nameInputElement, emailInputElement, passwordInputElement, confirmPasswordInputElement }
}

describe('Registraion Test Unit', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Registration />
      </BrowserRouter>
    )
  })

  test('input should be empty on first render', () => {
    const nameInputElement = screen.getByLabelText('name')
    const emailInputElement = screen.getByLabelText('email')
    const confirmPasswordInputElement = screen.getByLabelText('confirmPassword')
    const passwordInputElement = screen.getByLabelText('password')

    expect(nameInputElement.value).toBe('')
    expect(emailInputElement.value).toBe('')
    expect(confirmPasswordInputElement.value).toBe('')
    expect(passwordInputElement.value).toBe('')
  })

  test('should render a button with the class of btn-success', () => {
    const successBtn = screen.getByRole('button')
    expect(successBtn).toHaveClass('btn-success')
  })

  test('should be able to type a name', () => {
    const { nameInputElement } = registrationForm({ name: 'junaid' })
    expect(nameInputElement.value).toBe('junaid')
  })

  test('should be able to type an email', () => {
    const { emailInputElement } = registrationForm({ email: 'junaidkhan6212@gmail.com' })
    expect(emailInputElement.value).toBe('junaidkhan6212@gmail.com')
  })

  test('should be able to type a password', () => {
    const { passwordInputElement } = registrationForm({ password: '1234' })
    expect(passwordInputElement.value).toBe('1234')
  })

  test('should be able to type a confirm password', () => {
    const { confirmPasswordInputElement } = registrationForm({ confirmPassword: '1234' })
    expect(confirmPasswordInputElement.value).toBe('1234')
  })

  describe('registration page error handling tests', () => {
    test('should show error message on empty name field submission', () => {
      const nameErrorElement = screen.queryByText(/"name" is not allowed to be empty/i)
      expect(nameErrorElement).toBeNull()

      registrationForm({ name: '' })
      handleClick()

      const nameErrorElementAgain = screen.queryByText(/"name" is not allowed to be empty/i)
      expect(nameErrorElementAgain).toBeInTheDocument()
    })

    test('should show error message on invalid email', () => {
      const emailErrorElement = screen.queryByText(/"email" must be a valid email/i)
      expect(emailErrorElement).toBeNull()

      registrationForm({ email: 'junaidkhan6212gmail.com' })
      handleClick()

      const emailErrorElementAgain = screen.queryByText(/"email" must be a valid email/i)
      expect(emailErrorElementAgain).toBeInTheDocument()
    })

    test('should show error message on minimum length password', () => {
      const passwordErrorElement = screen.queryByText(
        /"password" length must be at least 4 characters long/i
      )
      expect(passwordErrorElement).toBeNull()

      registrationForm({ password: '123' })
      handleClick()

      const passwordErrorElementAgain = screen.queryByText(
        /"password" length must be at least 4 characters long/i
      )
      expect(passwordErrorElementAgain).toBeInTheDocument()
    })

    test('should show error message on minimum length confirm password', () => {
      const confirmPasswordErrorElement = screen.queryByText(
        /"confirmPassword" length must be at least 4 characters long/i
      )
      expect(confirmPasswordErrorElement).toBeNull()

      registrationForm({ confirmPassword: '123' })
      handleClick()

      const confirmPasswordErrorElementAgain = screen.getByText(
        /"confirmPassword" length must be at least 4 characters long/i
      )
      expect(confirmPasswordErrorElementAgain).toBeInTheDocument()
    })
  })

  test('should not show error message if every thing is okay', () => {
    registrationForm({
      name: 'junaid',
      email: 'junaidkhan6212@gmail.com',
      password: '1234',
      confirmPassword: '1234'
    })
    handleClick()

    const nameErrorElement = screen.queryByText(/"name" is not allowed to be empty/i)
    const emailErrorElement = screen.queryByText(/"email" must be a valid email/i)
    const confirmPasswordErrorElement = screen.queryByText(
      /password" length must be at least 4 characters long/i
    )
    const passwordErrorElement = screen.queryByText(
      /"password" length must be at least 4 characters long/i
    )
    expect(nameErrorElement).toBeNull()
    expect(emailErrorElement).toBeNull()
    expect(passwordErrorElement).toBeNull()
    expect(confirmPasswordErrorElement).toBeNull()
  })
})
