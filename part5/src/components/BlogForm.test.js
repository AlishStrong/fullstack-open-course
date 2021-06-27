import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import BlogForm from './BlogForm';

describe('5.16*: Blog list tests, step4', () => {
  test('<BlogForm /> submits proper data', () => {
    const handleResponse = jest.fn();

    const component = render(
      <BlogForm sumbitBlog={handleResponse} />
    );

    const titleInput = component.container.querySelector('#titleInput');
    const authorInput = component.container.querySelector('#authorInput');
    const urlInput = component.container.querySelector('#urlInput');
    const form = component.container.querySelector('form');

    fireEvent.change(titleInput, {
      target: { value: 'Title 1' }
    });
    fireEvent.change(authorInput, {
      target: { value: 'Author 2' }
    });
    fireEvent.change(urlInput, {
      target: { value: 'URL 3' }
    });

    expect(titleInput.value).toBe('Title 1');
    expect(authorInput.value).toBe('Author 2');
    expect(urlInput.value).toBe('URL 3');

    fireEvent.submit(form);

    expect(handleResponse.mock.calls).toHaveLength(1);
    expect(handleResponse.mock.calls[0][0].title).toBe('Title 1' );
    expect(handleResponse.mock.calls[0][0].author).toBe('Author 2' );
    expect(handleResponse.mock.calls[0][0].url).toBe('URL 3' );
    expect(titleInput.value).toBe('');
    expect(authorInput.value).toBe('');
    expect(urlInput.value).toBe('');
  });
});
