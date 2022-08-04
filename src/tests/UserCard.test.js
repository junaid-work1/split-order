import { render, screen } from '@testing-library/react'
import UserCard from 'components/users/UserCard'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from 'redux/store/store'

describe('Food Test Unit', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserCard />
        </BrowserRouter>
      </Provider>
    )
  })
  test('should have button and initial message on first render', () => {
    const addUserBtn = screen.getByTestId('add-user-btn')
    const initialMessage = screen.getByTestId('initial-message')

    expect(addUserBtn).toBeInTheDocument()
    expect(initialMessage).toBeInTheDocument()
  })
})
