import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Burger } from './Burger';

const mockAction = jest.fn();

describe('tests the burger component', () => {
  const user = userEvent.setup();

  it('renders the component', () => {
    render(<Burger isActive={false} action={() => true} />);
    const burger = screen.getByRole('button');
    expect(burger).toBeInTheDocument();
  });

  it('calls the function passed to the burger when clicked', async () => {
    render(<Burger isActive={false} action={mockAction} />);
    const burger = screen.getByRole('button');
    await user.click(burger);
    await user.click(burger);
    expect(mockAction).toBeCalledTimes(2);
  });
});
