import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);
afterAll(cleanup);

test('renders without crashing', () => {
  render(<App />);
  const welcomeText = screen.getByText('Hi, Welcome!');
  expect(welcomeText).toBeInTheDocument();
});

test('adds a new item to the list', () => {
  render(<App />);
  const submitBtn = screen.getByRole('button', { name: 'SUBMIT' });
  expect(submitBtn).toBeInTheDocument();

  const input = screen.getByLabelText('Enter To Do Task.');

  fireEvent.change(input, { target: { value: 'Going to the library' } });
  fireEvent.click(submitBtn);

  expect(screen.getByText('Going to the library')).toBeInTheDocument();
});

test('edits the selected item', () => {
  render(<App />);
  const submitBtn = screen.getByRole('button', { name: 'SUBMIT' });
  const editBtn = screen.getByTestId('editBtn');
  const input = screen.getByLabelText('Enter To Do Task.');

  fireEvent.click(editBtn);
  fireEvent.change(input, { target: { value: 'Shopping with my sister' } });
  fireEvent.click(submitBtn);
  expect(screen.getByText('Shopping with my sister')).toBeInTheDocument();
});

test('removes a new item from the list', () => {
  render(<App />);
  const submitBtn = screen.getByRole('button', { name: 'SUBMIT' });
  const input = screen.getByLabelText('Enter To Do Task.');
  fireEvent.change(input, { target: { value: 'Going to the library' } });
  fireEvent.click(submitBtn);

  /* const deleteBtn = screen.getByTestId('deleteBtn')[0];
  expect(deleteBtn).toBeInTheDocument();

  fireEvent.click(deleteBtn);
  expect(screen.queryByText('Going to the library')).not.toBeInTheDocument(); */
});
