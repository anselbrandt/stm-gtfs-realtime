import { Box, Checkbox, FormControl, Text } from "@primer/react";
import { NextPage } from "next";
import Image from "next/image";
import { Resizable } from "re-resizable";
import { useEffect, useState } from "react";
import { NextPrimerLink } from "../components/NextPrimerLink";
import routeNames from "../sampledata/routeNames.json";
import { VisibleLayers } from "../types";
import { GTFS } from "../utils/transit";

interface Props {
  handleSetVisibleLayers: (event: any) => void;
  visibleLayers: VisibleLayers;
  data: GTFS | undefined;
}

const filterPanel: NextPage<Props> = ({
  children,
  handleSetVisibleLayers,
  visibleLayers,
  data,
}) => {
  const [stats, setStats] = useState<any>();

  useEffect(() => {
    if (data) {
      const speeds = data.entity
        .map((entity) => entity.vehicle.position.speed)
        .filter((speed) => speed > 0);
      const count = speeds.length;
      const sum = speeds.reduce((a, b) => a + b);
      const max = Math.max(...speeds);
      const avg = (sum / count) * 3.6;

      const occStatus = () => {
        const statuses = data.entity.map(
          (entity) => entity.vehicle.occupancyStatus
        );
        const occurences = statuses.reduce(function (acc: any, curr: any) {
          return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
        }, {});
        return occurences;
      };
      const routes = () => {
        const routes = new Set();
        data.entity.forEach((entity) =>
          routes.add(entity.vehicle.trip.routeId)
        );
        return Array.from(routes);
      };

      setStats({
        avgSpeed: avg,
        maxSpeed: max,
        occStatus: occStatus(),
        routes: routes(),
      });
    }
  }, [data]);

  return (
    <Box display="flex" alignItems="flex-end">
      {children}
      <Resizable
        boundsByDirection
        defaultSize={{
          width: 500,
          height: "100vh",
        }}
      >
        <Box
          height="100%"
          width="100%"
          bg="canvas.subtle"
          borderWidth={1}
          borderStyle="solid"
          borderColor="border.default"
        >
          <Box m={4}>
            <NextPrimerLink
              href="https://www.stm.info/en"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Image src="/assets/stmlogo.png" width="104px" height="48px" />
            </NextPrimerLink>
          </Box>
          <Box m={4}>
            <Text>Montreal Realtime Transit Information</Text>
          </Box>
          <Box display="flex">
            <Box m={4}>
              <Box mb={2}>Transit</Box>
              <Box>
                <form>
                  <FormControl>
                    <Checkbox
                      value="vehicles"
                      defaultChecked={visibleLayers.vehicles}
                      onChange={handleSetVisibleLayers}
                    />
                    <FormControl.Label>Vehicles</FormControl.Label>
                  </FormControl>
                  <FormControl>
                    <Checkbox
                      value="paths"
                      defaultChecked={visibleLayers.paths}
                      onChange={handleSetVisibleLayers}
                    />
                    <FormControl.Label>Paths</FormControl.Label>
                  </FormControl>
                  <FormControl>
                    <Checkbox
                      value="metro"
                      defaultChecked={visibleLayers.metro}
                      onChange={handleSetVisibleLayers}
                    />
                    <FormControl.Label>Metro Routes</FormControl.Label>
                  </FormControl>
                  <FormControl>
                    <Checkbox
                      value="bus"
                      defaultChecked={visibleLayers.bus}
                      onChange={handleSetVisibleLayers}
                    />
                    <FormControl.Label>Bus Routes</FormControl.Label>
                  </FormControl>
                  <FormControl>
                    <Checkbox
                      value="stops"
                      defaultChecked={visibleLayers.stops}
                      onChange={handleSetVisibleLayers}
                    />
                    <FormControl.Label>Stops</FormControl.Label>
                  </FormControl>
                </form>
              </Box>
            </Box>
            <Box m={4}>
              <Box mb={2}>Bike Paths</Box>
              <Box>
                <form>
                  <FormControl>
                    <Checkbox
                      value="separated"
                      defaultChecked={visibleLayers.separated}
                      onChange={handleSetVisibleLayers}
                    />
                    <FormControl.Label>Separated</FormControl.Label>
                  </FormControl>
                  <FormControl>
                    <Checkbox
                      value="shared"
                      defaultChecked={visibleLayers.shared}
                      onChange={handleSetVisibleLayers}
                    />
                    <FormControl.Label>Shared</FormControl.Label>
                  </FormControl>
                  <FormControl>
                    <Checkbox
                      value="multiUse"
                      defaultChecked={visibleLayers.multiUse}
                      onChange={handleSetVisibleLayers}
                    />
                    <FormControl.Label>Multi-Use</FormControl.Label>
                  </FormControl>
                </form>
              </Box>
            </Box>
          </Box>

          <Box
            m={4}
            p={2}
            overflow="scroll"
            height="200px"
            borderColor="border.default"
            borderWidth={1}
            borderStyle="solid"
            borderRadius={2}
            bg="canvas.default"
          >
            {stats &&
              routeNames.data
                .filter(
                  (route) =>
                    stats.routes.includes(route.route_id.toString()) ||
                    [1, 2, 4, 5].includes(route.route_id)
                )
                .map((route, index) => {
                  if (index === routeNames.data.length - 1) {
                    return (
                      <Box
                        key={index}
                        mb={10}
                      >{`${route.route_id} ${route.route_long_name},`}</Box>
                    );
                  } else {
                    return (
                      <Box
                        key={index}
                      >{`${route.route_id} ${route.route_long_name},`}</Box>
                    );
                  }
                })}
          </Box>
          <Box
            m={4}
            p={2}
            borderColor="border.default"
            borderWidth={1}
            borderStyle="solid"
            borderRadius={2}
            bg="canvas.default"
          >
            {stats && `Average speed: ${stats.avgSpeed.toFixed(2)} km/h`}
          </Box>
          <Box
            m={4}
            p={2}
            borderColor="border.default"
            borderWidth={1}
            borderStyle="solid"
            borderRadius={2}
            bg="canvas.default"
          >
            {stats && `Max speed: ${stats.maxSpeed.toFixed(2)} km/h`}
          </Box>
          <Box
            m={4}
            p={2}
            borderColor="border.default"
            borderWidth={1}
            borderStyle="solid"
            borderRadius={2}
            bg="canvas.default"
          >
            <pre>{stats && JSON.stringify(stats.occStatus, null, 2)}</pre>
          </Box>
        </Box>
      </Resizable>
    </Box>
  );
};

export default filterPanel;
