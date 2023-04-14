import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("blog form test", async () => {
  const create = jest.fn();
  const user = userEvent.setup();

  // eslint-disable-next-line no-unused-expressions
  render(<BlogForm addBlogToDB={create} />).container;

  const inputs = screen.getAllByRole("textbox");

  const button = screen.getByText("Submit");

  await user.type(inputs[0], "titleSubmitted");
  await user.type(inputs[1], "authorSubmitted");
  await user.type(inputs[2], "www.url.comSubmitted");
  await user.click(button);

  expect(create.mock.calls).toHaveLength(1);
  expect(create.mock.calls[0][0].title).toBe("titleSubmitted");
  expect(create.mock.calls[0][0].author).toBe("authorSubmitted");
  expect(create.mock.calls[0][0].url).toBe("www.url.comSubmitted");
});
