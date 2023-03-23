import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBox } from './SearchBox';

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
    expect(screen.getByRole('textbox')).toBeInTheDocument();
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
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue('React');
  });

  it('input field updates correctly', async () => {
    const user = userEvent.setup();
    const setSearchValueMock = jest.fn();

    render(<SearchBox searchValue="" setSearchValue={setSearchValueMock} />);

    const inputElement = screen.getByRole('textbox');
    await user.type(inputElement, 'T');
    expect(setSearchValueMock).toHaveBeenCalledWith('T');
  });
});
