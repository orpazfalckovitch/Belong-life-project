import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import Search from "../src/components/Search/Search";
import "@testing-library/jest-dom";

describe("Search", () => {
  it("Should render search input", () => {
    render(<Search onKeyUp={() => {}} />);
    const searchInput = screen.getByPlaceholderText("Search country");
    expect(searchInput).toBeInTheDocument();
  });
});
