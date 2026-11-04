/* 斗来创 · 小程序原型交互
   页面切换、说明面板、返回栈、键盘导航、表单计数、演示提示 */
(function () {
  'use strict';

  var ORDER = [
    'home', 'projects', 'project-detail',
    'news', 'news-detail',
    'policies', 'policy-detail',
    'orgs', 'org-detail', 'apply',
    'login', 'profile', 'applications', 'contact'
  ];

  var TABBED = ['home', 'projects', 'news', 'policies', 'profile'];
  var DARK_STATUS = ['home', 'login'];

  var NOTES = {
    home: {
      title: '首页',
      desc: '第一屏承担三件事：说明平台是什么、证明内容可信、把用户送进四个核心模块。',
      points: [
        '深青蓝主视觉配暖橙点缀，兼顾政务可信与青年活力',
        '四大模块用 2×2 快捷卡承载，图标底色区分模块',
        '首屏之后依次为重点项目、最新资讯、政策速递、找到组织',
        '重点项目横滑展示，控制首屏高度，避免信息过载'
      ],
      rules: [
        '导航与栏目顺序对应四大模块，不额外增加运营位',
        '内容卡标注来源与更新时间，强化可信度',
        '底部导航固定 5 项，详情页自动隐藏'
      ]
    },
    projects: {
      title: '产业项目列表',
      desc: '以项目为核心的内容浏览页，支持关键词搜索、领域筛选与状态识别。',
      points: [
        '重点推荐用大图卡片突出，与常规列表卡形成层级',
        '卡片固定展示领域、合作方式、镇街与项目状态',
        '筛选使用横向 chip，单行滑动，不占用首屏',
        '底部提供加载更多，避免无限滚动造成迷失'
      ],
      rules: [
        '状态标签统一为 招商中 / 合作运营 / 招募中',
        '列表页不直接发起对接，点击进入详情'
      ]
    },
    'project-detail': {
      title: '产业项目详情',
      desc: '项目详情的阅读与转化页：先建立信任，再引导登录与对接。',
      points: [
        '顶部大图承载项目氛围，返回与分享悬浮于图上',
        '标题下方直接给出领域、合作方式与状态标签',
        '四宫格信息区把关键事实前置，降低阅读成本',
        '联系方式登录后可见，虚线区块明确门槛与下一步'
      ],
      rules: [
        '未登录点击联系对接，先跳转登录页',
        '底部固定操作栏：收藏、分享、联系对接'
      ]
    },
    news: {
      title: '重大信息列表',
      desc: '重大信息聚合页，强调来源与时效，覆盖两会、党代会与统战工作。',
      points: [
        '首条资讯用大图卡片，其余为左文右图的行式列表',
        '分类以横向 tab 呈现，保持单行可滑动',
        '列表项显示来源、日期与阅读量，建立信息可信度'
      ],
      rules: [
        '所有资讯须经甲方终审后方可发布',
        '标题与来源不可省略，不使用诱导性标题'
      ]
    },
    'news-detail': {
      title: '重大信息详情',
      desc: '政务资讯阅读页，排版优先保证长时间阅读的舒适度。',
      points: [
        '正文 14px、行高 1.95，段间距 1em，中文两端对齐',
        '导语段落浅蓝底强调，帮助快速把握要点',
        '配图带图注，说明拍摄场景与来源',
        '文末标注来源、责任编辑与审核状态'
      ],
      rules: [
        '正文不得插入营销或导流内容',
        '已下架内容在小程序端不可访问'
      ]
    },
    policies: {
      title: '港澳政策列表',
      desc: '港澳政策汇编入口，按政策汇编、解读、文件查阅分层。',
      points: [
        '顶部提示政策以官方发布为准，明确平台角色',
        '最新政策用暖橙描边强调，与常规条目区分',
        '每条政策显示发文机关与日期，便于核对',
        '分类 tab 与搜索并行，支持按发文机关检索'
      ],
      rules: [
        '不得改写政策原文含义',
        '文号与发文机关须与官方一致，示例数据需标注'
      ]
    },
    'policy-detail': {
      title: '港澳政策详情',
      desc: '政策原文与要点解读的组合页，兼顾快速理解与原文查阅。',
      points: [
        '深青蓝政策头图，与资讯详情形成视觉区分',
        '先结构化信息，再要点，最后是政策原文',
        '要点用暖橙浅底突出，控制在 3—5 条',
        '附件区提供原文下载，标注格式与文件大小'
      ],
      rules: [
        '要点为辅助理解，须标注以原文为准',
        '附件下载需登录，便于统计与后续服务'
      ]
    },
    orgs: {
      title: '找到组织 · 名录',
      desc: '组织名录页，帮助港澳青年找到可加入的组织与乡创基地。',
      points: [
        '顶部先说明组织能提供什么，再给列表',
        '组织卡展示成员数、活动数与入会状态',
        '入会状态用绿色与灰色标签区分可申请 / 需推荐'
      ],
      rules: [
        '组织信息由后台维护，变更需留操作记录',
        '入会状态与后台审核状态保持一致'
      ]
    },
    'org-detail': {
      title: '组织详情',
      desc: '组织详情页，承担介绍与入会转化。',
      points: [
        '组织标识使用单字色块，避免真实徽标版权问题',
        '头部展示成员数、活动数、成立年份三项硬指标',
        '正文分组织简介、主要职责、近期活动三段',
        '底部固定申请入会按钮，路径唯一'
      ],
      rules: [
        '联系方式登录后可见',
        '入会申请需勾选个人信息保护说明'
      ]
    },
    apply: {
      title: '入会申请',
      desc: '入会申请表单，三步流程中的第二步。',
      points: [
        '顶部步骤条显示进度，已完成步骤打勾',
        '申请人信息用摘要卡回显，可返回修改',
        '表单分区，必填项标注 *，文本域实时计数',
        '隐私说明与同意勾选紧邻提交按钮'
      ],
      rules: [
        '证件与联系方式仅用于资格审核',
        '提交后进入初审 → 甲方终审流程'
      ]
    },
    login: {
      title: '登录',
      desc: '登录页说明登录能获得什么，降低授权顾虑。',
      points: [
        '深青蓝背景配暖橙光晕，延续品牌但不用大面积渐变',
        '先列三项具体权益，再给微信一键登录',
        '提供暂不登录入口，避免强制登录造成流失',
        '底部展示用户协议与隐私政策'
      ],
      rules: [
        '仅获取微信昵称与头像，不索取额外信息',
        '登录后方可查看联系方式与提交申请'
      ]
    },
    profile: {
      title: '个人中心',
      desc: '聚合申请、收藏与对接记录，是用户的服务入口。',
      points: [
        '头部展示身份标签，如港澳青年、已实名',
        '三项数据统计放在头部，快速了解使用情况',
        '菜单按我的服务与设置帮助分组',
        '底部标注主办与承办单位'
      ],
      rules: [
        '实名信息仅本人可见',
        '申请记录入口显示待处理数量'
      ]
    },
    applications: {
      title: '我的申请',
      desc: '申请进度页，用时间线解释审核流程，减少反复咨询。',
      points: [
        '状态标签与后台状态一一对应',
        '时间线四步：提交 → 初审 → 终审 → 结果',
        '已完成步骤实心点，当前步骤高亮，后续置灰',
        '已通过记录保留完整流程，便于追溯'
      ],
      rules: [
        '审核状态由后台驱动，前端只读',
        '未通过需展示原因与再次申请入口'
      ]
    },
    contact: {
      title: '联系对接',
      desc: '联系对接表单，把浏览意图转成有效线索。',
      points: [
        '顶部回显所对接的项目，避免上下文丢失',
        '对接方式用胶囊单选，减少下拉操作',
        '联系电话默认带出，标注不对外公开',
        '提交后由工作人员 1—2 个工作日内联系'
      ],
      rules: [
        '提交即生成线索记录，后台可跟进',
        '提示不得填写银行卡、密码等敏感信息'
      ]
    }
  };

  var host = document.getElementById('screenHost');
  var device = document.getElementById('device');
  var tabbar = document.getElementById('tabbar');
  var toastEl = document.getElementById('toast');
  var notesTitle = document.getElementById('notesTitle');
  var notesDesc = document.getElementById('notesDesc');
  var notesPoints = document.getElementById('notesPoints');
  var notesRules = document.getElementById('notesRules');
  var notesCounter = document.getElementById('notesCounter');

  var current = 'home';
  var stack = [];
  var toastTimer = null;

  function screens() {
    return host.querySelectorAll('.screen');
  }

  function show(id, opts) {
    var idx = ORDER.indexOf(id);
    if (idx === -1) return;
    opts = opts || {};

    if (!opts.replace && id !== current) {
      stack.push(current);
      if (stack.length > 24) stack.shift();
    }

    screens().forEach(function (el) {
      el.classList.toggle('active', el.dataset.screen === id);
    });

    document.querySelectorAll('.rail-item').forEach(function (el) {
      el.classList.toggle('active', el.dataset.go === id);
    });

    document.querySelectorAll('.tab-item').forEach(function (el) {
      el.classList.toggle('active', el.dataset.go === id);
    });

    tabbar.classList.toggle('hidden', TABBED.indexOf(id) === -1);
    device.classList.toggle('status-blue', DARK_STATUS.indexOf(id) !== -1);
    device.classList.toggle('status-light', DARK_STATUS.indexOf(id) === -1);

    var note = NOTES[id];
    if (note) {
      notesTitle.textContent = note.title;
      notesDesc.textContent = note.desc;
      notesPoints.innerHTML = note.points.map(function (t) {
        return '<li>' + t + '</li>';
      }).join('');
      notesRules.innerHTML = note.rules.map(function (t) {
        return '<li>' + t + '</li>';
      }).join('');
    }

    notesCounter.textContent = ('0' + (idx + 1)).slice(-2) + ' / ' + ORDER.length;

    var active = host.querySelector('.screen.active');
    if (active) active.scrollTop = 0;

    current = id;
    if (!opts.silent && history.replaceState) {
      history.replaceState(null, '', '#' + id);
    }
  }

  function back() {
    var target = stack.pop() || 'home';
    show(target, { replace: true });
  }

  function toast(msg) {
    if (!msg) return;
    toastEl.innerHTML = msg;
    toastEl.classList.remove('hidden');
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.add('hidden');
      toastEl.classList.remove('show');
    }, 2000);
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-go], [data-back], [data-toast]');
    if (!el) return;

    if (el.hasAttribute('data-back')) {
      e.preventDefault();
      back();
      return;
    }

    if (el.hasAttribute('data-toast')) {
      e.preventDefault();
      toast(el.getAttribute('data-toast'));
      return;
    }

    if (el.hasAttribute('data-go')) {
      e.preventDefault();
      show(el.getAttribute('data-go'));
    }
  });

  document.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    if (e.key === 'ArrowRight') {
      var i = ORDER.indexOf(current);
      show(ORDER[(i + 1) % ORDER.length]);
    } else if (e.key === 'ArrowLeft') {
      var j = ORDER.indexOf(current);
      show(ORDER[(j - 1 + ORDER.length) % ORDER.length]);
    } else if (e.key === 'Enter' || e.key === ' ') {
      var card = e.target.closest('[role="button"]');
      if (card) {
        e.preventDefault();
        card.click();
      }
    }
  });

  document.getElementById('prevScreen').addEventListener('click', function () {
    var i = ORDER.indexOf(current);
    show(ORDER[(i - 1 + ORDER.length) % ORDER.length]);
  });

  document.getElementById('nextScreen').addEventListener('click', function () {
    var i = ORDER.indexOf(current);
    show(ORDER[(i + 1) % ORDER.length]);
  });

  // 文本域计数
  function bindCounters() {
    document.querySelectorAll('textarea[maxlength]').forEach(function (ta) {
      var counter = ta.parentElement.querySelector('.counter');
      if (!counter) return;
      var max = ta.getAttribute('maxlength');
      var sync = function () {
        counter.textContent = ta.value.length + ' / ' + max;
      };
      ta.addEventListener('input', sync);
      sync();
    });
  }

  document.querySelectorAll('.chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var group = chip.parentElement;
      group.querySelectorAll('.chip').forEach(function (c) {
        c.classList.remove('active');
      });
      chip.classList.add('active');
    });
  });

  document.querySelectorAll('.mp-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var group = tab.parentElement;
      group.querySelectorAll('.mp-tab').forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');
    });
  });

  document.addEventListener('DOMContentLoaded', bindCounters);
  if (document.readyState !== 'loading') bindCounters();

  var initial = (location.hash || '').replace('#', '');
  show(ORDER.indexOf(initial) !== -1 ? initial : 'home', { silent: true, replace: true });

  window.addEventListener('hashchange', function () {
    var id = (location.hash || '').replace('#', '');
    if (ORDER.indexOf(id) !== -1 && !document.querySelector('.screen.active[data-screen="' + id + '"]')) {
      show(id);
    }
  });
})();
