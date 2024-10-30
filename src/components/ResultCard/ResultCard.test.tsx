import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ResultHeader from "./ResultCard"; // Adjust the import path as necessary

describe("ResultHeader component", () => {
  const mockResults = [
    {
      category: "Reaction",
      score: 80,
      icon: "./assets/images/icon-reaction.svg",
    },
    {
      category: "Memory",
      score: 92,
      icon: "./assets/images/icon-memory.svg",
    },
    {
      category: "Verbal",
      score: 61,
      icon: "./assets/images/icon-verbal.svg",
    },
    {
      category: "Visual",
      score: 72,
      icon: "./assets/images/icon-visual.svg",
    },
  ];

  it("displays 0 when results array is empty", () => {
    render(<ResultHeader loading={false} results={[]} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders static texts correctly", () => {
    render(<ResultHeader loading={false} results={mockResults} />);
    expect(screen.getByText("Your Result")).toBeInTheDocument();
    expect(screen.getByText("Great")).toBeInTheDocument();
    expect(
      screen.getByText(
        "You scored higher than 65% of the people who have taken these tests."
      )
    ).toBeInTheDocument();
  });

    it("does not render Skeleton when not loading", () => {
      render(<ResultHeader loading={false} results={mockResults} />);
      const skeletonElements = screen.queryAllByTestId("skeleton");
      expect(skeletonElements).toHaveLength(0); // No Skeletons should be rendered
    });

  it("displays the correct average score when not loading", () => {
    render(<ResultHeader loading={false} results={mockResults} />);
    // Calculating average for assertion to make it dynamic
    const averageScore = Math.round(
      mockResults.reduce((acc, curr) => acc + curr.score, 0) /
        mockResults.length
    ).toString();
    expect(
      screen.getByText(averageScore, { exact: false })
    ).toBeInTheDocument(); // Use exact:false for partial matching if the score is embedded in other text
    expect(screen.getByText("of 100")).toBeInTheDocument();
  });

  it("calculates the average score correctly for non-empty results", () => {
    render(<ResultHeader loading={false} results={mockResults} />);
    const averageScore = Math.round(
      mockResults.reduce((acc, curr) => acc + curr.score, 0) /
        mockResults.length
    ).toString();
    const displayedScore = screen.getByText(averageScore, { exact: false });
    expect(displayedScore).toBeInTheDocument();
  });

  it("handles very large scores correctly", () => {
    const largeScores = [
      { category: "Ultra", score: 1000000, icon: "path/to/icon.svg" },
      { category: "Mega", score: 2000000, icon: "path/to/icon.svg" },
    ];
    render(<ResultHeader loading={false} results={largeScores} />);
    const expectedAverage = "1500000"; // Expected average of the large scores
    expect(
      screen.getByText(expectedAverage, { exact: false })
    ).toBeInTheDocument();
  });

  it("handles negative scores correctly", () => {
    const negativeScores = [
      { category: "Low", score: -50, icon: "path/to/icon.svg" },
      { category: "Lower", score: -70, icon: "path/to/icon.svg" },
    ];
    render(<ResultHeader loading={false} results={negativeScores} />);
    const expectedAverage = "-60"; // Expected average of the negative scores
    expect(
      screen.getByText(expectedAverage, { exact: false })
    ).toBeInTheDocument();
  });

});
