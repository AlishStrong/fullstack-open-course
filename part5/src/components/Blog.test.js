import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Blog from './Blog';

describe('5.13: Blog list tests, step1', () => {
  test('<Blog /> renders content', () => {
    const blog = {
      author: 'Author3',
      id: '60d87145ebe55c1150eaf10c',
      likes: 0,
      title: 'Blog3',
      url: 'URL3',
      user: {
        username: 'new_user',
        name: 'New User',
        id: '60d70f2837757d36bc3a3f77'
      }
    };

    const component = render(
      <Blog blog={blog} likeBlog={() => {}} removeBlog={() => {}} username={'null'} />
    );

    expect(component.container).toHaveTextContent('Blog3 Author3');
    expect(component.container).not.toHaveTextContent('URL3');
    expect(component.container).not.toHaveTextContent('0');
  });
});

describe('5.14: Blog list tests, step2', () => {
  test('<Blog /> button click shows blog details', () => {
    const blog = {
      author: 'Author3',
      id: '60d87145ebe55c1150eaf10c',
      likes: 0,
      title: 'Blog3',
      url: 'URL3',
      user: {
        username: 'new_user',
        name: 'New User',
        id: '60d70f2837757d36bc3a3f77'
      }
    };

    const component = render(
      <Blog blog={blog} likeBlog={() => {}} removeBlog={() => {}} username={'null'} />
    );

    const button = component.container.querySelector('.showDetails');
    fireEvent.click(button);

    expect(button).toHaveTextContent('hide');
    expect(component.container).toHaveTextContent('URL3');
    expect(component.container).toHaveTextContent('0');
  });
});
