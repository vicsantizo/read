import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Book as BookComponent } from './Book';
import { Book } from '../../models/book';

describe('tests the logo component', () => {
  it('renders the component', () => {
    const genericBook = new Book({
      title: 'Lorem Ipsum',
      author: 'John Doe',
    });
    const routes = [
      {
        path: '/test',
        element: <BookComponent book={genericBook} />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/test'],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText('Lorem Ipsum')).toBeInTheDocument();
  });

  it('displays the title and author of the book', () => {
    const genericBook = new Book({
      title: 'Lorem Ipsum',
      author: 'John Doe',
    });

    const routes = [
      {
        path: '/test',
        element: <BookComponent book={genericBook} />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/test'],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText('Lorem Ipsum')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('links to the specific book page', () => {
    const genericBook = new Book({
      title: 'Lorem Ipsum',
      author: 'John Doe',
    });

    const routes = [
      {
        path: '/test',
        element: <BookComponent book={genericBook} />,
      },
    ];

    const genericBookId = genericBook.getId();

    const router = createMemoryRouter(routes, {
      initialEntries: ['/test'],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const bookLink = screen.getByRole('link');

    expect(bookLink).toHaveAttribute('href', `/books/${genericBookId}`);
  });
});
