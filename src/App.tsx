import React from 'react';
import { motion } from 'framer-motion';

const HeroBanner = () => {
  return (
    <motion.div
      className='hero-banner'
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
    >
      <motion.div
        className='hexagon'
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
      ></motion.div>
    </motion.div>
  );
};

const App = () => {
  return (
    <div className='App'>
      <HeroBanner />
    </div>
  );
};

export default App;
