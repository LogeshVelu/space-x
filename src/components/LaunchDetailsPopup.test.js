import React from 'react';
import { render, screen } from '@testing-library/react';
import LaunchDetailsPopup from './LaunchDetailsPopup';
import '@testing-library/jest-dom';

const Launch = {
  mission_name: "FalconSat",
  flight_number: 1,
  details: "Engine failure at 33 seconds and loss of vehicle",
  rocket: {
    rocket_name: "Falcon 1",
    rocket_type: "Merlin A",
    second_stage: {
      payloads: [{
        manufacturer: "DARPA",
        nationality: "United States",
        payload_type: "Satellite",
        orbit: "LEO"
      }]
    }
  },
  launch_site: {
    site_name: "Kwajalein Atoll"
  },
  launch_date_utc: "2006-03-24T22:30:00.000Z",
  links: {
    mission_patch: "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png",
    article_link: "https://en.wikipedia.org/wiki/DemoSat"
  }
};



describe('LaunchDetailsPopup Component', () => {
  it('renders Launch Details', () => {
    render(<LaunchDetailsPopup show={true} launch={Launch} onClose={jest.fn()} />);


    expect(screen.getByText('Flight Number')).toBeInTheDocument();
    expect(screen.getByText('Mission Name')).toBeInTheDocument();
    expect(screen.getByText('Rocket Type')).toBeInTheDocument();
    expect(screen.getByText('Rocket Name')).toBeInTheDocument();
    expect(screen.getByText('Manufacturer')).toBeInTheDocument();
    expect(screen.getByText('Nationality')).toBeInTheDocument();
    expect(screen.getByText('Launch Date')).toBeInTheDocument();
    expect(screen.getByText('Payload Type')).toBeInTheDocument();
    expect(screen.getByText('Orbit')).toBeInTheDocument();
    expect(screen.getByText('Launch Site')).toBeInTheDocument();


    const link = screen.getByRole('link', { name: /Wikipedia/i });
    expect(link).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/DemoSat');
  });
});
