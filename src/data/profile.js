// Single source of truth for all portfolio content.
// Merged from the resume PDF + the Notion portfolio page.
// Edit this file to update the site — no component changes needed.

export const profile = {
  name: 'Vidya Raghavi Elangovan',
  role: 'Member of Technical Staff',
  company: 'Zoho Corporation',
  location: 'Chennai, India',
  greeting: 'Hola!',
  tagline:
    'A result-driven developer with an insatiable passion for innovation — now taking those skills into Product Management.',
  summary:
    "I'm a result-driven software developer with an insatiable passion for innovation and a keen desire to embrace new challenges. I strongly believe in the power of teamwork and effective communication. Across my journey as a Member of Technical Staff at Zoho and a Systems Engineer at TCS, I've worked closely with diverse stakeholders — actively listening to their feedback and folding it back into my work. I'm thrilled about the prospect of taking my skills to the next level and contributing to Product Management.",
  email: 'e.vidyaraghavi@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/vidyaraghavi333',
    resume:
      'https://drive.google.com/file/d/1C4gWjtS_cPU4757pksrL5ijdQiOv_E8Y/view?usp=sharing',
  },
}

// Short self-descriptors shown as tags in the hero.
export const tags = [
  'Software developer with Product mindset',
  'Interested in Product Management',
  'Front-end enthusiast',
  'Problem solver',
]

export const highlights = [
  { value: 30, suffix: '%', label: 'Engagement lift from my UI work' },
  { value: 5, suffix: '+', label: 'Years shipping enterprise software' },
  { value: 2, suffix: '', label: 'Global enterprises, end-to-end ownership' },
]

// Product case studies — Problem → Approach → Outcome, the way a PM
// interview expects them. Drawn from the Zoho and TCS roles.
export const productWork = [
  {
    title: 'Associate Email: taking CRM calls from 70K to 1M a month',
    icon: 'trending',
    tag: 'Feature Ownership · Zoho CRM Outlook Add-in',
    art: 'growth',
    problem:
      'Sales users live in their inbox, but the emails they exchange with customers were not connected to the CRM records they belonged to. Keeping the two in sync meant leaving Outlook and doing it by hand, so most of it never happened.',
    approach: [
      'Implemented the Associate Email feature in the CRM Outlook add-in, letting users link an email to the right CRM record without leaving Outlook.',
      'Built it across the stack — server-side APIs and the add-in front end in VueJS.',
      'Kept improving it through ongoing enhancement of the plugin, based on how users actually worked with it.',
    ],
    outcome:
      'User engagement grew from about 70K calls to 1M calls per month.',
  },
  {
    title: 'A feature nobody could find: surfacing Parse Attachment in the UI',
    icon: 'trending',
    tag: 'UI & Discoverability · Zoho Recruit',
    art: 'growth',
    problem:
      'Parse Attachment already existed in the Zoho Recruit Outlook add-in, but users were not finding it. A capability that solves a real problem earns nothing if it is not visible at the moment someone needs it — so recruiters kept pulling candidate details out of attachments by hand.',
    approach: [
      'Reworked the add-in UI to make Parse Attachment visible and reachable at the point where recruiters were already working, instead of leaving it buried.',
      'Ran end-to-end user interaction to see where people actually got stuck, and debugged from that rather than from bug reports alone.',
      'Collaborated with global clientele through ongoing enhancement of the plugin, checking the change against how they work.',
      'Implemented it across the stack — server-side APIs and the plugin front end in VueJS.',
    ],
    outcome: 'Improved user engagement with the product by 30%.',
  },
  {
    title: 'Meeting users inside Outlook instead of asking them to switch',
    icon: 'target',
    tag: 'Product Strategy · Integrations',
    art: 'orbit',
    problem:
      'Enterprise customers spend their whole day inside the Microsoft ecosystem. Every context switch out to a Zoho tab was friction — and friction we were losing usage to.',
    approach: [
      'Work on integrating Zoho products with Microsoft, building Zoho product plugins for Microsoft Outlook.',
      'Worked with the team on what belongs in an add-in versus the main app, keeping the surface small and the value obvious.',
      'Implemented secure authentication and authorization with Microsoft Entra ID App Registrations, so identity-based access is something IT teams will approve.',
      'Kept continuous development and integration running across both the server-side APIs and the front end.',
    ],
    outcome:
      'Zoho functionality living inside the tool customers already had open, with enterprise-grade identity built in.',
  },
  {
    title: 'Making the team adaptable enough to act on feedback',
    icon: 'users',
    tag: 'Ways of Working',
    art: 'network',
    problem:
      'Customer feedback is only worth collecting if the team can actually turn it around. Rigid process means good insight arrives too late to use.',
    approach: [
      'Implemented Agile methodologies in daily operations, building a more adaptable and collaborative working environment.',
      'Worked closely with diverse stakeholders, listening to feedback and incorporating it into the work.',
      'Kept the loop short between what clients asked for and what shipped, through ongoing enhancement of the plugin.',
    ],
    outcome: 'Higher project efficiency and customer satisfaction.',
  },
]

