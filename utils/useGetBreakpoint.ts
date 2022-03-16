import { useEffect, useState } from "react";

export const useGetBreakpoint = () => {
  const breakpoints = [544, 768, 1012, 1280];
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    if (typeof window !== undefined) {
      setWidth(window.innerWidth);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== undefined) {
      breakpoints.forEach((breakpoint) => {
        const mediaQuery = `(max-width: ${breakpoint}px)`;
        const mediaQueryList = window.matchMedia(mediaQuery);
        mediaQueryList.addEventListener("change", (event: any) => {
          if (event.matches) {
            setWidth(breakpoint - 1);
          } else {
            setWidth(breakpoint + 1);
          }
        });
      });
    }
    return () => {
      breakpoints.forEach((breakpoint) => {
        const mediaQuery = `(max-width: ${breakpoint}px)`;
        const mediaQueryList = window.matchMedia(mediaQuery);
        mediaQueryList.removeEventListener("change", (event: any) => {
          if (event.matches) {
            setWidth(breakpoint - 1);
          } else {
            setWidth(breakpoint + 1);
          }
        });
      });
    };
  });
  const breakpoint = (() => {
    {
      switch (breakpoints.find((breakpoint) => width! < breakpoint)) {
        case breakpoints[0]:
          return 0;
        case breakpoints[1]:
          return 1;
        case breakpoints[2]:
          return 2;
        case breakpoints[3]:
          return 3;
        default:
          return 3;
      }
    }
  })();
  return { width, breakpoint };
};
