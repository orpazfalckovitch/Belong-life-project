import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, expect } from "vitest";
import { of } from "rxjs";
import CountriesList from "../src/components/CountriesList/CountriesList";
import { getCountriesData } from "../src/services/CountriesService";
import "@testing-library/jest-dom";

const mockCountriesData = [
  { id: "IL", name: "Israel", flag: "src/assets/flags/israel.svg" },
];
const mockError = new Error("Failed to fetch data from the server");

vi.mock("../src/services/CountriesService", () => ({
  getCountriesData: vi.fn(),
}));

describe("CountriesList", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should render loading text", async () => {
    (getCountriesData as jest.Mock).mockReturnValue(of([]));
    render(<CountriesList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should handle API error", async () => {
    (getCountriesData as jest.Mock).mockRejectedValue(mockError);

    try {
      await getCountriesData();
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });

  it("should render countries list", async () => {
    (getCountriesData as jest.Mock).mockReturnValue(of(mockCountriesData));

    render(<CountriesList />);

    await waitFor(() => {
      expect(screen.getByText("Israel")).toBeInTheDocument();
    });
  });
});
