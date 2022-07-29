import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'

import Food from 'components/food/Food'
import { store } from 'redux/store/store'

describe('Food Test Unit', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Food />
        </BrowserRouter>
      </Provider>
    )
  })
  test('should have button, select and select message on initial render', () => {
    const addRestaurantBtn = screen.getByRole('button')
    const selectMessage = screen.getByTestId('select-message')
    const selectList = screen.getByTestId('select-list')

    expect(addRestaurantBtn).toBeInTheDocument()
    expect(selectMessage).toBeInTheDocument()
    expect(selectList).toBeInTheDocument()
  })
})
