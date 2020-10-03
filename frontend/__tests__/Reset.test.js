import { screen } from '@testing-library/react';
import { render } from '../lib/testUtils';
import userEvent from '@testing-library/user-event';
import Reset from '../components/signup-signin/Reset';

describe('<Reset/>', () => {
  it('renders properly', async () => {
    render(<Reset resetToken='abc123' />);
    expect(await screen.findByTestId('reset-form')).toBeInTheDocument();
  });

  it('handles input', async () => {
    render(<Reset resetToken='abc123' />)
    await userEvent.type(screen.getByLabelText(/Password/i), 'password')
    await userEvent.type(screen.getByLabelText(/Confirm/i), 'password')
    expect (screen.getAllByDisplayValue(/password/i)).toHaveLength(2);
  });

  it('updates password on submit', async() => {
    render(<Reset resetToken='abc123' />);
    await userEvent.type(screen.getByLabelText(/Password/i), 'password')
    await userEvent.type(screen.getByLabelText(/Confirm/i), 'password')
    await userEvent.click(screen.getByRole('button', { name: /Reset Your Password!/i }));
    expect(await screen.findByText(/Success! Your password has been reset./i))
  })
});
