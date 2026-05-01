(function () {
  function parseReleaseDate(value) {
    if (!value) {
      return null;
    }

    var trimmed = String(value).trim();

    // Parse ISO-like date strings as local time so each user sees local countdown.
    var isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2})(?::(\d{2})(?::(\d{2}))?)?)?(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?$/);
    if (isoMatch) {
      var year = Number(isoMatch[1]);
      var monthIndex = Number(isoMatch[2]) - 1;
      var day = Number(isoMatch[3]);
      var hours = Number(isoMatch[4] || 0);
      var minutes = Number(isoMatch[5] || 0);
      var seconds = Number(isoMatch[6] || 0);
      var localDate = new Date(year, monthIndex, day, hours, minutes, seconds, 0);

      if (!Number.isNaN(localDate.getTime())) {
        return localDate;
      }
    }

    var parsed = new Date(trimmed);

    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }

    // Fallback for human-readable text such as "Will be released on May 1, 2026".
    var match = trimmed.match(/[A-Za-z]+\s+\d{1,2},\s+\d{4}(?:\s+\d{1,2}:\d{2}(?::\d{2})?\s*(?:AM|PM)?)?/i);
    if (!match) {
      return null;
    }

    parsed = new Date(match[0]);
    if (Number.isNaN(parsed.getTime())) {
      return null;
    }

    return parsed;
  }

  function formatCountdown(diffMs) {
    var totalSeconds = Math.floor(diffMs / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    return days + "d " + String(hours).padStart(2, "0") + "h " + String(minutes).padStart(2, "0") + "m " + String(seconds).padStart(2, "0") + "s";
  }

  function updateCountdown(elements, targetMs, now) {
    var diffMs = targetMs - now;

    if (diffMs <= 0) {
      elements.forEach(function (el) {
        el.hidden = true;
      });
      return false;
    }

    var text = formatCountdown(diffMs) + " left";
    elements.forEach(function (el) {
      el.textContent = text;
      el.hidden = false;
    });

    return true;
  }

  function updateCtaLabels(elements, targetMs, now) {
    var hasPendingSwitch = false;

    elements.forEach(function (el) {
      var preLabel = el.getAttribute("data-pre-label") || "Pre-Save";
      var liveLabel = el.getAttribute("data-live-label") || "Listen now!";
      var delayRaw = Number(el.getAttribute("data-live-delay-seconds"));
      var delaySeconds = Number.isFinite(delayRaw) && delayRaw >= 0 ? delayRaw : 30;
      var switchAt = targetMs + delaySeconds * 1000;
      var useLiveLabel = now >= switchAt;
      var nextLabel = useLiveLabel ? liveLabel : preLabel;

      if (el.textContent !== nextLabel) {
        el.textContent = nextLabel;
      }

      if (!useLiveLabel) {
        hasPendingSwitch = true;
      }
    });

    return hasPendingSwitch;
  }

  function updateShowElements(elements, targetMs, now) {
    var released = now >= targetMs;
    elements.forEach(function (el) {
      el.hidden = !released;
    });
    return !released;
  }

  function updateHideElements(elements, targetMs, now) {
    var released = now >= targetMs;
    elements.forEach(function (el) {
      el.hidden = released;
    });
    return !released;
  }

  function getOrCreateGroup(groups, targetMs) {
    if (!groups.has(targetMs)) {
      groups.set(targetMs, {
        countdowns: [],
        ctas: [],
        shows: [],
        hides: []
      });
    }

    return groups.get(targetMs);
  }

  function addReleaseElement(groups, el, key) {
    var rawDate = el.getAttribute("data-release-date");
    var date = parseReleaseDate(rawDate);

    if (!date) {
      if (key === "countdowns") {
        el.hidden = true;
      }
      return;
    }

    var targetMs = date.getTime();
    var group = getOrCreateGroup(groups, targetMs);
    group[key].push(el);
  }

  function updateReleaseGroup(group, targetMs) {
    var now = Date.now();
    var countdownActive = updateCountdown(group.countdowns, targetMs, now);
    var ctaPending = updateCtaLabels(group.ctas, targetMs, now);
    var showPending = updateShowElements(group.shows, targetMs, now);
    var hidePending = updateHideElements(group.hides, targetMs, now);

    return countdownActive || ctaPending || showPending || hidePending;
  }

  function initCountdowns() {
    var countdownNodes = Array.prototype.slice.call(document.querySelectorAll("[data-release-countdown]"));
    var ctaNodes = Array.prototype.slice.call(document.querySelectorAll("[data-release-cta]"));
    var showNodes = Array.prototype.slice.call(document.querySelectorAll("[data-release-show]"));
    var hideNodes = Array.prototype.slice.call(document.querySelectorAll("[data-release-hide]"));

    if (!countdownNodes.length && !ctaNodes.length && !showNodes.length && !hideNodes.length) {
      return;
    }

    var groups = new Map();
    countdownNodes.forEach(function (el) {
      addReleaseElement(groups, el, "countdowns");
    });

    ctaNodes.forEach(function (el) {
      addReleaseElement(groups, el, "ctas");
    });

    showNodes.forEach(function (el) {
      addReleaseElement(groups, el, "shows");
    });

    hideNodes.forEach(function (el) {
      addReleaseElement(groups, el, "hides");
    });

    groups.forEach(function (group, targetMs) {
      var active = updateReleaseGroup(group, targetMs);
      if (!active) {
        return;
      }

      var timerId = setInterval(function () {
        var stillActive = updateReleaseGroup(group, targetMs);
        if (!stillActive) {
          clearInterval(timerId);
        }
      }, 1000);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCountdowns);
  } else {
    initCountdowns();
  }
})();
