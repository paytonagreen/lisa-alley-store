import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, fakeUser } from '../lib/testUtils';

import Signup from '../components/signup-signin/Signup';

const user = fakeUser();

const typeItAll = async () => {
  await userEvent.type(screen.getByLabelText(/Email/i), user.email);
  await userEvent.type(screen.getByLabelText(/Name/i), user.name);
  await userEvent.type(screen.getByLabelText(/Password/i), 'password');
  await userEvent.type(screen.getByLabelText(/Address Line 1/i), user.address1);
  await userEvent.type(screen.getByLabelText(/Address Line 2/i), user.address2);
  await userEvent.type(screen.getByLabelText(/City/i), user.city);
  await userEvent.type(screen.getByLabelText(/State/i), user.state);
  await userEvent.type(screen.getByLabelText(/Zip Code/i), user.zip.toString());
};

describe('<Signup/>', () => {
  it('renders properly', async () => {
    render(<Signup />);
    expect(await screen.findByTestId('signup-form')).toBeInTheDocument();
  });

  it('takes in input', async () => {
    render(<Signup />);
    await typeItAll();

    expect(screen.getByDisplayValue(user.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(user.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue('password')).toBeInTheDocument();
    expect(screen.getByDisplayValue(user.address1)).toBeInTheDocument();
    expect(screen.getByDisplayValue(user.address2)).toBeInTheDocument();
    expect(screen.getByDisplayValue(user.city)).toBeInTheDocument();
    expect(screen.getByDisplayValue(user.state)).toBeInTheDocument();
    expect(screen.getByDisplayValue(user.zip.toString())).toBeInTheDocument();
  });

  it('creates a user when form is submitted', async () => {
    render(<Signup />);
    await typeItAll();
    await userEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
    expect(
      await screen.findByText('Success! Thanks for signing up!')
    ).toBeInTheDocument();
  });
});
