import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Footer from "@/components/layout/Footer";
import React from "react";

describe("Footer Component", () => {
  test("renders copyright text with current year", () => {
    render(<Footer />);
    const copyrightText = screen.getByText(/Vrushali Devlekar/i);
    expect(copyrightText).toBeInTheDocument();
  });

  test("renders social profile links", () => {
    render(<Footer />);
    const githubLink = screen.getByRole("link", { name: /github/i });
    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/vrushali-devlekar",
    );
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/vrushali-devlekar/",
    );
  });
});
