import { Box, Text } from "@primer/react";
import { NextPage } from "next";
import { Resizable } from "re-resizable";
import { useEffect, useRef, useState } from "react";
import { GTFS } from "../utils/transit";

interface Props {
  data: GTFS | undefined;
}

const logPanel: NextPage<Props> = ({ children, data }) => {
  const [logData, setLogData] = useState<any>();
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      const row = `vehicles_in_service@${data.header.timestamp} => ${data.entity.length}`;
      setLogData((prev: any) => (prev ? [...prev, row] : [row]));
    }
  }, [data]);

  useEffect(() => {
    if (logRef.current) {
      const y =
        logRef.current.getBoundingClientRect().top + window.pageYOffset - 10;
      logRef.current.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [data, logRef]);

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      <Box width="100%" height="100%">
        {children}
      </Box>
      <Resizable
        defaultSize={{
          width: "100%",
          height: 300,
        }}
        boundsByDirection
      >
        <Box width="100%" height="100%">
          <Box
            bg="canvas.subtle"
            borderWidth={1}
            borderStyle="solid"
            borderColor="border.default"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box m={4}>
              <Text fontSize={18} fontWeight="bold">
                Realtime Logs
              </Text>
            </Box>
          </Box>
          <Box height="100%" bg="canvas.default" overflow="scroll">
            <Box m={4} mb={10}>
              {logData &&
                logData.map((row: string, index: number) => {
                  if (index === logData.length - 1) {
                    return (
                      <Box key={index} ref={logRef}>
                        {row}
                      </Box>
                    );
                  } else {
                    return <Box key={index}>{row}</Box>;
                  }
                })}
            </Box>
          </Box>
        </Box>
      </Resizable>
    </Box>
  );
};

export default logPanel;
