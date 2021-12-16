import { useState, useEffect, useCallback } from 'react';

interface IPos {
  left: number;
  top: number;
  width: number;
  height: number;
  isSticky?: boolean;
  fillOnHover?: boolean;
  useHoverIcon?: boolean;
}

interface IAction {
  set: (pos: IPos) => void;
  reset: () => void;
}

const defaultSticyPos = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  isSticky: false,
  fillOnHover: false,
  useHoverIcon: false,
};

export function useStickyCursor(): [IPos, IAction] {
  const [stickyPos, setStickyPos] = useState(() => defaultSticyPos);

  const set = useCallback((pos, fillOnHover, useHoverIcon) => {
    const { left, top, width, height } = pos;
    setStickyPos((prev) => ({
      left,
      top,
      width,
      height,
      fillOnHover,
      useHoverIcon,
      isSticky: true,
    }));
  }, []);

  const reset = useCallback(() => {
    setStickyPos((prev) => defaultSticyPos);
  }, []);

  return [stickyPos, { set, reset }];
}
