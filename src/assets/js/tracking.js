(function () {
  var config = window.APP_CONFIG || {};
  var ga4Id = config.ga4MeasurementId;
  var pixelIds = Array.isArray(config.metaPixelIds) ? config.metaPixelIds.slice() : [];
  var consentStatusEl = document.getElementById("consent-status");

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.async = true;
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function isValidGa4Id(id) {
    return /^G-[A-Z0-9]+$/.test(id || "");
  }

  function isValidPixelId(id) {
    return /^\d{10,20}$/.test(id || "");
  }

  function getPixelIds() {
    var ids = pixelIds.filter(isValidPixelId);
    if (isValidPixelId(config.metaPixelId) && ids.indexOf(config.metaPixelId) === -1) {
      ids.push(config.metaPixelId);
    }
    return ids;
  }

  function setupGa4() {
    if (!isValidGa4Id(ga4Id)) {
      return Promise.resolve(false);
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      dataLayer.push(arguments);
    };

    gtag("js", new Date());
    gtag("config", ga4Id, { anonymize_ip: true });

    return loadScript("https://www.googletagmanager.com/gtag/js?id=" + ga4Id).then(function () {
      return true;
    });
  }

  function setupMetaPixel() {
    var ids = getPixelIds();

    if (!ids.length) {
      return Promise.resolve(false);
    }

    (function (f, b, e, v, n, t, s) {
      if (f.fbq) {
        return;
      }
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) {
        f._fbq = n;
      }
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

    ids.forEach(function (id) {
      window.fbq("init", id);
    });
    window.fbq("track", "PageView");

    return Promise.resolve(true);
  }

  function trackEvent(eventName, label, destination) {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, {
        event_category: "engagement",
        event_label: label,
        outbound_url: destination
      });
    }

    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", eventName, {
        label: label,
        destination: destination
      });
    }
  }

  function bindClickTracking() {
    var links = document.querySelectorAll(".track-event");
    links.forEach(function (el) {
      el.addEventListener("click", function () {
        var eventName = el.getAttribute("data-track-event") || "click";
        var label = el.getAttribute("data-track-label") || "unknown";
        var destination = el.getAttribute("href") || "";
        trackEvent(eventName, label, destination);
      });
    });
  }

  function updateConsentStatus() {
    if (!consentStatusEl) {
      return;
    }
    var value = localStorage.getItem("tracking-consent");
    if (value === "granted") {
      consentStatusEl.textContent = "Tracking is enabled.";
    } else if (value === "denied") {
      consentStatusEl.textContent = "Tracking is disabled.";
    } else {
      consentStatusEl.textContent = "No preference selected yet.";
    }
  }

  function applyConsentButtons() {
    var allowButton = document.getElementById("consent-allow");
    var denyButton = document.getElementById("consent-deny");

    if (allowButton) {
      allowButton.addEventListener("click", function () {
        localStorage.setItem("tracking-consent", "granted");
        Promise.all([setupGa4(), setupMetaPixel()]).finally(updateConsentStatus);
      });
    }

    if (denyButton) {
      denyButton.addEventListener("click", function () {
        localStorage.setItem("tracking-consent", "denied");
        updateConsentStatus();
      });
    }
  }

  function init() {
    applyConsentButtons();
    updateConsentStatus();

    Promise.all([setupGa4(), setupMetaPixel()]).then(bindClickTracking);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
