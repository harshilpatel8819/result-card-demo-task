// App.test.tsx
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import App from "./App";

describe("App component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });



  it("renders ResultHeader and ResultSummary after successful fetch", async () => {
    const mockData = [
      { category: "Reaction", score: 80, icon: "icon-reaction.svg" },
      { category: "Memory", score: 92, icon: "icon-memory.svg" },
    ];

    // Mock the fetch API to return successful response with mock data
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    } as Response);

    render(<App />);

    // Wait for the loading state to finish
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    // Check if ResultHeader and ResultSummary components render the data
    expect(screen.getByText("Reaction")).toBeInTheDocument();
    expect(screen.getByText("Memory")).toBeInTheDocument();
  });

  it("renders ErrorDisplay when fetch fails", async () => {
    // Mock the fetch API to simulate a failed response
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    render(<App />);

    // Wait for the ErrorDisplay component to appear
    await waitFor(() =>
      expect(screen.getByText(/failed to fetch data/i)).toBeInTheDocument()
    );

    // Check if the Retry button is present
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });

  it("reloads the page when Retry button is clicked", async () => {
    // Mock the fetch API to simulate a failed response
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    // Mock window.location.reload
    const reloadMock = vi.fn();
    Object.defineProperty(window, "location", {
      value: { reload: reloadMock },
      writable: true,
    });

    render(<App />);

    // Wait for the ErrorDisplay component to appear
    await waitFor(() =>
      expect(screen.getByText(/failed to fetch data/i)).toBeInTheDocument()
    );

    // Click the Retry button
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));

    // Check if window.location.reload was called
    expect(reloadMock).toHaveBeenCalled();
  });

  it("displays default message when error is not an instance of Error", async () => {
    // Mock the fetch API to throw a non-Error object
    vi.spyOn(global, "fetch").mockRejectedValueOnce("Some string error");

    render(<App />);

    // Wait for the ErrorDisplay component to appear with default error message
    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );
  });

  it("handles empty results array", async () => {
    // Mock the fetch API to return an empty array
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    render(<App />);

    // Wait for the loading state to finish
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    // Check if components handle empty data gracefully
    expect(screen.getByText("Your Result")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument(); // Average score should be 0
  });
});
