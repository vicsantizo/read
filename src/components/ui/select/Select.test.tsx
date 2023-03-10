import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

describe('tests the Select component', () => {
  const user = userEvent.setup();

  it('renders the component', () => {
    render(<Select options={['fiction', 'science', 'space', 'history']} />);
    const combobox = screen.getByTestId('select');
    expect(combobox).toBeInTheDocument();
  });

  it('hides the listbox options when rendered', async () => {
    render(<Select options={['fiction', 'science', 'space', 'history']} />);
    const listbox = screen.getByRole('listbox', {
      hidden: true,
    });
    expect(listbox).not.toBeVisible();
  });

  it('shows listbox options when combobox is expanded', async () => {
    render(<Select options={['fiction', 'science', 'space']} />);

    const combobox = screen.getByRole('combobox');
    await user.click(combobox);

    const fictionOption = screen.getByText('fiction');
    const scienceOption = screen.getByText('science');
    const spaceOption = screen.getByText('space');

    expect(fictionOption).toBeVisible();
    expect(scienceOption).toBeVisible();
    expect(spaceOption).toBeVisible();
  });

  it('shows selected options within combobox after clicking them', async () => {
    render(<Select options={['fiction', 'science', 'space']} />);

    const combobox = screen.getByRole('combobox');
    await user.click(combobox);

    const fictionOption = screen.getByText('fiction');
    await user.click(fictionOption);

    expect(combobox).toHaveTextContent('fiction');
  });

  it('removes selected option within combobox when the selected option is clicked', async () => {
    render(<Select options={['fiction', 'science', 'space']} />);

    const combobox = screen.getByRole('combobox');
    await user.click(combobox);

    const fictionOption = screen.getByText('fiction');
    await user.click(fictionOption);

    const optionSelected = screen.getByTestId('selection');
    expect(optionSelected).toHaveTextContent('fiction');

    await user.click(optionSelected);
    const optionsSelected = screen.queryByTestId('selection');
    expect(optionsSelected).toBeNull();
  });

  it('enables moving within listbox option items using up/down arrow keys', async () => {
    render(<Select options={['fiction', 'science', 'space']} />);
    const combobox = screen.getByRole('combobox');
    fireEvent.focus(combobox);
    await user.click(combobox);

    // first option is already selected when combobox is expanded
    const listboxOption1 = screen.getByText('fiction');
    expect(listboxOption1).toHaveFocus();

    // moving
    fireEvent.keyDown(listboxOption1, { key: 'ArrowDown', code: 'ArrowDown', charCode: 40 });
    const listboxOption2 = screen.getByText('science');
    expect(listboxOption2).toHaveFocus();

    fireEvent.keyDown(listboxOption2, { key: 'ArrowDown', code: 'ArrowDown', charCode: 40 });
    const listboxOption3 = screen.getByText('space');
    expect(listboxOption3).toHaveFocus();

    fireEvent.keyDown(listboxOption3, { key: 'ArrowUp', code: 'ArrowUp', charCode: 38 });
    expect(listboxOption2).toHaveFocus();
  });

  it('opens the listbox options when the combobox is focused and one of the enter/space/arrowup/arrowdown keys is pressed', async () => {
    render(<Select options={['fiction', 'science', 'space']} />);
    const combobox = screen.getByRole('combobox');
    fireEvent.focus(combobox);
    fireEvent.keyDown(combobox, { key: '', code: 'Space', charCode: 32 });
    const listbox = screen.queryByRole('listbox');
    expect(listbox).toBeVisible();
  });

  it('enables selecting listbox options using space/enter keys', async () => {
    render(<Select options={['fiction', 'science', 'space']} />);
    const combobox = screen.getByRole('combobox');
    if (combobox) await user.click(combobox);

    const listboxOption1 = screen.getByText('fiction');
    expect(listboxOption1).toHaveFocus();
    fireEvent.keyDown(listboxOption1, { key: '', code: 'Space', charCode: 32 });

    const comboboxSelection = screen.getByTestId('selection');
    expect(comboboxSelection).toHaveTextContent('fiction');
  });

  it('closes the listbox when pressing the escape key', async () => {
    render(<Select options={['fiction', 'science', 'space']} />);
    const combobox = screen.getByRole('combobox');
    if (combobox) await user.click(combobox);

    const listboxOption1 = screen.getByText('fiction');
    expect(listboxOption1).toHaveFocus();
    fireEvent.keyDown(listboxOption1, { key: 'Escape', code: 'Escape', charCode: 27 });

    const listbox = screen.queryByRole('listbox');
    expect(listbox).toBeNull();
  });
});
