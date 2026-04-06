export type AboutLang = 'en'

export const aboutContent = {
  slug: 'about',
  seo: {
    title: 'Andy Taylor | Senior Solutions Architect · AWS · Cloud & Data Engineering',
    description: 'Senior Solutions Architect at AWS with 30+ years experience in cloud architecture, data centre networking, and Infrastructure as Code. Speaker at re:Invent, open source contributor.',
  },
  heading: 'Andy Taylor',
  subtitle: 'Senior Analytics Specialist Solutions Architect · AWS',
  location: 'Surrey, UK',
  lastUpdated: 'April 2026',
  bio: [
    'Senior Solutions Architect at AWS with over 30 years of progressive experience in cloud architecture, data centre networking, and security. Currently specialising in analytics and data engineering, helping customers design scalable data platforms, analytics pipelines, and insights solutions.',
    'Extensive background designing and deploying enterprise data centres, cloud connectivity exchanges, and performing large-scale data centre migrations. Deep expertise in Infrastructure as Code (Terraform, Pulumi, AWS CDK) and core networking spanning LAN, WAN, and cloud environments.',
    'Recognised industry contributor with three major awards including HashiCorp Core Contributor (2023), Pulumi Puluminary (2024), and Netbox Hybrid Cloud Hero (2025). Passionate about knowledge sharing, having delivered 7 re:Invent/re:Inforce sessions and enabled over 600 Amazonians through internal workshops.',
  ],
  roles: ['Senior Analytics Specialist SA', 'Cloud & Data Engineering', 'Infrastructure as Code'],
  timelineHeading: 'Career Timeline',
  timeline: [
    { period: '2025–Present', role: 'Senior Analytics Specialist SA', company: 'Amazon Web Services', desc: 'Data & Analytics solutions design for AWS customers' },
    { period: '2021–2025', role: 'Network Specialist SA', company: 'Amazon Web Services', desc: '7 re:Invent sessions, 600+ engineers enabled, 67+ open source commits' },
    { period: '2020–2021', role: 'Enterprise Architect', company: 'BP International', desc: 'Network transformation across retail, field, edge, cloud environments' },
    { period: '2013–2020', role: 'Network Architect / Project Lead', company: 'BP International', desc: 'Cloud Network eXchange (CNX) — 4 autonomous environments across US/EMEA' },
    { period: '2009–2012', role: 'Network & Security Architect', company: 'De La Rue (UK Gov SC)', desc: 'IL5 compliant dual data centre for government project' },
    { period: '1993–2009', role: 'Network & Security Engineering', company: 'Multiple (Goldman Sachs, Deutsche Bank, Sony, Land Securities, etc.)', desc: 'Progressive leadership across City of London financial institutions' },
  ],
  awardsHeading: 'Industry Awards',
  awards: [
    { year: '2025', title: 'Hybrid Cloud Hero', org: 'Netbox' },
    { year: '2024', title: 'Puluminary', org: 'Pulumi' },
    { year: '2023', title: 'Core Contributor', org: 'HashiCorp' },
  ],
  speakingHeading: 'Conference Speaking',
  speakingHighlights: [
    '7 AWS re:Invent and re:Inforce sessions (2022–2025)',
    '2 PulumiUP talks (Europe & Global, 2024)',
    '8 internal workshops enabling 600+ Amazonians (4.7/5.0 avg CSAT)',
  ],
  faqHeading: 'Frequently Asked Questions',
  faq: [
    { q: 'Who is Andy Taylor?', a: 'Andy Taylor is a Senior Analytics Specialist Solutions Architect at AWS based in Surrey, UK. With over 30 years of experience in cloud architecture, data centre networking, and security, he currently helps customers design scalable data platforms and analytics solutions. Previously a Network Specialist SA at AWS for 5 years, he has delivered 7 re:Invent/re:Inforce sessions and contributed to major open source projects including the HashiCorp Terraform AWS Provider.' },
    { q: 'What is Andy Taylor\'s expertise?', a: 'Andy specialises in AWS Analytics & Data Engineering (Redshift, Kinesis, data lakes, ML pipelines), Cloud Networking (Cloud WAN, Transit Gateway, Network Firewall, Direct Connect), and Infrastructure as Code (Terraform, Pulumi, AWS CDK). He also has deep expertise in network security, data centre design, and enterprise architecture from roles at BP, De La Rue, Goldman Sachs, Deutsche Bank, and other major organisations.' },
    { q: 'What industry awards has Andy Taylor received?', a: 'Andy has received three industry awards: HashiCorp Core Contributor (2023), Pulumi Puluminary (2024), and Netbox Hybrid Cloud Hero (2025). These recognise his significant contributions to open source Infrastructure as Code tooling and cloud networking.' },
    { q: 'How can I contact Andy Taylor?', a: 'Email: andy@andytaylor.dev. LinkedIn: linkedin.com/in/ataylor. GitHub: github.com/NetDevAutomate.' },
  ],
  connectHeading: 'Connect',
  email: 'andy@andytaylor.dev',
} as const
