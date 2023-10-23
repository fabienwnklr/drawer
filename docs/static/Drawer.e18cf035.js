"use strict";
const drawer = "";
({
  id: Date.now().toString(),
  defaultToolbar: true,
  width: 400,
  height: 400,
  localStorageKey: "draw",
  autoSave: true,
  toolbarPosition: "outerTop",
  bgColor: "#fff",
  color: "#000",
  lineThickness: 3,
  dotted: false,
  dash: [10, 5],
  cap: "round",
  fill: true,
  availableColor: [],
  availableColorOnly: false,
  grid: false,
  guides: false,
  opacity: 1,
  xor: false
});
({
  id: Date.now().toString(),
  headerContent: void 0,
  bodyContent: void 0,
  footerContent: void 0,
  closeOnClickOutside: true,
  backdrop: true
});
var Coloris = function() {
  /*!
  * Copyright (c) 2021-2023 Momo Bassit.
  * Licensed under the MIT License (MIT)
  * https://github.com/mdbassit/Coloris
  * Version: 0.21.1
  * NPM: https://github.com/melloware/coloris-npm
  */
  return function(window2, document2, Math2, undefined$1) {
    var ctx = document2.createElement("canvas").getContext("2d");
    var currentColor = { r: 0, g: 0, b: 0, h: 0, s: 0, v: 0, a: 1 };
    var container, picker, colorArea, colorMarker, colorPreview, colorValue, clearButton, closeButton, hueSlider, hueMarker, alphaSlider, alphaMarker, currentEl, currentFormat, oldColor, keyboardNav, colorAreaDims = {};
    var settings = {
      el: "[data-coloris]",
      parent: "body",
      theme: "default",
      themeMode: "light",
      rtl: false,
      wrap: true,
      margin: 2,
      format: "hex",
      formatToggle: false,
      swatches: [],
      swatchesOnly: false,
      alpha: true,
      forceAlpha: false,
      focusInput: true,
      selectInput: false,
      inline: false,
      defaultColor: "#000000",
      clearButton: false,
      clearLabel: "Clear",
      closeButton: false,
      closeLabel: "Close",
      onChange: function onChange() {
        return undefined$1;
      },
      a11y: {
        open: "Open color picker",
        close: "Close color picker",
        clear: "Clear the selected color",
        marker: "Saturation: {s}. Brightness: {v}.",
        hueSlider: "Hue slider",
        alphaSlider: "Opacity slider",
        input: "Color value field",
        format: "Color format",
        swatch: "Color swatch",
        instruction: "Saturation and brightness selector. Use up, down, left and right arrow keys to select."
      }
    };
    var instances = {};
    var currentInstanceId = "";
    var defaultInstance = {};
    var hasInstance = false;
    function configure(options) {
      if (typeof options !== "object") {
        return;
      }
      var _loop = function _loop2() {
        switch (key) {
          case "el":
            bindFields(options.el);
            if (options.wrap !== false) {
              wrapFields(options.el);
            }
            break;
          case "parent":
            container = document2.querySelector(options.parent);
            if (container) {
              container.appendChild(picker);
              settings.parent = options.parent;
              if (container === document2.body) {
                container = undefined$1;
              }
            }
            break;
          case "themeMode":
            settings.themeMode = options.themeMode;
            if (options.themeMode === "auto" && window2.matchMedia && window2.matchMedia("(prefers-color-scheme: dark)").matches) {
              settings.themeMode = "dark";
            }
          case "theme":
            if (options.theme) {
              settings.theme = options.theme;
            }
            picker.className = "clr-picker clr-" + settings.theme + " clr-" + settings.themeMode;
            if (settings.inline) {
              updatePickerPosition();
            }
            break;
          case "rtl":
            settings.rtl = !!options.rtl;
            document2.querySelectorAll(".clr-field").forEach(function(field) {
              return field.classList.toggle("clr-rtl", settings.rtl);
            });
            break;
          case "margin":
            options.margin *= 1;
            settings.margin = !isNaN(options.margin) ? options.margin : settings.margin;
            break;
          case "wrap":
            if (options.el && options.wrap) {
              wrapFields(options.el);
            }
            break;
          case "formatToggle":
            settings.formatToggle = !!options.formatToggle;
            getEl("clr-format").style.display = settings.formatToggle ? "block" : "none";
            if (settings.formatToggle) {
              settings.format = "auto";
            }
            break;
          case "swatches":
            if (Array.isArray(options.swatches)) {
              var swatches = [];
              options.swatches.forEach(function(swatch, i) {
                swatches.push('<button type="button" id="clr-swatch-' + i + '" aria-labelledby="clr-swatch-label clr-swatch-' + i + '" style="color: ' + swatch + ';">' + swatch + "</button>");
              });
              getEl("clr-swatches").innerHTML = swatches.length ? "<div>" + swatches.join("") + "</div>" : "";
              settings.swatches = options.swatches.slice();
            }
            break;
          case "swatchesOnly":
            settings.swatchesOnly = !!options.swatchesOnly;
            picker.setAttribute("data-minimal", settings.swatchesOnly);
            break;
          case "alpha":
            settings.alpha = !!options.alpha;
            picker.setAttribute("data-alpha", settings.alpha);
            break;
          case "inline":
            settings.inline = !!options.inline;
            picker.setAttribute("data-inline", settings.inline);
            if (settings.inline) {
              var defaultColor = options.defaultColor || settings.defaultColor;
              currentFormat = getColorFormatFromStr(defaultColor);
              updatePickerPosition();
              setColorFromStr(defaultColor);
            }
            break;
          case "clearButton":
            if (typeof options.clearButton === "object") {
              if (options.clearButton.label) {
                settings.clearLabel = options.clearButton.label;
                clearButton.innerHTML = settings.clearLabel;
              }
              options.clearButton = options.clearButton.show;
            }
            settings.clearButton = !!options.clearButton;
            clearButton.style.display = settings.clearButton ? "block" : "none";
            break;
          case "clearLabel":
            settings.clearLabel = options.clearLabel;
            clearButton.innerHTML = settings.clearLabel;
            break;
          case "closeButton":
            settings.closeButton = !!options.closeButton;
            if (settings.closeButton) {
              picker.insertBefore(closeButton, colorPreview);
            } else {
              colorPreview.appendChild(closeButton);
            }
            break;
          case "closeLabel":
            settings.closeLabel = options.closeLabel;
            closeButton.innerHTML = settings.closeLabel;
            break;
          case "a11y":
            var labels = options.a11y;
            var update = false;
            if (typeof labels === "object") {
              for (var label in labels) {
                if (labels[label] && settings.a11y[label]) {
                  settings.a11y[label] = labels[label];
                  update = true;
                }
              }
            }
            if (update) {
              var openLabel = getEl("clr-open-label");
              var swatchLabel = getEl("clr-swatch-label");
              openLabel.innerHTML = settings.a11y.open;
              swatchLabel.innerHTML = settings.a11y.swatch;
              closeButton.setAttribute("aria-label", settings.a11y.close);
              clearButton.setAttribute("aria-label", settings.a11y.clear);
              hueSlider.setAttribute("aria-label", settings.a11y.hueSlider);
              alphaSlider.setAttribute("aria-label", settings.a11y.alphaSlider);
              colorValue.setAttribute("aria-label", settings.a11y.input);
              colorArea.setAttribute("aria-label", settings.a11y.instruction);
            }
            break;
          default:
            settings[key] = options[key];
        }
      };
      for (var key in options) {
        _loop();
      }
    }
    function setVirtualInstance(selector, options) {
      if (typeof selector === "string" && typeof options === "object") {
        instances[selector] = options;
        hasInstance = true;
      }
    }
    function removeVirtualInstance(selector) {
      delete instances[selector];
      if (Object.keys(instances).length === 0) {
        hasInstance = false;
        if (selector === currentInstanceId) {
          resetVirtualInstance();
        }
      }
    }
    function attachVirtualInstance(element) {
      if (hasInstance) {
        var unsupportedOptions = ["el", "wrap", "rtl", "inline", "defaultColor", "a11y"];
        var _loop2 = function _loop22() {
          var options = instances[selector];
          if (element.matches(selector)) {
            currentInstanceId = selector;
            defaultInstance = {};
            unsupportedOptions.forEach(function(option2) {
              return delete options[option2];
            });
            for (var option in options) {
              defaultInstance[option] = Array.isArray(settings[option]) ? settings[option].slice() : settings[option];
            }
            configure(options);
            return "break";
          }
        };
        for (var selector in instances) {
          var _ret = _loop2();
          if (_ret === "break")
            break;
        }
      }
    }
    function resetVirtualInstance() {
      if (Object.keys(defaultInstance).length > 0) {
        configure(defaultInstance);
        currentInstanceId = "";
        defaultInstance = {};
      }
    }
    function bindFields(selector) {
      addListener(document2, "click", selector, function(event) {
        if (settings.inline) {
          return;
        }
        attachVirtualInstance(event.target);
        currentEl = event.target;
        oldColor = currentEl.value;
        currentFormat = getColorFormatFromStr(oldColor);
        picker.classList.add("clr-open");
        updatePickerPosition();
        setColorFromStr(oldColor);
        if (settings.focusInput || settings.selectInput) {
          colorValue.focus({ preventScroll: true });
          colorValue.setSelectionRange(currentEl.selectionStart, currentEl.selectionEnd);
        }
        if (settings.selectInput) {
          colorValue.select();
        }
        if (keyboardNav || settings.swatchesOnly) {
          getFocusableElements().shift().focus();
        }
        currentEl.dispatchEvent(new Event("open", { bubbles: true }));
      });
      addListener(document2, "input", selector, function(event) {
        var parent = event.target.parentNode;
        if (parent.classList.contains("clr-field")) {
          parent.style.color = event.target.value;
        }
      });
    }
    function updatePickerPosition() {
      if (!picker || !currentEl && !settings.inline)
        return;
      var parent = container;
      var scrollY = window2.scrollY;
      var pickerWidth = picker.offsetWidth;
      var pickerHeight = picker.offsetHeight;
      var reposition = { left: false, top: false };
      var parentStyle, parentMarginTop, parentBorderTop;
      var offset = { x: 0, y: 0 };
      if (parent) {
        parentStyle = window2.getComputedStyle(parent);
        parentMarginTop = parseFloat(parentStyle.marginTop);
        parentBorderTop = parseFloat(parentStyle.borderTopWidth);
        offset = parent.getBoundingClientRect();
        offset.y += parentBorderTop + scrollY;
      }
      if (!settings.inline) {
        var coords = currentEl.getBoundingClientRect();
        var left = coords.x;
        var top = scrollY + coords.y + coords.height + settings.margin;
        if (parent) {
          left -= offset.x;
          top -= offset.y;
          if (left + pickerWidth > parent.clientWidth) {
            left += coords.width - pickerWidth;
            reposition.left = true;
          }
          if (top + pickerHeight > parent.clientHeight - parentMarginTop) {
            if (pickerHeight + settings.margin <= coords.top - (offset.y - scrollY)) {
              top -= coords.height + pickerHeight + settings.margin * 2;
              reposition.top = true;
            }
          }
          top += parent.scrollTop;
        } else {
          if (left + pickerWidth > document2.documentElement.clientWidth) {
            left += coords.width - pickerWidth;
            reposition.left = true;
          }
          if (top + pickerHeight - scrollY > document2.documentElement.clientHeight) {
            if (pickerHeight + settings.margin <= coords.top) {
              top = scrollY + coords.y - pickerHeight - settings.margin;
              reposition.top = true;
            }
          }
        }
        picker.classList.toggle("clr-left", reposition.left);
        picker.classList.toggle("clr-top", reposition.top);
        picker.style.left = left + "px";
        picker.style.top = top + "px";
        offset.x += picker.offsetLeft;
        offset.y += picker.offsetTop;
      }
      colorAreaDims = {
        width: colorArea.offsetWidth,
        height: colorArea.offsetHeight,
        x: colorArea.offsetLeft + offset.x,
        y: colorArea.offsetTop + offset.y
      };
    }
    function wrapFields(selector) {
      document2.querySelectorAll(selector).forEach(function(field) {
        var parentNode = field.parentNode;
        if (!parentNode.classList.contains("clr-field")) {
          var wrapper = document2.createElement("div");
          var classes = "clr-field";
          if (settings.rtl || field.classList.contains("clr-rtl")) {
            classes += " clr-rtl";
          }
          wrapper.innerHTML = '<button type="button" aria-labelledby="clr-open-label"></button>';
          parentNode.insertBefore(wrapper, field);
          wrapper.setAttribute("class", classes);
          wrapper.style.color = field.value;
          wrapper.appendChild(field);
        }
      });
    }
    function closePicker(revert) {
      if (currentEl && !settings.inline) {
        var prevEl = currentEl;
        if (revert) {
          currentEl = undefined$1;
          if (oldColor !== prevEl.value) {
            prevEl.value = oldColor;
            prevEl.dispatchEvent(new Event("input", { bubbles: true }));
          }
        }
        setTimeout(function() {
          if (oldColor !== prevEl.value) {
            prevEl.dispatchEvent(new Event("change", { bubbles: true }));
          }
        });
        picker.classList.remove("clr-open");
        if (hasInstance) {
          resetVirtualInstance();
        }
        prevEl.dispatchEvent(new Event("close", { bubbles: true }));
        if (settings.focusInput) {
          prevEl.focus({ preventScroll: true });
        }
        currentEl = undefined$1;
      }
    }
    function setColorFromStr(str) {
      var rgba = strToRGBA(str);
      var hsva = RGBAtoHSVA(rgba);
      updateMarkerA11yLabel(hsva.s, hsva.v);
      updateColor(rgba, hsva);
      hueSlider.value = hsva.h;
      picker.style.color = "hsl(" + hsva.h + ", 100%, 50%)";
      hueMarker.style.left = hsva.h / 360 * 100 + "%";
      colorMarker.style.left = colorAreaDims.width * hsva.s / 100 + "px";
      colorMarker.style.top = colorAreaDims.height - colorAreaDims.height * hsva.v / 100 + "px";
      alphaSlider.value = hsva.a * 100;
      alphaMarker.style.left = hsva.a * 100 + "%";
    }
    function getColorFormatFromStr(str) {
      var format = str.substring(0, 3).toLowerCase();
      if (format === "rgb" || format === "hsl") {
        return format;
      }
      return "hex";
    }
    function pickColor(color) {
      color = color !== undefined$1 ? color : colorValue.value;
      if (currentEl) {
        currentEl.value = color;
        currentEl.dispatchEvent(new Event("input", { bubbles: true }));
      }
      if (settings.onChange) {
        settings.onChange.call(window2, color, currentEl);
      }
      document2.dispatchEvent(new CustomEvent("coloris:pick", { detail: { color, currentEl } }));
    }
    function setColorAtPosition(x, y) {
      var hsva = {
        h: hueSlider.value * 1,
        s: x / colorAreaDims.width * 100,
        v: 100 - y / colorAreaDims.height * 100,
        a: alphaSlider.value / 100
      };
      var rgba = HSVAtoRGBA(hsva);
      updateMarkerA11yLabel(hsva.s, hsva.v);
      updateColor(rgba, hsva);
      pickColor();
    }
    function updateMarkerA11yLabel(saturation, value) {
      var label = settings.a11y.marker;
      saturation = saturation.toFixed(1) * 1;
      value = value.toFixed(1) * 1;
      label = label.replace("{s}", saturation);
      label = label.replace("{v}", value);
      colorMarker.setAttribute("aria-label", label);
    }
    function getPointerPosition(event) {
      return {
        pageX: event.changedTouches ? event.changedTouches[0].pageX : event.pageX,
        pageY: event.changedTouches ? event.changedTouches[0].pageY : event.pageY
      };
    }
    function moveMarker(event) {
      var pointer = getPointerPosition(event);
      var x = pointer.pageX - colorAreaDims.x;
      var y = pointer.pageY - colorAreaDims.y;
      if (container) {
        y += container.scrollTop;
      }
      setMarkerPosition(x, y);
      event.preventDefault();
      event.stopPropagation();
    }
    function moveMarkerOnKeydown(offsetX, offsetY) {
      var x = colorMarker.style.left.replace("px", "") * 1 + offsetX;
      var y = colorMarker.style.top.replace("px", "") * 1 + offsetY;
      setMarkerPosition(x, y);
    }
    function setMarkerPosition(x, y) {
      x = x < 0 ? 0 : x > colorAreaDims.width ? colorAreaDims.width : x;
      y = y < 0 ? 0 : y > colorAreaDims.height ? colorAreaDims.height : y;
      colorMarker.style.left = x + "px";
      colorMarker.style.top = y + "px";
      setColorAtPosition(x, y);
      colorMarker.focus();
    }
    function updateColor(rgba, hsva) {
      if (rgba === void 0) {
        rgba = {};
      }
      if (hsva === void 0) {
        hsva = {};
      }
      var format = settings.format;
      for (var key in rgba) {
        currentColor[key] = rgba[key];
      }
      for (var _key in hsva) {
        currentColor[_key] = hsva[_key];
      }
      var hex = RGBAToHex(currentColor);
      var opaqueHex = hex.substring(0, 7);
      colorMarker.style.color = opaqueHex;
      alphaMarker.parentNode.style.color = opaqueHex;
      alphaMarker.style.color = hex;
      colorPreview.style.color = hex;
      colorArea.style.display = "none";
      colorArea.offsetHeight;
      colorArea.style.display = "";
      alphaMarker.nextElementSibling.style.display = "none";
      alphaMarker.nextElementSibling.offsetHeight;
      alphaMarker.nextElementSibling.style.display = "";
      if (format === "mixed") {
        format = currentColor.a === 1 ? "hex" : "rgb";
      } else if (format === "auto") {
        format = currentFormat;
      }
      switch (format) {
        case "hex":
          colorValue.value = hex;
          break;
        case "rgb":
          colorValue.value = RGBAToStr(currentColor);
          break;
        case "hsl":
          colorValue.value = HSLAToStr(HSVAtoHSLA(currentColor));
          break;
      }
      document2.querySelector('.clr-format [value="' + format + '"]').checked = true;
    }
    function setHue() {
      var hue = hueSlider.value * 1;
      var x = colorMarker.style.left.replace("px", "") * 1;
      var y = colorMarker.style.top.replace("px", "") * 1;
      picker.style.color = "hsl(" + hue + ", 100%, 50%)";
      hueMarker.style.left = hue / 360 * 100 + "%";
      setColorAtPosition(x, y);
    }
    function setAlpha() {
      var alpha = alphaSlider.value / 100;
      alphaMarker.style.left = alpha * 100 + "%";
      updateColor({ a: alpha });
      pickColor();
    }
    function HSVAtoRGBA(hsva) {
      var saturation = hsva.s / 100;
      var value = hsva.v / 100;
      var chroma = saturation * value;
      var hueBy60 = hsva.h / 60;
      var x = chroma * (1 - Math2.abs(hueBy60 % 2 - 1));
      var m = value - chroma;
      chroma = chroma + m;
      x = x + m;
      var index = Math2.floor(hueBy60) % 6;
      var red = [chroma, x, m, m, x, chroma][index];
      var green = [x, chroma, chroma, x, m, m][index];
      var blue = [m, m, x, chroma, chroma, x][index];
      return {
        r: Math2.round(red * 255),
        g: Math2.round(green * 255),
        b: Math2.round(blue * 255),
        a: hsva.a
      };
    }
    function HSVAtoHSLA(hsva) {
      var value = hsva.v / 100;
      var lightness = value * (1 - hsva.s / 100 / 2);
      var saturation;
      if (lightness > 0 && lightness < 1) {
        saturation = Math2.round((value - lightness) / Math2.min(lightness, 1 - lightness) * 100);
      }
      return {
        h: hsva.h,
        s: saturation || 0,
        l: Math2.round(lightness * 100),
        a: hsva.a
      };
    }
    function RGBAtoHSVA(rgba) {
      var red = rgba.r / 255;
      var green = rgba.g / 255;
      var blue = rgba.b / 255;
      var xmax = Math2.max(red, green, blue);
      var xmin = Math2.min(red, green, blue);
      var chroma = xmax - xmin;
      var value = xmax;
      var hue = 0;
      var saturation = 0;
      if (chroma) {
        if (xmax === red) {
          hue = (green - blue) / chroma;
        }
        if (xmax === green) {
          hue = 2 + (blue - red) / chroma;
        }
        if (xmax === blue) {
          hue = 4 + (red - green) / chroma;
        }
        if (xmax) {
          saturation = chroma / xmax;
        }
      }
      hue = Math2.floor(hue * 60);
      return {
        h: hue < 0 ? hue + 360 : hue,
        s: Math2.round(saturation * 100),
        v: Math2.round(value * 100),
        a: rgba.a
      };
    }
    function strToRGBA(str) {
      var regex = /^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i;
      var match, rgba;
      ctx.fillStyle = "#000";
      ctx.fillStyle = str;
      match = regex.exec(ctx.fillStyle);
      if (match) {
        rgba = {
          r: match[3] * 1,
          g: match[4] * 1,
          b: match[5] * 1,
          a: match[6] * 1
        };
        rgba.a = +rgba.a.toFixed(2);
      } else {
        match = ctx.fillStyle.replace("#", "").match(/.{2}/g).map(function(h) {
          return parseInt(h, 16);
        });
        rgba = {
          r: match[0],
          g: match[1],
          b: match[2],
          a: 1
        };
      }
      return rgba;
    }
    function RGBAToHex(rgba) {
      var R = rgba.r.toString(16);
      var G = rgba.g.toString(16);
      var B = rgba.b.toString(16);
      var A = "";
      if (rgba.r < 16) {
        R = "0" + R;
      }
      if (rgba.g < 16) {
        G = "0" + G;
      }
      if (rgba.b < 16) {
        B = "0" + B;
      }
      if (settings.alpha && (rgba.a < 1 || settings.forceAlpha)) {
        var alpha = rgba.a * 255 | 0;
        A = alpha.toString(16);
        if (alpha < 16) {
          A = "0" + A;
        }
      }
      return "#" + R + G + B + A;
    }
    function RGBAToStr(rgba) {
      if (!settings.alpha || rgba.a === 1 && !settings.forceAlpha) {
        return "rgb(" + rgba.r + ", " + rgba.g + ", " + rgba.b + ")";
      } else {
        return "rgba(" + rgba.r + ", " + rgba.g + ", " + rgba.b + ", " + rgba.a + ")";
      }
    }
    function HSLAToStr(hsla) {
      if (!settings.alpha || hsla.a === 1 && !settings.forceAlpha) {
        return "hsl(" + hsla.h + ", " + hsla.s + "%, " + hsla.l + "%)";
      } else {
        return "hsla(" + hsla.h + ", " + hsla.s + "%, " + hsla.l + "%, " + hsla.a + ")";
      }
    }
    function init() {
      if (document2.getElementById("clr-picker"))
        return;
      container = undefined$1;
      picker = document2.createElement("div");
      picker.setAttribute("id", "clr-picker");
      picker.className = "clr-picker";
      picker.innerHTML = '<input id="clr-color-value" name="clr-color-value" class="clr-color" type="text" value="" spellcheck="false" aria-label="' + settings.a11y.input + '">' + ('<div id="clr-color-area" class="clr-gradient" role="application" aria-label="' + settings.a11y.instruction + '">') + '<div id="clr-color-marker" class="clr-marker" tabindex="0"></div></div><div class="clr-hue">' + ('<input id="clr-hue-slider" name="clr-hue-slider" type="range" min="0" max="360" step="1" aria-label="' + settings.a11y.hueSlider + '">') + '<div id="clr-hue-marker"></div></div><div class="clr-alpha">' + ('<input id="clr-alpha-slider" name="clr-alpha-slider" type="range" min="0" max="100" step="1" aria-label="' + settings.a11y.alphaSlider + '">') + '<div id="clr-alpha-marker"></div><span></span></div><div id="clr-format" class="clr-format"><fieldset class="clr-segmented">' + ("<legend>" + settings.a11y.format + "</legend>") + '<input id="clr-f1" type="radio" name="clr-format" value="hex"><label for="clr-f1">Hex</label><input id="clr-f2" type="radio" name="clr-format" value="rgb"><label for="clr-f2">RGB</label><input id="clr-f3" type="radio" name="clr-format" value="hsl"><label for="clr-f3">HSL</label><span></span></fieldset></div><div id="clr-swatches" class="clr-swatches"></div>' + ('<button type="button" id="clr-clear" class="clr-clear" aria-label="' + settings.a11y.clear + '">' + settings.clearLabel + "</button>") + '<div id="clr-color-preview" class="clr-preview">' + ('<button type="button" id="clr-close" class="clr-close" aria-label="' + settings.a11y.close + '">' + settings.closeLabel + "</button>") + "</div>" + ('<span id="clr-open-label" hidden>' + settings.a11y.open + "</span>") + ('<span id="clr-swatch-label" hidden>' + settings.a11y.swatch + "</span>");
      document2.body.appendChild(picker);
      colorArea = getEl("clr-color-area");
      colorMarker = getEl("clr-color-marker");
      clearButton = getEl("clr-clear");
      closeButton = getEl("clr-close");
      colorPreview = getEl("clr-color-preview");
      colorValue = getEl("clr-color-value");
      hueSlider = getEl("clr-hue-slider");
      hueMarker = getEl("clr-hue-marker");
      alphaSlider = getEl("clr-alpha-slider");
      alphaMarker = getEl("clr-alpha-marker");
      bindFields(settings.el);
      wrapFields(settings.el);
      addListener(picker, "mousedown", function(event) {
        picker.classList.remove("clr-keyboard-nav");
        event.stopPropagation();
      });
      addListener(colorArea, "mousedown", function(event) {
        addListener(document2, "mousemove", moveMarker);
      });
      addListener(colorArea, "touchstart", function(event) {
        document2.addEventListener("touchmove", moveMarker, { passive: false });
      });
      addListener(colorMarker, "mousedown", function(event) {
        addListener(document2, "mousemove", moveMarker);
      });
      addListener(colorMarker, "touchstart", function(event) {
        document2.addEventListener("touchmove", moveMarker, { passive: false });
      });
      addListener(colorValue, "change", function(event) {
        var value = colorValue.value;
        if (currentEl || settings.inline) {
          var color = value === "" ? value : setColorFromStr(value);
          pickColor(color);
        }
      });
      addListener(clearButton, "click", function(event) {
        pickColor("");
        closePicker();
      });
      addListener(closeButton, "click", function(event) {
        pickColor();
        closePicker();
      });
      addListener(getEl("clr-format"), "click", ".clr-format input", function(event) {
        currentFormat = event.target.value;
        updateColor();
        pickColor();
      });
      addListener(picker, "click", ".clr-swatches button", function(event) {
        setColorFromStr(event.target.textContent);
        pickColor();
        if (settings.swatchesOnly) {
          closePicker();
        }
      });
      addListener(document2, "mouseup", function(event) {
        document2.removeEventListener("mousemove", moveMarker);
      });
      addListener(document2, "touchend", function(event) {
        document2.removeEventListener("touchmove", moveMarker);
      });
      addListener(document2, "mousedown", function(event) {
        keyboardNav = false;
        picker.classList.remove("clr-keyboard-nav");
        closePicker();
      });
      addListener(document2, "keydown", function(event) {
        var key = event.key;
        var target = event.target;
        var shiftKey = event.shiftKey;
        var navKeys = ["Tab", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
        if (key === "Escape") {
          closePicker(true);
        } else if (navKeys.includes(key)) {
          keyboardNav = true;
          picker.classList.add("clr-keyboard-nav");
        }
        if (key === "Tab" && target.matches(".clr-picker *")) {
          var focusables = getFocusableElements();
          var firstFocusable = focusables.shift();
          var lastFocusable = focusables.pop();
          if (shiftKey && target === firstFocusable) {
            lastFocusable.focus();
            event.preventDefault();
          } else if (!shiftKey && target === lastFocusable) {
            firstFocusable.focus();
            event.preventDefault();
          }
        }
      });
      addListener(document2, "click", ".clr-field button", function(event) {
        if (hasInstance) {
          resetVirtualInstance();
        }
        event.target.nextElementSibling.dispatchEvent(new Event("click", { bubbles: true }));
      });
      addListener(colorMarker, "keydown", function(event) {
        var movements = {
          ArrowUp: [0, -1],
          ArrowDown: [0, 1],
          ArrowLeft: [-1, 0],
          ArrowRight: [1, 0]
        };
        if (Object.keys(movements).includes(event.key)) {
          moveMarkerOnKeydown.apply(void 0, movements[event.key]);
          event.preventDefault();
        }
      });
      addListener(colorArea, "click", moveMarker);
      addListener(hueSlider, "input", setHue);
      addListener(alphaSlider, "input", setAlpha);
    }
    function getFocusableElements() {
      var controls = Array.from(picker.querySelectorAll("input, button"));
      var focusables = controls.filter(function(node) {
        return !!node.offsetWidth;
      });
      return focusables;
    }
    function getEl(id) {
      return document2.getElementById(id);
    }
    function addListener(context, type, selector, fn) {
      var matches = Element.prototype.matches || Element.prototype.msMatchesSelector;
      if (typeof selector === "string") {
        context.addEventListener(type, function(event) {
          if (matches.call(event.target, selector)) {
            fn.call(event.target, event);
          }
        });
      } else {
        fn = selector;
        context.addEventListener(type, fn);
      }
    }
    function DOMReady(fn, args) {
      args = args !== undefined$1 ? args : [];
      if (document2.readyState !== "loading") {
        fn.apply(void 0, args);
      } else {
        document2.addEventListener("DOMContentLoaded", function() {
          fn.apply(void 0, args);
        });
      }
    }
    if (NodeList !== undefined$1 && NodeList.prototype && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = Array.prototype.forEach;
    }
    function setColor(color, target) {
      currentEl = target;
      oldColor = currentEl.value;
      attachVirtualInstance(target);
      currentFormat = getColorFormatFromStr(color);
      updatePickerPosition();
      setColorFromStr(color);
      pickColor();
      if (oldColor !== color) {
        currentEl.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
    var Coloris2 = function() {
      var methods = {
        init,
        set: configure,
        wrap: wrapFields,
        close: closePicker,
        setInstance: setVirtualInstance,
        setColor,
        removeInstance: removeVirtualInstance,
        updatePosition: updatePickerPosition
      };
      function Coloris3(options) {
        DOMReady(function() {
          if (options) {
            if (typeof options === "string") {
              bindFields(options);
            } else {
              configure(options);
            }
          }
        });
      }
      var _loop3 = function _loop32(key2) {
        Coloris3[key2] = function() {
          for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
            args[_key2] = arguments[_key2];
          }
          DOMReady(methods[key2], args);
        };
      };
      for (var key in methods) {
        _loop3(key);
      }
      DOMReady(function() {
        window2.addEventListener("resize", function(event) {
          Coloris3.updatePosition();
        });
        window2.addEventListener("scroll", function(event) {
          Coloris3.updatePosition();
        });
      });
      return Coloris3;
    }();
    Coloris2.coloris = Coloris2;
    return Coloris2;
  }(window, document, Math);
}();
Coloris.coloris;
Coloris.init;
Coloris.set;
Coloris.wrap;
Coloris.close;
Coloris.setInstance;
Coloris.removeInstance;
Coloris.updatePosition;
const modal = "";
const coloris = "";
