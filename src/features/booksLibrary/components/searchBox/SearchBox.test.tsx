import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBox } from './SearchBox';

const mockSetSearchValue = jest.fn();

describe('tests the SearchBox component', () => {
  it('renders the component', () => {
    render(
      <SearchBox
        searchValue={'test'}
        setSearchValue={() => {
          //
        }}
      />,
    );
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('input field receives the correct search value and updates on change', async () => {
    render(
      <SearchBox
        searchValue="React"
        setSearchValue={() => {
          //
        }}
      />,
    );
    const inputElement = screen.getByRole('searchbox');
    expect(inputElement).toHaveValue('React');
  });

  it('input field updates correctly', async () => {
    const user = userEvent.setup();

    render(<SearchBox searchValue="" setSearchValue={mockSetSearchValue} />);

    const inputElement = screen.getByRole('searchbox');
    await user.type(inputElement, 'T');
    expect(mockSetSearchValue).toHaveBeenCalledWith('T');
  });
});
