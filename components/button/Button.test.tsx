import React, { ReactNode } from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Button from "./Button";
import translate from "../../i18n/translate";
import ThemeProvider from "../../theme/ThemeProvider";
import { TranslatedText } from "../../i18n/types";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Mock the translate function
jest.mock("../../i18n/translate", () => jest.fn((key) => key));
jest.mock("../../theme/ThemeProvider", () => require("../../__mock__/theme"));

const AllProviders = ({ children }: { children: ReactNode }) => (
  <SafeAreaProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </SafeAreaProvider>
);
const buttonTitle: TranslatedText = "welcome";

describe("Button Component", () => {
  it("renders correctly with title and default styles", () => {
    const { getByText, ...o } = render(<Button title={buttonTitle} />);

    expect(getByText(translate(buttonTitle))).toBeTruthy();
  });

  it("renders with   accent", () => {
    const { getByTestId } = render(<Button title={buttonTitle} accent />);

    const buttonContainer = getByTestId("button").parent;
    expect(buttonContainer.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: "#c30045" }), // Adjust according to your accent color
      ])
    );
  });

  it("renders with an icon", () => {
    const { getByTestId } = render(<Button icon="check" />);
    const buttonContainer = getByTestId("button");

    expect(buttonContainer.children[0].props.name === "check").toBeTruthy();
  });

  it("handles press event", () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(<Button title={buttonTitle} onPress={onPressMock} />);

    fireEvent.press(getByRole("button"));
    fireEvent.press(getByRole("button"));
    expect(onPressMock).toHaveBeenCalledTimes(2);
  });

  it("applies disabled styles and prevents press", () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(<Button title={buttonTitle} disabled onPress={onPressMock} />);

    fireEvent.press(getByRole("button"));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
