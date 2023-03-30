import { useEffect, useState } from 'react';
import Router from 'next/router';
import szotar from './api/szotar.js';

export default function Home() {

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    Router.push(`/${szotar[currentIndex].halan}`);
  },[currentIndex]);

  return (
    <></>
  )
}