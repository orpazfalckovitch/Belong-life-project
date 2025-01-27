import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi, describe, expect } from "vitest";
import { of } from "rxjs";
import CountriesList from "../src/components/CountriesList/CountriesList";
import { getCountriesData } from "../src/services/CountriesService";
import "@testing-library/jest-dom";

const mockCountriesData = [
  { id: "IL", name: "Israel", flag: "src/assets/flags/israel.svg" },
  { id: "HU", name: "Hungary", flag: "src/assets/flags/hungary.svg" },
];
const mockSearchInput = "Israel";
const mockError = new Error("Failed to fetch data from the server");

vi.mock("../src/services/CountriesService", () => ({
  getCountriesData: vi.fn(),
}));

describe("CountriesList", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should render 'There is no country' text", async () => {
    (getCountriesData as jest.Mock).mockReturnValue(of());

    render(<CountriesList />);

    await waitFor(() => {
      expect(screen.getByText("There is no country")).toBeInTheDocument();
    });
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

  it("should filter countries list", async () => {
    (getCountriesData as jest.Mock).mockReturnValue(of(mockCountriesData));

    render(<CountriesList />);
    const searchInput = screen.getByPlaceholderText("Search country");
    fireEvent.change(searchInput, { target: { value: mockSearchInput } });

    await waitFor(() => {
      expect(screen.getByText("Israel")).toBeInTheDocument();
    });
  });
});
