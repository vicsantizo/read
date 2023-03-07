import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toggle } from './Toggle';

describe('tests the Toggle component', () => {
  const user = userEvent.setup();

  it('should render component', () => {
    render(<Toggle label="Toggle Test" />);
    const toggleElement = screen.getByTestId('toggle');
    expect(toggleElement).toBeInTheDocument();
  });

  it('should indicate whether the element is checked/unchecked', async () => {
    render(<Toggle label="Toggle Test" />);
    const toggleElement = screen.getByTestId('toggle');

    expect(toggleElement).toHaveAttribute('aria-checked', 'false');
    await user.click(toggleElement);
    expect(toggleElement).toHaveAttribute('aria-checked', 'true');
  });

  it('should call the action when toggle goes from off to on', async () => {
    const onClick = jest.fn();
    render(<Toggle label="Toggle Test" toggleAction={onClick} />);
    const toggleElement = screen.getByTestId('toggle');

    await user.click(toggleElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not call the action when toggle goes from on to off', async () => {
    const onClick = jest.fn();
    render(<Toggle label="Toggle Test" toggleAction={onClick} />);
    const toggleElement = screen.getByTestId('toggle');

    await user.click(toggleElement);
    await user.click(toggleElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should call the action when clicking the label and toggle goes from off to on', async () => {
    const onClick = jest.fn();
    render(<Toggle label="Toggle Test" toggleAction={onClick} />);
    const toggleLabel = screen.getByTestId('toggle-label');

    await user.click(toggleLabel);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not call the action when clicking the label and toggle goes from on to off', async () => {
    const onClick = jest.fn();
    render(<Toggle label="Toggle Test" toggleAction={onClick} />);
    const toggleLabel = screen.getByTestId('toggle-label');

    await user.click(toggleLabel);
    await user.click(toggleLabel);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
