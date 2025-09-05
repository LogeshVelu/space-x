import React from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import Launches from "./Launches";
import { useFetchLaunchesData } from "../hooks/useFetchLaunchesData";


jest.mock('../hooks/useFetchLaunchesData', () => ({
  useFetchLaunchesData: jest.fn(() => Promise.resolve({ data: [], headers: { 'spacex-api-count': 1 } }))
}));

jest.mock('./Dropdown', () => () => <div data-testid="dropdown">Dropdown</div>);
jest.mock('./LaunchDetailsPopup', () => () => <div data-testid="popup">Popup</div>);
jest.mock('./DatePicker', () => () => <div data-testid="datepicker">DatePicker</div>);


const renderWithAllProvider = (comp) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {comp}
    </QueryClientProvider>
  );
};

describe("Launches component", () => {
  test("renders Table Headers", () => {
    renderWithAllProvider(<Launches />);

    expect(screen.getByTestId('timepicker')).toBeInTheDocument();


    expect(screen.getByText('No:')).toBeInTheDocument();
    expect(screen.getByText('Launched (UTC)')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Mission')).toBeInTheDocument();
    expect(screen.getByText('Orbit')).toBeInTheDocument();
    expect(screen.getByText('Launch Status')).toBeInTheDocument();
    expect(screen.getByText('Rocket')).toBeInTheDocument()
  });
});