/* 线性图标库 · 24×24 · 圆角线帽 */
(function () {
  const ICONS = {
    home: '<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z"/>',
    building: '<path d="M4 21V7l6-3v17M10 21V10l10-3v14M13.5 10.5h3M13.5 14h3M13.5 17.5h3M6.5 9h1M6.5 12.5h1M6.5 16h1"/><path d="M2.5 21h19"/>',
    megaphone: '<path d="M4 10v4a1 1 0 0 0 1 1h2l7 4V5L7 9H5a1 1 0 0 0-1 1z"/><path d="M18 9a3 3 0 0 1 0 6"/>',
    document: '<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v18H6.5A1.5 1.5 0 0 1 5 19.5z"/><path d="M9 7h6M9 11h6M9 15h4"/>',
    users: '<path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20"/><circle cx="9.5" cy="7.5" r="3.2"/><path d="M17 11a3 3 0 1 0-1.5-5.6M21 20v-1.2a3.5 3.5 0 0 0-2.6-3.3"/>',
    user: '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    'chevron-right': '<path d="m9 5 7 7-7 7"/>',
    'chevron-left': '<path d="m15 5-7 7 7 7"/>',
    'chevron-down': '<path d="m5 9 7 7 7-7"/>',
    'arrow-left': '<path d="M19 12H5m6-7-7 7 7 7"/>',
    'arrow-right': '<path d="M5 12h14m-6-7 7 7-7 7"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    pin: '<path d="M12 21s6.5-5.6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.4 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.4"/>',
    phone: '<path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5z"/>',
    mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4.5 7 7.5 6 7.5-6"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
    'check-circle': '<circle cx="12" cy="12" r="8.5"/><path d="m8 12.2 2.8 2.8 5.4-5.6"/>',
    alert: '<path d="M12 3.5 21 20H3z"/><path d="M12 9v5m0 3v.5"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8v.5"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
    eye: '<path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"/><circle cx="12" cy="12" r="2.8"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    edit: '<path d="M4 20h4L20 8l-4-4L4 16z"/><path d="m14.5 5.5 4 4"/>',
    trash: '<path d="M4.5 7h15M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v5M14 11v5"/>',
    download: '<path d="M12 4v11m0 0 4-4m-4 4-4-4"/><path d="M5 19.5h14"/>',
    upload: '<path d="M12 16V5m0 0 4 4m-4-4-4 4"/><path d="M5 19.5h14"/>',
    logout: '<path d="M14 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8"/><path d="M17 8.5 20.5 12 17 15.5M10 12h10"/>',
    dashboard: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="4.5" rx="1.5"/><rect x="13.5" y="11" width="7" height="9.5" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>',
    clipboard: '<rect x="5" y="4.5" width="14" height="16" rx="2"/><path d="M9 4.5V3h6v1.5M8.5 13l2.5 2.5 4.5-5"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.5M4 12h.5M4 18h.5"/>',
    chart: '<path d="M4 20V10M9.5 20V4M15 20v-7M20.5 20V7"/>',
    bell: '<path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9z"/><path d="M10 18a2 2 0 0 0 4 0"/>',
    calendar: '<rect x="4" y="5.5" width="16" height="15" rx="2"/><path d="M8 3.5v4M16 3.5v4M4 10h16"/>',
    star: '<path d="m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 9.7l5.4-.8z"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 0 0-5.7-5.7L11.5 6.8"/><path d="M14 10a4 4 0 0 0-5.7 0l-2.8 2.8a4 4 0 0 0 5.7 5.7l1.3-1.3"/>',
    file: '<path d="M6 3.5h8l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z"/><path d="M14 3.5V8h4M9 12h6M9 16h6"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>',
    more: '<circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none"/>',
    share: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.3 10.9 7.4-3.8M8.3 13.1l7.4 3.8"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 3C19.5 15.4 12 20 12 20z"/>',
    message: '<path d="M20.5 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-4.9A8 8 0 1 1 20.5 11.5z"/>',
    sparkles: '<path d="m12 4 1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6z"/><path d="M18 16.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.4 3.8 5.3 3.8 8.5S14.5 18.1 12 20.5c-2.5-2.4-3.8-5.3-3.8-8.5S9.5 5.9 12 3.5z"/>',
    briefcase: '<rect x="3.5" y="7.5" width="17" height="12" rx="2"/><path d="M9 7.5V5.5h6v2M3.5 12h17"/>',
    trending: '<path d="m4 16 5-5 3.5 3.5L20 7"/><path d="M15 7h5v5"/>',
    shield: '<path d="M12 3.5 19 6v6c0 4.2-3 7-7 8.5-4-1.5-7-4.3-7-8.5V6z"/><path d="m9 12 2 2 4-4"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    send: '<path d="M20.5 3.5 3.5 10l6.5 2.5L12.5 19z"/><path d="M10 12.5 20.5 3.5"/>',
    leaf: '<path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z"/><path d="M5 19c2-4 5-7 9-9"/>',
    water: '<path d="M3 9c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 3 2M3 14c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 3 2M3 19c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 3 2"/>',
    grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',
    tag: '<path d="M4 4h7l9 9-7 7-9-9z"/><circle cx="8.5" cy="8.5" r="1.4"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14-4L4 9"/><path d="M4 4v5h5M4 13a8 8 0 0 0 14 4l2-2"/><path d="M20 20v-5h-5"/>',
    'user-check': '<circle cx="10" cy="8" r="3.6"/><path d="M3.5 20a6.5 6.5 0 0 1 11-4.7M15.5 18l1.8 1.8 3.7-4"/>',
    building2: '<path d="M3 21h18M5 21V8l5-3 5 3v13M15 21V11l4-2v12M8 10h4M8 14h4M8 18h4M17 13h1M17 17h1"/>',
    compass: '<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>',
    wechat: '<path d="M9.5 4.5c-3.6 0-6.5 2.4-6.5 5.4 0 1.7 1 3.2 2.5 4.2l-.7 2.2 2.4-1.2c.7.2 1.5.3 2.3.3.4 0 .8 0 1.2-.1M14 8.5c-3.2 0-5.8 2.1-5.8 4.8s2.6 4.8 5.8 4.8c.7 0 1.4-.1 2-.3l2.2 1.1-.6-2c1.4-.9 2.2-2.2 2.2-3.6 0-2.7-2.6-4.8-5.8-4.8z"/><circle cx="7" cy="9" r=".8" fill="currentColor" stroke="none"/><circle cx="11" cy="9" r=".8" fill="currentColor" stroke="none"/><circle cx="12.2" cy="12.6" r=".7" fill="currentColor" stroke="none"/><circle cx="15.8" cy="12.6" r=".7" fill="currentColor" stroke="none"/>',
    'arrow-up': '<path d="M12 19V5m0 0-7 7m7-7 7 7"/>',
    'arrow-down': '<path d="M12 5v14m0 0 7-7m-7 7-7-7"/>',
    bold: '<path d="M7 5h6a3.5 3.5 0 0 1 0 7H7z"/><path d="M7 12h6.5a3.5 3.5 0 0 1 0 7H7z"/>',
    italic: '<path d="M14.5 5h-4M9.5 19h-4M15 5 9 19"/>',
    type: '<path d="M5 6.5V4.5h14v2M12 4.5v15M9 19.5h6"/>',
    quote: '<path d="M10 7H6.5A2.5 2.5 0 0 0 4 9.5v2A2.5 2.5 0 0 0 6.5 14H8v1.5a2 2 0 0 1-2 2"/><path d="M20 7h-3.5A2.5 2.5 0 0 0 14 9.5v2A2.5 2.5 0 0 0 16.5 14H18v1.5a2 2 0 0 1-2 2"/>',
    image: '<rect x="3.5" y="5" width="17" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m4.5 17 4.5-4.5 3.5 3.5 3-3 4 4"/>',
    undo: '<path d="M4 9h10a5 5 0 0 1 0 10h-3"/><path d="M8 5 4 9l4 4"/>',
    redo: '<path d="M20 9H10a5 5 0 0 0 0 10h3"/><path d="m16 5 4 4-4 4"/>'
  };

  function iconSvg(name) {
    const body = ICONS[name] || ICONS.info;
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${body}</svg>`;
  }

  function hydrateIcons(root) {
    (root || document).querySelectorAll('i[data-icon]').forEach(function (el) {
      if (el.firstElementChild) return;
      el.innerHTML = iconSvg(el.getAttribute('data-icon'));
    });
  }

  window.DLC = window.DLC || {};
  window.DLC.icons = ICONS;
  window.DLC.iconSvg = iconSvg;
  window.DLC.hydrateIcons = hydrateIcons;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { hydrateIcons(document); });
  } else {
    hydrateIcons(document);
  }
})();
