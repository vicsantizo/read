import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion';

describe('Tests the Accordion component', () => {
  const user = userEvent.setup();

  it('renders component', () => {
    render(
      <Accordion label="test">
        <div>content</div>
      </Accordion>,
    );

    const accordion = screen.queryByTestId('accordion');
    expect(accordion).toBeInTheDocument();
  });

  it('does not show content after rendering', () => {
    render(
      <Accordion label="test">
        <div>content</div>
      </Accordion>,
    );
    const accordionContent = screen.queryByText('content');
    expect(accordionContent).not.toBeVisible();
  });

  it('shows the content after clicking the accordion', async () => {
    render(
      <Accordion label="test">
        <div>content</div>
      </Accordion>,
    );

    const accordionButton = screen.getByRole('button');
    await user.click(accordionButton);
    const accordionContent = screen.queryByText('content');
    expect(accordionContent).toBeVisible();
  });

  it('hides the content when clicking the accordion', async () => {
    render(
      <Accordion label="test">
        <div data-testid="item">Item</div>
      </Accordion>,
    );

    const accordionButton = screen.getByRole('button');
    await user.click(accordionButton);
    await user.click(accordionButton);
    const accordionContentItem = screen.getByTestId('item');
    expect(accordionContentItem).not.toBeVisible();
  });

  it('sets attribute aria-expanded to false when rendered', async () => {
    render(
      <Accordion label="test">
        <div>content</div>
      </Accordion>,
    );

    const accordioButton = screen.getByRole('button');
    expect(accordioButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets attribute aria-hidden to true when rendered', async () => {
    render(
      <Accordion label="test">
        <div>content</div>
      </Accordion>,
    );

    const accordionContent = screen.getByTestId('content');
    expect(accordionContent).toHaveAttribute('aria-hidden', 'true');
  });

  it('sets attribute aria-expanded to true when accordion is opened', async () => {
    render(
      <Accordion label="test">
        <div>content</div>
      </Accordion>,
    );

    const accordionButton = screen.getByRole('button');
    await user.click(accordionButton);
    expect(accordionButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('sets attribute aria-hidden to false when accordion is opened', async () => {
    render(
      <Accordion label="test">
        <div>content</div>
      </Accordion>,
    );
    const accordionButton = screen.getByRole('button');
    await user.click(accordionButton);

    const accordionContent = screen.getByTestId('content');
    expect(accordionContent).toHaveAttribute('aria-hidden', 'false');
  });
});
