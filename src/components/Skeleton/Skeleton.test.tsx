import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Skeleton, cn } from "./Skeleton"; // Adjust the import path as necessary

describe("cn function", () => {
  it("merges class names correctly", () => {
    const result = cn("class1", "class2", "class3");
    expect(result).toBe("class1 class2 class3"); // Update expected result based on actual implementation details
  });

  it("ignores falsy values and merges non-empty classes", () => {
    const result = cn("class1", "", null, undefined, "class2");
    expect(result).toBe("class1 class2");
  });

  it("handles no inputs gracefully", () => {
    const result = cn();
    expect(result).toBe("");
  });

});

describe("Skeleton component", () => {
  it("renders with default classes", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass(
      "animate-pulse rounded-md bg-muted"
    );
  });

  it("allows additional classes to be added", () => {
    const { container } = render(<Skeleton className="extra-class" />);
    expect(container.firstChild).toHaveClass(
      "animate-pulse rounded-md bg-muted extra-class"
    );
  });

  it("passes additional props to the div element", () => {
    const style = { color: "red" };
    const { container } = render(<Skeleton style={style} id="test-id" />);
    expect(container.firstChild).toHaveStyle({ color: "rgb(255, 0, 0)" }); // Use RGB color format
    expect(container.firstChild).toHaveAttribute("id", "test-id");
  });
});
