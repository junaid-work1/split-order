import { screen, render } from '@testing-library/react'
import { Provider } from 'react-redux'

import TotalBill from 'components/total-bill/TotalBill'
import { store } from 'redux/store/store'

describe('Total Bill Unit Test', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <TotalBill />
      </Provider>
    )
  })

  test('should exist on initial render', () => {
    const paidBill = screen.getByTestId('bill-you-paid')
    const totalBill = screen.getByTestId('total-bill')

    expect(paidBill).toBeInTheDocument()
    expect(totalBill).toBeInTheDocument()
  })
})
