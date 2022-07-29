import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import Header from 'components/header/Header'
import { store } from 'redux/store/store'

describe('Header Test Unit', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    )
  })
  test('header should have title', () => {
    const headerTitle = screen.queryByText('Split Order')

    expect(headerTitle).not.toBeNull()
  })

  test('header should have links', () => {
    const loginLink = screen.queryByText('Login')
    const homeLink = screen.queryByText('Home')
    const splitBillLink = screen.queryByText('Split Bill')
    const totalBillLink = screen.queryByText('Total Bill')

    expect(loginLink).toHaveAttribute('href', '/login')
    expect(homeLink).toHaveAttribute('href', '/')
    expect(splitBillLink).toHaveAttribute('href', '/usercard')
    expect(totalBillLink).toHaveAttribute('href', '/totalbill')
  })
})
