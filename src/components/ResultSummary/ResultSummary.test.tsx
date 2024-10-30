import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ResultSummary, { colorMap } from "./ResultSummary"; // Adjust the import path as necessary
import { Result } from "../../types"; // Adjust the import path as necessary

const mockResults: Result[] = [
  { category: "Reaction", score: 90, icon: "/path/to/reaction.svg" },
  { category: "Memory", score: 88, icon: "/path/to/memory.svg" },
];

describe("ResultSummary component", () => {

  it("renders results correctly when loading is false", () => {
    render(<ResultSummary loading={false} results={mockResults} />);
    expect(screen.getByText("Reaction")).toBeInTheDocument();
    expect(screen.getByText("Memory")).toBeInTheDocument();
  });

  it("button is disabled when loading is true", () => {
    render(<ResultSummary loading={true} results={mockResults} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("takes a snapshot", () => {
    const { asFragment } = render(
      <ResultSummary loading={false} results={mockResults} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
