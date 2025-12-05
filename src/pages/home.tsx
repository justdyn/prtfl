import React from 'react';
import AppLayout from '../layouts/app-layout';
import Hero from '../components/hero';
import About from '../components/about';
import Story from '../components/story';
import Experience from '../components/exp';
import Works from '../components/works';

const Home: React.FC = () => {
  return (
    <AppLayout>
      <Hero />
      <About />
      <Story />
      <Experience />
      <Works />
    </AppLayout>
  );
};

export default Home;

