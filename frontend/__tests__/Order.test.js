import { screen } from '@testing-library/react'

import Order from '../components/orders/Order';
import { render } from '../lib/testUtils';

describe('<Order/>', () => {

  it('renders a Loader', async () => {
    render(<Order id='abc123' />)
    expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
  })
})