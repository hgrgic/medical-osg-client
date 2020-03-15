import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Homepage tests

test('Render application title', () => {
  const { getByText } = render(<App />);
  const element = getByText('MedAssistant');
  expect(element).toBeInTheDocument();
});

test('Render login button', () => {
  const { getByText } = render(<App />);
  const element = getByText('Sign in');
  expect(element).toBeInTheDocument();
});

test('Render signup button', () => {
  const { getByText } = render(<App />);
  const element = getByText('Sign up');
  expect(element).toBeInTheDocument();
});


test('Render about page', () => {
  const { getByText } = render(<App />);
  const element = getByText('About');
  expect(element).toBeInTheDocument();
});
