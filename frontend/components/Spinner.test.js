import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';
import '@testing-library/jest-dom';

test('Spinner reacts to "on" prop changes', () => {
  // Initial render with "on" prop as false
  const { rerender, container } = render(<Spinner on={false} />);
  
  // Assert that spinner is not rendered initially
  expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();

  // Re-render with "on" prop as true
  rerender(<Spinner on={true} />);

  // Assert that spinner is rendered after prop change
  const spinnerElement = container.querySelector('#spinner');
  expect(spinnerElement).toBeInTheDocument();
});
