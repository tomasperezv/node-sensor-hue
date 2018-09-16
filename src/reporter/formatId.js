module.exports = {
  parse: (id) => {
    return id
      .replace(/\s/g, '')
      .replace(/\./g, '');
  }
};
