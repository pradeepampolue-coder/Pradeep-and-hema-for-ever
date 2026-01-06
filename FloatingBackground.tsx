
import React, { useMemo } from 'react';
import { FloatingItem } from '../types';
import { HeartIcon, StarIcon, PetalIcon } from '../constants';

const FloatingBackground: React.FC = () => {
  const items = useMemo(() => {
    const arr: FloatingItem[] = [];
    for (let i = 0; i < 30; i++) {
      const type = i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'star' : 'petal';
      arr.push({
        id: i,
        type,
        left: `${Math.random() * 100}%`,
        duration: `${10 + Math.random() * 20}s`,
        size: `${15 + Math.random() * 25}px`,
        delay: `${Math.random() * 10}s`,
        color: type === 'heart' ? '#ff4d6d' : type === 'star' ? '#ffd700' : '#ffb3c1',
      });
    }
    return arr;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => (
        <div
          key={item.id}
          className="floating-element"
          style={{
            left: item.left,
            width: item.size,
            height: item.size,
            color: item.color,
            '--duration': item.duration,
            animationDelay: item.delay,
          } as React.CSSProperties}
        >
          {item.type === 'heart' && <HeartIcon className="w-full h-full opacity-60" />}
          {item.type === 'star' && <StarIcon className="w-full h-full opacity-40" />}
          {item.type === 'petal' && <PetalIcon className="w-full h-full opacity-50" />}
        </div>
      ))}
    </div>
  );
};

export default FloatingBackground;
