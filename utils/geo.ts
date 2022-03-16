import { Feature, FeatureCollection, GeometryCollection } from "geojson";

export const polygonFilter = (
  data: FeatureCollection | Feature | GeometryCollection
) => {
  if (data.type === "FeatureCollection") {
    return {
      ...data,
      features: data.features.filter(
        (feature) =>
          feature.geometry.type === "MultiPolygon" ||
          feature.geometry.type === "Polygon"
      ),
    };
  }
  if (data.type === "Feature") {
    if (
      data.geometry.type === "MultiPolygon" ||
      data.geometry.type === "Polygon"
    ) {
      return data;
    }
  }
  if (data.type === "GeometryCollection") {
    return {
      ...data,
      geometries: data.geometries.filter(
        (geometry) =>
          geometry.type === "MultiPolygon" || geometry.type === "Polygon"
      ),
    };
  }
};

export const pointFilter = (
  data: FeatureCollection | Feature | GeometryCollection
) => {
  if (data.type === "FeatureCollection") {
    return {
      ...data,
      features: data.features.filter(
        (feature) =>
          feature.geometry.type === "MultiPoint" ||
          feature.geometry.type === "Point"
      ),
    };
  }
  if (data.type === "Feature") {
    if (data.geometry.type === "MultiPoint" || data.geometry.type === "Point") {
      return data;
    }
  }
  if (data.type === "GeometryCollection") {
    return {
      ...data,
      geometries: data.geometries.filter(
        (geometry) =>
          geometry.type === "MultiPoint" || geometry.type === "Point"
      ),
    };
  }
};

export const lineFilter = (
  data: FeatureCollection | Feature | GeometryCollection
) => {
  if (data.type === "FeatureCollection") {
    return {
      ...data,
      features: data.features.filter(
        (feature) =>
          feature.geometry.type === "MultiLineString" ||
          feature.geometry.type === "LineString"
      ),
    };
  }
  if (data.type === "Feature") {
    if (
      data.geometry.type === "MultiLineString" ||
      data.geometry.type === "LineString"
    ) {
      return data;
    }
  }
  if (data.type === "GeometryCollection") {
    return {
      ...data,
      geometries: data.geometries.filter(
        (geometry) =>
          geometry.type === "MultiLineString" || geometry.type === "LineString"
      ),
    };
  }
};
