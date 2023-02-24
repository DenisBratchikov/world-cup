import { act, fireEvent, render } from '@testing-library/react';

import Form from '.';

const BUTTON_TEXT = 'Submit form';

describe('Form tests', () => {
  it('should include button with buttonText', () => {
    const { queryByText } = render(<Form buttonText={BUTTON_TEXT} />);

    expect(queryByText(BUTTON_TEXT)).not.toBeNull();
  });

  it('should call onSubmit on button click', () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    const { getByText } = render(
      <Form buttonText={BUTTON_TEXT} onSubmit={onSubmit} />
    );

    const btn = getByText(BUTTON_TEXT);
    act(() => {
      fireEvent.click(btn);
    });

    expect(onSubmit).toHaveBeenCalled();
  });

  it('should render disabled button if prop disapbled is passed', () => {
    const { getByText } = render(<Form buttonText={BUTTON_TEXT} disabled />);

    const btn = getByText(BUTTON_TEXT);
    expect(btn).toHaveProperty('disabled', true);
  });
});
