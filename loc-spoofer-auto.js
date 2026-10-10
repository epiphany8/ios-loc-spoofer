// Modified iOS Location Spoofer: Auto random point in custom rectangle
// Lat: 31.148717 ~ 31.149531
// Lng: 121.554454 ~ 121.555750
function getRandomLocation() {
  const minLat = 31.148717;
  const maxLat = 31.149531;
  const minLng = 121.554454;
  const maxLng = 121.555750;
  const lat = minLat + Math.random() * (maxLat - minLat);
  const lng = minLng + Math.random() * (maxLng - minLng);
  return {
    latitude: lat,
    longitude: lng
  };
}

function parseArgument(argStr) {
  const params = new URLSearchParams(argStr);
  return Object.fromEntries(params.entries());
}

function main(context) {
  const args = parseArgument(context.$argument || "");
  const loc = getRandomLocation();
  const latitude = loc.latitude;
  const longitude = loc.longitude;
  const horizontalAccuracy = Number(args.horizontalAccuracy ?? 39);
  const verticalAccuracy = Number(args.verticalAccuracy ?? 1000);
  const altitude = Number(args.altitude ?? 530);
  const debug = args.debug === "true";

  if (debug) {
    console.log(`[LocSpoofer] New random point: lat=${latitude}, lng=${longitude}`);
  }

  // Original binary response body construct from upstream script
  const buffer = new ArrayBuffer(32);
  const view = new DataView(buffer);
  view.setFloat64(0, latitude, false);
  view.setFloat64(8, longitude, false);
  view.setFloat64(16, horizontalAccuracy, false);
  view.setFloat64(24, altitude, false);

  const $response = {
    status: 200,
    headers: { "Content-Type": "application/octet-stream" },
    body: buffer
  };
  return $response;
}
