function sendError(status, message) {
  return { status, message };
}

module.exports = {
  sendError,
};
