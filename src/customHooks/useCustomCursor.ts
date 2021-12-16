import { useState, useCallback } from 'react';

interface IPos {
  left: number;
  top: number;
  width: number;
  height: number;
}

const defaultPos = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
};

export function useCustomCursor() {
  const [cursorPos, setPos] = useState<IPos | null>(() => defaultPos);
  const [cursorEffect, setCursorEffect] = useState({});
  const [isSticky, setIsSticky] = useState(false);

  const startEffect = useCallback((pos, effect, isSticky) => {
    setPos(() => pos);
    effect && setCursorEffect(() => effect);
    isSticky && setIsSticky(true);
  }, []);

  const endEffect = useCallback(() => {
    setPos(null);
    setIsSticky(false);
  }, []);

  return { cursorPos, cursorEffect, isSticky, startEffect, endEffect };
}
