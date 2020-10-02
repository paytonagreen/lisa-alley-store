import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, fakeUser } from '../lib/testUtils';
import UpdateUser from '../components/signup-signin/UpdateUser';

const user = fakeUser();

const typeUserInfo = async () => {
  await userEvent.clear(screen.getByLabelText(/Email/i));
  await userEvent.type(screen.getByLabelText(/Email/i), user.email);
  await userEvent.clear(screen.getByLabelText(/Name/i));
  await userEvent.type(screen.getByLabelText(/Name/i), user.name);
  await userEvent.clear(screen.getByLabelText(/Address Line 1/i));
  await userEvent.type(screen.getByLabelText(/Address Line 1/i), user.address1);
  await userEvent.clear(screen.getByLabelText(/Address Line 2/i));
  await userEvent.type(screen.getByLabelText(/Address Line 2/i), user.address2);
  await userEvent.clear(screen.getByLabelText(/City/i));
  await userEvent.type(screen.getByLabelText(/City/i), user.city);
  await userEvent.clear(screen.getByLabelText(/State/i));
  await userEvent.type(screen.getByLabelText(/State/i), user.state);
  await userEvent.clear(screen.getByLabelText(/Zip Code/i));
  await userEvent.type(screen.getByLabelText(/Zip Code/i), user.zip.toString());
};

describe('<UpdateUser/>', () => {
  it('renders properly', async () => {
    render(<UpdateUser />);
    const form = await screen.findByTestId('updateUserForm');
    expect(form).toBeInTheDocument();
  });

  it('handles input changes', async () => {
    render(<UpdateUser />);
    const email = await screen.findByLabelText(/Email/i);

    await typeUserInfo();
    
    await waitFor(() => {
      expect(screen.getByDisplayValue(user.email)).toBeInTheDocument();
      expect(screen.getByDisplayValue(user.name)).toBeInTheDocument();
      expect(screen.getByDisplayValue(user.address1)).toBeInTheDocument();
      expect(screen.getByDisplayValue(user.address2)).toBeInTheDocument();
      expect(screen.getByDisplayValue(user.city)).toBeInTheDocument();
      expect(screen.getByDisplayValue(user.state)).toBeInTheDocument();
      expect(screen.getByDisplayValue(user.zip.toString())).toBeInTheDocument();
    });
  });

  it('updates user when form is submitted', async () => {
    render(<UpdateUser />);
    const email = await screen.findByLabelText(/Email/i);
    await typeUserInfo();
    await userEvent.click(screen.getByRole('button', { name: /Save Changes/i }));
    expect(await screen.findByText(/Success! Account updated./i));
  });
});
