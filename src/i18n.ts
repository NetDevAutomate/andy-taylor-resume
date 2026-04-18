export const seo = {
  title: 'Andy Taylor | Senior Solutions Architect · AWS · Cloud & Data Engineering',
  description:
    'Senior Solutions Architect at AWS with 30+ years in cloud architecture, data centre networking, and Infrastructure as Code. Speaker at re:Invent, open source contributor, industry award winner.',
};

export const translations = {
  greeting: 'who builds',
  greetingRoles: ['Senior Solutions Architect', 'Cloud & Data Engineer', 'Open Source Contributor'],
  email: 'andy@andytaylor.dev',
  role: 'scalable cloud solutions.',
  heroTagline: 'Senior Solutions Architect at AWS with 30+ years building enterprise infrastructure.',
  location: 'Surrey, UK',

  summary: {
    title: 'Professional Summary',
    text: 'Senior Solutions Architect at AWS with over 30 years of experience designing and delivering enterprise-scale infrastructure across cloud networking, data engineering, and security. Currently specialising in AWS Analytics as an Analytics Specialist SA, helping customers architect data warehousing, real-time analytics, and ML pipeline solutions. Previously a Network Specialist SA at AWS for five years, where I delivered 9 conference sessions at re:Invent and re:Inforce, enabled 600+ engineers through 8 internal workshops, contributed to the HashiCorp Terraform AWS Provider, and led hackathons generating 161 community PRs. Earlier career spans senior network and security architecture roles at BP, Goldman Sachs, Deutsche Bank, and Sony, including a decade leading BP\'s Cloud Network eXchange and a UK government IL5-compliant dual data centre programme. Industry recognised with the HashiCorp Core Contributor award, Pulumi Puluminary, and Netbox Hybrid Cloud Hero.',
    cards: [
      {
        title: 'Cloud Architecture',
        desc: 'AWS Analytics, networking, data platforms at enterprise scale',
      },
      {
        title: 'Infrastructure as Code',
        desc: 'Terraform, Pulumi, AWS CDK — industry award-winning contributor',
      },
      {
        title: 'Knowledge Sharing',
        desc: '9 conference talks, 600+ engineers enabled, 67+ open source commits',
      },
    ],
  },

  coreCompetencies: {
    title: 'Core Competencies',
    items: [
      {
        title: 'AWS Analytics & Data Engineering',
        desc: 'Redshift, Kinesis, data lakes, ML pipelines, real-time analytics',
      },
      {
        title: 'Cloud Networking Architecture',
        desc: 'Cloud WAN, Transit Gateway, Network Firewall, Direct Connect, VPN',
      },
      {
        title: 'Infrastructure as Code',
        desc: 'Terraform, Pulumi, AWS CDK (Python/TypeScript), CloudFormation',
      },
      {
        title: 'Network Security',
        desc: 'Palo Alto, Check Point, Cisco FTD/ASA, IDS/IPS, DDoS mitigation',
      },
      {
        title: 'Open Source & Community',
        desc: 'Terraform AWS Provider contributor, hackathon organiser, 67+ commits',
      },
      {
        title: 'Technical Enablement',
        desc: '8 workshops, 600+ engineers trained, 4.7/5.0 avg CSAT',
      },
    ],
  },

  techStack: {
    title: 'Tech Stack',
    categories: [
      {
        name: 'AWS',
        items: [
          'Analytics (Redshift, Kinesis)',
          'Cloud WAN',
          'Transit Gateway',
          'Network Firewall',
          'Direct Connect',
          'Site-to-Site VPN',
        ],
      },
      {
        name: 'IaC',
        items: ['Terraform', 'Pulumi', 'AWS CDK', 'CloudFormation', 'Ansible'],
      },
      {
        name: 'Networking',
        items: ['Cisco ACI/NXOS/IOS', 'BGP', 'OSPF', 'SD-WAN', 'Load Balancing (AVI/F5)'],
      },
      {
        name: 'Security',
        items: ['Palo Alto', 'Check Point', 'Cisco FTD/ASA', 'Juniper', 'AlgoSec'],
      },
      {
        name: 'Programming',
        items: ['Python', 'TypeScript', 'Golang', 'Java'],
      },
      {
        name: 'OS',
        items: ['Linux', 'macOS', 'Solaris'],
      },
    ],
  },

  experience: {
    title: 'Work Experience',
    jobs: [
      {
        company: 'Amazon Web Services',
        location: 'London, UK',
        role: 'Senior Analytics Specialist Solutions Architect',
        period: 'Dec 2025 – Present',
        highlights: [
          'Subject Matter Expert helping customers solve data challenges and create analytics solutions',
          'Design Data & Analytics solutions including data warehousing (Redshift), data lakes, real-time analytics (Kinesis), and ML pipelines',
          'Partner with Sales Account Managers and Business Development Representatives to enable customer adoption and revenue attainment',
          'Act as voice of the customer, providing product improvement feedback to AWS service teams',
        ],
      },
      {
        company: 'Amazon Web Services',
        location: 'London, UK',
        role: 'Network Specialist Solutions Architect',
        period: 'Jan 2021 – Dec 2025',
        highlights: [
          'Designed and delivered scalable network architectures for AWS customers, influencing product roadmaps',
          'Delivered 7 re:Invent and re:Inforce sessions on Infrastructure as Code, NetDevOps, and network automation',
          'Orchestrated 8 internal enablement workshops, enabling 600+ Amazonians with CSAT scores averaging 4.7/5.0',
          'Contributed 5 merged PRs to HashiCorp Terraform AWS Provider including Direct Connect SiteLink and Transit Gateway Multicast',
          'Authored 2 AWS Networking & Content Delivery blog posts and created 6 aws-samples repositories',
          'Spearheaded SDE Apprenticeship Program collaborating with AWS Network Manager/Cloud WAN service team',
          'Organised Terraform Provider hackathons generating 33 PRs, with 52 from first-time AWS contributors in 2022',
        ],
      },
      {
        company: 'BP International Limited',
        location: 'Sunbury, UK',
        role: 'Enterprise Architect',
        period: 'Apr 2020 – Jan 2021',
        highlights: [
          'Led network transformation across retail, field, edge, security, cloud, and core environments',
          'Partnered with cloud platform teams to establish standard network topologies for hybrid cloud operations',
          'Championed network automation, embedding an "automation-first" approach throughout infrastructure deployment',
        ],
      },
      {
        company: 'BP International Limited',
        location: 'Sunbury, UK',
        role: 'Network Architect / Project Lead Architect',
        period: 'Jan 2013 – Apr 2020',
        highlights: [
          'Designed and delivered Cloud Network eXchange (CNX) — hypervisor-agnostic network fabric supporting on-premises, co-los, AWS and Azure',
          'Led deployment of four autonomous CNX environments (two US, two EMEA) within Equinix using Cisco ACI',
          'Collaborated with AWS and Azure teams to implement Hub and Spoke architecture using Transit Gateway and Azure vHUB',
          'Developed Ansible modules (Python) for firewall and Cisco ISE, used Terraform for infrastructure provisioning',
          'Led BP technical project for CNX working with Cisco Advanced Services on requirements, design, PoC, and deployment',
        ],
      },
      {
        company: 'Sony Europe',
        location: 'Basingstoke, UK',
        role: 'Security Consultant',
        period: 'Jun 2012 – Jan 2013',
        highlights: [
          'Security expertise for infrastructure projects including Mobile Device Management, cloud hosting design, and DDoS mitigation',
          'Managed European McAfee ePO deployment; contributed to network security strategy development',
        ],
      },
      {
        company: 'De La Rue',
        location: 'Basingstoke, UK',
        role: 'Network & Security Architect (UK Gov SC)',
        period: 'Sep 2009 – Jun 2012',
        highlights: [
          'Led design and implementation of highly resilient dual data centre solution for UK government project achieving IL5 compliance',
          'Managed team of system and network engineers; responsible for network architecture, security, and server builds',
        ],
      },
      {
        company: 'Earlier Career',
        location: 'London, UK',
        role: 'Network & Security Engineering Leadership',
        period: '1993 – 2009',
        isEarlierCareer: true,
        highlights: [
          'Land Securities (2008-2009): Network and Security Principal Engineer — Extranet Gateway deployment',
          'BP (2006-2008): Network and Security Architect — led four America Mega Data Centre projects',
          'Goldman Sachs (2004-2005): Technical Project Manager — B2B and Internet firewall infrastructure',
          'Deutsche Bank (1999-2003): Senior Network Engineer / Intrusion Detection Specialist',
          'Earlier roles at Credit Suisse First Boston, Merrill Lynch, HSBC, Fidelity Investments, Reuters, COLT, and DHL Systems',
        ],
      },
    ],
  },

  recommendations: {
    title: 'Recommendations',
    items: [
      {
        name: 'Rob Wilkins',
        title: 'Executive Technology Leader | CTO | CIO | Technology Director',
        context: 'Reported to Andy directly',
        date: 'October 2018',
        quote: 'Andy is technically superb, his range of knowledge is second to none and he has an incredible ability to take on new technologies and concepts with apparent ease. In addition his attention to detail and desire to drive projects forward make him a huge asset to any team. I have worked with Andy for over 10 years now on a wide range of large & complex projects and would continue to do so at any given opportunity.',
      },
      {
        name: 'Darren Worvill',
        title: 'Principal Solution Architect',
        context: 'Worked with Andy on the same team',
        date: 'September 2018',
        quote: 'Andy is a strong leader who\'s not afraid to pursue issues and drive them forward, this combined with his broad range of technical skills and focus on automation would make him a key member of any project team, as well as an excellent candidate for any technical leadership role. Having worked with Andy, I know his core network experience in large enterprises and passion for automation will make him a valued asset of any large enterprise.',
      },
      {
        name: 'Byron Chen',
        title: 'Infrastructure Transformation Consultant | Global Network & Data Centre Strategy',
        context: 'Worked with Andy on the same team',
        date: 'October 2009',
        quote: 'Andy is a first class engineer with skills and experience not just limited to Network Security. He is results driven and keeps his eye on the ball at all time with excellent project management.',
      },
      {
        name: 'Jason Bond',
        title: 'IT Domain Security Architect at RBA',
        context: 'Senior to Andy',
        date: 'April 2009',
        quote: 'Andy proved himself to be a very capable network and security engineer. I would have no hesitation to recommend him for Principal engineering roles.',
      },
    ],
  },

  awards: {
    title: 'Industry Awards',
    items: [
      { year: '2025', title: 'Hybrid Cloud Hero', org: 'Netbox' },
      { year: '2024', title: 'Puluminary', org: 'Pulumi' },
      { year: '2023', title: 'Core Contributor', org: 'HashiCorp' },
    ],
  },

  speaking: {
    title: 'Conference Speaking',
    items: [
      {
        year: '2025',
        event: 'AWS re:Invent',
        title: 'AWS Cloud WAN MCP Server: Transform Network Operations with GenAI (NET331)',
        url: 'https://www.youtube.com/watch?v=7e4UeHMMOXo',
      },
      {
        year: '2024',
        event: 'AWS re:Invent',
        title: 'Automate your network operations using NetDevOps best practices',
        url: '',
      },
      {
        year: '2024',
        event: 'PulumiUP Europe & Global',
        title: 'Policy as Code',
        url: '',
      },
      {
        year: '2023',
        event: 'AWS re:Invent',
        title: 'How to manage your network using Infrastructure-as-Code',
        url: '',
      },
      {
        year: '2023',
        event: 'AWS re:Invent',
        title: 'Simplifying cloud infrastructure creation with the AWS CDK (DOP314)',
        url: '',
      },
      {
        year: '2023',
        event: 'AWS re:Inforce',
        title: 'Manage multi-Region/multi-Account AWS Network Firewall with Firewall Manager and IaC',
        url: '',
      },
      {
        year: '2022',
        event: 'AWS re:Invent',
        title: 'Manage your network using infrastructure as code',
        url: '',
      },
      {
        year: '2022',
        event: 'AWS re:Inforce',
        title: 'Automate least privilege access using AWS Lambda and managed prefix lists',
        url: '',
      },
    ],
  },

  projects: {
    title: 'Projects',
    intro: 'Engineering work at the intersection of cloud architecture, data platforms, and agent-native tooling.',
    items: [
      {
        name: 'AWS Core Network MCP Server',
        tag: 'AWS Labs · Open Source',
        year: '2026',
        desc: 'Contributed to the official AWS Labs MCP server for agent-assisted network troubleshooting, presented as the re:Invent 2025 Code Talk NET331 — "AWS Cloud WAN MCP Server: Transform Network Operations with GenAI". 27 read-only tools across Cloud WAN, Transit Gateway, VPC, Network Firewall and Site-to-Site VPN, with a built-in path-tracing methodology, cross-region ENI discovery, flow-log analysis from CloudWatch, and automatic inspection detection.',
        href: 'https://github.com/awslabs/mcp/tree/main/src/aws-network-mcp-server',
        linkText: 'awslabs/mcp',
        talkHref: 'https://www.youtube.com/watch?v=7e4UeHMMOXo',
        talkLinkText: 're:Invent 2025 · NET331',
        tech: ['Python', 'MCP', 'Cloud WAN', 'Transit Gateway', 'Network Firewall', 'VPC'],
      },
      {
        name: 'Agentic Opportunities Pipeline',
        tag: 'AWS UKIR Analytics',
        year: '2026',
        desc: 'GraphRAG pipeline cross-referencing Salesforce, SpecReq and SIFT field insights to surface specialist opportunities the team is missing. First run surfaced $18.1M of in-scope UKIR pipeline worked by other teams, four unowned SpecReqs, and 50 field-level blockers. Configurable YAML profiles generalise the tool across any AWS technology vertical.',
        href: '',
        linkText: '',
        talkHref: '',
        talkLinkText: '',
        tech: ['Python 3.13', 'FastAPI', 'NetworkX', 'SQLite FTS5', 'Bedrock', 'Claude Sonnet'],
      },
      {
        name: 'mailgraph',
        tag: 'Personal · Knowledge Graph',
        year: '2026',
        desc: 'Local-first GraphRAG platform ingesting email, calendar, attachments and Obsidian notes into a Neo4j + PostgreSQL/pgvector knowledge graph — 73K entities, 206K relationships. Two-tier regex/LLM intent router achieving 100% accuracy on a 480-question benchmark, MCP server exposing 8 focused tools to agents, and a 9-page React 19 dashboard.',
        href: '',
        linkText: '',
        talkHref: '',
        talkLinkText: '',
        tech: ['Python', 'LightRAG', 'Neo4j', 'pgvector', 'Bedrock', 'FastMCP', 'React 19'],
      },
      {
        name: 'Socratic Study Mentor',
        tag: 'Open Source · PyPI + Homebrew',
        year: '2026',
        desc: 'AuDHD-aware study toolkit with Socratic AI sessions across seven agent platforms (Claude Code, Codex, Kiro, Gemini, OpenCode, Ollama, LM Studio), a NotebookLM content pipeline, SM-2 spaced repetition, and cross-session analytics over a searchable SQLite store. Python CLI + PWA with a live SSE dashboard and embedded web terminal.',
        href: 'https://github.com/NetDevAutomate/socratic-study-mentor',
        linkText: 'github.com/NetDevAutomate/socratic-study-mentor',
        talkHref: '',
        talkLinkText: '',
        tech: ['Python 3.12', 'FastAPI', 'HTMX', 'Alpine.js', 'SQLite', 'NotebookLM'],
      },
    ],
  },

  openSource: {
    title: 'Open Source',
    githubLink: 'github.com/NetDevAutomate',
    terraform: {
      title: 'Terraform AWS Provider',
      desc: '6 PRs (5 merged), 44 commits — Direct Connect SiteLink, VPC IPv6, Transit Gateway Multicast, Private S2S VPN',
      items: [
        { pr: '#22350', feature: 'AWS Direct Connect SiteLink', status: 'Merged (v3.71.0)' },
        { pr: '#22450', feature: 'aws_vpc IPv6 CidrBlock NetworkBorderGroup', status: 'Merged' },
        { pr: '#22756', feature: 'Transit Gateway Multicast support', status: 'Merged' },
        { pr: '#25529', feature: 'AWS Private Site-to-Site VPN', status: 'Merged' },
        { pr: '#27807', feature: 'Network Manager S2S VPN Attachment docs', status: 'Merged' },
      ],
    },
    awsSamples: {
      title: 'AWS Samples',
      desc: '6 repositories, 23+ commits — hub-and-spoke architectures, Cloud WAN blueprints, TGW migration',
    },
    communityImpact: {
      title: 'Community Impact',
      desc: '161 PRs submitted to AWS Terraform Provider in 2022 (133 merged), 52 from first-time contributors. 2 hackathons generating 33 PRs.',
    },
  },

  blogPosts: {
    title: 'AWS Blog Posts',
    items: [
      {
        title: 'Introducing AWS Site-to-Site VPN Private IP VPNs',
        url: 'https://aws.amazon.com/blogs/networking-and-content-delivery/introducing-aws-site-to-site-vpn-private-ip-vpns/',
        date: 'Jun 2022',
        coAuthors: 'Pablo Sánchez Carmona',
      },
      {
        title: 'Using AWS Network Manager Events to manage and monitor your global network',
        url: 'https://aws.amazon.com/blogs/networking-and-content-delivery/using-aws-network-manager-events-to-manage-and-monitor-your-global-network/',
        date: 'Jan 2024',
        coAuthors: 'Pablo Sánchez Carmona, Nishant Kumar',
      },
    ],
  },

  artefacts: {
    title: 'Artefacts',
    desc: 'Audio, video, infographics and slides for current projects. Expanding as public repos are released.',
    url: 'https://artefacts.netdevautomate.dev',
    linkText: 'artefacts.netdevautomate.dev',
  },

  skills: {
    title: 'Skills',
    languages: 'Languages',
    english: 'English',
    native: 'Native',
    technical: 'Technical Skills',
    soft: 'Soft Skills',
    softSkills: [
      'Technical Leadership',
      'Knowledge Sharing',
      'Community Building',
      'Cross-team Collaboration',
      'Stakeholder Management',
      'Mentoring & Enablement',
    ],
  },

  interests: {
    title: 'Interests',
    text: 'ITF Taekwon-Do 4th-degree international instructor with 30+ years martial arts experience. Former club owner and coach. Current focus on Brazilian Jiu-Jitsu. Passionate about networking, automation, Python, cloud technologies, and NetDevOps.',
  },

  cta: {
    title: "Let's connect",
    desc: 'Senior Solutions Architect at AWS, passionate about cloud architecture, Infrastructure as Code, and open source. Always happy to discuss networking, automation, and cloud engineering.',
    contact: 'Get in touch',
  },

  ui: {
    languageToggle: 'EN',
  },
} as const;

export type Lang = 'en';
