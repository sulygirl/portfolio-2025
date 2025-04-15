"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'zh' | 'en';

// Define translation type
type TranslationType = {
  greeting: string;
  title1: string;
  title2: string;
  intro: string;
  bulletPoint1: string;
  bulletPoint2: string;
  conclusion: string;
  downloadResume: string;
  downloaded: string;
  checkResume: string;
  copyright: string;
  thoughtsTitle: string;
  musicTitle: string;
  queue: {
    name: string;
    description1: string;
    description2: string;
    description3: string;
    tag: string;
  };
  aiDev: {
    name: string;
    description1: string;
    description2: string;
    description3: string;
    tag: string;
  };
  bento: {
    name: string;
    description1: string;
    description2: string;
    description3: string;
    tag: string;
  };
  aiDesign: {
    name: string;
    description1: string;
    description2: string;
    description3: string;
    tag: string;
  };
  checkOut: string;
  articles: {
    aiSearch: {
      title: string;
      description: string;
    };
    wickedProblem: {
      title: string;
    };
    dataDesign: {
      title: string;
    };
    music: {
      title: string;
    };
  };
};

// Define translations
const translations: Record<Language, TranslationType> = {
  zh: {
    greeting: "嘿，我是Sierra",
    title1: "2年经验的B端AI产品项目Owner",
    title2: "5年经验的复杂B端系统体验设计师",
    intro: "我以AI为笔，重构复杂系统的人机共生界面——",
    bulletPoint1: "从LLM/AIGC技术深潜到业务场景落地，打造「AI赋能」全栈研发体系",
    bulletPoint2: "创造智能搜索组件，为企业节省40万小时查询时长",
    conclusion: "当严谨的B端系统开始理解用户意图\n就是人机协同进化的新叙事",
    downloadResume: "下载简历",
    downloaded: "下载完成！",
    checkResume: "查看简历",
    copyright: "© 2025 Sierra Sun. 保留所有权利",
    thoughtsTitle: "一些项目中的思考",
    musicTitle: "一些AI音乐上的尝试",
    queue: {
      name: "OSB智能搜索",
      description1: "聚焦B端复杂查询场景，以 \"自然语言输入 + 智能推荐\" 重构交互范式，通过三层技术架构实现突破：前端构建 \"搜索框即入口\" 的极简交互层，中层依托自研7B大模型（后融合向量库 + Prompt工程）实现NLP解析与text2SQL转化，底层通过业务语料库与用户行为数据闭环持续优化。",
      description2: "颠覆传统筛选矩阵，设计 \"点（筛选）+ 推（推荐）+ 搜（搜索）\" 混合模式，兼顾效率与准确性；解析结果白盒化 + 用户可干预机制，构建 \"输入 - 解析 - 修正 - 训练\" 闭环，保障模型准确率；",
      description3: "低码组件化接入，将AI能力标准化，业务接入成本从30人日压缩至1天，覆盖菜鸟100%新增列表页，搜索效率平均提升75.32%。项目获集团多项大奖，成为B端智能化转型标杆。",
      tag: "CTO战略项目"
    },
    aiDev: {
      name: "AI驱动的研发全链路赋能",
      description1: "聚焦传统低代码平台配置效率低、上手成本高的痛点，通过AI技术重构研发链路，打造「智能辅助 + 可控干预」的低码开发体验。",
      description2: "采用「LLM+RAG+AIGC」组合方案，构建从需求描述到页面生成的全流程智能辅助能力，突破大模型在企业级低码场景的应用瓶颈。建立低码页面质量检测标准，通过评分模型（严重 / 性能 / 体验问题分级）和自动化检测工具，将页面标准度80分以上占比从65.23%提升至85.34%。",
      description3: "智能模板推荐系统基于用户自然语言描述，通过RAG匹配知识库生成定制化模板，生成页面占比从0%提升至21.34%。通过「AI 增强而非替代」的设计原则，在保障可控性与规范性的前提下，让非技术用户快速构建高质量低码应用。重新定义 B 端研发效率 —— 让需求描述即开发起点，用智能技术释放产研创造力。",
      tag: "CTO战略项目"
    },
    bento: {
      name: "I18N设计策略及一键翻译",
      description1: "聚焦全球化业务中多语言适配与文化差异挑战，构建从设计策略到工具落地的全链路国际化解决方案。",
      description2: "明确 G11N（全球化）、I18N（国际化）、L10N（本地化）三层架构，提供视觉适配策略，通过纵向空间利用、图文结合等手法解决文字长度差异问题。建立物流行业专属术语库，规范「运单→Waybill」等专业翻译。",
      description3: "通过建设翻译平台和工具，支持业务运行态一键生成RTL页面版本，助力国际化研发效率实现从预估的2-3个月缩短到2周的突破。",
      tag: "重点项目"
    },
    aiDesign: {
      name: "物流行业设计系统",
      description1: "针对10+业务线终端碎片化、年重复开发成本超千万的痛点，打造物流行业首个「一码多端」设计系统，重塑产研协作秩序。",
      description2: "构建「设计规范 + 工具赋能 + 服务平台」体系，涵盖原子组件、复合组件、区块模板三层架构，实现从视觉语言到交互规则的全链路标准化。制定「一码多端」策略，通过层级复用、横向折叠、功能聚合等规则，实现 PC/PDA/ 移动端一套代码覆盖，多端映射率100%，打破传统响应式设计局限。",
      description3: "建立可持续共建机制，服务3000+产研人员，单一需求交付周期从15-30天压缩至5-7天，年节省开发成本超800万元。用标准化能力释放产研创造力。",
      tag: "重点项目"
    },
    checkOut: "查看项目",
    articles: {
      aiSearch: {
        title: "AI查单概念方案探索",
        description: "关于如何在查单场景，通过Copilot、Pill、插件、钉钉联动等方式，实现快速查单的交互想法"
      },
      wickedProblem: {
        title: "Wicked Problem 破解之法"
      },
      dataDesign: {
        title: "数据驱动设计决策"
      },
      music: {
        title: "三十未满指南"
      }
    }
  },
  en: {
    greeting: "Hey, I'm Sierra",
    title1: "2 years of experience as a B2B AI product project owner",
    title2: "5 years of experience as a complex B2B system UX designer",
    intro: "Using AI as my pen, I reconstruct the human-machine symbiotic interface of complex systems—",
    bulletPoint1: "From LLM/AIGC technology deep dive to business scenario implementation, creating an 'AI-enabled' full-stack development system",
    bulletPoint2: "Created intelligent search components, saving enterprises 400,000 hours in query time",
    conclusion: "When rigorous B2B systems begin to understand user intent\nIt becomes a new narrative of human-machine co-evolution",
    downloadResume: "Download Resume",
    downloaded: "Downloaded!",
    checkResume: "View Resume",
    copyright: "© 2025 Sierra Sun. All rights reserved.",
    thoughtsTitle: "Some Thoughts from Projects",
    musicTitle: "Some AI Music Experiments",
    queue: {
      name: "OSB Intelligent Search",
      description1: "Focusing on complex B-end query scenarios, we revolutionized interaction patterns through \"Natural Language Input + Smart Recommendations\" with a three-layer technical architecture: a minimalist frontend with \"search box as entry point\", a middle layer powered by self-developed 7B model (combining vector database + Prompt engineering) for NLP parsing and text2SQL conversion, and a bottom layer continuously optimized through business corpus and user behavior data.",
      description2: "Revolutionizing traditional filter matrices with a hybrid \"Click (Filter) + Recommend + Search\" mode, balancing efficiency and accuracy; Implementing transparent parsing results + user intervention mechanisms to build an \"Input - Parse - Correct - Train\" loop ensuring model accuracy.",
      description3: "Standardizing AI capabilities through low-code componentization, reducing business integration cost from 30 person-days to 1 day, covering 100% of Cainiao's new list pages with 75.32% average search efficiency improvement. The project won multiple group awards and became a benchmark for B-end intelligent transformation.",
      tag: "CTO Project"
    },
    aiDev: {
      name: "AI-Driven Full-Stack R&D System",
      description1: "Addressing the pain points of traditional low-code platforms' low configuration efficiency and high learning curve, we reconstruct the development pipeline through AI technology to create a low-code development experience with 'intelligent assistance + controllable intervention'.",
      description2: "Adopting the 'LLM+RAG+AIGC' solution to build full-process intelligent assistance capabilities from requirement description to page generation, breaking through the application bottleneck of large models in enterprise-level low-code scenarios. Establishing low-code page quality detection standards, through scoring models (critical/performance/experience issue grading) and automated detection tools, increased the proportion of pages with standards above 80 points from 65.23% to 85.34%.",
      description3: "The intelligent template recommendation system, based on user natural language descriptions, generates customized templates through RAG knowledge base matching, increasing the proportion of generated pages from 0% to 21.34%. Through the design principle of 'AI enhancement rather than replacement', while ensuring controllability and standardization, enabling non-technical users to quickly build high-quality low-code applications. Redefining B-end development efficiency — making requirement description the starting point of development, unleashing product research creativity through intelligent technology.",
      tag: "CTO Project"
    },
    bento: {
      name: "I18N Strategy & Translation",
      description1: "Addressing multilingual adaptation and cultural difference challenges in global business operations by building a comprehensive internationalization solution from design strategy to tool implementation.",
      description2: "Establishing a three-layer architecture of G11N (Globalization), I18N (Internationalization), and L10N (Localization), providing visual adaptation strategies to resolve text length differences through vertical space utilization and text-image integration. Creating a logistics industry-specific terminology database, standardizing professional translations like 'Waybill' across languages.",
      description3: "Through the development of translation platforms and tools, enabling one-click generation of RTL page versions in business runtime, dramatically improving internationalization development efficiency from an estimated 2-3 months to just 2 weeks.",
      tag: "Key Project"
    },
    aiDesign: {
      name: "Design System for the Logistics Industry",
      description1: "Addressing the pain points of fragmented terminals across 10+ business lines and annual redundant development costs exceeding 10 million, we created the logistics industry's first 'write once, run anywhere' design system, reshaping the product research and development collaboration order.",
      description2: "Building a system of 'Design Specifications + Tool Empowerment + Service Platform', covering a three-layer architecture of atomic components, composite components, and block templates, achieving end-to-end standardization from visual language to interaction rules. Establishing a 'write once, run anywhere' strategy through hierarchical reuse, horizontal folding, and functional aggregation rules, achieving single codebase coverage for PC/PDA/mobile terminals with 100% multi-terminal mapping rate, breaking the limitations of traditional responsive design.",
      description3: "Establishing a sustainable co-building mechanism, serving 3000+ R&D personnel, reducing single requirement delivery cycle from 15-30 days to 5-7 days, saving over 8 million yuan in annual development costs. Unleashing product research creativity through standardization capabilities.",
      tag: "Key Project"
    },
    checkOut: "Check out the project",
    articles: {
      aiSearch: {
        title: "AI Order Query Concept Solution",
        description: "Ideas on implementing quick order queries through Copilot, Pill, plugins, and DingTalk integration"
      },
      wickedProblem: {
        title: "Solving Wicked Problems"
      },
      dataDesign: {
        title: "Data-Driven Design Decisions"
      },
      music: {
        title: "Guide to Under Thirty"
      }
    }
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationType;
  isAnimating: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLanguageChange = (newLanguage: Language) => {
    setIsAnimating(true);
    setLanguage(newLanguage);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300); // Match this with the animation duration
  };

  const value = {
    language,
    setLanguage: handleLanguageChange,
    t: translations[language],
    isAnimating
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 