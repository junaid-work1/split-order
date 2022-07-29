import { render, screen } from '@testing-library/react'
import NoPage from '../pages/noPage/NoPage'

test('np page test', () => {
  render(<NoPage />)
  const element = screen.queryByText(/You need to login/i)

  expect(element).toBeInTheDocument()
})
