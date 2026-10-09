import { useEffect, useRef } from 'react';
import { reduced } from '../utils/motion';

const FOLLOW = 0.035;
const MAX_SPEED = 2.1;
const EDGE_PAD = 6;
const MARGIN_X = 12;
const MARGIN_Y = 10;
const IDLE_SLEEP_MS = 2000;
const ARRIVE_DIST = 11;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function CursorGhost() {
  const ghostRef = useRef(null);

  useEffect(() => {
    const el = ghostRef.current;
    if (!el) return;
    if (reduced || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const bounds = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      return {
        minX: EDGE_PAD,
        minY: EDGE_PAD,
        maxX: Math.max(EDGE_PAD, window.innerWidth - w - MARGIN_X - EDGE_PAD),
        maxY: Math.max(EDGE_PAD, window.innerHeight - h - MARGIN_Y - EDGE_PAD),
      };
    };

    const clampPoint = (px, py) => {
      const b = bounds();
      return {
        x: clamp(px, b.minX, b.maxX),
        y: clamp(py, b.minY, b.maxY),
      };
    };

    let start = clampPoint(window.innerWidth * 0.5, window.innerHeight * 0.5);
    let targetX = start.x;
    let targetY = start.y;
    let x = targetX;
    let y = targetY;
    let facing = 1;
    let sleeping = false;
    let arriveIdleSince = null;
    let raf = 0;

    const onMove = (e) => {
      sleeping = false;
      arriveIdleSince = null;
      const p = clampPoint(e.clientX, e.clientY);
      targetX = p.x;
      targetY = p.y;
    };

    const onResize = () => {
      const p = clampPoint(x, y);
      x = p.x;
      y = p.y;
      const t = clampPoint(targetX, targetY);
      targetX = t.x;
      targetY = t.y;
    };

    const tick = () => {
      let dist = 0;
      if (!sleeping) {
        let dx = (targetX - x) * FOLLOW;
        let dy = (targetY - y) * FOLLOW;
        dist = Math.hypot(dx, dy);
        if (dist > MAX_SPEED) {
          dx = (dx / dist) * MAX_SPEED;
          dy = (dy / dist) * MAX_SPEED;
        }
        x += dx;
        y += dy;
        const p = clampPoint(x, y);
        x = p.x;
        y = p.y;
        if (Math.abs(targetX - x) > 2) facing = targetX >= x ? 1 : -1;

        const distToTarget = Math.hypot(targetX - x, targetY - y);
        if (distToTarget >= ARRIVE_DIST) {
          arriveIdleSince = null;
        } else if (arriveIdleSince === null) {
          arriveIdleSince = Date.now();
        } else if (Date.now() - arriveIdleSince >= IDLE_SLEEP_MS) {
          sleeping = true;
        }
      }

      el.classList.toggle('is-sleeping', sleeping);
      el.classList.toggle('is-running', !sleeping && dist > 0.35);
      el.classList.toggle('is-facing-left', facing < 0);
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      el.style.setProperty('--ghost-dir', String(facing));
      raf = requestAnimationFrame(tick);
    };

    el.hidden = false;
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="cursor-ghost" ref={ghostRef} hidden aria-hidden="true">
      <span className="cursor-ghost-zzz">
        <span className="cursor-ghost-z">z</span>
        <span className="cursor-ghost-z">z</span>
        <span className="cursor-ghost-z">z</span>
      </span>
      <svg viewBox="0 0 32 36" fill="currentColor">
        <g className="cursor-ghost-body">
          <path d="M16 3c7.2 0 13 5.6 13 13.2V26c0 0-2.4-2.4-4.3-2.4S21.4 26 19.4 26 16 23.6 16 23.6 13.6 26 11.6 26s-3.4-2.4-5.3-2.4S2 26 2 26V16.2C2 8.6 8.8 3 16 3Z" />
          <ellipse
            className="cursor-ghost-eye"
            cx="11.2"
            cy="15.2"
            rx="2.3"
            ry="2.8"
          />
          <ellipse
            className="cursor-ghost-eye"
            cx="20.8"
            cy="15.2"
            rx="2.3"
            ry="2.8"
          />
          <circle className="cursor-ghost-pupil" cx="12" cy="15.8" r="1" />
          <circle className="cursor-ghost-pupil" cx="21.6" cy="15.8" r="1" />
          <g className="cursor-ghost-sleep-eyes">
            <path d="M8.8 15.6h5" />
            <path d="M18.2 15.6h5" />
          </g>
          <g className="cursor-ghost-legs">
            <ellipse
              className="cursor-ghost-leg"
              cx="8"
              cy="30.4"
              rx="2.1"
              ry="2.6"
            />
            <ellipse
              className="cursor-ghost-leg"
              cx="13.4"
              cy="30.4"
              rx="2.1"
              ry="2.6"
            />
            <ellipse
              className="cursor-ghost-leg"
              cx="18.6"
              cy="30.4"
              rx="2.1"
              ry="2.6"
            />
            <ellipse
              className="cursor-ghost-leg"
              cx="24"
              cy="30.4"
              rx="2.1"
              ry="2.6"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
