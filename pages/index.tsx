import { Box, ThemeProvider } from "@primer/react";
import Cookie from "js-cookie";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import ColorModeSwitcher from "../components/ColorModeSwitcher";
import FilterPanel from "../dashboardComponents/filterPanel";
import LogPanel from "../dashboardComponents/logPanel";
import MapPanel from "../dashboardComponents/mapPanel";
import { VisibleLayers } from "../types";
import { GTFS } from "../utils/transit";
import useIntervalFetch from "../utils/useIntervalFetch";

declare type ColorMode = "day" | "night";
declare type ColorModeWithAuto = ColorMode | "auto";

const url = "/api/gtfs";
const URL = "https://api.stm.info/pub/od/gtfs-rt/ic/v2/vehiclePositions";
const options = {
  method: "GET",
  headers: {
    url: URL,
  },
};

interface Props {
  preferredColorMode: ColorModeWithAuto;
  preferredDayScheme: string;
  preferredNightScheme: string;
}

const Dashboard: NextPage<Props> = ({
  preferredColorMode,
  preferredDayScheme,
  preferredNightScheme,
}) => {
  const [colorMode, setColorMode] = useState<ColorModeWithAuto>(
    preferredColorMode || "day"
  );
  const [dayScheme, setDayScheme] = useState(preferredDayScheme || "light");
  const [nightScheme, setNightScheme] = useState(
    preferredNightScheme || "dark"
  );
  const { data, error } = useIntervalFetch<GTFS>(url, 20000, options);
  const deckRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver>();
  const [mapSize, setMapSize] = useState<any>();
  const [visibleLayers, setVisibleLayers] = useState<VisibleLayers>({
    metro: true,
    bus: false,
    stops: false,
    paths: true,
    vehicles: true,
    shared: false,
    separated: false,
    multiUse: false,
  });

  useEffect(() => {
    if (typeof window !== undefined) {
      const preferredMode = Cookie.get("colorMode");
      if (preferredMode) {
        if (preferredMode === "night") {
          const preferredScheme = Cookie.get("nightScheme") as string;
          setTimeout(() => {
            setColorMode("night");
            setDayScheme(preferredScheme);
            setNightScheme(preferredScheme);
          }, 50);
        }
        if (preferredMode === "day") {
          const preferredScheme = Cookie.get("dayScheme") as string;
          setTimeout(() => {
            setColorMode("day");
            setDayScheme(preferredScheme);
            setNightScheme(preferredScheme);
          }, 50);
        }
      }
    }
  }, []);

  useEffect(() => {
    function handleResize() {
      if (deckRef.current) {
        const width = deckRef.current.clientWidth;
        const height = deckRef.current.clientHeight;
        setMapSize({ width: width, height: height });
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      observer.current = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setMapSize({ width: width, height: height });
      });
    }
  }, []);

  useEffect(() => {
    if (observer.current && deckRef.current) {
      observer.current.observe(deckRef.current);
    }
    return () => {
      if (observer.current && deckRef.current !== null) {
        observer.current.unobserve(deckRef.current);
      }
    };
  }, [deckRef, observer]);

  const handleSetVisibleLayers = (event: any) => {
    const value = event.target.value;
    setVisibleLayers((prev: any) => ({ ...prev, [value]: !prev[value] }));
  };

  return (
    <ThemeProvider
      colorMode={colorMode}
      dayScheme={dayScheme}
      nightScheme={nightScheme}
    >
      <Box
        color="fg.default"
        bg="canvas.default"
        width="100vw"
        height="100vh"
        overflow="hidden"
      >
        <ColorModeSwitcher />
        <FilterPanel
          data={data}
          visibleLayers={visibleLayers}
          handleSetVisibleLayers={handleSetVisibleLayers}
        >
          <LogPanel data={data}>
            <Box
              height="100%"
              width="100%"
              ref={deckRef}
              bg="canvas.default"
              overflow="scroll"
            >
              {mapSize && (
                <MapPanel
                  mapSize={mapSize}
                  data={data}
                  visibleLayers={visibleLayers}
                />
              )}
            </Box>
          </LogPanel>
        </FilterPanel>
      </Box>
    </ThemeProvider>
  );
};

export async function getServerSideProps(context: any) {
  const cookies = context.req.cookies;
  const colorMode = cookies && cookies.colorMode ? cookies.colorMode : "day";
  const dayScheme = cookies && cookies.dayScheme ? cookies.dayScheme : "light";
  const nightScheme =
    cookies && cookies.nightScheme ? cookies.nightScheme : "dark";
  return {
    props: {
      preferredColorMode: colorMode,
      preferredDayScheme: dayScheme,
      preferredNightScheme: nightScheme,
    },
  };
}

export default Dashboard;
