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

  // 内容类型 tab
  document.querySelectorAll('.type-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      tab.parentElement.querySelectorAll('.type-tab').forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');
    });
  });

  // 审核队列
  document.querySelectorAll('.queue-item').forEach(function (item) {
    item.addEventListener('click', function () {
      document.querySelectorAll('.queue-item').forEach(function (i) {
        i.classList.remove('active');
      });
      item.classList.add('active');
    });
  });

  // 表格全选
  document.querySelectorAll('[data-check-all]').forEach(function (master) {
    master.addEventListener('change', function () {
      var table = master.closest('table');
      table.querySelectorAll('tbody input[type="checkbox"]').forEach(function (cb) {
        cb.checked = master.checked;
      });
    });
  });

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
