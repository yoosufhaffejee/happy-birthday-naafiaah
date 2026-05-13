(function () {
  var root = document.documentElement;

  function addClass(className) {
    if (root.className.indexOf(className) !== -1) return;
    root.className = root.className ? root.className + " " + className : className;
  }

  function supportsModernCss() {
    if (!window.CSS || !window.CSS.supports) return false;

    return window.CSS.supports("height", "100dvh")
      && window.CSS.supports("width", "min(64vw, 290px)")
      && window.CSS.supports("font-size", "clamp(36px, 11.6vw, 52px)");
  }

  function supportsModernJsApis() {
    try {
      return !!(
        window.Promise
        && Array.prototype.find
        && Object.entries
        && Number.isFinite
        && window.sessionStorage
      );
    } catch (error) {
      return false;
    }
  }

  function loadScript(src) {
    var script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
  }

  if (supportsModernCss() && supportsModernJsApis()) {
    addClass("modern-browser");
    loadScript("./script.js");
  } else {
    addClass("legacy-browser");
    loadScript("./script.legacy.js");
  }
}());
