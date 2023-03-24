import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Header, HeaderProps } from './Header';

const mockSetIsSidebasShowing = jest.fn();

describe('Header', () => {
  const defaultProps: HeaderProps = {
    isSidebarShowing: false,
    setIsSidebarShowing: mockSetIsSidebasShowing,
  };

  const user = userEvent.setup();

  it('renders the component', () => {
    const routes = [
      {
        path: '/test',
        element: <Header {...defaultProps} />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/test'],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  it('calls setIsSidebarShowing when the burger button is clicked', async () => {
    const routes = [
      {
        path: '/test',
        element: <Header {...defaultProps} />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/test'],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);
    const buttonElement = screen.getByRole('button');
    await user.click(buttonElement);
    expect(defaultProps.setIsSidebarShowing).toHaveBeenCalledTimes(1);
  });
});
