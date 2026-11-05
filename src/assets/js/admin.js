/* 斗来创 · 后台原型交互
   视图切换、登录、面包屑、表格全选、演示提示 */
(function () {
  'use strict';

  var shell = document.querySelector('.admin-shell');
  var crumb = document.getElementById('crumb');
  var login = document.getElementById('adminLogin');
  var toastEl = document.getElementById('adminToast');
  var toastTimer = null;

  function toast(msg) {
    if (!msg) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 2000);
  }

  function showView(name) {
    var target = document.querySelector('.view[data-view="' + name + '"]');
    if (!target) return;

    document.querySelectorAll('.view').forEach(function (v) {
      v.classList.toggle('active', v === target);
    });

    document.querySelectorAll('.as-item').forEach(function (item) {
      item.classList.toggle('active', item.dataset.view === name);
    });

    crumb.textContent = target.dataset.title || name;
    window.scrollTo(0, 0);
    document.querySelector('.admin-content').scrollTop = 0;
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-view], [data-toast], [data-logout]');
    if (!el) return;

    if (el.hasAttribute('data-logout')) {
      login.classList.remove('hidden');
      return;
    }

    if (el.hasAttribute('data-toast')) {
      e.preventDefault();
      toast(el.getAttribute('data-toast'));
      if (el.hasAttribute('data-view')) showView(el.getAttribute('data-view'));
      return;
    }

    if (el.hasAttribute('data-view')) {
      e.preventDefault();
      showView(el.getAttribute('data-view'));
    }
  });

  // 内容类型 tab（委托，兼容新增视图）
  document.addEventListener('click', function (e) {
    var tab = e.target.closest('.type-tab');
    if (!tab) return;
    tab.parentElement.querySelectorAll('.type-tab').forEach(function (t) {
      t.classList.remove('active');
    });
    tab.classList.add('active');
  });

  // 审核队列（委托）
  document.addEventListener('click', function (e) {
    var item = e.target.closest('.queue-item');
    if (!item) return;
    document.querySelectorAll('.queue-item').forEach(function (i) {
      i.classList.remove('active');
    });
    item.classList.add('active');
  });

  // 表格全选（委托）
  document.addEventListener('change', function (e) {
    var master = e.target.closest('[data-check-all]');
    if (!master) return;
    var table = master.closest('table');
    table.querySelectorAll('tbody input[type="checkbox"]').forEach(function (cb) {
      cb.checked = master.checked;
    });
  });

  // 轮播图配置 → 预览实时联动
  (function () {
    var title = document.getElementById('carPreviewTitle');
    var sub = document.getElementById('carPreviewSub');
    var wrap = document.getElementById('carPreviewText');
    if (!title || !sub || !wrap) return;

    var titleInput = document.getElementById('carTitle');
    var subInput = document.getElementById('carSub');
    var sizeSel = document.getElementById('carSize');
    var weightSel = document.getElementById('carWeight');
    var colorSel = document.getElementById('carColor');
    var alignBox = document.getElementById('carAlign');

    function syncText() {
      title.textContent = (titleInput.value || '轮播图标题').trim();
      sub.textContent = (subInput.value || '').trim();
    }
    function syncStyle() {
      title.style.fontSize = sizeSel.value + 'px';
      title.style.fontWeight = weightSel.value;
      title.style.color = colorSel.value;
    }

    [titleInput, subInput].forEach(function (el) {
      el.addEventListener('input', syncText);
    });
    [sizeSel, weightSel, colorSel].forEach(function (el) {
      el.addEventListener('change', syncStyle);
    });

    if (alignBox) {
      alignBox.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-align]');
        if (!btn) return;
        alignBox.querySelectorAll('button').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        wrap.classList.toggle('is-center', btn.dataset.align === 'center');
        wrap.classList.toggle('is-right', btn.dataset.align === 'right');
      });
    }

    syncText();
    syncStyle();
  })();

  // 登录
  function closeLogin() {
    login.classList.add('hidden');
    showView('dashboard');
  }

  document.getElementById('loginBtn').addEventListener('click', function () {
    closeLogin();
    toast('登录成功，欢迎回来');
  });

  document.getElementById('loginSkip').addEventListener('click', closeLogin);
  document.getElementById('loginClose').addEventListener('click', closeLogin);

  document.getElementById('pwd').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') document.getElementById('loginBtn').click();
  });

  // 视图内跳转（如面板中的「全部」）
  window.addEventListener('hashchange', function () {
    var name = (location.hash || '').replace('#', '');
    if (name) showView(name);
  });

  var initial = (location.hash || '').replace('#', '');
  if (initial) {
    login.classList.add('hidden');
    showView(initial);
  }
})();
