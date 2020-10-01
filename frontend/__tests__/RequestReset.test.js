import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../lib/testUtils';
import RequestReset from "../components/signup-signin/RequestReset";

describe("<RequestReset/>", () => {
  it("renders correctly", async () => {
    render(<RequestReset/>);
    expect(await screen.findByTestId('form')).toBeInTheDocument();
  });

  it("calls the mutation", async () => {
    render(<RequestReset/>)
    await userEvent.type(screen.getByRole('textbox'), 'test@test.com')
    await userEvent.click(screen.getByRole('button', {name: /Request Reset!/i}))
    
    expect(await screen.findByText("Success! Check your e-mail for a reset link.")).toBeInTheDocument();
  });

});
