import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('should render App component with VideoPlayer', () => {
    render(<App />);
    const videoElement = document.querySelector('video'); // Используем querySelector
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute('src', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'); // Проверяем атрибут src
  });
});