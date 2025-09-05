import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Header from "./Header";
import spacexLogo from "../assets/images/spacex_logo.png";

describe("Header component", () => {
  test("renders the SpaceX logo", () => {
    render(<Header />);
    const logo = screen.getByAltText("SpaceX...");
    expect(logo).toBeInTheDocument();
    expect(logo.src).toContain(spacexLogo);
  });
});
