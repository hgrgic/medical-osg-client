import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import App from './App';

// Homepage tests

test('Render application title', () => {
  const { getByText } = render(<App />);
  const element = getByText('MedAssistant');
  expect(element).toBeInTheDocument();
});

// Test if login button is rendered

test('Render login button', () => {
  const { getByText } = render(<App />);
  const element = getByText('Sign in');
  expect(element).toBeInTheDocument();
});

// Test if signup button renders

test('Render signup button', () => {
  const { getByText } = render(<App />);
  const element = getByText('Sign up');
  expect(element).toBeInTheDocument();
});

// Test if about page is rendered

test('Render about page', () => {
  const { getByText } = render(<App />);
  const element = getByText('About');
  expect(element).toBeInTheDocument();
});
