export const haversine_distance = (
  coordinate1: { lat: number; lng: number },
  coordinate2: {
    lat: number;
    lng: number;
  }
) => {
  var R = 6371.071; // Radius of the Earth in km
  var rlat1 = coordinate1.lat * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = coordinate2.lat * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (coordinate2.lng - coordinate1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d;
};
