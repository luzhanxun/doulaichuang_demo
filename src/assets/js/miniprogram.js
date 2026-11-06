/* 斗来创 · 小程序原型交互
   页面切换、说明面板、返回栈、键盘导航、表单计数、演示提示
   首页轮播（后台可配置）、简体/繁体切换、宣传片懒加载 */
(function () {
  'use strict';

  var ORDER = [
    'home', 'projects', 'project-detail',
    'info', 'news-detail', 'policy-detail',
    'orgs', 'org-detail', 'apply',
    'jobs', 'job-detail',
    'supply', 'supply-detail',
    'activities', 'activity-detail',
    'login', 'profile', 'applications', 'contact'
  ];

  var TABBED = ['home', 'projects', 'info', 'activities', 'profile'];
  var DARK_STATUS = ['home', 'login'];

  var NOTES = {
    home: {
      title: '首页',
      desc: '第一屏承担四件事：用轮播说清平台是什么、用六大模块给出路径、用宣传片建立在地感、用内容列表证明持续运营。',
      points: [
        '顶部轮播的图片、主副标题与文字样式（字号、字重、颜色、对齐）全部由后台「轮播图管理」配置，前端不写死',
        '轮播不自动播放，左右箭头与圆点手动切换，避免打断阅读',
        '六大模块以 2×3 快捷卡承载：项目、信息、组织、工作、供需、活动，图标底色区分模块',
        '宣传片默认只加载海报，点击后才创建 video 元素（preload=none），不自动播放',
        '首屏之下依次为重点项目、最新信息、近期活动与找到组织横幅'
      ],
      rules: [
        '轮播文案与图片由后台输出，属动态内容，不参与简繁切换',
        '轮播最多 5 张，图片比例固定 16:9，避免首屏高度跳动',
        '底部导航固定 5 项（首页 / 项目 / 信息 / 活动 / 我的），详情页自动隐藏'
      ]
    },
    projects: {
      title: '找到项目',
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
      title: '项目详情',
      desc: '项目详情的阅读与转化页：先建立信任，再引导登录与对接。',
      points: [
        '顶部大图承载项目氛围，返回与分享悬浮于图上',
        '标题下方直接给出领域、合作方式与状态标签',
        '四宫格信息区把关键事实前置，降低阅读成本',
        '联系方式登录后可见，虚线区块明确门槛与下一步'
      ],
      rules: [
        '未登录点击联系对接，先跳转登录页',
        '底部固定操作栏：分享、联系对接'
      ]
    },
    info: {
      title: '找到信息',
      desc: '原「重大信息」与「港澳政策」合并为一个模块，用统一 tab 承载资讯、政策与解读，减少一层入口。',
      points: [
        '一个模块覆盖资讯与政策两类内容，首屏即可看全六大模块',
        '顶部保留「政策以官方发布为准」提示，明确平台只做汇编与解读',
        '分类用横向 tab：全部 / 重大信息 / 港澳政策 / 政策解读',
        '列表统一显示来源、日期与阅读量，建立信息可信度'
      ],
      rules: [
        '所有内容经单层审核通过后发布，任何修改都需重新审核',
        '标题与来源不可省略，不使用诱导性标题',
        '政策文号与发文机关须与官方一致，示例数据需标注'
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
    'policy-detail': {
      title: '政策详情',
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
      desc: '组织名录页，帮助大湾区青年找到可加入的组织与创业基地。',
      points: [
        '顶部先说明组织能提供什么，再给列表',
        '组织卡展示成员数、活动数与入会状态',
        '入会状态用绿色与灰色标签区分可申请 / 需推荐'
      ],
      rules: [
        '组织信息由后台维护，变更需留操作记录',
        '入会状态与后台审批状态保持一致'
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
      desc: '加入组织的三步流程：提交 → 审批 → 通过 / 不通过，本页是第一步。',
      points: [
        '顶部步骤条显示进度，已完成步骤打勾',
        '申请人信息用摘要卡回显，可返回修改',
        '表单分区，必填项标注 *，文本域实时计数',
        '隐私说明与同意勾选紧邻提交按钮'
      ],
      rules: [
        '证件与联系方式仅用于资格审核',
        '提交后进入组织单层审批，约 5 个工作日出结果',
        '未通过需展示原因与再次申请入口'
      ]
    },
    jobs: {
      title: '找到工作',
      desc: '新增模块：发布斗门本地招聘与实习信息，覆盖全职、实习、兼职与灵活就业。',
      points: [
        '岗位卡把薪资、单位、镇街与经验要求放在同一视线内，便于横向比较',
        '分类 tab：全部 / 全职 / 实习 / 兼职',
        '详情页先给四宫格硬信息，再展开职责、要求与福利',
        '投递方式登录后可见，底部固定操作栏只保留投递主行动'
      ],
      rules: [
        '岗位信息由用人单位提供，经平台审核通过后展示',
        '薪资为区间时统一写作 6-9K，不使用模糊表述',
        '招聘信息超过 60 天自动下架，需重新提交审核'
      ]
    },
    'job-detail': {
      title: '岗位详情',
      desc: '把「要不要投」的判断依据前置，再给出唯一行动。',
      points: [
        '头部用深青蓝色块承载岗位名、单位与薪资，与列表卡形成呼应',
        '四宫格信息区把招聘人数、学历、经验与到岗时间前置',
        '职责与要求分块呈现，福利待遇用标签归纳',
        '未登录时投递方式以虚线区块锁定，点击回到登录页'
      ],
      rules: [
        '联系方式不对未登录用户展示',
        '投递记录进入后台简历池，可按岗位导出跟进'
      ]
    },
    supply: {
      title: '找到供需',
      desc: '新增模块：发布斗门产品、场地租赁与采购协作的供求信息。',
      points: [
        '卡片用标签区分供应 / 需求 / 租赁，避免混在一条列表里难以辨别',
        '联系方式默认隐藏，显示「登录后可见联系方式」',
        '顶部提示供需信息由发布方提供、平台审核后展示',
        '发布入口固定在底部按钮，减少对列表的干扰'
      ],
      rules: [
        '留言与联系方式仅对该条供需的发布方与平台可见',
        '同一账号 7 天内同类信息不超过 3 条，防刷屏',
        '成交或失效后由发布方或后台下架'
      ]
    },
    'supply-detail': {
      title: '供需详情',
      desc: '核心动作是「留下联系方式」，把浏览转成可跟进的线索。',
      points: [
        '头部图区带信息类型标签，标题下方给数量、品类与合作方式',
        '信息详情与合作说明分块，避免大段文字堆叠',
        '留言表单三项必填：联系人、联系电话、留言内容',
        '表单下方提示仅对发布方可见，降低隐私顾虑'
      ],
      rules: [
        '提交后同时通知发布方与平台，双方自行协商交易细节',
        '平台不介入交易与结算，不提供担保'
      ]
    },
    activities: {
      title: '找到活动',
      desc: '新增模块：发布研学、路演、沙龙与志愿服务等活动，支持在线报名。',
      points: [
        '日期块用暖橙数字强调「什么时候」，右侧承载标题与报名进度',
        '状态标签区分 报名中 / 预告 / 已结束，已结束不再展示报名入口',
        '分类 tab：全部 / 报名中 / 研学交流 / 项目路演',
        '卡片底部显示主办方与已报名人数，营造参与感'
      ],
      rules: [
        '活动由主办方发布并经平台审核通过后展示',
        '名额已满时自动关闭报名并提示候补方式',
        '活动结束后 7 天内由后台归档报名信息'
      ]
    },
    'activity-detail': {
      title: '活动详情',
      desc: '先解决「值不值得来」，再收报名信息。',
      points: [
        '头部承载时间、地点与人数三项硬信息，与列表卡保持一致',
        '四宫格给报名截止、名额、已报名与费用，报名前即可判断',
        '活动流程用时间轴呈现，降低现场不确定性',
        '报名表单四项：姓名、手机号、报名人数、想了解的内容'
      ],
      rules: [
        '报名信息仅用于活动组织、通知与签到',
        '报名成功后在「我的申请」中可查看与取消',
        '后台可查看、确认并导出报名名单'
      ]
    },
    login: {
      title: '登录',
      desc: '登录页说明登录能获得什么，降低授权顾虑。',
      points: [
        '深青蓝背景配暖橙光晕，延续品牌但不用大面积渐变',
        '先列三项具体权益：对接项目、报名活动、留言供需',
        '提供暂不登录入口，避免强制登录造成流失',
        '底部展示用户协议与隐私政策'
      ],
      rules: [
        '仅获取微信昵称与头像，不索取额外信息',
        '登录后方可查看联系方式、投递岗位与提交报名'
      ]
    },
    profile: {
      title: '个人中心',
      desc: '聚合申请与对接记录，是用户的服务入口。',
      points: [
        '头部展示身份标签，如大湾区青年、已实名',
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
      desc: '用时间线解释「提交 → 审批 → 结果」的单层流程，减少反复咨询。',
      points: [
        '状态标签与后台状态一一对应：审批中 / 已通过 / 未通过',
        '时间线三步：提交申请 → 组织审批 → 结果通知',
        '已完成步骤实心点，当前步骤高亮，后续置灰',
        '已通过记录保留完整流程，便于追溯'
      ],
      rules: [
        '审批状态由后台驱动，前端只读',
        '未通过需展示原因与再次申请入口',
        '审批通过后可回到组织详情查看会员服务'
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

  /* ---------- 简繁转换词表 ----------
     由界面静态文案经 OpenCC 转换后人工校正得到：先整体匹配词条，再逐字兜底。
     只作用于小程序界面的静态文案，后台输出的动态内容（[data-dynamic]）不参与。 */
  var ZH_CHAR = {
    "万": "萬",
    "与": "與",
    "专": "專",
    "业": "業",
    "东": "東",
    "两": "兩",
    "严": "嚴",
    "个": "個",
    "为": "為",
    "习": "習",
    "乡": "鄉",
    "书": "書",
    "于": "於",
    "产": "產",
    "亩": "畝",
    "仅": "僅",
    "从": "從",
    "仓": "倉",
    "们": "們",
    "价": "價",
    "优": "優",
    "会": "會",
    "传": "傳",
    "体": "體",
    "储": "儲",
    "关": "關",
    "兴": "興",
    "养": "養",
    "内": "內",
    "册": "冊",
    "写": "寫",
    "农": "農",
    "准": "準",
    "击": "擊",
    "划": "劃",
    "则": "則",
    "创": "創",
    "办": "辦",
    "务": "務",
    "动": "動",
    "励": "勵",
    "势": "勢",
    "区": "區",
    "协": "協",
    "单": "單",
    "厂": "廠",
    "历": "歷",
    "参": "參",
    "双": "雙",
    "发": "發",
    "号": "號",
    "后": "後",
    "吨": "噸",
    "启": "啓",
    "员": "員",
    "团": "團",
    "园": "園",
    "围": "圍",
    "国": "國",
    "图": "圖",
    "圆": "圓",
    "场": "場",
    "备": "備",
    "复": "復",
    "夹": "夾",
    "学": "學",
    "实": "實",
    "审": "審",
    "对": "對",
    "寻": "尋",
    "导": "導",
    "将": "將",
    "尽": "盡",
    "层": "層",
    "属": "屬",
    "岗": "崗",
    "带": "帶",
    "帮": "幫",
    "干": "幹",
    "并": "並",
    "广": "廣",
    "庄": "莊",
    "应": "應",
    "开": "開",
    "张": "張",
    "强": "強",
    "归": "歸",
    "录": "錄",
    "态": "態",
    "总": "總",
    "愿": "願",
    "战": "戰",
    "户": "戶",
    "托": "託",
    "执": "執",
    "护": "護",
    "报": "報",
    "拥": "擁",
    "拨": "撥",
    "挥": "揮",
    "换": "換",
    "据": "據",
    "摄": "攝",
    "数": "數",
    "断": "斷",
    "无": "無",
    "旧": "舊",
    "时": "時",
    "晓": "曉",
    "暂": "暫",
    "术": "術",
    "机": "機",
    "条": "條",
    "来": "來",
    "杨": "楊",
    "构": "構",
    "标": "標",
    "档": "檔",
    "检": "檢",
    "楼": "樓",
    "欢": "歡",
    "残": "殘",
    "汇": "匯",
    "沟": "溝",
    "测": "測",
    "浏": "瀏",
    "游": "遊",
    "湾": "灣",
    "灵": "靈",
    "点": "點",
    "状": "狀",
    "独": "獨",
    "献": "獻",
    "环": "環",
    "现": "現",
    "电": "電",
    "盘": "盤",
    "码": "碼",
    "确": "確",
    "礼": "禮",
    "种": "種",
    "称": "稱",
    "稳": "穩",
    "筛": "篩",
    "签": "籤",
    "简": "簡",
    "类": "類",
    "粤": "粵",
    "粮": "糧",
    "红": "紅",
    "约": "約",
    "级": "級",
    "纳": "納",
    "线": "線",
    "组": "組",
    "细": "細",
    "织": "織",
    "终": "終",
    "绍": "紹",
    "经": "經",
    "结": "結",
    "绕": "繞",
    "给": "給",
    "统": "統",
    "续": "續",
    "编": "編",
    "缴": "繳",
    "职": "職",
    "联": "聯",
    "脏": "髒",
    "节": "節",
    "荐": "薦",
    "药": "藥",
    "莲": "蓮",
    "获": "獲",
    "营": "營",
    "补": "補",
    "装": "裝",
    "见": "見",
    "规": "規",
    "视": "視",
    "览": "覽",
    "计": "計",
    "订": "訂",
    "认": "認",
    "让": "讓",
    "训": "訓",
    "议": "議",
    "讯": "訊",
    "记": "記",
    "设": "設",
    "访": "訪",
    "证": "證",
    "评": "評",
    "试": "試",
    "话": "話",
    "该": "該",
    "详": "詳",
    "语": "語",
    "说": "說",
    "请": "請",
    "读": "讀",
    "课": "課",
    "调": "調",
    "谊": "誼",
    "负": "負",
    "责": "責",
    "账": "賬",
    "货": "貨",
    "质": "質",
    "购": "購",
    "贴": "貼",
    "费": "費",
    "赁": "賃",
    "资": "資",
    "践": "踐",
    "踪": "蹤",
    "轮": "輪",
    "载": "載",
    "辅": "輔",
    "辑": "輯",
    "输": "輸",
    "达": "達",
    "过": "過",
    "运": "運",
    "进": "進",
    "适": "適",
    "选": "選",
    "递": "遞",
    "遗": "遺",
    "采": "採",
    "银": "銀",
    "链": "鏈",
    "销": "銷",
    "键": "鍵",
    "镇": "鎮",
    "长": "長",
    "门": "門",
    "间": "間",
    "闻": "聞",
    "阅": "閱",
    "队": "隊",
    "阶": "階",
    "际": "際",
    "陈": "陳",
    "险": "險",
    "随": "隨",
    "隐": "隱",
    "静": "靜",
    "页": "頁",
    "项": "項",
    "须": "須",
    "预": "預",
    "领": "領",
    "频": "頻",
    "题": "題",
    "额": "額",
    "饮": "飲",
    "馈": "饋",
    "驻": "駐",
    "验": "驗",
    "骑": "騎",
    "鱼": "魚",
    "鲈": "鱸",
    "鲜": "鮮",
    "黄": "黃",
    "龙": "龍"
  };

  var ZH_PHRASE = {
    "白蕉镇是\"中国海鲈之乡\"，拥有从种苗、养殖到加工、冷链的完整产业链。园区规划建设标准化预制菜加工区、冷链仓储与产品研发中心，面向港澳青年创业者开放合作。": "白蕉鎮是\"中國海鱸之鄉\"，擁有從種苗、養殖到加工、冷鏈的完整產業鏈。園區規劃建設標準化預製菜加工區、冷鏈倉儲與產品研發中心，面向港澳青年創業者開放合作。",
    "斗门区湾区青年发展联合会由区内创业主体、大湾区青年代表及相关服务机构自愿组成，致力于搭建青年了解斗门、对接项目、融入湾区的服务平台。": "斗門區灣區青年發展聯合會由區內創業主體、大灣區青年代表及相關服務機構自願組成，致力於搭建青年瞭解斗門、對接項目、融入灣區的服務平台。",
    "您提交的个人信息仅用于入会资格审核，不会用于其他用途。审核周期约 5 个工作日，结果可在\"我的申请\"中查看。": "您提交的個人信息僅用於入會資格審核，不會用於其他用途。審核週期約 5 個工作日，結果可在\"我的申請\"中查看。",
    "项目重点引入品牌策划、食品研发、跨境电商与青年主理人团队，共同开发适合港澳及海外市场的海鲈预制菜产品。": "項目重點引入品牌策劃、食品研發、跨境電商與青年主理人團隊，共同開發適合港澳及海外市場的海鱸預製菜產品。",
    "提交后，平台工作人员将在 1—2 个工作日内与您联系。您的个人信息仅用于本次对接，不会用于其他用途。": "提交後，平台工作人員將在 1—2 個工作日內與您聯繫。您的個人信息僅用於本次對接，不會用於其他用途。",
    "本措施适用于在斗门区依法登记注册、由港澳青年创办或实际参与经营的企业、个体工商户及青年创业项目。": "本措施適用於在斗門區依法登記註冊、由港澳青年創辦或實際參與經營的企業、個體工商戶及青年創業項目。",
    "为支持港澳青年来斗门创新创业，融入粤港澳大湾区发展，结合本区实际，制定本措施。": "為支持港澳青年來斗門創新創業，融入粵港澳大灣區發展，結合本區實際，制定本措施。",
    "我们是一支专注食品品牌设计的香港青年团队，希望了解园区入驻条件与品牌合作方式。": "我們是一支專注食品品牌設計的香港青年團隊，希望瞭解園區入駐條件與品牌合作方式。",
    "希望参与斗门项目对接，结合自身在品牌设计方面的经验，为乡村文旅项目提供支持。": "希望參與斗門項目對接，結合自身在品牌設計方面的經驗，為鄉村文旅項目提供支持。",
    "信息与政策以官方发布为准。平台提供汇编与解读，具体申报以主管部门要求为准。": "信息與政策以官方發佈為準。平台提供彙編與解讀，具體申報以主管部門要求為準。",
    "本页面内容为演示数据。正式政策文本、文号及申报条件以主管部门官方发布为准。": "本頁面內容為演示數據。正式政策文本、文號及申報條件以主管部門官方發佈為準。",
    "供需信息由发布方提供，平台审核后展示；联系方式仅对登录用户可见。": "供需信息由發佈方提供，平台審核後展示；聯繫方式僅對登錄用戶可見。",
    "如需修改或撤销申请，请联系平台工作人员。审核结果以最终通知为准。": "如需修改或撤銷申請，請聯繫平台工作人員。審核結果以最終通知為準。",
    "岗位信息由用人单位提供，经平台审核后发布。投递前请核实岗位详情。": "崗位信息由用人單位提供，經平台審核後發佈。投遞前請核實崗位詳情。",
    "使用微信一键登录，即可联系项目、申请入会、报名活动并查看进度。": "使用微信一鍵登錄，即可聯繫項目、申請入會、報名活動並查看進度。",
    "报名信息仅用于本次活动组织、通知与签到，活动结束后按约定归档。": "報名信息僅用於本次活動組織、通知與簽到，活動結束後按約定歸檔。",
    "联系服务大湾区青年创业主体，开展项目对接、研学交流与创业辅导。": "聯繫服務大灣區青年創業主體，開展項目對接、研學交流與創業輔導。",
    "活动由主办方发布并经平台审核；报名信息仅用于活动组织与签到。": "活動由主辦方發佈並經平台審核；報名信息僅用於活動組織與簽到。",
    "斗门机遇一站式对接平台 · 高保真交互原型 v2.0": "斗門機遇一站式對接平台 · 高保真交互原型 v2.0",
    "入会申请信息仅用于资格审核，平台与组织将严格保密。": "入會申請信息僅用於資格審核，平台與組織將嚴格保密。",
    "入会须知：请如实填写信息，审核周期约 5 个工作日": "入會須知：請如實填寫信息，審核週期約 5 個工作日",
    "团结新的社会阶层人士，搭建交流合作与建言献策平台。": "團結新的社會階層人士，搭建交流合作與建言獻策平台。",
    "留言将同步至发布方与平台，由双方自行协商交易细节。": "留言將同步至發佈方與平台，由雙方自行協商交易細節。",
    "与在地创业者建立联系，获取项目、政策与活动信息。": "與在地創業者建立聯繫，獲取項目、政策與活動信息。",
    "依托国家地理标志产品\"白蕉海鲈\"，原料供应稳定。": "依託國家地理標誌產品\"白蕉海鱸\"，原料供應穩定。",
    "请简要说明您的合作意向、团队背景或希望了解的信息": "請簡要說明您的合作意向、團隊背景或希望瞭解的信息",
    "从养殖到预制菜，打造湾区海鲈全产业链合作平台": "從養殖到預製菜，打造灣區海鱸全產業鏈合作平台",
    "原型为静态高保真稿，内容与数据均为演示用途": "原型為靜態高保真稿，內容與數據均為演示用途",
    "仅对该条供需的发布方可见，不会公开展示。": "僅對該條供需的發佈方可見，不會公開展示。",
    "珠海市斗门区支持港澳青年创新创业若干措施": "珠海市斗門區支持港澳青年創新創業若干措施",
    "对接申请已提交，工作人员将尽快联系您": "對接申請已提交，工作人員將盡快聯繫您",
    "斗来创 v1.0.0 · 演示原型": "斗來創 v1.0.0 · 演示原型",
    "入会申请提交后由组织工作人员联系": "入會申請提交後由組織工作人員聯繫",
    "协助会员了解港澳政策与申报流程。": "協助會員瞭解港澳政策與申報流程。",
    "斗来创 · 微信小程序高保真原型": "斗來創 · 微信小程序高保真原型",
    "登录后可查看联系人并发起对接申请": "登錄後可查看聯繫人並發起對接申請",
    "登录后可查看联系人并在线投递简历": "登錄後可查看聯繫人並在線投遞簡歷",
    "查看项目联系方式，发起对接申请": "查看項目聯繫方式，發起對接申請",
    "提交后由平台工作人员协助对接": "提交後由平台工作人員協助對接",
    "政策汇编 · 珠海市斗门区": "政策彙編 · 珠海市斗門區",
    "大湾区青年机遇一站式平台": "大灣區青年機遇一站式平台",
    "审核周期约 5 个工作日": "審核週期約 5 個工作日",
    "现代农业 · 预制菜加工": "現代農業 · 預製菜加工",
    "留言已提交，等待对方联系": "留言已提交，等待對方聯繫",
    "斗来创 · 微信小程序": "斗來創 · 微信小程序",
    "最终以甲方提供素材为准": "最終以甲方提供素材為準",
    "请联系组织获取会员服务": "請聯繫組織獲取會員服務",
    "白蕉海鲈预制菜产业园": "白蕉海鱸預製菜產業園",
    "原型内容为演示数据": "原型內容為演示數據",
    "用于活动通知与签到": "用於活動通知與簽到",
    "联系方式登录后可见": "聯繫方式登錄後可見",
    "莲江村乡村民宿集群": "蓮江村鄉村民宿集群",
    "创新创业若干措施": "創新創業若干措施",
    "工作日内尽快安排": "工作日內儘快安排",
    "已复制项目链接": "已複製項目連結",
    "带 * 为必填": "帶 * 為必填",
    "按发布时间排序": "按發佈時間排序",
    "1 条审核中": "1 條審核中",
    "后台管理系统": "後台管理系統",
    "联系对接记录": "聯繫對接記錄",
    "关于平台": "關於平台",
    "发布日期": "發佈日期",
    "留言联系": "留言聯繫",
    "联系对接": "聯繫對接",
    "联系电话": "聯繫電話",
    "斗来创": "斗來創",
    "本周内": "本週內",
    "联系人": "聯繫人",
    "预制菜": "預製菜",
    "下周": "下週"
  };

  var ZH_KEYS = Object.keys(ZH_PHRASE).sort(function (a, b) {
    return b.length - a.length;
  });
  var ZH_RE = new RegExp(ZH_KEYS.map(function (k) {
    return k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }).join('|'), 'g');

  function toHant(str) {
    return str
      .replace(ZH_RE, function (m) { return ZH_PHRASE[m]; })
      .replace(/[\u4e00-\u9fa5]/g, function (c) { return ZH_CHAR[c] || c; });
  }

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

  /* ---------- 简繁体切换 ---------- */
  var LANG_SKIP = 'script, style, [data-dynamic], #langToggle';
  var langOpts = document.querySelectorAll('#langToggle .lt-opt');
  var hansText = new WeakMap();
  var hansAttr = new WeakMap();
  var currentLang = 'hans';

  function staticTextNodes() {
    var walker = document.createTreeWalker(device, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (node.parentElement && node.parentElement.closest(LANG_SKIP)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var list = [];
    while (walker.nextNode()) list.push(walker.currentNode);
    return list;
  }

  function staticAttrEls() {
    var list = [];
    device.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(function (el) {
      if (el.closest(LANG_SKIP)) return;
      list.push(el);
    });
    return list;
  }

  function setLang(lang) {
    var hant = lang === 'hant';
    currentLang = hant ? 'hant' : 'hans';

    staticTextNodes().forEach(function (node) {
      if (!hansText.has(node)) hansText.set(node, node.nodeValue);
      var origin = hansText.get(node);
      node.nodeValue = hant ? toHant(origin) : origin;
    });

    staticAttrEls().forEach(function (el) {
      if (!hansAttr.has(el)) hansAttr.set(el, el.getAttribute('placeholder'));
      var origin = hansAttr.get(el);
      el.setAttribute('placeholder', hant ? toHant(origin) : origin);
    });

    langOpts.forEach(function (opt) {
      opt.classList.toggle('active', opt.dataset.lang === currentLang);
    });
    device.classList.toggle('lang-hant', hant);

    /* 纯视觉：重放一次交叉淡化，不改变任何状态或数据 */
    device.classList.remove('lang-swap');
    void device.offsetWidth;
    device.classList.add('lang-swap');
  }

  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      setLang(currentLang === 'hans' ? 'hant' : 'hans');
    });
  }

  /* ---------- 首页轮播（不自动播放） ---------- */
  var track = document.getElementById('hcTrack');
  var slides = track ? track.querySelectorAll('.hc-slide') : [];
  var dots = document.querySelectorAll('#hcDots .hc-dot');
  var hcIndex = 0;

  function goSlide(next) {
    if (!slides.length) return;
    hcIndex = (next + slides.length) % slides.length;
    track.style.transform = 'translateX(' + (-hcIndex * 100) + '%)';
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === hcIndex);
      if (i === hcIndex) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }

  if (slides.length) {
    var prevBtn = document.getElementById('hcPrev');
    var nextBtn = document.getElementById('hcNext');
    if (prevBtn) prevBtn.addEventListener('click', function () { goSlide(hcIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goSlide(hcIndex + 1); });
    document.getElementById('hcDots').addEventListener('click', function (e) {
      var dot = e.target.closest('.hc-dot');
      if (dot) goSlide(Number(dot.dataset.slide));
    });
    goSlide(0);
  }

  /* ---------- 宣传片：点击后才加载，不自动播放 ---------- */
  var promoPlay = document.getElementById('promoPlay');
  var promoStage = document.getElementById('promoStage');
  var promoPoster = document.getElementById('promoPoster');
  var PROMO_SRC = '../assets/media/promo.mp4';

  if (promoPlay) {
    promoPlay.addEventListener('click', function () {
      var video = document.createElement('video');
      video.controls = true;
      video.preload = 'none';
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.poster = '';

      video.addEventListener('error', function () {
        if (video.parentNode) video.parentNode.removeChild(video);
        if (promoPoster) promoPoster.classList.remove('hidden');
        toast('演示环境未接入宣传片源，正式上线由后台配置视频地址');
      });

      video.addEventListener('loadedmetadata', function () {
        if (promoPoster) promoPoster.classList.add('hidden');
        var p = video.play();
        if (p && p.catch) p.catch(function () {});
      });

      video.src = PROMO_SRC;
      promoStage.appendChild(video);
    });
  }

  function toast(msg) {
    if (!msg) return;
    toastEl.innerHTML = currentLang === 'hant' ? toHant(msg) : msg;
    toastEl.classList.remove('hidden');
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.add('hidden');
      toastEl.classList.remove('show');
    }, 2200);
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

  // 分类 chip 与 tab 用委托绑定，新增页面无需再挂监听
  document.addEventListener('click', function (e) {
    var chip = e.target.closest('.chip');
    if (chip) {
      chip.parentElement.querySelectorAll('.chip').forEach(function (c) {
        c.classList.remove('active');
      });
      chip.classList.add('active');
      return;
    }

    var tab = e.target.closest('.mp-tab');
    if (tab) {
      tab.parentElement.querySelectorAll('.mp-tab').forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');
    }
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
