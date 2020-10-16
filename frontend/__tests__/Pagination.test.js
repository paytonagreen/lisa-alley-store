import { screen } from '@testing-library/react';
import { render } from '../lib/testUtils';
import Pagination from '../components/items/Pagination';

const setScreenPage = (page = 1) => {
  render(
      <Pagination page={page} />
  );
};

describe('<Pagination/>', () => {
  it('displays a loading message', async () => {
    setScreenPage(1);

    expect(await screen.findByTestId('loader')).toBeInTheDocument();
  });

  it('displays pagination for 20 items', async () => {
    setScreenPage();

    expect(await screen.findByTestId('pages-index')).toHaveTextContent('Page 1 of 3');
    expect(await screen.findByTestId('pagination')).toMatchSnapshot()
    ;
  });

  it('disables prev button on first page', async () => {
    setScreenPage();

    expect(await screen.findByRole('link', {name: /Prev/i })).toHaveAttribute('aria-disabled');
  } );

  it('disables next button on last page', async () => {
    setScreenPage(4);

    expect(await screen.findByRole('link', { name: /Next/i })).toHaveAttribute('aria-disabled');
  }); 

  it('enables all buttons on a middle page', async () => {
    setScreenPage(3);

    expect(await screen.findByRole('link', { name: /Prev/i })).toHaveAttribute('aria-disabled');
    expect(await screen.findByRole('link', { name: /Next/i })).toHaveAttribute('aria-disabled');
  });
});  
