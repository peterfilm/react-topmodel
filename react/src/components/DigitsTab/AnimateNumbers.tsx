import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimateNumbersProps {
  children: number
  duration?: number;
}

const AnimateNumbers: React.FC<AnimateNumbersProps> = ({ children, duration = 5000 }) => {
  const numberRef = useRef<HTMLSpanElement>(null);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  });

  useEffect(() => {
    if (!inView || animationPlayed || !numberRef.current) return;

    const start = performance.now();
    const end = start + duration;
    const finalValue = parseInt(children.toString(), 10);

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - start;
      const progress = elapsedTime / duration;
      const currentValue = Math.floor(finalValue * progress);

      if (numberRef.current) {
        numberRef.current.textContent = currentValue.toFixed(0);
      }

      if (currentTime < end) {
        requestAnimationFrame(animate);
      } else {
        if (numberRef.current) {
          numberRef.current.textContent = finalValue.toString();
        }
      }
    };

    requestAnimationFrame(animate);

    // Set animationPlayed to true once animation is complete
    setTimeout(() => {
      setAnimationPlayed(true);
    }, duration);

    // Clean up
    return () => {
      if (numberRef.current) {
        numberRef.current.textContent = finalValue.toString();
      }
    };
  }, [children, duration, inView, animationPlayed]);

  return (
    <span ref={ref}>
      <span ref={numberRef}>{children}</span>
    </span>
  );
};

export default AnimateNumbers