import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Warning from './Warning';

afterEach(cleanup);

describe('Warning component', () => {
  it('closes when you click "close" button', () => {
    const handleClose = jest.fn();

    const { getByTestId } = render(
      <Warning
        message="Test warning"
        closeWarning={handleClose}
      />,
    );

    fireEvent.click(getByTestId('close'));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
