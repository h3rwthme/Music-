// Music Player — skrip bersama semua halaman situs unduhan.
// 1) Menu hamburger (HP)  2) Info rilis dari latest.json (versi, ukuran, catatan, SHA-256).
(function () {
  // ---------- 1. Menu hamburger ----------
  var nav = document.getElementById("topnav");
  var btn = nav && nav.querySelector(".topnav__burger");
  var menu = document.getElementById("nav-menu");
  var scrim = document.querySelector(".nav-scrim");

  function setOpen(open) {
    if (!nav || !btn) return;
    nav.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  }
  function isOpen() { return !!nav && nav.classList.contains("is-open"); }

  if (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(!isOpen());
      // Fokus ke link pertama hanya kalau dibuka lewat keyboard (detail 0), bukan sentuhan/klik.
      if (isOpen() && menu && e.detail === 0) {
        var first = menu.querySelector("a");
        if (first) first.focus({ preventScroll: true });
      }
    });
  }
  // Tutup: tap di luar menu, tap link (termasuk halaman yang sedang dibuka), Esc, scroll, layar melebar.
  document.addEventListener("click", function (e) {
    if (isOpen() && !nav.contains(e.target)) setOpen(false);
  });
  if (scrim) scrim.addEventListener("click", function () { setOpen(false); });
  if (menu) {
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      if (btn) btn.focus();
    }
  });
  var scrollStart = 0;
  window.addEventListener("scroll", function () {
    if (!isOpen()) { scrollStart = window.scrollY; return; }
    if (Math.abs(window.scrollY - scrollStart) > 24) setOpen(false);
  }, { passive: true });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 720 && isOpen()) setOpen(false);
  });

  // ---------- Muncul halus saat di-scroll (.reveal) ----------
  var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduce) {
    items.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      var batch = entries.filter(function (en) { return en.isIntersecting; });
      batch.forEach(function (en, i) {
        // Elemen yang masuk bersamaan muncul berurutan (jeda 60 ms), maksimal 300 ms.
        var el = en.target;
        var delay = Math.min(i * 60, 300);
        el.style.transitionDelay = delay + "ms";
        el.classList.add("is-in");
        // Hapus jeda setelah muncul supaya efek hover tidak ikut tertunda.
        setTimeout(function () { el.style.transitionDelay = ""; }, delay + 550);
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  // ---------- 2. Info rilis ----------
  function text(id, value) {
    var el = document.getElementById(id);
    if (el && value) el.textContent = value;
  }
  fetch("latest.json?t=" + Math.floor(Date.now() / 60000))
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (j) {
      if (!j || !j.tag) return;
      var mb = j.size_bytes > 0 ? " · " + (j.size_bytes / 1048576).toFixed(1) + " MB" : "";
      text("release-label", j.tag + " · Android 7.0+" + mb);
      text("whats-new-tag", j.tag);
      text("hash-ver", j.tag);
      if (j.published_at) {
        var dt = new Date(j.published_at).toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric" });
        text("release-date", "Diperbarui " + dt + " · install menimpa versi lama, data tetap aman");
      }
      var list = document.getElementById("whats-new");
      if (list && j.notes) {
        var lines = String(j.notes).split("\n").map(function (s) { return s.trim(); }).filter(Boolean).slice(0, 4);
        if (lines.length) {
          list.textContent = "";
          lines.forEach(function (line) {
            var li = document.createElement("li");
            li.textContent = line;
            list.appendChild(li);
          });
        }
      }
      if (j.sha256) {
        text("apk-sha256", j.sha256);
        var vt = "https://www.virustotal.com/gui/file/" + j.sha256;
        ["vt-proof-link", "vt-btn-link"].forEach(function (id) {
          var a = document.getElementById(id);
          if (a) a.href = vt;
        });
      }
    })
    .catch(function () { /* offline: pakai teks bawaan halaman */ });

  // ---------- Tombol salin SHA-256 (halaman Keamanan) ----------
  var copyBtn = document.getElementById("copy-sha256");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var hash = (document.getElementById("apk-sha256") || {}).textContent || "";
      hash = hash.trim();
      if (!hash || !navigator.clipboard) return;
      navigator.clipboard.writeText(hash).then(function () {
        copyBtn.textContent = "Tersalin";
        setTimeout(function () { copyBtn.textContent = "Salin"; }, 1800);
      }).catch(function () {});
    });
  }
})();
