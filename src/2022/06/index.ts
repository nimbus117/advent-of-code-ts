const getMarkerPosition = (markerLength: number, stream: string) => {
  for (let i = markerLength; i < stream.length; i++) {
    const possibleMarker = new Set(stream.slice(i - markerLength, i));
    if (possibleMarker.size === markerLength) return i;
  }
};

export const part1 = (input: string) => getMarkerPosition(4, input);

export const part2 = (input: string) => getMarkerPosition(14, input);
