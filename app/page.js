'use client';

import Home from './components/Home';
import SmoothScroll from './components/SmoothScroll';

export default function HomePage() {
  return (
    <SmoothScroll>
      <Home />
      {/* 
        IMPORTANT: Make sure your Home component doesn't contain a <footer> tag
        The global Footer is already in the layout, so any footer here would duplicate
      */}
    </SmoothScroll>
  );
}