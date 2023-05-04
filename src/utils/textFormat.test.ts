import { shortenText } from './textFormat';

describe('test text formatting functions', () => {
  it('shortens the text to the desired length', () => {
    const text = 'Lorem Ipsum is not simply random text';
    const shortenedText = shortenText(text, 12);
    expect(shortenedText).toHaveLength(12);
  });

  it('adds a "." (period) at the end of the text', () => {
    const text = 'Lorem Ipsum is not simply random text';
    const shortenedText = shortenText(text, 12);
    const lastCharacter = shortenedText[shortenedText.length - 1];
    expect(lastCharacter).toBe('.');
  });
});
