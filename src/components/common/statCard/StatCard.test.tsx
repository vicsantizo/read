import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard';

describe('tests the StatCard component', () => {
  it('renders the component', () => {
    const title = 'My Title';
    const text = 'My Text';
    render(<StatCard title={title} text={text} />);
  });

  it('renders with the correct title and text', () => {
    const title = 'My Title';
    const text = 'My Text';
    render(<StatCard title={title} text={text} />);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
