import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders logo', () => {
    render(<Header />);
    const logo = screen.getByAltText(/spacex/i);
    expect(logo).toHaveAttribute('src', 'spacex_logo.png');
});
