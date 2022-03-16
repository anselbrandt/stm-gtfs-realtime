import "@fontsource/libre-baskerville";
import { HomeIcon } from "@primer/octicons-react";
import {
  Box,
  StyledOcticon,
  Text,
  ThemeProvider,
  useTheme,
} from "@primer/react";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import ColorModeSwitcher from "../components/ColorModeSwitcher";
import { NextPrimerLink } from "../components/NextPrimerLink";
import { useGetOrientation } from "../utils/useGetOrientation";

declare type ColorMode = "day" | "night";
declare type ColorModeWithAuto = ColorMode | "auto";

const Custom404 = () => {
  const { orientation, height } = useGetOrientation();
  const { setDayScheme, setNightScheme, resolvedColorMode } = useTheme();
  const [colorMode, setColorMode] = useState<ColorModeWithAuto>(
    resolvedColorMode || "day"
  );

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

  return (
    <ThemeProvider colorMode={colorMode}>
      <ColorModeSwitcher />
      <Box
        height="100vh"
        width="100vw"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bg="canvas.default"
        color="fg.default"
        fontFamily="Libre Baskerville"
      >
        <Box fontSize={height && height < 800 ? 50 : [40, 60, 80, 100]}>
          <Text>Oops.</Text>
        </Box>
        <Box
          mt={75}
          sx={{
            "&:hover": {
              color: "accent.fg",
              cursor: "pointer",
            },
          }}
        >
          <NextPrimerLink href="/">
            <StyledOcticon
              icon={HomeIcon}
              size={25}
              color="fg.default"
              sx={{
                "&:hover": {
                  color: "accent.fg",
                },
              }}
            />
          </NextPrimerLink>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Custom404;
