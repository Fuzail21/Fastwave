/* ==========================================================================
   Fast Wave Internet & Services — main.js
   Vanilla JS, no dependencies (Lucide icons are rendered if the CDN loaded).
   Every module is guarded so pages only run what they contain.
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var $ = function (sel, ctx) { return (ctx || doc).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); };

  root.classList.add('js');

  /* ---------- Icons ---------- */
  function renderIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons({ attrs: { 'stroke-width': 1.75, 'aria-hidden': 'true', focusable: 'false' } });
    }
  }
  renderIcons();

  /* ---------- Focus trap helper ---------- */
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  function trapFocus(container, e) {
    if (e.key !== 'Tab') return;
    var items = $$(FOCUSABLE, container).filter(function (el) { return el.offsetParent !== null; });
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------- Active nav link (header markup is identical on every page) ---------- */
  var page = doc.body.getAttribute('data-page');
  if (page) {
    $$('[data-nav="' + page + '"]').forEach(function (a) { a.setAttribute('aria-current', 'page'); });
  }

  /* ---------- Sticky header: transparent over hero → white + blur on scroll ---------- */
  var header = $('[data-header]');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-solid', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mega menu ---------- */
  $$('[data-mega]').forEach(function (wrap) {
    var btn = $('[data-mega-btn]', wrap);
    var panel = $('[data-mega-panel]', wrap);
    var closeTimer;
    function open() { clearTimeout(closeTimer); panel.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
    function close() { panel.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }
    btn.addEventListener('click', function () { btn.getAttribute('aria-expanded') === 'true' ? close() : open(); });
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      wrap.addEventListener('mouseenter', open);
      wrap.addEventListener('mouseleave', function () { closeTimer = setTimeout(close, 140); });
    }
    wrap.addEventListener('focusout', function (e) { if (!wrap.contains(e.relatedTarget)) close(); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.classList.contains('is-open')) { close(); btn.focus(); } });
    doc.addEventListener('click', function (e) { if (!wrap.contains(e.target)) close(); });
  });

  /* ---------- Mobile drawer ---------- */
  var drawer = $('[data-drawer]');
  var overlay = $('[data-drawer-overlay]');
  var drawerOpeners = $$('[data-drawer-open]');
  var lastFocus = null;
  function openDrawer() {
    lastFocus = doc.activeElement;
    drawer.classList.add('is-open'); overlay.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    drawerOpeners.forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
    doc.body.classList.add('is-locked');
    setTimeout(function () { var c = $('[data-drawer-close]', drawer); if (c) c.focus(); }, 50);
  }
  function closeDrawer() {
    drawer.classList.remove('is-open'); overlay.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    drawerOpeners.forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    doc.body.classList.remove('is-locked');
    if (lastFocus) lastFocus.focus();
  }
  if (drawer && overlay) {
    drawerOpeners.forEach(function (b) { b.addEventListener('click', openDrawer); });
    $$('[data-drawer-close]', drawer).forEach(function (b) { b.addEventListener('click', closeDrawer); });
    overlay.addEventListener('click', closeDrawer);
    drawer.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); trapFocus(drawer, e); });
    $$('a', drawer).forEach(function (a) { a.addEventListener('click', function () { if (a.getAttribute('href').indexOf('#') > -1) closeDrawer(); }); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1024 && drawer.classList.contains('is-open')) closeDrawer(); });
  }

  /* ---------- Accordions (FAQ, drawer submenu) ---------- */
  $$('[data-accordion]').forEach(function (group) {
    var single = group.hasAttribute('data-single');
    $$('.acc-item', group).forEach(function (item) {
      var btn = $('.acc-btn', item);
      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');
        if (single) {
          $$('.acc-item.is-open', group).forEach(function (o) { o.classList.remove('is-open'); $('.acc-btn', o).setAttribute('aria-expanded', 'false'); });
        }
        item.classList.toggle('is-open', !isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  });

  /* ---------- Modal (ZIP success) ---------- */
  var modal = $('#zip-modal');
  function openModal(zip, services) {
    if (!modal) return;
    $$('[data-zip-echo]', modal).forEach(function (el) { el.textContent = zip; });
    $$('[data-service-echo]', modal).forEach(function (el) {
      el.textContent = services && services.length ? ' for ' + services.join(', ').replace(/, ([^,]*)$/, ' & $1') : '';
    });
    if (typeof modal.showModal === 'function') modal.showModal(); else modal.setAttribute('open', '');
    renderIcons();
  }
  if (modal) {
    $$('[data-modal-close]', modal).forEach(function (b) { b.addEventListener('click', function () { modal.close ? modal.close() : modal.removeAttribute('open'); }); });
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); });
  }

  /* ---------- Toast ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    if (!t) return;
    $('[data-toast-msg]', t).textContent = msg;
    t.classList.add('is-shown');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('is-shown'); }, 4200);
  }

  /* ---------- Button loading state ---------- */
  function setBusy(btn, busy, label) {
    if (!btn) return;
    if (busy) {
      btn.dataset.label = btn.innerHTML;
      btn.setAttribute('aria-busy', 'true'); btn.disabled = true;
      btn.innerHTML = '<span class="spinner" aria-hidden="true"></span><span>' + (label || 'Checking…') + '</span>';
    } else {
      btn.removeAttribute('aria-busy'); btn.disabled = false;
      if (btn.dataset.label) btn.innerHTML = btn.dataset.label;
    }
  }

  /* ---------- ZIP availability widget (reusable) ---------- */
  var ZIP_RE = /^\d{5}$/;
  $$('[data-zip-form]').forEach(function (form) {
    var input = $('input', form);
    var err = $('[data-zip-error]', form);
    var btn = $('button[type="submit"]', form);
    var touched = false;
    function validate() {
      var v = input.value.trim();
      var ok = ZIP_RE.test(v);
      input.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (err) {
        err.classList.toggle('is-shown', !ok);
        $('[data-msg]', err).textContent = v === '' ? 'Please enter your 5-digit ZIP code.' : 'ZIP codes are 5 digits — e.g. 10001.';
      }
      return ok;
    }
    input.addEventListener('input', function () {
      input.value = input.value.replace(/\D/g, '').slice(0, 5);
      if (touched) validate();
    });
    input.addEventListener('blur', function () { if (touched) validate(); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      touched = true;
      if (!validate()) {
        input.focus();
        var wrap = input.closest('.zip-shell') || input;
        wrap.classList.remove('shake'); void wrap.offsetWidth; wrap.classList.add('shake');
        return;
      }
      setBusy(btn, true);
      setTimeout(function () {
        setBusy(btn, false);
        renderIcons();
        var chipWrap = form.parentElement && form.parentElement.querySelector('[data-chips]');
        var services = chipWrap ? $$('[aria-pressed="true"]', chipWrap).map(function (c) { return c.getAttribute('data-chip'); }) : [];
        openModal(input.value.trim(), services);
        form.reset(); touched = false; input.setAttribute('aria-invalid', 'false');
      }, 900);
    });
  });

  /* ---------- Generic validated forms (contact, callback) ---------- */
  var VALIDATORS = {
    required: function (v) { return v.trim().length > 0; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
    phone: function (v) { return v.replace(/\D/g, '').replace(/^1/, '').length === 10; },
    name: function (v) { return v.trim().length >= 2; }
  };
  function fieldValid(el) {
    if (el.type === 'checkbox') return !el.required || el.checked;
    if (el.type === 'radio') {
      var group = $$('input[name="' + el.name + '"]', el.form);
      return !el.required || group.some(function (r) { return r.checked; });
    }
    var v = el.value || '';
    if (el.required && !VALIDATORS.required(v)) return false;
    var rule = el.getAttribute('data-rule');
    if (rule && v.trim() && VALIDATORS[rule]) return VALIDATORS[rule](v);
    return true;
  }
  function showFieldState(el, ok) {
    var target = el.type === 'radio' ? el.closest('[role="radiogroup"]') : el;
    if (el.type !== 'radio') el.setAttribute('aria-invalid', ok ? 'false' : 'true');
    else if (target) target.setAttribute('aria-invalid', ok ? 'false' : 'true');
    var errId = (target || el).getAttribute('aria-describedby');
    if (errId) {
      errId.split(' ').forEach(function (id) {
        var e = doc.getElementById(id);
        if (e && e.classList.contains('field-error')) e.classList.toggle('is-shown', !ok);
      });
    }
  }
  $$('form[data-validate]').forEach(function (form) {
    var fields = $$('input, select, textarea', form).filter(function (el) { return el.required || el.getAttribute('data-rule'); });
    var submitted = false;
    fields.forEach(function (el) {
      var evt = (el.type === 'checkbox' || el.type === 'radio' || el.tagName === 'SELECT') ? 'change' : 'input';
      el.addEventListener(evt, function () { if (submitted) showFieldState(el, fieldValid(el)); });
      el.addEventListener('blur', function () { if (submitted || el.value) showFieldState(el, fieldValid(el)); });
    });
    // Phone auto-format (US): (555) 123-4567
    $$('input[data-rule="phone"]', form).forEach(function (el) {
      el.addEventListener('input', function () {
        var d = el.value.replace(/\D/g, '').slice(0, 11);
        if (d.length === 11 && d[0] === '1') d = d.slice(1);
        d = d.slice(0, 10);
        if (d.length > 6) el.value = '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6);
        else if (d.length > 3) el.value = '(' + d.slice(0, 3) + ') ' + d.slice(3);
        else el.value = d;
      });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submitted = true;
      var firstBad = null, bad = 0;
      fields.forEach(function (el) {
        var ok = fieldValid(el);
        showFieldState(el, ok);
        if (!ok) { bad++; if (!firstBad) firstBad = el; }
      });
      var status = $('[data-form-status]', form);
      if (firstBad) {
        if (status) status.textContent = 'Please fix ' + bad + (bad === 1 ? ' field' : ' fields') + ' highlighted below.';
        firstBad.focus();
        return;
      }
      if (status) status.textContent = '';
      var btn = $('button[type="submit"]', form);
      setBusy(btn, true, 'Sending…');
      setTimeout(function () {
        setBusy(btn, false);
        var success = doc.getElementById(form.getAttribute('data-success'));
        if (success) {
          var nameEl = $('[data-first-name]', form);
          $$('[data-name-echo]', success).forEach(function (n) { n.textContent = nameEl ? (nameEl.value.trim().split(' ')[0] || 'there') : 'there'; });
          form.hidden = true; success.hidden = false; renderIcons();
          success.setAttribute('tabindex', '-1'); success.focus();
        } else {
          toast('Thanks! We’ll be in touch shortly.');
          form.reset();
        }
        submitted = false;
      }, 1100);
    });
  });
  $$('[data-form-reset]').forEach(function (b) {
    b.addEventListener('click', function () {
      var form = doc.getElementById(b.getAttribute('data-form-reset'));
      var success = b.closest('[data-success-panel]');
      if (!form) return;
      form.reset();
      $$('[aria-invalid]', form).forEach(function (el) { el.setAttribute('aria-invalid', 'false'); });
      $$('.field-error', form).forEach(function (el) { el.classList.remove('is-shown'); });
      if (success) success.hidden = true;
      form.hidden = false;
      var f = $('input, select, textarea', form); if (f) f.focus();
    });
  });

  /* ---------- Pill radio groups (callback time slots) ---------- */
  $$('[data-pills]').forEach(function (group) {
    var radios = $$('input[type="radio"]', group);
    function sync() { radios.forEach(function (r) { r.closest('label').classList.toggle('is-checked', r.checked); }); }
    radios.forEach(function (r) { r.addEventListener('change', sync); });
    sync();
  });

  /* ---------- Segmented toggle (Monthly / Bundle & Save) ---------- */
  $$('[data-seg]').forEach(function (seg) {
    var btns = $$('[data-seg-btn]', seg);
    var thumb = $('.seg-thumb', seg);
    var scope = doc.getElementById(seg.getAttribute('data-seg'));
    function select(btn) {
      btns.forEach(function (b) { var on = b === btn; b.setAttribute('aria-pressed', String(on)); b.classList.toggle('text-white', on); b.classList.toggle('text-ink', !on); });
      if (thumb) { thumb.style.width = btn.offsetWidth + 'px'; thumb.style.transform = 'translateX(' + (btn.offsetLeft - 4) + 'px)'; }
      if (scope) scope.setAttribute('data-mode', btn.getAttribute('data-seg-btn'));
    }
    btns.forEach(function (b) { b.addEventListener('click', function () { select(b); }); });
    var initial = btns.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; })[0] || btns[0];
    requestAnimationFrame(function () { select(initial); });
    window.addEventListener('resize', function () { select(btns.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; })[0]); });
  });

  /* ---------- Tabs (ARIA tabs pattern, arrow-key support) ---------- */
  $$('[data-tabs]').forEach(function (wrap) {
    var tabs = $$('[role="tab"]', wrap);
    var indicator = $('.tab-indicator', wrap);
    function moveIndicator(tab) {
      if (!indicator) return;
      indicator.style.width = tab.offsetWidth + 'px';
      indicator.style.transform = 'translateX(' + tab.offsetLeft + 'px)';
    }
    function activate(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = doc.getElementById(t.getAttribute('aria-controls'));
        if (panel) {
          panel.hidden = !on;
          if (on) { panel.classList.remove('is-entering'); void panel.offsetWidth; panel.classList.add('is-entering'); }
        }
      });
      moveIndicator(tab);
      if (focus) tab.focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activate(tab); });
      tab.addEventListener('keydown', function (e) {
        var idx = null;
        if (e.key === 'ArrowRight') idx = (i + 1) % tabs.length;
        if (e.key === 'ArrowLeft') idx = (i - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home') idx = 0;
        if (e.key === 'End') idx = tabs.length - 1;
        if (idx !== null) { e.preventDefault(); activate(tabs[idx], true); }
      });
    });
    var initial = tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0];
    // Deep link from mega menu: index.html#services-tv
    var hash = location.hash.replace('#', '');
    tabs.forEach(function (t) { if (t.getAttribute('data-hash') === hash) initial = t; });
    requestAnimationFrame(function () { activate(initial); });
    window.addEventListener('resize', function () { moveIndicator(tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0]); });
    window.addEventListener('hashchange', function () {
      var h = location.hash.replace('#', '');
      tabs.forEach(function (t) { if (t.getAttribute('data-hash') === h) { activate(t); wrap.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' }); } });
    });
  });

  /* ---------- Scroll reveal with stagger ---------- */
  var revealEls = $$('[data-reveal]');
  $$('[data-reveal-group]').forEach(function (g) {
    $$('[data-reveal]', g).forEach(function (el, i) { el.style.setProperty('--reveal-delay', (i * 50) + 'ms'); });
  });
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px 20% 0px', threshold: 0 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Count-up stats (once) ---------- */
  function formatNum(n) { return n.toLocaleString('en-US'); }
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion.matches) { el.textContent = formatNum(target) + suffix; return; }
    var start = null, dur = 1600;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatNum(Math.round(target * eased)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = $$('[data-count]');
  if (counters.length) {
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { countUp(en.target); cio.unobserve(en.target); } });
      }, { threshold: 0.5 });
      counters.forEach(function (c) { cio.observe(c); });
    } else counters.forEach(countUp);
  }

  /* ---------- Testimonials carousel (pausable, keyboard, reduced-motion aware) ---------- */
  $$('[data-carousel]').forEach(function (car) {
    var track = $('.carousel-track', car);
    var slides = $$('.carousel-slide', car);
    var dotsWrap = $('[data-carousel-dots]', car);
    var prev = $('[data-carousel-prev]', car);
    var next = $('[data-carousel-next]', car);
    var toggle = $('[data-carousel-toggle]', car);
    var live = $('[data-carousel-live]', car);
    var index = 0, perView = 1, pages = 1, timer = null;
    var userPaused = reduceMotion.matches, hoverPaused = false, offscreen = true;

    function calc() {
      perView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
      pages = Math.max(1, slides.length - perView + 1);
      if (index > pages - 1) index = pages - 1;
      dotsWrap.innerHTML = '';
      for (var i = 0; i < pages; i++) {
        var d = doc.createElement('button');
        d.type = 'button';
        d.className = 'dot h-2.5 rounded-full cursor-pointer';
        d.setAttribute('aria-label', 'Show review ' + (i + 1) + ' of ' + pages);
        (function (n) { d.addEventListener('click', function () { go(n); }); })(i);
        dotsWrap.appendChild(d);
      }
      go(index, true);
    }
    function go(n, silent) {
      index = (n + pages) % pages;
      var w = slides[0].getBoundingClientRect().width;
      var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
      track.style.transform = 'translateX(' + (-(w + gap) * index) + 'px)';
      $$('.dot', dotsWrap).forEach(function (d, i) {
        var on = i === index;
        d.style.width = on ? '28px' : '10px';
        d.style.backgroundColor = on ? '#E85A0C' : '#CBD5E6';
        d.setAttribute('aria-current', on ? 'true' : 'false');
      });
      slides.forEach(function (s, i) {
        var visible = i >= index && i < index + perView;
        s.setAttribute('aria-hidden', String(!visible));
        $$('a, button', s).forEach(function (f) { f.tabIndex = visible ? 0 : -1; });
      });
      if (!silent && live) live.textContent = 'Showing review ' + (index + 1) + ' of ' + slides.length;
    }
    function shouldRun() { return !userPaused && !hoverPaused && !offscreen && !doc.hidden; }
    function tick() { stop(); if (shouldRun()) timer = setTimeout(function () { go(index + 1, true); tick(); }, 6000); }
    function stop() { clearTimeout(timer); timer = null; }
    function setToggle() {
      if (!toggle) return;
      toggle.setAttribute('aria-label', userPaused ? 'Play review auto-rotation' : 'Pause review auto-rotation');
      toggle.innerHTML = userPaused ? '<i data-lucide="play" class="h-4 w-4"></i>' : '<i data-lucide="pause" class="h-4 w-4"></i>';
      renderIcons();
    }

    prev && prev.addEventListener('click', function () { go(index - 1); tick(); });
    next && next.addEventListener('click', function () { go(index + 1); tick(); });
    toggle && toggle.addEventListener('click', function () { userPaused = !userPaused; setToggle(); tick(); });
    car.addEventListener('mouseenter', function () { hoverPaused = true; stop(); });
    car.addEventListener('mouseleave', function () { hoverPaused = false; tick(); });
    car.addEventListener('focusin', function () { hoverPaused = true; stop(); });
    car.addEventListener('focusout', function (e) { if (!car.contains(e.relatedTarget)) { hoverPaused = false; tick(); } });
    car.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { go(index + 1); }
      if (e.key === 'ArrowLeft') { go(index - 1); }
    });
    // swipe
    var sx = null;
    track.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) { go(index + (dx < 0 ? 1 : -1)); tick(); }
      sx = null;
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { offscreen = !en[0].isIntersecting; offscreen ? stop() : tick(); }, { threshold: 0.3 }).observe(car);
    } else { offscreen = false; }
    doc.addEventListener('visibilitychange', function () { doc.hidden ? stop() : tick(); });
    var rT; window.addEventListener('resize', function () { clearTimeout(rT); rT = setTimeout(calc, 150); });
    setToggle(); calc(); tick();
  });

  /* ---------- Hero service picker chips (multi-select, at least one stays on) ---------- */
  $$('[data-chips]').forEach(function (wrap) {
    $$('.chip', wrap).forEach(function (chip) {
      chip.addEventListener('click', function () {
        var on = chip.getAttribute('aria-pressed') !== 'true';
        if (!on && $$('[aria-pressed="true"]', wrap).length === 1) return;
        chip.setAttribute('aria-pressed', String(on));
      });
    });
  });

  /* ---------- Hero mouse parallax on floating cards ---------- */
  if (!reduceMotion.matches && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    $$('[data-parallax-scope]').forEach(function (scope) {
      var layers = $$('[data-depth]', scope);
      var hero = scope.closest('section') || scope;
      var raf = null;
      hero.addEventListener('pointermove', function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = null;
          var r = hero.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5;
          var y = (e.clientY - r.top) / r.height - 0.5;
          layers.forEach(function (l) {
            var d = parseFloat(l.getAttribute('data-depth')) || 10;
            l.style.setProperty('--px', (-x * d).toFixed(1) + 'px');
            l.style.setProperty('--py', (-y * d).toFixed(1) + 'px');
          });
        });
      });
      hero.addEventListener('pointerleave', function () {
        layers.forEach(function (l) { l.style.setProperty('--px', '0px'); l.style.setProperty('--py', '0px'); });
      });
    });
  }

  /* ---------- Mobile snap carousels (pricing) with dots ---------- */
  $$('[data-snap]').forEach(function (track) {
    var dotsWrap = doc.querySelector('[data-snap-dots="' + track.id + '"]');
    if (!dotsWrap) return;
    var items = Array.prototype.slice.call(track.children);
    items.forEach(function (item, i) {
      var d = doc.createElement('button');
      d.type = 'button';
      d.className = 'snap-dot cursor-pointer';
      d.setAttribute('aria-label', 'Show plan ' + (i + 1) + ' of ' + items.length);
      // 44px touch target around the small visual dot
      d.style.cssText = 'box-sizing:content-box;padding:18px 4px;background-clip:content-box';
      d.addEventListener('click', function () {
        track.scrollTo({ left: item.offsetLeft - track.offsetLeft - 16, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      });
      dotsWrap.appendChild(d);
    });
    var dots = $$('.snap-dot', dotsWrap);
    function sync() {
      var best = 0, bestDist = Infinity, left = track.getBoundingClientRect().left + 16;
      items.forEach(function (item, i) {
        var dist = Math.abs(item.getBoundingClientRect().left - left);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      dots.forEach(function (d, i) { d.setAttribute('aria-current', String(i === best)); });
    }
    var raf = null;
    track.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(function () { raf = null; sync(); }); }, { passive: true });
    sync();
  });

  /* ---------- Mobile: chat button hides while scrolling down, returns on scroll up ---------- */
  var chatWrap = $('[data-chat]');
  if (chatWrap) {
    var lastY = window.scrollY;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      var panelOpen = $('[data-chat-panel]', chatWrap).classList.contains('is-open');
      if (window.innerWidth >= 640 || panelOpen) { chatWrap.classList.remove('fab-hide'); lastY = y; return; }
      if (Math.abs(y - lastY) < 8) return;
      chatWrap.classList.toggle('fab-hide', y > lastY && y > 300);
      lastY = y;
    }, { passive: true });
  }

  /* ---------- Cursor spotlight on cards ---------- */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    $$('.spotlight').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------- Chat widget (front-end mock) ---------- */
  var chat = $('[data-chat]');
  if (chat) {
    var panel = $('[data-chat-panel]', chat);
    var fab = $('[data-chat-fab]', chat);
    var log = $('[data-chat-log]', chat);
    var chatForm = $('[data-chat-form]', chat);
    function openChat() {
      panel.classList.add('is-open'); panel.setAttribute('aria-hidden', 'false'); fab.setAttribute('aria-expanded', 'true');
      setTimeout(function () { $('input', chatForm).focus(); }, 80);
    }
    function closeChat() { panel.classList.remove('is-open'); panel.setAttribute('aria-hidden', 'true'); fab.setAttribute('aria-expanded', 'false'); fab.focus(); }
    fab.addEventListener('click', function () { panel.classList.contains('is-open') ? closeChat() : openChat(); });
    $$('[data-chat-open]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); openChat(); }); });
    $('[data-chat-close]', chat).addEventListener('click', closeChat);
    panel.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeChat(); });
    function bubble(text, me) {
      var row = doc.createElement('div');
      row.className = 'flex ' + (me ? 'justify-end' : 'justify-start');
      var b = doc.createElement('p');
      b.className = me ? 'max-w-[80%] rounded-2xl rounded-br-md bg-navy-900 px-4 py-2.5 text-[15px] text-white' : 'max-w-[80%] rounded-2xl rounded-bl-md bg-surface px-4 py-2.5 text-[15px] text-ink';
      b.textContent = text; row.appendChild(b); log.appendChild(row); log.scrollTop = log.scrollHeight;
      return row;
    }
    function reply(text) {
      var t = doc.createElement('div');
      t.className = 'flex justify-start';
      t.innerHTML = '<div class="typing flex items-center gap-1 rounded-2xl rounded-bl-md bg-surface px-4 py-3.5" aria-label="Agent is typing"><span></span><span></span><span></span></div>';
      log.appendChild(t); log.scrollTop = log.scrollHeight;
      setTimeout(function () { t.remove(); bubble(text, false); }, 1100);
    }
    var replies = [
      'Thanks! An internet expert will join this chat in a moment. Meanwhile, what’s your ZIP code so we can check providers near you?',
      'Got it. We’ll compare every provider available at that ZIP. Prefer a call? Reach us at (888) 555-3278.'
    ];
    var r = 0;
    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = $('input', chatForm);
      var v = input.value.trim();
      if (!v) return;
      bubble(v, true); input.value = '';
      reply(replies[Math.min(r++, replies.length - 1)]);
    });
    $$('[data-chat-quick]', chat).forEach(function (q) {
      q.addEventListener('click', function () { bubble(q.textContent.trim(), true); reply(replies[Math.min(r++, replies.length - 1)]); });
    });
  }

  /* ---------- Provider filter chips (providers.html) ---------- */
  $$('[data-filter]').forEach(function (bar) {
    var chips = $$('[data-filter-chip]', bar);
    var grid = doc.getElementById(bar.getAttribute('data-filter'));
    var count = doc.querySelector('[data-filter-count]');
    if (!grid) return;
    var items = $$('[data-cats]', grid);
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var cat = chip.getAttribute('data-filter-chip');
        chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
        var shown = 0;
        items.forEach(function (it) {
          var match = cat === 'all' || it.getAttribute('data-cats').split(' ').indexOf(cat) > -1;
          it.hidden = !match;
          if (match) { shown++; it.classList.remove('is-entering'); void it.offsetWidth; it.classList.add('is-entering'); }
        });
        if (count) count.textContent = shown + (shown === 1 ? ' provider' : ' providers') + ' shown';
      });
    });
  });

  /* ---------- Callback date: no past dates ---------- */
  $$('input[type="date"][data-min-today]').forEach(function (d) {
    var t = new Date(); t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
    d.min = t.toISOString().slice(0, 10);
  });
})();
