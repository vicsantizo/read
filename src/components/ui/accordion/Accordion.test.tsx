import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion';

describe('Tests the Accordion component', () => {
  const user = userEvent.setup();

  it('should not show content after rendering', () => {
    render(
      <Accordion label="test">
        <div>content</div>
      </Accordion>,
    );
    const accordionContent = screen.queryByText('content');
    expect(accordionContent).toBeNull;
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
    expect(accordionContent).toBeInTheDocument();
  });

  it('should hide the content when clicking the accordion', async () => {
    render(
      <Accordion label="test">
        <div>content</div>
      </Accordion>,
    );

    const accordionButton = screen.getByRole('button');
    await user.click(accordionButton);
    await user.click(accordionButton);
    const accordionContent = screen.queryByText('content');
    expect(accordionContent).toBeNull();
  });
});
