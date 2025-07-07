function capitalizeFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function formatSlug(slug) {
  return slug
    .split('-')
    .map(word => capitalizeFirst(word))
    .join(' ');
}

module.exports = formatSlug;