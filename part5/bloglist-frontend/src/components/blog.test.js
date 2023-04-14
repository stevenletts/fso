import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("render blog with author and title", () => {
  const testBlog = {
    title: "title",
    author: "author",
    url: "url.com",
    likes: 0,
  };

  const mockFn = jest.fn();

  const component = render(
    <Blog blog={testBlog} updateBlog={mockFn} deleteBlog={mockFn} />
  ).container;

  expect(component).toHaveTextContent("title author");
  expect(component).not.toHaveTextContent("url");
});

test("view button test showing url and likes", async () => {
  const testBlog = {
    title: "title",
    author: "author",
    url: "url.com",
    likes: 0,
    user: {
      username: "username",
      name: "name",
    },
  };

  const mockFn = jest.fn();

  const component = render(
    <Blog blog={testBlog} updateBlog={mockFn} deleteBlog={mockFn} />
  ).container;

  const user = userEvent.setup();
  const button = screen.getByText("View");
  await user.click(button);

  expect(component).toHaveTextContent("url.com");
  expect(component).toHaveTextContent("0");
});

test("check like button fires when clicked", async () => {
  const testBlog = {
    title: "title",
    author: "author",
    url: "url.com",
    likes: 0,
    user: {
      username: "username",
      name: "name",
    },
  };

  const mockFn = jest.fn();

  // eslint-disable-next-line no-unused-vars
  const component = render(
    <Blog blog={testBlog} updateBlog={mockFn} deleteBlog={mockFn} />
  ).container;

  const user = userEvent.setup();
  const button = screen.getByText("View");
  await user.click(button);

  const likeButton = screen.getByText("like");

  await user.click(likeButton);
  expect(mockFn.mock.calls).toHaveLength(1);
  await user.click(likeButton);
  expect(mockFn.mock.calls).toHaveLength(2);
});
