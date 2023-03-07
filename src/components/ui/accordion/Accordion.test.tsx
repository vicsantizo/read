import { getByTestId, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion';

describe('Tests the Accordion component', () => {
  const user = userEvent.setup();

  it('should render component', () => {
    render(
      <Accordion label="test">
        <div>content</div>
      </Accordion>,
    );

    const accordion = screen.queryByTestId('accordion');
    expect(accordion).toBeInTheDocument();
  });

  it('should not show content after rendering', () => {
    render(
      <Accordion label="test">
        <div>content</div>
      </Accordion>,
    );
    const accordionContent = screen.queryByText('content');
    expect(accordionContent).not.toBeVisible();
  });

  it('should show the content after clicking the accordion', async () => {
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

  it('should hide the content when clicking the accordion', async () => {
    render(
      <Accordion label="test">
        <div data-testid="content">content</div>
      </Accordion>,
    );

    const accordionButton = screen.getByRole('button');
    await user.click(accordionButton);
    await user.click(accordionButton);
    const accordionContent = screen.queryByTestId('content');
    expect(accordionContent).not.toBeVisible();
  });

  it('should set attribute aria-expanded to false when rendered', async () => {
    render(
      <Accordion label="test">
        <div>content</div>
      </Accordion>,
    );

    const accordion = screen.getByTestId('accordion');
    const ariaExpandedElement = accordion.querySelector('[aria-expanded]');
    expect(ariaExpandedElement).toHaveAttribute('aria-expanded', 'false');
  });

  it('should set attribute aria-hidden to true when rendered', async () => {
    render(
      <Accordion label="test">
        <div>content</div>
      </Accordion>,
    );

    const accordion = screen.getByTestId('accordion');
    const ariaExpandedElement = accordion.querySelector('[aria-hidden]');
    expect(ariaExpandedElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('should set attribute aria-expanded to true when accordion is opened', async () => {
    render(
      <Accordion label="test">
        <div>content</div>
      </Accordion>,
    );
    const accordion = screen.getByTestId('accordion');
    const accordionButton = screen.getByRole('button');
    await user.click(accordionButton);
    const ariaExpandedElement = accordion.querySelector('[aria-expanded]');
    expect(ariaExpandedElement).toHaveAttribute('aria-expanded', 'true');
  });

  it('should set attribute aria-hidden to false when accordion is opened', async () => {
    render(
      <Accordion label="test">
        <div>content</div>
      </Accordion>,
    );
    const accordion = screen.getByTestId('accordion');
    const accordionButton = screen.getByRole('button');
    await user.click(accordionButton);
    const ariaExpandedElement = accordion.querySelector('[aria-hidden]');
    expect(ariaExpandedElement).toHaveAttribute('aria-hidden', 'false');
  });
});
