import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Logo } from './Logo';

describe('tests the logo component', () => {
  it('renders the component', async () => {
    const routes = [
      {
        path: '/test',
        element: <Logo />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/test'],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('navigates to the home page', async () => {
    const routes = [
      {
        path: '/test',
        element: <Logo />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/test'],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
