import { useMemo } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  splitBy?: 'word' | 'char';
}

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  tag: Tag = 'span',
  splitBy = 'word',
}: AnimatedTextProps) {
  const items = useMemo(() => {
    return splitBy === 'word' ? text.split(' ') : text.split('');
  }, [text, splitBy]);

  return (
    <Tag className={className} aria-label={text}>
      {items.map((item, i) => (
        <span
          key={i}
          className="inline-block animate-text-reveal"
          style={{ animationDelay: `${delay + i * (splitBy === 'word' ? 0.08 : 0.03)}s` }}
        >
          {item}
          {splitBy === 'word' && i < items.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
}
