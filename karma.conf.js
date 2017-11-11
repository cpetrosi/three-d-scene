/* eslint indent: ["error", 2] */
module.exports = function (config) {
  config.set({
    frameworks: [
      "jasmine",
      "fixture"
    ],

    files: [
      "vector.js",
      "matrix.js",
      "three-d.js",
      "mesh-maker.js",
      "glsl-utilities.js",
      "test/fixture.html",
      "test/**/*.js"
    ],

    preprocessors: {
      "test/**/*.html": ["html2js"],
      "*.js": ["coverage"]
    },

    browsers: [
      "Chrome"
    ],

    reporters: [
      "dots",
      "coverage"
    ]
  });
};
