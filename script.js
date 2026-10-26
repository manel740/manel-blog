(function () {
  "use strict";

  // Active section in the navigation
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav a[href^='#']"));
  var sections = links.map(function (a) {
    return document.getElementById(a.getAttribute("href").slice(1));
  }).filter(Boolean);

  function setActive() {
    var current = sections[0];
    var line = Math.min(window.innerHeight * 0.25, 140);
    sections.forEach(function (sec) {
      if (sec.getBoundingClientRect().top <= line) current = sec;
    });
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) current = sections[sections.length - 1];
    links.forEach(function (a) {
      var on = a.getAttribute("href") === "#" + current.id;
      if (on) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { setActive(); ticking = false; });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  setActive();

  // Gentle reveal on scroll
  var items = document.querySelectorAll(".lead, .intro-links, .skills > div, .project, .more, .support, .elsewhere li");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduce) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });

  items.forEach(function (el) {
    var i = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.transitionDelay = Math.min(i, 5) * 60 + "ms";
    el.classList.add("reveal");
    io.observe(el);
  });
})();
