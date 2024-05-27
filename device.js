(function () {
  var canvas,
    gl,
    glRenderer,
    models,
    devices = [
      ["Apple GPU", "1242x2688", ["iPhone Xs Max"]],
      ["Apple GPU", "1668x2388", ["iPad Pro (3rd gen 11-inch)"]],
      ["Apple GPU", "2048x2732", ["iPad Pro (3rd gen 12.9-inch)"]],
      ["Apple GPU", "828x1792", ["iPhone 11"]],
      ["Apple GPU", "1125x2436", ["iPhone 11 Pro"]],
      ["Apple GPU", "1242x2688", ["iPhone 11 Pro Max"]],
      ["Apple GPU", "1170x2532", ["iPhone 12", "iPhone 12 Pro"]],
      ["Apple GPU", "1284x2778", ["iPhone 12 Pro Max"]],
      ["Apple GPU", "1080x2340", ["iPhone 12 Mini"]],
      ["Apple GPU", "1170x2532", ["iPhone 13", "iPhone 13 Pro"]],
      ["Apple GPU", "1284x2778", ["iPhone 13 Pro Max"]],
      ["Apple GPU", "1080x2340", ["iPhone 13 Mini"]],
      ["Apple GPU", "1170x2532", ["iPhone 14", "iPhone 14 Pro"]],
      ["Apple GPU", "1284x2778", ["iPhone 14 Pro Max"]],
      ["Apple GPU", "1080x2340", ["iPhone 14 Plus"]],
      ["Apple GPU", "1170x2532", ["iPhone 15", "iPhone 15 Pro"]],
      ["Apple GPU", "1284x2778", ["iPhone 15 Pro Max"]],
      ["Apple GPU", "1080x2340", ["iPhone 15 Plus"]],
    ];

  function getCanvas() {
    if (canvas == null) {
      canvas = document.createElement("canvas");
    }

    return canvas;
  }

  function getGl() {
    if (gl == null) {
      gl = getCanvas().getContext("experimental-webgl");
    }

    return gl;
  }

  function getResolution() {
    var ratio = window.devicePixelRatio || 1;
    return (
      Math.min(screen.width, screen.height) * ratio +
      "x" +
      Math.max(screen.width, screen.height) * ratio
    );
  }

  function getGlRenderer() {
    if (glRenderer == null) {
      debugInfo = getGl().getExtension("WEBGL_debug_renderer_info");
      glRenderer =
        debugInfo == null
          ? "unknown"
          : getGl().getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    }

    return glRenderer;
  }

  function getModels() {
    if (models == null) {
      console.log("models :" + models);
      var gpu = getGlRenderer();
      matches = gpu.match(/Apple\sGPU/i);
      res = getResolution();
      console.log("matches :" + matches);

      models = ["unknown"];

      if (matches) {
        for (var i = 0; i < devices.length; i++) {
          var device = devices[i];
          if (matches == device[0] && res == device[1]) {
            models = device[2];
            break;
          }
        }
      }
    }
    return models;
  }

  if (window.MobileDevice == undefined) {
    window.MobileDevice = {};
  }

  window.MobileDevice.getGlRenderer = getGlRenderer;
  window.MobileDevice.getModels = getModels;
  window.MobileDevice.getResolution = getResolution;

  window.MobileDevice.is = function (match) {
    var currentModels = getModels();
    match = match.toLowerCase().replace(/\s+$/, "") + " ";

    for (var i = 0; i < currentModels.length; i++) {
      var model = currentModels[i].toLowerCase() + " ";

      if (0 === model.indexOf(math)) {
        return true;
      }
    }

    return false;
  };
})();
