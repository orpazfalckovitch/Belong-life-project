import React, { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  IDBFactory,
  IDBKeyRange,
  IDBDatabase,
  IDBTransaction,
  IDBObjectStore,
  IDBIndex,
  IDBCursor,
  IDBOpenDBRequest,
  IDBRequest,
} from "fake-indexeddb";
import { MemoryRouter } from "react-router-dom";

import {
  setCountryToIndexedDB,
  getCountriesFromIndexedDB,
} from "../src/services/CountriesService";
import "@testing-library/jest-dom";

beforeEach(() => {
  global.indexedDB = new IDBFactory();
  global.IDBKeyRange = IDBKeyRange;
  global.IDBDatabase = IDBDatabase;
  global.IDBTransaction = IDBTransaction;
  global.IDBObjectStore = IDBObjectStore;
  global.IDBIndex = IDBIndex;
  global.IDBCursor = IDBCursor;
  global.IDBOpenDBRequest = IDBOpenDBRequest;
  global.IDBRequest = IDBRequest;
});

const mockCountry = {
  id: "IL",
  name: "Israel",
  flag: "src/assets/flags/israel.svg",
};

describe("IndexedDB Utility Functions", () => {
  it("should save country to indexedDB", async () => {
    await setCountryToIndexedDB(mockCountry);
    const countries = await getCountriesFromIndexedDB([mockCountry]);
    expect(countries).toEqual([mockCountry]);
  });
});
