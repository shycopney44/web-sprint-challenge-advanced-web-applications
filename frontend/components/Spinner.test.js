import React from 'react'
import { render, screen } from '@testing-library/react'
import Spinner from './Spinner'

test('sanity', () => {
  expect(true).toBe(true)
})

test('renders spinner when spinnerOn is true', () => {
  render(<Spinner spinnerOn={true} />)
  const spinnerElement = screen.getByTestId('spinner')
  expect(spinnerElement).toBeInTheDocument()
})

test('does not render spinner when spinnerOn is false', () => {
  render(<Spinner spinnerOn={false} />)
  const spinnerElement = screen.queryByTestId('spinner')
  expect(spinnerElement).not.toBeInTheDocument()
})
