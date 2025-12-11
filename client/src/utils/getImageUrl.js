export const getImageUrl = (images, all = false) => {
  if (!images || !Array.isArray(images)) {
    return '/images/placeholder-hotel-house.png';
  }
  if (all) return images[0];
  return images[0][0];
};