// From the "My projects" gallery on the Notion page.
export const projects = [
  {
    title: 'HousePlant — Website design',
    emoji: '🎨',
    tags: ['UI/UX', 'Brand'],
    detail:
      'End-to-end website design in Figma: brand direction, layout system, and interface screens.',
    href: 'https://www.figma.com/file/UOYYQgV4u9AeYJpeRtnm8Q/HousePlant?type=design&node-id=0-1&mode=design',
    cta: 'Open in Figma',
  },
  {
    title: 'User Persona research',
    emoji: '🔍',
    tags: ['User Research', 'User Persona'],
    detail:
      'Research synthesis into personas — who the users are, what they are trying to do, and where the product gets in their way.',
    href: 'https://docs.google.com/presentation/d/1Ugwaq466g2FLT4-ALQIT4_cP9mtPhtLB/edit?usp=sharing&ouid=109307676524802223349&rtpof=true&sd=true',
    cta: 'View the deck',
  },
  {
    title: 'Kids Typing Fun',
    emoji: '⌨️',
    tags: ['Web App', 'Kids'],
    detail: 'A typing practice app for children, live on the web.',
    href: 'https://e-vidyaraghavi.github.io/kids-app/',
    cta: 'Try the app',
  },
]

export const skills = [
  {
    group: 'Product Management',
    icon: 'compass',
    items: [
      'Strategic Product Planning',
      'Roadmapping',
      'Wireframing & Prototyping (Figma)',
      'User Research',
      'User Stories',
      'Competitive Analysis',
      'Market Research',
      'Stakeholder Communication',
    ],
  },
  {
    group: 'Programming & Web',
    icon: 'code',
    items: ['Java', 'C++', 'VueJS', 'HTML', 'CSS'],
  },
  {
    group: 'Data, APIs & Platform',
    icon: 'cloud',
    items: [
      'MySQL',
      'RESTful APIs',
      'Git',
      'Microsoft Entra ID',
      'App Registrations',
      'Microsoft Azure',
    ],
  },
  {
    group: 'Delivery & Tooling',
    icon: 'layers',
    items: ['Agile', 'Zoho Projects', 'GitLab CI/CD', 'SDLC', 'System Monitoring']
  },
]

export const experience = [
  {
    company: 'Zoho Corporation',
    role: 'Member of Technical Staff',
    period: 'June 2022 — Present',
    current: true,
    art: 'wave',
    summary:
      "Work across Zoho's Microsoft integrations — Outlook add-ins, the APIs behind them, and the UI users actually touch.",
    points: [
      'Made the Parse Attachment feature in Zoho Recruit visible to users in the Outlook add-in through UI changes, improving user engagement with the product by 30%.',
      'Work on integrating Zoho products with Microsoft, building Zoho product plugins for Microsoft Outlook.',
      'Involved in continuous development and integration of server-side APIs and the plugin front end using VueJS.',
      'Implemented Agile methodologies in daily operations, fostering a more adaptable and collaborative environment while achieving higher project efficiency and customer satisfaction.',
      'End-to-end user interaction to debug issues and resolve them.',
      'Collaborated closely with global clientele to fulfil their needs through ongoing enhancement of the plugin.',
      'Implemented secure authentication and authorization with Microsoft Entra ID App Registrations, enabling identity-based access across service integrations.',
    ],
  },
  {
    company: 'Tata Consultancy Services',
    role: 'Assistant Systems Engineer',
    period: 'August 2020 — May 2022',
    current: false,
    art: 'pulse',
    summary:
      'Learned how enterprise systems fail — and how much of user experience is really operational reliability.',
    points: [
      'Resolved network-related issues for clients using CISCO tooling.',
      'Continuously resolved problems including data switch disconnection, firewall disconnection, and full network disruption.',
      'Worked closely with international clients to meet their requirements.',
      'Documented troubleshooting procedures and support workflows that made the whole team faster.',
    ],
  },
]

export const education = [
  {
    title: 'Bachelor of Technology',
    org: 'SASTRA University',
    period: 'July 2016 — July 2020',
  },
]

export const certifications = [
  {
    title: 'Data Driven Product Management',
    org: 'INSEAD',
    icon: 'trending',
    detail:
      'Modules on building a product from scratch and collaborating with stakeholders to bring in the best — the formal grounding behind how I already work.',
  },
  {
    title: 'Get Started with Figma',
    org: 'Coursera',
    icon: 'layers',
    detail:
      'Figma fundamentals — frames, components, and creating designs for varied interfaces.',
  },
]
