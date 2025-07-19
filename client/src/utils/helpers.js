export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getInitials = (name) => {
  if (!name) return '';
  const parts = name.split(' ');
  return parts.length > 1 
    ? `${parts[0][0]}${parts[parts.length - 1][0]}` 
    : parts[0][0];
};

export const truncateText = (text, length = 50) => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'Completed': return 'success';
    case 'Pending': return 'warning';
    case 'Rejected': return 'error';
    default: return 'info';
  }
};