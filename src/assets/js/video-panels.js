(function () {
  var DENSITY_PROFILES = {
    sparse: {
      minByWidth: [
        { minWidth: 1280, count: 3 },
        { minWidth: 980, count: 2 }
      ],
      widthFactor: 1.06,
      minPanelWidth: 360,
      maxPanels: 8
    },
    balanced: {
      minByWidth: [
        { minWidth: 1200, count: 4 },
        { minWidth: 900, count: 3 },
        { minWidth: 640, count: 3 },
        { minWidth: 420, count: 2 }
      ],
      widthFactor: 0.68,
      minPanelWidth: 180,
      maxPanels: 9
    },
    dense: {
      minByWidth: [
        { minWidth: 1200, count: 5 },
        { minWidth: 900, count: 4 },
        { minWidth: 640, count: 3 },
        { minWidth: 420, count: 2 }
      ],
      widthFactor: 0.56,
      minPanelWidth: 150,
      maxPanels: 10
    }
  };

  function getDensityProfile(strip) {
    var raw = (strip.getAttribute("data-video-density") || "balanced").toLowerCase();
    if (Object.prototype.hasOwnProperty.call(DENSITY_PROFILES, raw)) {
      return DENSITY_PROFILES[raw];
    }
    return DENSITY_PROFILES.balanced;
  }

  function getMinimumPanelCount(width, profile) {
    var rules = profile.minByWidth;
    var i;

    for (i = 0; i < rules.length; i += 1) {
      if (width >= rules[i].minWidth) {
        return rules[i].count;
      }
    }

    return 1;
  }

  function getVideoAspect(video) {
    if (!video || !video.videoWidth || !video.videoHeight) {
      return 16 / 9;
    }
    return video.videoWidth / video.videoHeight;
  }

  function updateStrip(strip) {
    var seedVideo = strip.querySelector(".video-bg__video");
    if (!seedVideo) {
      return;
    }

    var width = strip.clientWidth;
    var height = strip.clientHeight;
    var profile = getDensityProfile(strip);

    if (!width || !height) {
      return;
    }

    var aspect = getVideoAspect(seedVideo);

    var targetPanelWidth = Math.max(profile.minPanelWidth, Math.floor(height * aspect * profile.widthFactor));
    var aspectBasedCount = Math.ceil(width / targetPanelWidth);
    var panelCount = Math.max(getMinimumPanelCount(width, profile), aspectBasedCount);
    panelCount = Math.max(1, Math.min(panelCount, profile.maxPanels));

    var videos = strip.querySelectorAll(".video-bg__video");

    while (videos.length < panelCount) {
      var clone = seedVideo.cloneNode(true);
      clone.currentTime = 0;
      strip.appendChild(clone);
      videos = strip.querySelectorAll(".video-bg__video");
    }

    while (videos.length > panelCount) {
      strip.removeChild(videos[videos.length - 1]);
      videos = strip.querySelectorAll(".video-bg__video");
    }

    strip.style.gridTemplateColumns = "repeat(" + panelCount + ", minmax(0, 1fr))";
  }

  function initVideoPanels() {
    var strips = Array.prototype.slice.call(document.querySelectorAll(".video-bg__strip"));
    if (!strips.length) {
      return;
    }

    var resizeRafId = 0;

    function refreshAll() {
      strips.forEach(updateStrip);
    }

    strips.forEach(function (strip) {
      var seedVideo = strip.querySelector(".video-bg__video");
      if (!seedVideo) {
        return;
      }

      if (seedVideo.readyState >= 1) {
        updateStrip(strip);
      } else {
        seedVideo.addEventListener("loadedmetadata", function () {
          updateStrip(strip);
        });
      }
    });

    window.addEventListener("resize", function () {
      if (resizeRafId) {
        cancelAnimationFrame(resizeRafId);
      }
      resizeRafId = requestAnimationFrame(refreshAll);
    });

    refreshAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVideoPanels);
  } else {
    initVideoPanels();
  }
})();
