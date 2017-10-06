const helper = (() => {
  return {
    addZ: (n) => { return n<10 ? '0'+n : ''+n }
  }
})();


module.exports = helper;

