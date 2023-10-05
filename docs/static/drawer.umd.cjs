var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.Drawer = {}));
})(this, function(exports2) {
  var _dragStartLocation, _snapshot, _availableShape, _cloneCanvas;
  "use strict";
  const drawer = "";
  function stringToHTMLElement(string) {
    return new DOMParser().parseFromString(string, "text/html").body.firstChild;
  }
  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }
  class DrawerError extends Error {
    constructor(msg) {
      super(msg);
      this.name = `DrawerError`;
    }
  }
  const defaultOptionsDrawer = {
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
    availableColor: void 0,
    availableColorOnly: false,
    grid: false,
    guides: false,
    opacity: 1,
    xor: false
  };
  const defaultOptionsModal = {
    id: Date.now().toString(),
    headerContent: void 0,
    bodyContent: void 0,
    footerContent: void 0,
    closeOnClickOutside: true,
    backdrop: true
  };
  const defaultOptionsToolbar = {
    toolbarPosition: "outerTop"
  };
  const DrawEvent = (name, detail = "") => new CustomEvent("drawer." + name, { detail });
  class History {
    constructor() {
      __publicField(this, "redo_list", []);
      __publicField(this, "undo_list", []);
      __publicField(this, "$canvas");
      __publicField(this, "ctx");
    }
    saveState(list, keep_redo) {
      keep_redo = keep_redo ?? false;
      if (!keep_redo) {
        this.redo_list = [];
      }
      (list ?? this.undo_list).push(this.$canvas.toDataURL());
    }
    undo() {
      return new Promise((resolve, reject) => {
        try {
          this.restoreState(this.undo_list, this.redo_list, resolve);
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    redo() {
      return new Promise((resolve, reject) => {
        try {
          this.restoreState(this.redo_list, this.undo_list, resolve);
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    restoreState(pop, push, cb) {
      if (pop.length) {
        this.saveState(push, true);
        const restore_state = pop.pop();
        if (restore_state) {
          const img = document.createElement("img");
          img.src = restore_state;
          img.onload = () => {
            this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
            this.ctx.drawImage(
              img,
              0,
              0,
              this.$canvas.width,
              this.$canvas.height,
              0,
              0,
              this.$canvas.width,
              this.$canvas.height
            );
            if (typeof cb === "function")
              cb(true);
          };
        }
      }
    }
    setCanvas($canvas) {
      this.$canvas = $canvas;
      this.ctx = $canvas.getContext("2d");
    }
  }
  const TriangleIcon = `<svg width="16" height="16" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
<path fill="currentColor" d="M236.8 188.09L149.35 36.22a24.76 24.76 0 0 0-42.7 0L19.2 188.09a23.51 23.51 0 0 0 0 23.72A24.34 24.34 0 0 0 40.55 224h174.9a24.34 24.34 0 0 0 21.33-12.19a23.51 23.51 0 0 0 .02-23.72Zm-13.87 15.71a8.5 8.5 0 0 1-7.48 4.2H40.55a8.5 8.5 0 0 1-7.48-4.2a7.59 7.59 0 0 1 0-7.72l87.45-151.87a8.75 8.75 0 0 1 15 0l87.45 151.87a7.59 7.59 0 0 1-.04 7.72Z"/>
</svg>`;
  const SquareIcon = `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path fill="currentColor" d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5Zm3 15a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3Z"/>
</svg>`;
  const LineIcon = `<svg width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
<path fill="currentColor" fill-rule="evenodd" d="M1 10a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
</svg>`;
  const StarIcon = `<svg width="16" height="16" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
<path fill="currentColor" d="M239.2 97.29a16 16 0 0 0-13.81-11L166 81.17l-23.28-55.36a15.95 15.95 0 0 0-29.44 0L90.07 81.17l-59.46 5.15a16 16 0 0 0-9.11 28.06l45.11 39.42l-13.52 58.54a16 16 0 0 0 23.84 17.34l51-31l51.11 31a16 16 0 0 0 23.84-17.34l-13.51-58.6l45.1-39.36a16 16 0 0 0 4.73-17.09Zm-15.22 5l-45.1 39.36a16 16 0 0 0-5.08 15.71L187.35 216l-51.07-31a15.9 15.9 0 0 0-16.54 0l-51 31l13.46-58.6a16 16 0 0 0-5.08-15.71L32 102.35a.37.37 0 0 1 0-.09l59.44-5.14a16 16 0 0 0 13.35-9.75L128 32.08l23.2 55.29a16 16 0 0 0 13.35 9.75l59.45 5.14v.07Z"/>
</svg>`;
  const CircleIcon = `<svg width="16" height="16" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
<path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z"/>
</svg>`;
  const RectIcon = `<svg width="16" height="16" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
<path fill="currentColor" d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm0 160H40V56h176v144Z"/>
</svg>`;
  const ArrowIcon = `<svg style="transform: rotate(135deg);" width="16" height="16" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
<path fill="currentColor" d="M4.5 0h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .854.354L2.5 3.207l11.646 11.647l.708-.708L3.207 2.5L4.854.854A.5.5 0 0 0 4.5 0Z"/>
</svg>`;
  function debounce(callback, delay = 300) {
    let timer;
    return function(...args) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(function() {
        callback(...args);
      }, delay);
    };
  }
  function throttle(func, limit = 100) {
    let inThrottle;
    let lastResult;
    return function(...args) {
      if (!inThrottle) {
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
        lastResult = func.apply(this, args);
      }
      return lastResult;
    };
  }
  function getMousePosition($canvas, evt) {
    const rect = $canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  const isObject = (item) => {
    return item === Object(item) && !Array.isArray(item);
  };
  function isTruthy(t) {
    return typeof t !== "undefined" && t !== "" && t !== null;
  }
  function deepMerge(target, source) {
    if (!source)
      return target;
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach((key) => {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = deepMerge(target[key], source[key]);
          }
        } else if (isTruthy(source[key])) {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  }
  const modal = "";
  const CloseIcon = `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m7 7l10 10M7 17L17 7"/>
</svg>`;
  class Modal {
    constructor(drawer2, options) {
      __publicField(this, "$modal");
      __publicField(this, "$modalHeader");
      __publicField(this, "$modalBody");
      __publicField(this, "$modalFooter");
      __publicField(this, "options");
      __publicField(this, "drawer");
      __publicField(this, "$backdrop");
      try {
        this.drawer = drawer2;
        this.options = { ...defaultOptionsModal, ...options };
        this._init();
        this._setupDefaultEvents();
      } catch (error) {
        throw new DrawerError(error.message);
      }
    }
    _init() {
      this._createModal();
      this.setHeaderContent(
        this.options.headerContent ?? `<button title="close" class="btn" data-modal="close">${CloseIcon}</button>`
      );
      this.setBodyContent(this.options.bodyContent ?? "");
      this.setFooterContent(this.options.footerContent ?? "");
    }
    _setupDefaultEvents() {
      const $closeBtn = this.$modalHeader.querySelector("[data-modal=close]");
      if ($closeBtn) {
        $closeBtn.addEventListener("click", () => {
          this.hide();
        });
      }
      if (this.options.closeOnClickOutside) {
        document.addEventListener(
          "click",
          (event) => {
            var _a, _b;
            if (event.target) {
              const outsideClick = !((_b = (_a = this.drawer.toolbar) == null ? void 0 : _a.$settingBtn) == null ? void 0 : _b.contains(event.target)) && !this.$modal.contains(event.target);
              if (outsideClick) {
                this.hide();
              }
            }
          },
          false
        );
      }
    }
    _createModal() {
      this.$modal = stringToHTMLElement(
        /*html*/
        `
    <div class="drawer-modal"></div>`
      );
      this.$modalHeader = stringToHTMLElement(
        /*html*/
        `
      <div class="drawer-modal-header"></div>`
      );
      this.$modalBody = stringToHTMLElement(
        /*html*/
        `
      <div class="drawer-modal-body"></div>`
      );
      this.$modalFooter = stringToHTMLElement(
        /*html*/
        `
      <div class="drawer-modal-footer"></div>`
      );
      this.$modal.modal = this;
      this.$modal.append(...[this.$modalHeader, this.$modalBody, this.$modalFooter]);
      if (this.options.backdrop) {
        this.$backdrop = stringToHTMLElement(
          /*html*/
          `
      <div class="backdrop"></div>
      `
        );
        this.$backdrop.append(this.$modal);
        document.body.append(this.$backdrop);
      } else {
        document.body.append(this.$modal);
      }
    }
    setHeaderContent(content) {
      if (content) {
        this.$modalHeader.innerHTML = content;
      }
    }
    setBodyContent(content) {
      this.$modalBody.innerHTML = content;
    }
    appendBodyContent(content) {
      this.$modalBody.append(content);
    }
    setFooterContent(content) {
      this.$modalFooter.innerHTML = content;
    }
    show() {
      if (this.$backdrop) {
        this.$backdrop.classList.add("show");
      }
      this.$modal.classList.add("show");
    }
    hide() {
      if (this.$backdrop) {
        this.$backdrop.classList.remove("show");
      }
      this.$modal.classList.remove("show");
    }
    isVisible() {
      return this.$modal.classList.contains("show");
    }
    destroy() {
      this.hide();
      this.$modal.remove();
    }
  }
  class SettingsModal extends Modal {
    constructor(drawer2) {
      super(drawer2);
      __publicField(this, "filled");
      __publicField(this, "grid");
      __publicField(this, "guides");
      __publicField(this, "opacity");
      __publicField(this, "xor");
      __publicField(this, "drawer");
      __publicField(this, "$fillSettingInput");
      __publicField(this, "$gridSettingInput");
      __publicField(this, "$guidesSettingInput");
      __publicField(this, "$opacitySettingInput");
      __publicField(this, "$xorSettingInput");
      this.drawer = drawer2;
      this.filled = drawer2.options.fill;
      this.grid = drawer2.options.grid;
      this.guides = drawer2.options.guides;
      this.opacity = drawer2.options.opacity;
      this.xor = drawer2.options.xor;
      this.fill();
      this._setupSelectors();
      this._initEvents();
    }
    /**
     * Fill the content modal
     */
    fill() {
      this.setBodyContent(
        /*html*/
        `
      <ul class="drawer-modal-body-list">
        <li class="drawer-modal-body-list-item">
          <label for="setting-opacity-${this.drawer.options.id}">Global opacity</label>
          <input id="setting-opacity-${this.drawer.options.id}"  name="opacity-${this.drawer.options.id}" type="number" min="0.1" max="1" step="0.1" value="${this.opacity}"/>
        </li>
        <li class="drawer-modal-body-list-item">
          <label for="setting-fill-${this.drawer.options.id}">Fill</label>
          <input id="setting-fill-${this.drawer.options.id}" type="checkbox" name="fill-${this.drawer.options.id}" ${this.filled ? "checked" : ""}>
        </li>
        <li class="drawer-modal-body-list-item">
          <label for="setting-grid-${this.drawer.options.id}">Grid (css only)</label>
          <input id="setting-grid-${this.drawer.options.id}" type="checkbox" name="grid-${this.drawer.options.id}" ${this.grid ? "checked" : ""}>
        </li>
        <li class="drawer-modal-body-list-item">
          <label for="setting-guides-${this.drawer.options.id}">Guides</label>
          <input id="setting-guides-${this.drawer.options.id}" type="checkbox" name="guides-${this.drawer.options.id}" ${this.guides ? "checked" : ""}>
        </li>
        <li class="drawer-modal-body-list-item">
          <label for="setting-xor-${this.drawer.options.id}">XOR</label>
          <input id="setting-xor-${this.drawer.options.id}" type="checkbox" name="xor-${this.drawer.options.id}" ${this.xor ? "checked" : ""}>
        </li>
      </ul>
    `
      );
      this.setFooterContent(
        /*html*/
        `<small>Version ${this.drawer.VERSION}</small>`
      );
    }
    _setupSelectors() {
      this.$fillSettingInput = this.$modalBody.querySelector(
        `#setting-fill-${this.drawer.options.id}`
      );
      this.$gridSettingInput = this.$modalBody.querySelector(
        `#setting-grid-${this.drawer.options.id}`
      );
      this.$guidesSettingInput = this.$modalBody.querySelector(
        `#setting-guides-${this.drawer.options.id}`
      );
      this.$opacitySettingInput = this.$modalBody.querySelector(
        `#setting-opacity-${this.drawer.options.id}`
      );
      this.$xorSettingInput = this.$modalBody.querySelector(`#setting-xor-${this.drawer.options.id}`);
    }
    _initEvents() {
      this.$fillSettingInput.addEventListener("change", () => {
        this.drawer.options.fill = this.$fillSettingInput.checked;
      });
      this.$gridSettingInput.addEventListener("change", () => {
        if (this.$gridSettingInput.checked) {
          this.drawer.addGrid();
        } else {
          this.drawer.removeGrid();
        }
      });
      this.$guidesSettingInput.addEventListener("change", () => {
        this.drawer.options.guides = this.$guidesSettingInput.checked;
      });
      this.$opacitySettingInput.addEventListener("change", () => {
        const opacity = Number(this.$opacitySettingInput.value);
        this.drawer.options.opacity = opacity;
        this.drawer.ctx.globalAlpha = opacity;
      });
      this.$xorSettingInput.addEventListener("change", () => {
        this.xor = this.$xorSettingInput.checked;
        this.drawer.options.xor = this.xor;
        if (this.$xorSettingInput.checked) {
          this.drawer.ctx.globalCompositeOperation = "xor";
        } else {
          this.drawer.ctx.globalCompositeOperation = "source-over";
        }
      });
    }
  }
  const version = "1.1.3";
  const coloris = "";
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
  const BrushIcon = `<svg width="16" height="16" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
    stroke-width="32"
    d="M452.37 59.63h0a40.49 40.49 0 0 0-57.26 0L184 294.74c23.08 4.7 46.12 27.29 49.26 49.26l219.11-227.11a40.49 40.49 0 0 0 0-57.26ZM138 336c-29.88 0-54 24.5-54 54.86c0 23.95-20.88 36.57-36 36.57C64.56 449.74 92.82 464 120 464c39.78 0 72-32.73 72-73.14c0-30.36-24.12-54.86-54-54.86Z" />
</svg>
`;
  const ClearIcon = `<svg width="16" height="16" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
<path fill="currentColor" d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z"/>
</svg>`;
  const DownloadIcon = `<svg width="16" height="16" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
<path fill="currentColor" d="M240 136v64a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h40a8 8 0 0 1 0 16H32v64h192v-64h-40a8 8 0 0 1 0-16h40a16 16 0 0 1 16 16Zm-117.66-2.34a8 8 0 0 0 11.32 0l48-48a8 8 0 0 0-11.32-11.32L136 108.69V24a8 8 0 0 0-16 0v84.69L85.66 74.34a8 8 0 0 0-11.32 11.32ZM200 168a12 12 0 1 0-12 12a12 12 0 0 0 12-12Z"/>
</svg>`;
  const EraserIcon = `<svg width="16" height="16" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
<path fill="currentColor"
    d="M225 80.4L183.6 39a24 24 0 0 0-33.94 0L31 157.66a24 24 0 0 0 0 33.94l30.06 30.06a8 8 0 0 0 5.68 2.34H216a8 8 0 0 0 0-16h-84.7l93.7-93.66a24 24 0 0 0 0-33.94ZM108.68 208H70.05l-27.72-27.72a8 8 0 0 1 0-11.31L96 115.31L148.69 168Zm105-105L160 156.69L107.31 104L161 50.34a8 8 0 0 1 11.32 0l41.38 41.38a8 8 0 0 1 0 11.31Z" />
</svg>
`;
  const RedoIcon = `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path fill="currentColor" d="M9.9 19q-2.425 0-4.163-1.575T4 13.5q0-2.35 1.738-3.925T9.9 8h6.3l-2.6-2.6L15 4l5 5l-5 5l-1.4-1.4l2.6-2.6H9.9q-1.575 0-2.738 1T6 13.5Q6 15 7.163 16T9.9 17H17v2H9.9Z"/>
</svg>`;
  const SettingIcon = `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path fill="currentColor" d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98Zm-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4Zm0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2Z"/>
</svg>`;
  const ShapeIcon = `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path fill="currentColor" d="M17 15.7V13h2v4l-9 4l-7-7l4-9h4v2H8.3l-2.9 6.6l5 5l6.6-2.9M22 5v2h-3v3h-2V7h-3V5h3V2h2v3h3Z"/>
</svg>`;
  const TextIcon = `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path fill="currentColor" d="M13 6v15h-2V6H5V4h14v2h-6Z"/>
</svg>`;
  const UndoIcon = `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path fill="currentColor" d="M7 19v-2h7.1q1.575 0 2.738-1T18 13.5q0-1.5-1.163-2.5T14.1 10H7.8l2.6 2.6L9 14L4 9l5-5l1.4 1.4L7.8 8h6.3q2.425 0 4.163 1.575T20 13.5q0 2.35-1.738 3.925T14.1 19H7Z"/>
</svg>`;
  const UploadIcon = `<svg width="16" height="16" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
<path fill="currentColor" d="M238 136v64a14 14 0 0 1-14 14H32a14 14 0 0 1-14-14v-64a14 14 0 0 1 14-14h48a6 6 0 0 1 0 12H32a2 2 0 0 0-2 2v64a2 2 0 0 0 2 2h192a2 2 0 0 0 2-2v-64a2 2 0 0 0-2-2h-48a6 6 0 0 1 0-12h48a14 14 0 0 1 14 14ZM84.24 76.24L122 38.49V128a6 6 0 0 0 12 0V38.49l37.76 37.75a6 6 0 0 0 8.48-8.48l-48-48a6 6 0 0 0-8.48 0l-48 48a6 6 0 0 0 8.48 8.48ZM198 168a10 10 0 1 0-10 10a10 10 0 0 0 10-10Z"/>
</svg>`;
  class Toolbar {
    constructor(drawer2, options) {
      __publicField(this, "drawer");
      __publicField(this, "options");
      __publicField(this, "$toolbar");
      __publicField(this, "$undoBtn");
      __publicField(this, "$redoBtn");
      __publicField(this, "$brushBtn");
      __publicField(this, "$eraserBtn");
      __publicField(this, "$textBtn");
      __publicField(this, "$drawGroupBtn");
      __publicField(this, "$drawGroupMenu");
      __publicField(this, "$clearBtn");
      __publicField(this, "$lineThickness");
      __publicField(this, "$downloadBtn");
      __publicField(this, "$colorPicker");
      __publicField(this, "$shapeBtn");
      __publicField(this, "$shapeMenu");
      __publicField(this, "$uploadFile");
      __publicField(this, "$settingBtn");
      __publicField(this, "$colorPickerLabel");
      __publicField(this, "customBtn", {});
      this.drawer = drawer2;
      this.options = deepMerge(defaultOptionsToolbar, options);
    }
    /**
     * Adding an empty toolbar element
     * @returns {Promise<HTMLDivElement>} HTML toolbar element
     */
    addToolbar() {
      return new Promise((resolve, reject) => {
        try {
          if (!this.$toolbar) {
            const toolbar = (
              /*html*/
              `<div class="toolbar ${this.options.toolbarPosition ?? "outerTop"}"></div>`
            );
            this.$toolbar = stringToHTMLElement(toolbar);
            this.$toolbar.style.maxWidth = this.drawer.$canvas.width + "px";
            this.$toolbar.style.maxHeight = this.drawer.$canvas.height + "px";
            if (this.options.toolbarPosition === "outerTop" || this.options.toolbarPosition === "outerStart") {
              this.drawer.$canvas.before(this.$toolbar);
            } else {
              this.drawer.$drawerContainer.appendChild(this.$toolbar);
            }
            if (this.options.toolbarPosition === "outerStart" || this.options.toolbarPosition === "outerEnd") {
              this.drawer.$drawerContainer.style.display = "flex";
            }
            resolve(this.$toolbar);
          } else {
            reject(new DrawerError(`Toolbar already added.`));
          }
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    /**
     * Add default button to toolbar,
     * List of defaults buttons :
     * undo, redo, brush, eraser, text, clear, line thickness, colorpicker, upload, download, setting
     */
    addDefaults() {
      this.addUndoBtn();
      this.addRedoBtn();
      this.addBrushBtn();
      this.addEraserBtn();
      this.addTextBtn();
      this.addClearBtn();
      this.addShapeBtn();
      this.addLineThicknessBtn();
      this.addColorPickerBtn();
      this.addUploadFileBtn();
      this.addDownloadBtn();
      this.addSettingBtn();
    }
    /**
     * Add undo button to toolbar if exist
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addUndoBtn(action) {
      return new Promise((resolve, reject) => {
        try {
          if (this.$toolbar && !this.$undoBtn) {
            const undoBtn = (
              /*html*/
              `<button title="${"Redo"}" class="btn" disabled>${UndoIcon}</button>`
            );
            const $undoBtn = stringToHTMLElement(undoBtn);
            this.$undoBtn = $undoBtn;
            this.$toolbar.appendChild(this.$undoBtn);
            this.$undoBtn.addEventListener("click", () => {
              if (typeof action === "function") {
                action.call(this, $undoBtn);
              } else {
                this.drawer.undo().then(() => {
                  this.drawer.$canvas.dispatchEvent(DrawEvent("change", this.drawer.getData()));
                });
                this._manageUndoRedoBtn();
              }
            });
            resolve(this.$undoBtn);
          } else if (!this.$toolbar) {
            reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
          } else {
            reject(new DrawerError(`Undo button already added, you cannot add it again.`));
          }
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    /**
     * Add brush button to toolbar if exist
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addRedoBtn(action) {
      return new Promise((resolve, reject) => {
        try {
          if (this.$toolbar && !this.$redoBtn) {
            const redoBtn = (
              /*html*/
              `<button title="${"Redo"}" class="btn" disabled>${RedoIcon}</button>`
            );
            const $redoBtn = stringToHTMLElement(redoBtn);
            this.$redoBtn = $redoBtn;
            this.$toolbar.appendChild(this.$redoBtn);
            this.$redoBtn.addEventListener("click", () => {
              if (typeof action === "function") {
                action.call(this, $redoBtn);
              } else {
                this.drawer.redo().then(() => {
                  this.drawer.$canvas.dispatchEvent(DrawEvent("change", this.drawer.getData()));
                });
                this._manageUndoRedoBtn();
              }
            });
            resolve(this.$redoBtn);
          } else if (!this.$toolbar) {
            reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
          } else {
            reject(new DrawerError(`Redo button already added, you cannot add it again.`));
          }
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    /**
     * Add brush button to toolbar if exist
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addBrushBtn(action) {
      return new Promise((resolve, reject) => {
        try {
          if (this.$toolbar && !this.$brushBtn) {
            const brushBtn = (
              /*html*/
              `<button title="${"Brush"}" class="btn active">${BrushIcon}</button>`
            );
            const $brushBtn = stringToHTMLElement(brushBtn);
            this.$brushBtn = $brushBtn;
            this.$toolbar.appendChild(this.$brushBtn);
            this.$brushBtn.addEventListener("click", () => {
              if (typeof action === "function") {
                action.call(this, $brushBtn);
              } else {
                this.drawer.setTool("brush");
              }
            });
            resolve(this.$brushBtn);
          } else if (!this.$toolbar) {
            reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
          } else {
            reject(new DrawerError(`Brush button already added, you cannot add it again.`));
          }
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    /**
     * Add eraser button to toolbar if exist
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addEraserBtn(action) {
      return new Promise((resolve, reject) => {
        try {
          if (this.$toolbar && !this.$eraserBtn) {
            const eraserBtn = (
              /*html*/
              `<button title="${"Eraser"}" class="btn">${EraserIcon}</button>`
            );
            const $eraserBtn = stringToHTMLElement(eraserBtn);
            this.$eraserBtn = $eraserBtn;
            this.$toolbar.appendChild(this.$eraserBtn);
            this.$eraserBtn.addEventListener("click", () => {
              if (typeof action === "function") {
                action.call(this, $eraserBtn);
              } else {
                this.drawer.setTool("eraser");
              }
            });
            resolve(this.$eraserBtn);
          } else if (!this.$toolbar) {
            reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
          } else {
            reject(new DrawerError(`Eraser button already added, you cannot add it again.`));
          }
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    /**
     * Add text button to toolbar if exist
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addTextBtn(action) {
      return new Promise((resolve, reject) => {
        try {
          if (this.$toolbar && !this.$textBtn) {
            const textBtn = (
              /*html*/
              `<button title="${"Text zone"}" class="btn">${TextIcon}</button>`
            );
            const $textBtn = stringToHTMLElement(textBtn);
            this.$textBtn = $textBtn;
            this.$toolbar.appendChild(this.$textBtn);
            this.$textBtn.addEventListener("click", () => {
              if (typeof action === "function") {
                action.call(this, $textBtn);
              } else {
                this.drawer.setTool("text");
              }
            });
            resolve(this.$textBtn);
          } else if (!this.$toolbar) {
            reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
          } else {
            reject(new DrawerError(`Text button already added, you cannot add it again.`));
          }
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    /**
     * Add draw group button (contain brush, eraser and text zone)
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addDrawGroupBtn(action) {
      return new Promise((resolve, reject) => {
        var _a;
        try {
          if (this.$toolbar && !this.$drawGroupBtn && !this.$brushBtn && !this.$eraserBtn && !this.$textBtn) {
            let icon = BrushIcon;
            let title = "Brush";
            if (this.drawer.activeTool === "eraser") {
              icon = EraserIcon;
              title = "Eraser";
            } else if (this.drawer.activeTool === "text") {
              icon = TextIcon;
              title = "Text zone";
            }
            const active = ["brush", "eraser", "text"].includes(this.drawer.activeTool) ? " active" : "";
            const drawGroupBtn = (
              /*html*/
              `<button title="${title}" class="btn${active}">${icon}</button>`
            );
            const drawGroupMenu = (
              /*html*/
              `
            <ul class="drawer-menu">
              <li class="drawer-menu-item">
                <button data-tool="brush" title=${"Brush"} class="btn">${BrushIcon}</button>
              </li>
              <li class="drawer-menu-item">
                <button data-tool="eraser" title=${"Eraser"} class="btn">${EraserIcon}</button>
              </li>
              <li class="drawer-menu-item">
                <button data-tool="text" title=${"Text zone"} class="btn">${TextIcon}</button>
              </li>
            </ul>`
            );
            const $drawGroupBtn = stringToHTMLElement(drawGroupBtn);
            const $drawGroupMenu = stringToHTMLElement(drawGroupMenu);
            this.$drawGroupBtn = $drawGroupBtn;
            this.$drawGroupMenu = $drawGroupMenu;
            this.$toolbar.appendChild($drawGroupBtn);
            (_a = document.querySelector("body")) == null ? void 0 : _a.appendChild($drawGroupMenu);
            $drawGroupBtn.addEventListener("click", () => {
              if (typeof action === "function") {
                action.call(this, $drawGroupBtn);
              } else {
                this._toggleMenu($drawGroupBtn, $drawGroupMenu);
              }
            });
            $drawGroupMenu.querySelectorAll("button").forEach(($btn) => {
              $btn.addEventListener("click", () => {
                const tool = $btn.dataset.tool;
                this.drawer.setTool(tool);
                $drawGroupMenu.classList.remove("show");
              });
            });
            this._initClickOutsideMenuEvent($drawGroupBtn, $drawGroupMenu);
            resolve($drawGroupBtn);
          } else if (!this.$toolbar) {
            reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
          } else {
            reject(
              new DrawerError(`A draw button already added, you cannot add it again, please remove add method before.`)
            );
          }
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    /**
     * Add clear button to toolbar if exist
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addClearBtn(action) {
      return new Promise((resolve, reject) => {
        try {
          if (this.$toolbar && !this.$clearBtn) {
            const clearBtn = (
              /*html*/
              `<button title="${"Clear draw"}" class="btn">${ClearIcon}</button>`
            );
            const $clearBtn = stringToHTMLElement(clearBtn);
            this.$clearBtn = $clearBtn;
            this.$toolbar.appendChild(this.$clearBtn);
            this.$clearBtn.addEventListener("click", () => {
              if (typeof action === "function") {
                action.call(this, $clearBtn);
              } else if (!this.drawer.isEmpty()) {
                if (confirm(`${"Voulez vous suppimer la totalité du dessin ?"}`)) {
                  this.drawer.clear();
                }
              }
            });
            resolve(this.$clearBtn);
          } else if (!this.$toolbar) {
            reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
          } else {
            reject(new DrawerError(`Clear button already added, you cannot add it again.`));
          }
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    /**
     * Add text button to toolbar if exist
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addShapeBtn(action) {
      return new Promise((resolve, reject) => {
        var _a;
        try {
          if (this.$toolbar && !this.$shapeBtn) {
            const shapeBtn = (
              /*html*/
              `<button title="${"Draw shape"}" class="btn btn-shape">${ShapeIcon}</button>`
            );
            const shapeMenu = (
              /*html*/
              `
            <ul class="drawer-menu">
              <li class="drawer-menu-item">
                <button data-shape="triangle" class="btn triangle">${TriangleIcon}</button>
              </li>
              <li class="drawer-menu-item">
                <button data-shape="rect" class="btn rect">${RectIcon}</button>
              </li>
              <li class="drawer-menu-item">
                <button data-shape="square" class="btn square">${SquareIcon}</button>
              </li>
              <li class="drawer-menu-item">
                <button data-shape="line" class="btn line">${LineIcon}</button>
              </li>
              <li class="drawer-menu-item">
                <button data-shape="arrow" class="btn arrow">${ArrowIcon}</button>
              </li>
              <li class="drawer-menu-item">
                <button data-shape="circle" class="btn circle">${CircleIcon}</button>
              </li>
            </ul>`
            );
            const $shapeMenu = stringToHTMLElement(shapeMenu);
            const $shapeBtn = stringToHTMLElement(shapeBtn);
            this.$shapeBtn = $shapeBtn;
            this.$shapeMenu = $shapeMenu;
            this.$toolbar.appendChild(this.$shapeBtn);
            (_a = document.querySelector("body")) == null ? void 0 : _a.appendChild(this.$shapeMenu);
            this.$shapeBtn.addEventListener("click", () => {
              if (typeof action === "function") {
                action.call(this, $shapeBtn);
              } else {
                this._toggleMenu($shapeBtn, $shapeMenu);
              }
            });
            this.$shapeMenu.querySelectorAll("button").forEach(($btn) => {
              $btn.addEventListener("click", () => {
                const shape = $btn.dataset.shape;
                this.drawer.setShape(shape);
              });
            });
            this._initClickOutsideMenuEvent($shapeBtn, $shapeMenu);
            resolve($shapeBtn);
          } else if (!this.$toolbar) {
            reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
          } else {
            reject(new DrawerError(`Shape button already added, you cannot add it again.`));
          }
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    /**
     * Add line thickness input range to toolbar if exist
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLInputElement>} HTML input range element
     */
    addLineThicknessBtn(action) {
      return new Promise((resolve, reject) => {
        try {
          if (this.$toolbar && !this.$lineThickness) {
            const lineThickness = (
              /*html*/
              `
            <div class="drawer-range">
              <input title="${"Thickness"}" id="${this.drawer.$canvas.id}-line-tickness" type="range" class="" min="1" value="${this.drawer.options.lineThickness}" max="30" />
              <span class="counter">${this.drawer.options.lineThickness}</span>
            </div>`
            );
            const $lineThickness = stringToHTMLElement(lineThickness);
            this.$lineThickness = $lineThickness;
            this.$toolbar.appendChild(this.$lineThickness);
            this.$lineThickness.addEventListener(
              "input",
              debounce(() => {
                var _a;
                if (typeof action === "function") {
                  action.call(this, $lineThickness.querySelector("input"));
                  return;
                }
                const lineThickness2 = parseInt((_a = $lineThickness.querySelector("input")) == null ? void 0 : _a.value);
                this.drawer.setLineWidth(lineThickness2);
              })
            );
            resolve(this.$lineThickness.querySelector("input"));
          } else if (!this.$toolbar) {
            reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
          } else {
            reject(new DrawerError(`Line tickness button already added, you cannot add it again.`));
          }
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    /**
     * Add a colorpicker button
     * see {@link addToolbar} before use it
     * using Coloris, for customisation please see here {@link https://github.com/mdbassit/Coloris}
     * @param {action<HTMLInputElement>?} action Action call after color selected
     * @returns {Promise<HTMLInputElement>}
     */
    addColorPickerBtn(action) {
      return new Promise((resolve, reject) => {
        try {
          if (this.$toolbar && !this.$colorPicker) {
            const colorPickerContainer = (
              /*html*/
              `
            <div class="container-colorpicker">
              <input class="btn" title="${"Color"}" id="colopicker-${this.drawer.options.id}" class="" type="text" value="${this.drawer.options.color}" data-coloris/>
            </div>
            `
            );
            const $colorPickerContainer = stringToHTMLElement(colorPickerContainer);
            this.$toolbar.appendChild($colorPickerContainer);
            const $colorPicker = $colorPickerContainer.querySelector("input");
            this.$colorPicker = $colorPicker;
            Coloris.init();
            Coloris({
              el: `#colopicker-${this.drawer.options.id}`,
              theme: "polaroid",
              swatches: this.drawer.options.availableColor,
              swatchesOnly: this.drawer.options.availableColorOnly,
              formatToggle: !this.drawer.options.availableColorOnly
            });
            $colorPicker.addEventListener("change", () => {
              if (typeof action === "function") {
                action.bind(this, $colorPicker, $colorPicker.value);
              } else {
                this.drawer.setColor($colorPicker.value);
              }
            });
            resolve(this.$colorPicker);
          } else if (!this.$toolbar) {
            reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
          } else {
            reject(new DrawerError(`Colorpicker button already added, you cannot add it again.`));
          }
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    /**
     * Add upload file button
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLInputElement>} HTML input range element
     */
    addUploadFileBtn(action) {
      return new Promise((resolve, reject) => {
        try {
          if (this.$toolbar && !this.$uploadFile) {
            const uploadFile = (
              /*html*/
              `
            <div class="container-uploadFile">
              <input id="${this.drawer.options.id}-uploadfile" title="${"Color"}" class="" type="file" />
              <label title="${"Upload file"}" accept="image/png, image/jpeg, .svg" class="btn" for="${this.drawer.options.id}-uploadfile">
                ${UploadIcon}
              </label>
            </div>
            `
            );
            const $uploadFileContainer = stringToHTMLElement(uploadFile);
            this.$toolbar.appendChild($uploadFileContainer);
            const $uploadFile = $uploadFileContainer.querySelector("input");
            this.$uploadFile = $uploadFile;
            this.$uploadFile.addEventListener("change", () => {
              if (typeof action === "function") {
                action.call(this, $uploadFile);
              } else {
                this._uploadFile();
              }
            });
            resolve(this.$uploadFile);
          } else if (!this.$toolbar) {
            reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
          } else {
            reject(new DrawerError(`Upload file button already added, you cannot add it again.`));
          }
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    /**
     * Add a download button
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addDownloadBtn(action) {
      return new Promise((resolve, reject) => {
        if (this.$toolbar && !this.$downloadBtn) {
          const download = (
            /*html*/
            `<button title="${"Download"}" class="btn">${DownloadIcon}</button>`
          );
          const $downloadBtn = stringToHTMLElement(download);
          this.$downloadBtn = $downloadBtn;
          this.$toolbar.appendChild(this.$downloadBtn);
          this.$downloadBtn.addEventListener("click", () => {
            if (typeof action === "function") {
              action.call(this, $downloadBtn);
            } else {
              const data = this.drawer.$canvas.toDataURL("image/png");
              const $link = document.createElement("a");
              $link.download = this.drawer.$canvas.id || "draw.png";
              $link.href = data;
              document.body.appendChild($link);
              $link.click();
              document.body.removeChild($link);
            }
          });
          resolve(this.$downloadBtn);
        } else if (!this.$toolbar) {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        } else {
          reject(new DrawerError(`Download button already added, you cannot add it again.`));
        }
      });
    }
    /**
     * Add a params button
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addSettingBtn(action) {
      return new Promise((resolve, reject) => {
        if (this.$toolbar && !this.$settingBtn) {
          const settingBtn = (
            /*html*/
            `<button title="${"Setting"}" class="btn">${SettingIcon}</button>`
          );
          const $settingBtn = stringToHTMLElement(settingBtn);
          this.$settingBtn = $settingBtn;
          this.$toolbar.appendChild(this.$settingBtn);
          this.$settingBtn.addEventListener("click", () => {
            if (typeof action === "function") {
              action.call(this, $settingBtn);
            } else if (this.drawer.settingModal.isVisible()) {
              this.drawer.settingModal.hide();
            } else {
              this.drawer.settingModal.show();
            }
          });
          resolve(this.$settingBtn);
        } else if (!this.$toolbar) {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        } else {
          reject(new DrawerError(`Setting button already added, you cannot add it again.`));
        }
      });
    }
    /**
     * Add a custom button to toolbar
     * see {@link addToolbar} before use it
     * @param {String} name Button name (must be unique)
     * @param {String} title Title for button
     * @param {String} label Label or icon
     * @param {action<HTMLButtonElement>} action Action to do onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addCustomBtn(name, title, label, action) {
      return new Promise((resolve, reject) => {
        if (this.$toolbar && !this.customBtn[name]) {
          const customBtn = (
            /*html*/
            `<button title="${title}" class="btn">${label}</button>`
          );
          const $customBtn = stringToHTMLElement(customBtn);
          this.customBtn[name] = $customBtn;
          this.$toolbar.appendChild(this.customBtn[name]);
          this.customBtn[name].addEventListener("click", () => {
            if (typeof action === "function") {
              action.call(this, this.customBtn[name]);
            } else {
              throw new DrawerError(`No action provided for custom button name '${name}`);
            }
          });
          resolve(this.customBtn[name]);
        } else if (!this.$toolbar) {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first.`));
        } else {
          reject(new DrawerError(`Custom button with name "${name}" already exist.`));
        }
      });
    }
    /**
     * Apply active state to btn
     * @param {HTMLButtonElement} $btn Button to add active class
     */
    setActiveBtn($btn) {
      try {
        if (this.$toolbar) {
          this.$toolbar.querySelectorAll(".btn").forEach(($b) => $b.classList.remove("active"));
          if (this.$drawGroupMenu) {
            this.$drawGroupMenu.querySelectorAll(".btn").forEach(($b) => $b.classList.remove("active"));
            $btn = this.$drawGroupBtn;
            let icon = BrushIcon;
            let title = "Brush";
            if (this.drawer.activeTool === "eraser") {
              icon = EraserIcon;
              title = "Eraser";
            } else if (this.drawer.activeTool === "text") {
              icon = TextIcon;
              title = "Text zone";
            }
            $btn.innerHTML = icon;
            $btn.title = title;
          }
          if (this.$shapeMenu) {
            this.$shapeMenu.querySelectorAll(".btn").forEach(($b) => $b.classList.remove("active"));
          }
          $btn == null ? void 0 : $btn.classList.add("active");
        } else {
          throw new DrawerError(`No toolbar provided`);
        }
      } catch (error) {
        throw new DrawerError(error.message);
      }
    }
    /**
     * Upload file from input file
     */
    _uploadFile() {
      var _a;
      if ((_a = this.$uploadFile) == null ? void 0 : _a.files) {
        const file = this.$uploadFile.files[0];
        if (file) {
          this.drawer.loadFromData(URL.createObjectURL(file)).then(() => {
            this.drawer.$canvas.dispatchEvent(DrawEvent("change", this.drawer.getData()));
          });
        }
      }
    }
    _manageUndoRedoBtn() {
      if (!this.drawer.undo_list.length && this.$undoBtn) {
        this.$undoBtn.disabled = true;
      } else if (this.$undoBtn) {
        this.$undoBtn.disabled = false;
      }
      if (!this.drawer.redo_list.length && this.$redoBtn) {
        this.$redoBtn.disabled = true;
      } else if (this.$redoBtn) {
        this.$redoBtn.disabled = false;
      }
    }
    /**
     * Toggle show/hide menu
     * @param $btn
     * @param $menu
     * @returns
     */
    _toggleMenu($btn, $menu) {
      if ($menu.classList.contains("show")) {
        $menu.classList.remove("show");
        return;
      }
      let { bottom, left, top } = $btn.getBoundingClientRect();
      const { width, height } = $menu.getBoundingClientRect();
      if (left + width > window.innerWidth) {
        left = left - (left + width - window.innerWidth) - getScrollbarWidth();
      }
      if (bottom + height > window.innerHeight) {
        bottom = top - height - 5;
      }
      $menu.style.top = bottom + 3 + "px";
      $menu.style.left = left + "px";
      $menu.classList.add("show");
    }
    /**
     * event for close menu on click outside
     * @param $btn
     * @param $menu
     */
    _initClickOutsideMenuEvent($btn, $menu) {
      document.addEventListener(
        "click",
        (event) => {
          if (event.target) {
            const outsideClick = !$btn.contains(event.target) && !$menu.contains(event.target);
            if (outsideClick) {
              $menu.classList.remove("show");
            }
          }
        },
        false
      );
    }
  }
  class Drawer extends History {
    /**
     *
     * @param {HTMLElement} $el Container for drawer
     * @param {Partial<DrawerOptions>} options options for drawer
     */
    constructor($el, options = {}) {
      super();
      __publicField(this, "isDrawing", false);
      __publicField(this, "activeTool", "brush");
      __publicField(this, "dotted", false);
      // options
      __publicField(this, "options", defaultOptionsDrawer);
      __publicField(this, "$sourceElement");
      __publicField(this, "$drawerContainer");
      __privateAdd(this, _dragStartLocation, void 0);
      __privateAdd(this, _snapshot, void 0);
      __privateAdd(this, _availableShape, [
        "brush",
        "eraser",
        "rect",
        "circle",
        "square",
        "arrow",
        "line",
        "star",
        "triangle",
        "polygon"
      ]);
      __publicField(this, "settingModal");
      __publicField(this, "gridActive");
      __publicField(this, "VERSION", version);
      __publicField(this, "toolbar");
      __privateAdd(this, _cloneCanvas, void 0);
      try {
        if ($el instanceof HTMLElement) {
          this.$sourceElement = $el;
          this.options = deepMerge(defaultOptionsDrawer, options);
          this._init();
          this.toolbar = new Toolbar(this, { toolbarPosition: this.options.toolbarPosition });
          const saved = localStorage.getItem(this.options.localStorageKey);
          if (saved && !this.isEmpty(saved)) {
            this.loadFromData(saved);
          }
          if (this.options.defaultToolbar) {
            this.toolbar.addToolbar();
            this.toolbar.addDefaults();
          }
          this.settingModal = new SettingsModal(this);
          if (this.options.dotted) {
            this.setDottedLine(true, this.options.dash);
          }
        } else {
          throw new DrawerError(`element must be an instance of HTMLElement`);
        }
      } catch (error) {
        throw new DrawerError(error.message);
      }
    }
    /**
     * Draw html drawer
     */
    _buildDrawer() {
      try {
        this.$drawerContainer = stringToHTMLElement(
          /*html*/
          `<div class="drawer-container"></div>`
        );
        const canvas = (
          /*html*/
          `
      <canvas tabindex="0" id="${this.options.id}" height="${this.options.height}" width="${this.options.width}" class="canvas-drawer"></canvas>
      `
        );
        this.$canvas = stringToHTMLElement(canvas);
        __privateSet(this, _cloneCanvas, this.$canvas.cloneNode());
        this.ctx = this.$canvas.getContext("2d", { willReadFrequently: true });
        this.ctx.globalAlpha = this.options.opacity;
        this.$drawerContainer.appendChild(this.$canvas);
      } catch (error) {
        throw new DrawerError(error.message);
      }
    }
    /**
     * @private
     * initialize canvas and event listener
     */
    _init() {
      try {
        this._buildDrawer();
        this.$sourceElement.appendChild(this.$drawerContainer);
        this.setBgColor();
        this._initHandlerEvents();
        this.setCanvas(this.$canvas);
        this._updateCursor();
        if (this.options.grid) {
          this.addGrid();
        }
        this.$canvas.drawer = this;
        this.$sourceElement.dispatchEvent(DrawEvent("init", this));
      } catch (error) {
        throw new DrawerError(error.message);
      }
    }
    /**
     * Set canvas sizing
     * @param {number} width Width
     * @param {number} height Height
     * @returns {Promise<boolean>}
     */
    setSize(width, height) {
      return new Promise((resolve, reject) => {
        try {
          const data = this.getData();
          this.$canvas.width = width;
          this.$canvas.height = height;
          if (!this.isEmpty())
            this.loadFromData(data);
          if (this.toolbar.$toolbar) {
            this.toolbar.$toolbar.style.maxWidth = this.$canvas.width + "px";
            this.toolbar.$toolbar.style.maxHeight = this.$canvas.height + "px";
          }
          this.$canvas.dispatchEvent(DrawEvent("update.size", { setSize: { w: width, h: height } }));
          resolve(true);
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    /**
     * Check if canvas empty
     * @returns {boolean}
     */
    isEmpty(data) {
      data = data ?? this.getData();
      return __privateGet(this, _cloneCanvas).toDataURL() === data;
    }
    /**
     * Change drawing color
     * @param {String} color Color to apply to draw
     * @returns {Promise<boolean>}
     */
    setColor(color) {
      return new Promise((resolve, reject) => {
        try {
          this.options.color = color;
          this.ctx.strokeStyle = this.options.color;
          this.ctx.fillStyle = this.options.color;
          if (this.toolbar.$colorPicker) {
            this.toolbar.$colorPicker.value = color;
            this.toolbar.$colorPicker.dispatchEvent(new Event("input", { bubbles: true }));
          }
          this.$canvas.dispatchEvent(DrawEvent("update.color", { color }));
          resolve(true);
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    /**
     * Change css canvas background color (ignored on export)
     * @param bgColor canvas css background color
     * @returns {Promise<boolean>}
     */
    setBgColor(bgColor) {
      return new Promise((resolve, reject) => {
        try {
          this.$canvas.style.backgroundColor = bgColor ?? this.options.bgColor;
          this.$canvas.dispatchEvent(DrawEvent("update.bgColor", { bgColor }));
          resolve(true);
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    /**
     * set active tool
     * @param {keyof typeof DrawTools} toolName Tool name to set
     * @returns {Promise<boolean>}
     */
    setTool(toolName) {
      return new Promise((resolve, reject) => {
        try {
          this.activeTool = toolName;
          let $btn = null;
          if (this.toolbar.$toolbar) {
            switch (toolName) {
              case "brush":
                $btn = this.toolbar.$brushBtn;
                break;
              case "text":
                $btn = this.toolbar.$textBtn;
                break;
              case "eraser":
                $btn = this.toolbar.$eraserBtn;
                break;
              case "square":
              case "star":
              case "arrow":
              case "circle":
              case "line":
              case "rect":
              case "triangle":
                $btn = this.toolbar.$shapeBtn;
            }
            this.toolbar.setActiveBtn($btn);
            this.$canvas.dispatchEvent(DrawEvent("update.tool", { toolName }));
            resolve(true);
          }
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    /**
     * Clear all canvas
     *
     * @returns {Promise<HTMLCanvasElement>}
     */
    clear() {
      return new Promise((resolve, reject) => {
        try {
          this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
          this.redo_list = [];
          this.undo_list = [];
          this.gridActive = false;
          this.toolbar._manageUndoRedoBtn();
          this.$canvas.dispatchEvent(DrawEvent("change", this));
          const saved = localStorage.getItem(this.options.localStorageKey);
          if (saved) {
            localStorage.removeItem(this.options.localStorageKey);
          }
          resolve(this.$canvas);
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    /**
     * Inject data to canvas
     * @param data
     * @returns {Promise<Drawer>}
     */
    loadFromData(data) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const hRatio = this.$canvas.width / img.width;
          const vRatio = this.$canvas.height / img.height;
          const ratio = Math.min(hRatio, vRatio);
          const centerShift_x = (this.$canvas.width - img.width * ratio) / 2;
          const centerShift_y = (this.$canvas.height - img.height * ratio) / 2;
          this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
          this.ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
          );
          resolve(this);
        };
        img.onerror = () => {
          reject(new DrawerError(`Error during loading img with src : "${data}"`));
        };
        img.src = data;
      });
    }
    /**
     * Save draw to localStorage
     * {@link DrawerOptions.localStorageKey}
     */
    saveDraw() {
      try {
        if (this.options.localStorageKey) {
          localStorage.setItem(this.options.localStorageKey, this.getData());
        } else {
          throw new DrawerError(`Error saving draw, options 'localStorageKey' is wrong.`);
        }
      } catch (error) {
        throw new DrawerError(error.message);
      }
    }
    /**
     * Get date url from canvas
     * @returns {string} canvas png data
     */
    getData() {
      return this.$canvas.toDataURL("image/png");
    }
    /**
     * Change drawing shape
     * @param {"rect" | "circle" | "square" | "arrow" | "line" | "star" | "triangle" | "polygon"} shape
     */
    setShape(shape) {
      return new Promise((resolve, reject) => {
        var _a;
        try {
          if (this.toolbar.$shapeBtn) {
            let icon = "";
            switch (shape) {
              case "line":
                icon = LineIcon;
                break;
              case "square":
                icon = SquareIcon;
                break;
              case "rect":
                icon = RectIcon;
                break;
              case "star":
                icon = StarIcon;
                break;
              case "triangle":
                icon = TriangleIcon;
                break;
              case "circle":
                icon = CircleIcon;
                break;
              case "arrow":
                icon = ArrowIcon;
                break;
              default:
                break;
            }
            this.toolbar.$shapeBtn.innerHTML = icon;
            (_a = this.toolbar.$shapeMenu) == null ? void 0 : _a.classList.remove("show");
            this.setTool(shape);
            this.$canvas.dispatchEvent(DrawEvent("update.shape", { shape }));
            resolve(true);
          }
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    /**
     * Set line style dotted
     * @param {Boolean} active state
     * @param {number[]} [dash=[10, 5]] Line dash format [width, spacing]
     * @returns {Promise<boolean>}
     */
    setDottedLine(active, dash = [10, 5]) {
      return new Promise((resolve, reject) => {
        try {
          this.options.dash = dash;
          if (!active) {
            this.ctx.setLineDash([]);
          } else {
            this.ctx.setLineDash(dash);
          }
          this.dotted = active;
          this.$canvas.dispatchEvent(DrawEvent("update.dotted", { dotted: active, dash }));
          resolve(true);
        } catch (error) {
          reject(new DrawerError(error.message));
        }
      });
    }
    /**
     * Set the line width
     * @param {number} width Line width
     */
    setLineWidth(width) {
      try {
        this.options.lineThickness = width;
        this.ctx.lineWidth = width;
        if (this.toolbar.$lineThickness) {
          const $counter = this.toolbar.$lineThickness.querySelector(".counter");
          if ($counter) {
            $counter.innerHTML = String(this.options.lineThickness);
          }
        }
        this.$canvas.dispatchEvent(DrawEvent("update.lineThickness", { lineThickness: width }));
      } catch (error) {
        throw new DrawerError(error.message);
      }
    }
    /**
     * Check if active tool is shape
     * @returns {Boolean}
     */
    isShape() {
      return __privateGet(this, _availableShape).includes(this.activeTool);
    }
    /**
     * Start drawing (mousedown)
     * @param {PointerEvent} event
     * @returns
     */
    _startDraw(event) {
      if (this.activeTool === "text")
        return;
      if (this.isShape()) {
        __privateSet(this, _dragStartLocation, getMousePosition(this.$canvas, event));
      }
      this.ctx.beginPath();
      this.isDrawing = true;
      this._takeSnapshot();
      this.saveState();
      if (this.activeTool !== "brush" && this.activeTool !== "eraser" && this.options.guides) {
        const position = getMousePosition(this.$canvas, event);
        this._drawGuides(position);
        this._drawPointerDownArc(position);
      }
    }
    /**
     * @private _drawing
     * @param {PointerEvent} event
     * @returns
     */
    _drawing(event) {
      if (event.buttons !== 1 || this.activeTool === "text")
        return;
      if (this.activeTool !== "eraser") {
        this.ctx.globalCompositeOperation = this.settingModal.xor ? "xor" : "source-over";
      } else if (this.activeTool === "eraser") {
        this.ctx.globalCompositeOperation = "destination-out";
      } else {
        throw new Error(`Drawerror : unknown active draw tool "${this.activeTool}"`);
      }
      if (this.isShape()) {
        this._restoreSnapshot();
      }
      const position = getMousePosition(this.$canvas, event);
      if (this.activeTool !== "brush" && this.activeTool !== "eraser" && this.options.guides) {
        this._drawGuides(position);
        this._drawPointerDownArc(__privateGet(this, _dragStartLocation));
        this._drawRubberBandReference(position);
      }
      this._draw(position);
    }
    /**
     * @private _drawend
     * trigger when draw ended
     * @param {PointerEvent} event
     */
    _drawend(event) {
      if (event.pointerType !== "mouse" || event.button === 0) {
        if (this.isShape()) {
          this._restoreSnapshot();
        }
        const position = this.activeTool === "text" ? { x: event.clientX, y: event.clientY } : getMousePosition(this.$canvas, event);
        this.toolbar._manageUndoRedoBtn();
        this._draw(position);
        this.isDrawing = false;
        this.$canvas.dispatchEvent(DrawEvent("change", this.getData()));
      }
    }
    _takeSnapshot() {
      __privateSet(this, _snapshot, this.ctx.getImageData(0, 0, this.$canvas.width, this.$canvas.height));
    }
    _restoreSnapshot() {
      this.ctx.putImageData(__privateGet(this, _snapshot), 0, 0);
    }
    _draw(position) {
      this.ctx.lineWidth = this.options.lineThickness;
      this.ctx.strokeStyle = this.options.color;
      this.ctx.fillStyle = this.options.color;
      this.ctx.lineCap = this.options.cap;
      if (this.activeTool === "brush" || this.activeTool === "eraser") {
        this._drawHand(position);
      } else if (this.activeTool === "text") {
        this._addTextArea(position);
      } else if (this.activeTool === "line") {
        this._drawLine(position);
      } else if (this.activeTool === "rect") {
        this._drawRect(position);
      } else if (this.activeTool === "square") {
        this._drawPolygon(position, 4, Math.PI / 4);
      } else if (this.activeTool === "arrow") {
        this._drawArrow(position);
      } else if (this.activeTool === "triangle") {
        const angle = Math.atan2(__privateGet(this, _dragStartLocation).y - position.y, __privateGet(this, _dragStartLocation).x - position.x) * 20 / Math.PI;
        this._drawPolygon(position, 3, angle * Math.PI / 4);
      } else if (this.activeTool === "polygon") {
        const angle = 360 - Math.atan2(__privateGet(this, _dragStartLocation).y - position.y, __privateGet(this, _dragStartLocation).x - position.x) * 180 / Math.PI;
        this._drawPolygon(position, 5, angle * (Math.PI / 180));
      } else if (this.activeTool === "circle") {
        this._drawCircle(position);
      }
      if (this.options.fill && this.activeTool !== "eraser" && this.activeTool !== "brush" && this.activeTool !== "text") {
        this.ctx.fill();
      } else {
        this.ctx.stroke();
      }
    }
    _drawHand({ x, y }) {
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
    _drawLine({ x, y }) {
      this.ctx.beginPath();
      this.ctx.moveTo(__privateGet(this, _dragStartLocation).x, __privateGet(this, _dragStartLocation).y);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
    _drawRect({ x, y }) {
      const w = x - __privateGet(this, _dragStartLocation).x;
      const h = y - __privateGet(this, _dragStartLocation).y;
      this.ctx.beginPath();
      this.ctx.rect(__privateGet(this, _dragStartLocation).x, __privateGet(this, _dragStartLocation).y, w, h);
    }
    _drawCircle({ x, y }) {
      const radius = Math.sqrt(Math.pow(__privateGet(this, _dragStartLocation).x - x, 2) + Math.pow(__privateGet(this, _dragStartLocation).y - y, 2));
      this.ctx.beginPath();
      this.ctx.arc(__privateGet(this, _dragStartLocation).x, __privateGet(this, _dragStartLocation).y, radius, 0, 2 * Math.PI);
    }
    _drawArrow({ x, y }) {
      const angle = Math.atan2(y - __privateGet(this, _dragStartLocation).y, x - __privateGet(this, _dragStartLocation).x);
      const hyp = Math.sqrt(
        (x - __privateGet(this, _dragStartLocation).x) * (x - __privateGet(this, _dragStartLocation).x) + (y - __privateGet(this, _dragStartLocation).y) * (y - __privateGet(this, _dragStartLocation).y)
      );
      this.ctx.save();
      this.ctx.translate(__privateGet(this, _dragStartLocation).x, __privateGet(this, _dragStartLocation).y);
      this.ctx.rotate(angle);
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(hyp - this.options.lineThickness, 0);
      this.ctx.stroke();
      let triangleWidth = this.options.lineThickness;
      if (triangleWidth < 5) {
        triangleWidth = 5;
      }
      this.ctx.beginPath();
      this.ctx.lineTo(hyp - triangleWidth, triangleWidth);
      this.ctx.lineTo(hyp, 0);
      this.ctx.lineTo(hyp - triangleWidth, -triangleWidth);
      this.ctx.fill();
      this.ctx.restore();
    }
    // private _drawEllipse({x, y }: Position) {
    //   const w = position.x - this.#dragStartLocation.x;
    //   const h = position.y - this.#dragStartLocation.y;
    //   const radius = Math.sqrt(
    //     Math.pow(this.#dragStartLocation.x - position.x, 2) + Math.pow(this.#dragStartLocation.y - position.y, 2)
    //   );
    //   this.ctx.beginPath();
    //   this.ctx.ellipse(
    //     this.#dragStartLocation.x,
    //     this.#dragStartLocation.y,
    //     Math.abs(w),
    //     Math.abs(h),
    //     radius,
    //     radius,
    //     2 * Math.PI,
    //     false
    //   );
    // }
    // private _drawStar(centerX: number, centerY: number, points: number, outer: number, inner: number) {
    //   // define the star
    //   this.ctx.beginPath();
    //   this.ctx.moveTo(centerX, centerY + outer);
    //   for (let i = 0; i < 2 * points + 1; i++) {
    //     const r = i % 2 == 0 ? outer : inner;
    //     const a = (Math.PI * i) / points;
    //     this.ctx.lineTo(centerX + r * Math.sin(a), centerY + r * Math.cos(a));
    //   }
    //   this.ctx.closePath();
    //   // draw
    //   this.ctx.fill();
    //   this.ctx.stroke();
    // }
    _drawPolygon({ x, y }, sides, angle) {
      const coordinates = [], radius = Math.sqrt(Math.pow(__privateGet(this, _dragStartLocation).x - x, 2) + Math.pow(__privateGet(this, _dragStartLocation).y - y, 2));
      for (let index = 0; index < sides; index++) {
        coordinates.push({
          x: __privateGet(this, _dragStartLocation).x + radius * Math.cos(angle),
          y: __privateGet(this, _dragStartLocation).y - radius * Math.sin(angle)
        });
        angle += 2 * Math.PI / sides;
      }
      this.ctx.beginPath();
      this.ctx.moveTo(coordinates[0].x, coordinates[0].y);
      for (let index = 0; index < sides; index++) {
        this.ctx.lineTo(coordinates[index].x, coordinates[index].y);
      }
      this.ctx.closePath();
    }
    /**
     * Add a css grid for draw helping
     */
    addGrid() {
      this.$canvas.classList.add("grid");
      this.options.grid = true;
    }
    /**
     * Remove a css grid for draw helping
     */
    removeGrid() {
      this.$canvas.classList.remove("grid");
      this.options.grid = false;
    }
    /**
     * Add a guide when drawing for draw helping
     */
    _drawGuides({ x, y }) {
      this.ctx.save();
      this.ctx.strokeStyle = "rgb(255, 26, 121, 0.8)";
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.ctx.canvas.width, y);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.ctx.canvas.height);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.restore();
    }
    /**
     * Draw start point references
     */
    _drawPointerDownArc({ x, y }) {
      this.ctx.save();
      this.ctx.fillStyle = "rgba(255,0,0,0.5)";
      this.ctx.beginPath();
      this.ctx.arc(x, y, 10, 0, Math.PI * 2);
      this.ctx.fill();
    }
    /**
     * Draw x/y point references
     * @param param0
     */
    _drawRubberBandReference({ x, y }) {
      const rubberBandRect = {};
      if (__privateGet(this, _dragStartLocation).x < x) {
        rubberBandRect.left = __privateGet(this, _dragStartLocation).x;
      } else {
        rubberBandRect.left = x;
      }
      if (__privateGet(this, _dragStartLocation).y < y) {
        rubberBandRect.top = __privateGet(this, _dragStartLocation).y;
      } else {
        rubberBandRect.top = y;
      }
      rubberBandRect.width = Math.abs(__privateGet(this, _dragStartLocation).x - x);
      rubberBandRect.height = Math.abs(__privateGet(this, _dragStartLocation).y - y);
      this.ctx.save();
      this.ctx.strokeStyle = "black";
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.arc(rubberBandRect.left, rubberBandRect.top, 4, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.arc(rubberBandRect.left + rubberBandRect.width, rubberBandRect.top, 4, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.arc(rubberBandRect.left, rubberBandRect.top + rubberBandRect.height, 4, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.arc(
        rubberBandRect.left + rubberBandRect.width,
        rubberBandRect.top + rubberBandRect.height,
        4,
        0,
        Math.PI * 2
      );
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.restore();
    }
    /**
     * Update cursor style
     */
    _updateCursor() {
      const rad = this.options.lineThickness;
      const cursorCanvas = document.createElement("canvas");
      const ctx = cursorCanvas.getContext("2d");
      cursorCanvas.width = cursorCanvas.height = rad;
      ctx.lineCap = this.options.cap;
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, this.$canvas.width, this.$canvas.height);
      if (this.options.cap === "round") {
        ctx.arc(rad / 2, rad / 2, rad / 2 * 0.9, 0, Math.PI * 2, false);
      } else {
        ctx.rect(0, 0, rad, rad);
      }
      if (this.activeTool === "brush") {
        ctx.fillStyle = this.options.color;
        ctx.fill();
      } else if (this.activeTool === "eraser") {
        ctx.strokeStyle = this.options.color;
        ctx.stroke();
      } else if (this.isShape()) {
        this.$canvas.style.cursor = "crosshair";
        return;
      } else {
        this.$canvas.style.cursor = `text`;
        return;
      }
      cursorCanvas.toBlob((blob) => {
        if (blob) {
          URL.revokeObjectURL(this.$canvas.style.cursor);
          const cursorURL = URL.createObjectURL(blob);
          this.$canvas.style.cursor = `url(${cursorURL}) ${rad / 2} ${rad / 2}, auto`;
        }
      });
    }
    /**
     * @private Initialize all event listener
     */
    _initHandlerEvents() {
      this._startDraw = throttle(this._startDraw, 10);
      this._drawing = throttle(this._drawing, 10);
      this._drawend = throttle(this._drawend, 10);
      this.$canvas.addEventListener("pointerdown", this._startDraw.bind(this), false);
      this.$canvas.addEventListener("pointermove", this._drawing.bind(this), false);
      this.$canvas.addEventListener("pointerup", this._drawend.bind(this), false);
      this.$canvas.addEventListener("drawer.update.color", this._updateCursor.bind(this));
      this.$canvas.addEventListener("drawer.update.lineThickness", this._updateCursor.bind(this));
      this.$canvas.addEventListener("drawer.update.tool", this._updateCursor.bind(this));
      this.$canvas.addEventListener("keypress", (event) => {
        if (event.ctrlKey) {
          if (event.code === "KeyW") {
            this.undo().then(() => {
              this.$canvas.dispatchEvent(DrawEvent("change", this.getData()));
            });
          } else if (event.code === "KeyY") {
            this.redo().then(() => {
              this.$canvas.dispatchEvent(DrawEvent("change", this.getData()));
            });
          }
          this.toolbar._manageUndoRedoBtn();
        }
      });
      if (this.options.autoSave) {
        this.$canvas.addEventListener("drawer.change", this.saveDraw.bind(this));
      }
    }
    /**
     * Adding textarea to clicked zone
     * @param {Position} position
     */
    _addTextArea({ x, y }) {
      this.ctx.globalCompositeOperation = "source-over";
      const $textArea = document.createElement("textarea");
      const fontSize = this.options.lineThickness < 12 ? 12 : this.options.lineThickness;
      $textArea.style.position = "fixed";
      $textArea.style.left = x + "px";
      $textArea.style.top = y + "px";
      $textArea.style.color = this.options.color;
      $textArea.style.height = "auto";
      $textArea.style.width = "auto";
      $textArea.style.fontSize = fontSize + "px";
      $textArea.style.fontFamily = "sans-serif";
      $textArea.addEventListener("focusout", () => {
        this.saveState();
        const value = $textArea.value;
        if (value) {
          this.ctx.textBaseline = "top";
          this.ctx.textAlign = "left";
          this.ctx.font = fontSize + "px sans-serif";
          const lineHeight = this.ctx.measureText("Mi").width;
          const lines = $textArea.value.split("\n");
          const x2 = parseInt($textArea.style.left, 10) - this.$canvas.getBoundingClientRect().left;
          let y2 = parseInt($textArea.style.top, 10) - this.$canvas.getBoundingClientRect().top;
          this.ctx.fillStyle = this.options.color;
          for (const line of lines) {
            this.ctx.fillText(line, x2, y2);
            y2 += lineHeight;
          }
        }
        $textArea.remove();
        this.$canvas.dispatchEvent(DrawEvent("change", this.getData()));
      });
      $textArea.addEventListener("input", function() {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
        this.style.width = "auto";
        this.style.width = this.scrollWidth + "px";
      });
      this.$drawerContainer.appendChild($textArea);
      $textArea.focus();
    }
  }
  _dragStartLocation = new WeakMap();
  _snapshot = new WeakMap();
  _availableShape = new WeakMap();
  _cloneCanvas = new WeakMap();
  exports2.Drawer = Drawer;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
