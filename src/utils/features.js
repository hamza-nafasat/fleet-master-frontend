function timeAgo(createdAt) {
  const notificationDate = new Date(createdAt);
  const now = new Date();
  const diffInMs = now - notificationDate;

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    return `${minutes} min`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""}`;
  }
}
function calculatePolygonArea(coordinates) {
  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }
  const R = 6371; // Radius of the Earth in kilometers
  let total = 0;

  for (let i = 0; i < coordinates.length; i++) {
    const [lat1, lon1] = coordinates[i];
    const [lat2, lon2] = coordinates[(i + 1) % coordinates.length];

    // Convert latitude and longitude to radians
    const lat1Rad = toRadians(lat1);
    const lat2Rad = toRadians(lat2);
    const lon1Rad = toRadians(lon1);
    const lon2Rad = toRadians(lon2);

    // Apply Shoelace formula in radians
    total += (lon2Rad - lon1Rad) * (2 + Math.sin(lat1Rad) + Math.sin(lat2Rad));
  }

  const area = Math.abs((total * R * R) / 2);

  return area;
}

export { timeAgo, calculatePolygonArea };
