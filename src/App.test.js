import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Render application title', () => {
  const { getByText } = render(<App />);
  const title = getByText('MedAssistant');
  expect(title).toBeInTheDocument();
});
