import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorDisplay from "./ErrorDisplay"; // Adjust the import path as necessary

describe("ErrorDisplay component", () => {
  const errorMessage = "Network error occurred";
  const onRetryMock = vi.fn(); // 'vi' is from Vitest for creating mocks

  it("displays the error message passed via props", () => {
    render(<ErrorDisplay error={errorMessage} onRetry={onRetryMock} />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it("calls the onRetry function when the retry button is clicked", () => {
    render(<ErrorDisplay error={errorMessage} onRetry={onRetryMock} />);
    const retryButton = screen.getByRole("button", { name: "Retry" });
    fireEvent.click(retryButton);
    expect(onRetryMock).toHaveBeenCalledTimes(1); // Check if the callback function is called once
  });
});
