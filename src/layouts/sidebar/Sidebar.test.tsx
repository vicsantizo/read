import { screen, render } from '@testing-library/react';
import { Sidebar } from './Sidebar';

describe('tests the sidebar component', () => {
  it('renders the component', () => {
    render(
      <Sidebar isSidebarShowing={true}>
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
      </Sidebar>,
    );
    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toBeInTheDocument();
  });

  it('shows sidebar when the prop "isSidebarShowing" is set to true', () => {
    render(
      <Sidebar isSidebarShowing={true}>
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
      </Sidebar>,
    );

    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toBeVisible();
  });

  it('hides sidebar when the prop "isSidebarShowing" is set to false', () => {
    render(
      <Sidebar isSidebarShowing={false}>
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
      </Sidebar>,
    );

    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toHaveClass('sidebar--hide');
  });
});
