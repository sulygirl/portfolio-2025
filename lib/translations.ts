export const translations = {
  cn: {
    // Home section
    greeting: "嗨，我是Sierra。",
    intro1: "我关注那些有立场、有观点、敢于表态的软件。",
    intro2: "能让人产生共鸣、让人有归属感的软件。",
    intro3: "能体现创作者个性的软件。",
    downloadResume: "下载简历",
    checkResume: "在线简历",
    downloaded: "已下载！",

    // Section headers
    thoughtsIdeas: "想法与创意",
    appearancesConversations: "演讲与对话",

    // Project labels
    sideProject: "个人项目",
    checkOut: "查看项目",

    // Articles
    article1: {
      title: "探索 visionOS 的UI模式",
      description: "关于visionOS基于视线的输入方式如何实现拖拽、文本输入等基础交互的想法。"
    },
    article2: {
      title: "摆脱浏览器的束缚",
      description: ""
    },
    article3: {
      title: "为创作者打造的日历",
      description: ""
    },
    article4: {
      title: "人文播客",
      description: ""
    },

    // Projects
    queue: {
      name: "OneSearchBox智能搜索",
      description1: "作为菜鸟CTO级战略项目，聚焦B端复杂查询场景，以 \"自然语言输入 + 智能推荐\" 重构交互范式，通过三层技术架构实现突破：前端构建 \"搜索框即入口\" 的极简交互层，中层依托自研7B大模型（后融合向量库 + Prompt工程）实现NLP解析与text2SQL转化，底层通过业务语料库与用户行为数据闭环持续优化。",
      description2: "颠覆传统筛选矩阵，设计 \"点（筛选）+ 推（推荐）+ 搜（搜索）\" 混合模式，兼顾效率与准确性；解析结果白盒化 + 用户可干预机制，构建 \"输入 - 解析 - 修正 - 训练\" 闭环，保障模型准确率；",
      description3: "低码组件化接入，将AI能力标准化，业务接入成本从30人日压缩至1天，覆盖菜鸟100%新增列表页，搜索效率平均提升75.32%。项目获集团多项大奖，成为B端智能化转型标杆。"
    },
    canopi: {
      description1: "2023年末，我终于决定开始学习编程并着手实现我的想法。",
      description2: "我有几个已经从事Web设计的朋友，我们聚在一起，运用三种免费技能，我对Canopi有很多很酷的想法。"
    },
    bento: {
      description1: "这是一个示例文本。这是中文版本的项目描述。这个项目展示了我们如何看待这个行业的发展。",
      description2: "这是更详细的项目描述，包含了项目的主要功能和特点。我们致力于创造优质的用户体验，提供创新的解决方案。",
      description3: "在接下来的四周里，我们从零开始设计并构建了一个全新的产品。这始于一个简单的想法：如果我们能为网络上所有厨房创造一个工具会怎样？",
      description4: "我们想要构建一个工具来帮助管理我们所有的图片网格。"
    },

    // Footer
    copyright: "© 2025 Sierra Sun"
  },
  en: {
    // Home section
    greeting: "Hey, I'm Sierra.",
    intro1: "I care about software that stands for something, that has an opinion, that chooses a side.",
    intro2: "Software that makes you feel something - feel part of something.",
    intro3: "Software that tells you something about the people who created it.",
    downloadResume: "Download my Resume",
    checkResume: "Check online Resume",
    downloaded: "Downloaded!",

    // Section headers
    thoughtsIdeas: "Thoughts & Ideas",
    appearancesConversations: "Appearances & Conversations",

    // Project labels
    sideProject: "Side Project",
    checkOut: "View Project",

    // Articles
    article1: {
      title: "Exploring UI Patterns for visionOS",
      description: "Ideas for how the gaze-based input method of visionOS could communicate fundamental interactions like dragging or entering text."
    },
    article2: {
      title: "Getting rid of the browser",
      description: ""
    },
    article3: {
      title: "A calendar for makers",
      description: ""
    },
    article4: {
      title: "A podcast for humans",
      description: ""
    },

    // Projects
    queue: {
      name: "OneSearchBox AI Search",
      description1: "As a CTO-level strategic project at Cainiao, focusing on complex B-end query scenarios, we reconstructed the interaction paradigm with 'Natural Language Input + Intelligent Recommendations' through a three-layer technical architecture: frontend builds a minimalist interaction layer with 'search box as entry', middle layer leverages self-developed 7B model (later integrated with vector database + Prompt engineering) for NLP parsing and text2SQL conversion, and bottom layer continuously optimizes through business corpus and user behavior data loop.",
      description2: "Innovations: Revolutionizing traditional filtering matrix with pioneering 'Click (Filter) Recommend (Suggest) Search' hybrid mode, balancing efficiency and accuracy; White-box parsing results + user intervention mechanism, building an 'Input - Parse - Correct - Train' loop, improving model accuracy by 23%;",
      description3: "Low-code componentized integration standardizes AI capabilities, reducing business integration cost from 30 person-days to 1 day, covering 50% of new list pages, improving search efficiency by an average of 75.32%. The project won multiple group awards and became a benchmark for B-end intelligent transformation."
    },
    canopi: {
      description1: "In late 2023, I decided to finally get into coding and start building my ideas.",
      description2: "I had a couple of friends who were already into Web Design, so we came together, built with three free skills, and I have a lot of cool ideas for Canopi."
    },
    bento: {
      description1: "Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Sed do eiusmod tempor. It has created since the industry how we look into this industry came to the point.",
      description2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      description3: "For the next four weeks, we designed and built a completely new product from scratch. It started with a simple idea: what if we could make a tool for cooking in all your kitchens from around the web.",
      description4: "We wanted to build a tool to help the grid of images that we all have."
    },

    // Footer
    copyright: "© 2025 Sierra Sun"
  }
} as const; 