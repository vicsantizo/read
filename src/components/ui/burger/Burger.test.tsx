import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Burger } from './Burger';

describe('tests the burger component', () => {
  const user = userEvent.setup();

  it('renders the component', () => {
    render(<Burger isActive={false} action={() => true} />);
    const burger = screen.getByRole('button');
    expect(burger).toBeInTheDocument();
  });

  it('calls the function passed to the burger when clicked', async () => {
    const justAFunction = jest.fn();
    render(<Burger isActive={false} action={justAFunction} />);
    const burger = screen.getByRole('button');
    await user.click(burger);
    await user.click(burger);
    expect(justAFunction).toBeCalledTimes(2);
  });
});
