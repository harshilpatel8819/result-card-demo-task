import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadingSkeleton from "./LoadingSkeleton"; // Adjust the import path as necessary

describe("LoadingSkeleton component", () => {
  it("renders the default number of skeleton items when count is not provided", () => {
    render(<LoadingSkeleton />);
    const skeletonItems = screen.getAllByText("", {
      selector: ".animate-pulse",
    });
    expect(skeletonItems.length).toBe(8); // Default count, 4 items with 2 skeletons each
  });

  it("renders the correct number of skeleton items when a count is provided", () => {
    const testCount = 7;
    render(<LoadingSkeleton count={testCount} />);
    const skeletonItems = screen.getAllByText("", {
      selector: ".animate-pulse",
    });
    expect(skeletonItems.length).toBe(testCount * 2); // Each item has 2 skeletons
  });

  it("renders zero skeleton items when count is zero", () => {
    render(<LoadingSkeleton count={0} />);
    const skeletonItems = screen.queryAllByText("", {
      selector: ".animate-pulse",
    });
    expect(skeletonItems.length).toBe(0);
  });
});
