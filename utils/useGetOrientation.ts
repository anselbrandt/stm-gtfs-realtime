import { useEffect, useState } from "react";

export const useGetOrientation = () => {
  const [orientation, setOrientation] = useState<any>();
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrientation(
        window.innerWidth > window.innerHeight ? "landscape" : "portrait"
      );
      setHeight(window.innerHeight);
    }
  }, []);
  useEffect(() => {
    const handleOrientationChange = (event: any) => {
      setHeight(window.innerHeight);
      if (event.matches) {
        setOrientation("portrait");
      } else {
        setOrientation("landscape");
      }
    };
    if (typeof window !== undefined) {
      const mediaQueryList = window.matchMedia("(orientation: portrait)");
      mediaQueryList.addEventListener("change", handleOrientationChange);
    }
    return () => {
      const mediaQueryList = window.matchMedia("(orientation: portrait)");
      mediaQueryList.removeEventListener("change", handleOrientationChange);
    };
  });

  return { orientation, height };
};
