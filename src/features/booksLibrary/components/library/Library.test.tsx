import { screen, render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { BooksContext } from '../../../../context/books/BooksContext';
import { Book } from '../../models/book';
import { Library } from './Library';

const mockSetBooks = jest.fn();

describe('tests the Library component', () => {
  it('renders the component', () => {
    const genericBook1 = new Book({
      title: 'Lorem Ipsum',
      author: 'John Doe',
    });

    const genericBook2 = new Book({
      title: 'Lorem Ipsum2',
      author: 'John Doe 2',
    });

    const books = [genericBook1, genericBook2];

    const jsxElements = (
      <BooksContext.Provider
        value={{
          books,
          setBooks: mockSetBooks,
        }}
      >
        <Library />
      </BooksContext.Provider>
    );

    const routes = [
      {
        path: '/test',
        element: jsxElements,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/test'],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText('My Library')).toBeVisible();
  });

  it('shows all the books', () => {
    const genericBook1 = new Book({
      title: 'Lorem Ipsum 1',
      author: 'John Doe',
    });

    const genericBook2 = new Book({
      title: 'Lorem Ipsum 2',
      author: 'John Doe 2',
    });

    const books = [genericBook1, genericBook2];

    const jsxElements = (
      <BooksContext.Provider
        value={{
          books,
          setBooks: mockSetBooks,
        }}
      >
        <Library />
      </BooksContext.Provider>
    );

    const routes = [
      {
        path: '/test',
        element: jsxElements,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/test'],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText('Lorem Ipsum 1')).toBeVisible();
    expect(screen.getByText('Lorem Ipsum 2')).toBeVisible();
  });

  it('indicates that the library is empty when there are no books', () => {
    const jsxElements = (
      <BooksContext.Provider
        value={{
          books: [],
          setBooks: mockSetBooks,
        }}
      >
        <Library />
      </BooksContext.Provider>
    );

    const routes = [
      {
        path: '/test',
        element: jsxElements,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/test'],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText('No books')).toBeInTheDocument();
  });
});
