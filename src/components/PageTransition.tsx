import { useEffect, useState, ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  pageKey: string;
}

export default function PageTransition({ children, pageKey }: PageTransitionProps) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isExiting, setIsExiting] = useState(false);
  const [currentKey, setCurrentKey] = useState(pageKey);

  useEffect(() => {
    if (pageKey !== currentKey) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setCurrentKey(pageKey);
        setIsExiting(false);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [pageKey, currentKey, children]);

  return (
    <div className={isExiting ? 'animate-page-exit' : 'animate-page-enter'}>
      {displayChildren}
    </div>
  );
}
