'use strict';

export default {
  process(sourceText, sourcePath) {
    if (sourcePath.includes('icon-minus')) {
      return {
        code: 'module.exports = "src/assets/images/icon-minus.svg"',
      };
    }
    return {
      code: 'module.exports = "src/assets/images/icon-plus.svg"',
    };
  },
  getCacheKey() {
    return 'svgTransform';
  },
};
