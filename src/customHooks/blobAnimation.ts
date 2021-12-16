import { useCallback, useRef, useState } from 'react';
import gsap from 'gsap-trial';

import { cardinal, random } from '../utils';

export interface IUseBlob {
  numPoints: number;
  minDuration: number;
  maxDuration: number;
  minRadius: number;
  maxRadius: number;
  centerX: number;
  centerY: number;
}

const defaultBlobOptions = {
  numPoints: 8,
  centerX: 100,
  centerY: 100,
  minRadius: 55,
  maxRadius: 75,
  minDuration: 2,
  maxDuration: 3,
};

/**
 *
 * blob animation utility helper functions
 */

function setBlobAnim(options: IUseBlob) {
  const {
    numPoints = 8,
    minDuration,
    maxDuration,
    minRadius,
    maxRadius,
    centerX,
    centerY,
  } = options;

  const baseCir = Math.PI * 2;
  // used to equally space each point around the circle
  const slice = baseCir / numPoints;
  const startAngle = random(baseCir) || baseCir;

  const points = [...Array(numPoints)].map((_, i) => {
    const angle = startAngle + i * slice;
    const duration = random(minDuration, maxDuration) || minDuration;
    const pt = {
      x: centerX + Math.cos(angle) * minRadius,
      y: centerY + Math.sin(angle) * minRadius,
    };
    gsap.to(pt, duration, {
      x: centerX + Math.cos(angle) * maxRadius,
      y: centerY + Math.sin(angle) * maxRadius,
      repeat: -1,
      yoyo: true,
      ease: 'sine.easeInOut',
    });
    return pt;
  });

  return points;
}

/**
 * useBlob
 * @param points
 * @return {animate}: callback function
 */
export function useBlob(
  pointsRef?: React.MutableRefObject<
    {
      x: number;
      y: number;
    }[]
  >
) {
  const svgPointsRef = useRef(setBlobAnim(defaultBlobOptions));
  const pts = pointsRef || svgPointsRef;
  const animate = useCallback((svgElem) => {
    svgElem.current.setAttribute('d', cardinal(pts.current, true, 1));
  }, []);

  return { animate, ref: 'svgCircle' };
}

export function useBlobAsCircle(
  svgPathElem: React.RefObject<SVGPathElement>,
  numPoints: number,
  radius: number
) {
  const baseCir = Math.PI * 2;
  // used to equally space each point around the circle
  const slice = baseCir / numPoints;
  const startAngle = random(baseCir) || baseCir;
  const points = [...Array(numPoints)].map((_, i) => {
    const angle = startAngle + i * slice;
    return {
      x: 100 + Math.cos(angle) * radius,
      y: 100 + Math.sin(angle) * radius,
    };
  });
  const pointsRef = useRef(points);
  const { animate } = useBlob(pointsRef);

  return animate;
}
