import { useRef, useLayoutEffect, useEffect, useCallback } from 'react';
import gsap from 'gsap-trial';

import { StyledCursor } from './customCursor.style';
import { useBlobAsCircle } from '../../customHooks/blobAnimation';
import { useSquishyEffect } from '../../customHooks/squishyAnimation';

const CustomCursor = ({
  config,
  icon: Icon,
  hoverIcon: HoverIcon,
  isSquishy = false,
  cursorSize = 80,
}) => {
  // set default svg circle refs
  const el = useRef(null);
  const svgPath = useRef(null);
  // if custom icon is used, set custom icon ref
  const iconElem = useRef(null);

  // set default svg circle path
  const setCircle = useBlobAsCircle(svgPath, 8, cursorSize);

  // initialize cursor animation handling
  // - call AnimateSquishyLoop if isSquishy is true
  const { AnimateSquishyLoop, setFromEvent } = useSquishyEffect(el, cursorSize);

  const { cursorPos, cursorEffect, isSticky } = config;

  // hook up svgPath elem to the cursorEffect
  const { animate, ref } = cursorEffect;

  const animateLoop = useCallback(() => {
    if (ref === 'svgCircle') {
      animate && animate(svgPath);
    } else {
      animate();
    }
  }, [animate, ref]);

  useLayoutEffect(() => {
    // initialize default svg circle path
    setCircle(svgPath);
    // custom cursor following mouse move
    // need to change to pointermove
    window.addEventListener('mousemove', setFromEvent);
    return () => window.removeEventListener('mousemove', setFromEvent);
  }, []);

  useEffect(() => {
    if (isSticky && cursorPos) {
      if (isSticky) {
        const { left, top, width, height } = cursorPos;
        if (left && top && width && height) {
          gsap.to(el.current, {
            x: left + width / 2,
            y: top + height / 2,
            scale: 1 + width / 100 / 2,
            duration: 0.2,
            overwrite: true,
          });
          gsap.ticker.remove(AnimateSquishyLoop);
        }
        if (animate) {
          gsap.ticker.add(animateLoop);
        }
      }
    } else {
      if (animate) {
        gsap.ticker.remove(animateLoop);
        setCircle(svgPath);
      }
      if (isSquishy) {
        // - add squishy animation to gsap ticker if isSquishy is true
        gsap.ticker.add(AnimateSquishyLoop);
      }
    }
  }, [config]);

  return (
    <StyledCursor ref={el}>
      {Icon ? (
        <Icon ref={iconElem} />
      ) : (
        <svg id="cursor" viewBox="0 0 200 200">
          <path id="blob" ref={svgPath} d=""></path>
        </svg>
      )}
    </StyledCursor>
  );
};

export default CustomCursor;
