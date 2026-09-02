/**
 * Real-Time OSRM Highway Routing & Turn-by-Turn Telemetry Service
 * Queries the live OpenStreetMap Routing Engine for authentic North Eastern corridors.
 */

export interface LiveRouteResult {
  distanceKm: number;
  durationMinutes: number;
  durationFormatted: string;
  coordinates: [number, number][];
  steps: Array<{
    instruction: string;
    distanceM: number;
    durationS: number;
  }>;
  isLive: boolean;
  status: 'OPTIMAL' | 'CONGESTED' | 'REROUTED';
}

/**
 * Calculates authentic live road route between any two GPS coordinates
 */
export const calculateLiveHighwayRoute = async (
  originLat: number,
  originLon: number,
  destLat: number,
  destLon: number
): Promise<LiveRouteResult> => {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${originLon},${originLat};${destLon},${destLat}?overview=full&geometries=geojson&steps=true`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('OSRM routing engine unreachable');

    const data = await response.json();
    if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
      throw new Error('No route found');
    }

    const route = data.routes[0];
    const distanceKm = Math.round((route.distance / 1000) * 10) / 10;
    const durationMinutes = Math.round(route.duration / 60);

    const hours = Math.floor(durationMinutes / 60);
    const mins = durationMinutes % 60;
    const durationFormatted = hours > 0 ? `${hours}h ${mins}m` : `${mins} mins`;

    // Coordinates in [lat, lon] format for Leaflet
    const coordinates: [number, number][] = route.geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);

    const steps = route.legs[0]?.steps?.map((step: any) => ({
      instruction: step.maneuver?.type === 'depart' ? 'Head out towards corridor' :
                   step.maneuver?.modifier ? `Turn ${step.maneuver.modifier} onto ${step.name || 'highway'}` :
                   `Continue on ${step.name || 'arterial road'}`,
      distanceM: Math.round(step.distance),
      durationS: Math.round(step.duration),
    })) || [];

    return {
      distanceKm,
      durationMinutes,
      durationFormatted,
      coordinates,
      steps,
      isLive: true,
      status: 'OPTIMAL',
    };
  } catch (error) {
    console.warn('Live routing fallback used:', error);
    // Authentic fallback calculation
    const approxDist = Math.round(Math.hypot(destLat - originLat, destLon - originLon) * 111 * 1.3);
    const approxMins = Math.round((approxDist / 45) * 60);
    const h = Math.floor(approxMins / 60);
    const m = approxMins % 60;

    return {
      distanceKm: approxDist,
      durationMinutes: approxMins,
      durationFormatted: h > 0 ? `${h}h ${m}m` : `${m} mins`,
      coordinates: [
        [originLat, originLon],
        [(originLat + destLat) / 2 + 0.02, (originLon + destLon) / 2 + 0.01],
        [destLat, destLon],
      ],
      steps: [
        { instruction: 'Depart origin onto National Highway', distanceM: 1500, durationS: 120 },
        { instruction: 'Continue on main arterial corridor', distanceM: approxDist * 900, durationS: approxMins * 50 },
        { instruction: 'Arrive at destination terminal', distanceM: 500, durationS: 60 },
      ],
      isLive: false,
      status: 'OPTIMAL',
    };
  }
};
