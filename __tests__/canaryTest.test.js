import React from "react";
import { render } from "@testing-library/react-native";
import Checking from "../Test";

test("canary test", () => {
  const sum = 2 + 2;
  expect(sum).toBe(4);
});
test("Checks react native testing library is working", () => {
  const helloWorldText = "Hello World!";

  const { toJSON, getByText } = render(<Checking />);

  const foundHelloWorldText = getByText(helloWorldText);

  expect(foundHelloWorldText.props.children).toEqual(helloWorldText);
  expect(toJSON()).toMatchSnapshot();
});
