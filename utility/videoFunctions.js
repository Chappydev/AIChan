export const getReadableTime = (time) => {
  const roundedTime = Math.floor(time);
  const seconds = roundedTime % 60;
  const totalMinutes = Math.floor(((roundedTime - seconds) / 60));
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(((totalMinutes - minutes) / 60));

  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = seconds.toString().padStart(2, '0');

  return totalHours > 0 ? `${totalHours}:${paddedMinutes}:${paddedSeconds}` : `${paddedMinutes}:${paddedSeconds}`;
}
