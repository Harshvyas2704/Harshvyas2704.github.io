export const facets = [
  {
    id: 'system-thinker',
    label: 'System Thinker',
    description: 'Sees the architecture before writing a single line. Designs for integration, state flow, and edge cases before they surface as bugs.',
    evidence: 'Designed 60+ interconnected React Native screens across KVSC with unified REST API contracts and consistent state management.',
  },
  {
    id: 'problem-solver',
    label: 'Problem Solver',
    description: 'Breaks ambiguous requirements into concrete engineering decisions. The algorithm matters as much as the syntax.',
    evidence: 'Built a rules-based recommendation engine for Hirexpert that matches candidates using tech stack, location, experience, and salary as signals.',
  },
  {
    id: 'engineer',
    label: 'Engineer',
    description: 'Writes code that runs, scales, and can be maintained. Performance and reliability are built in, not bolted on.',
    evidence: 'Reduced time-to-hire by 50% at Hirexpert by implementing socket-based real-time messaging between candidates and companies.',
  },
  {
    id: 'craftsman',
    label: 'Craftsman',
    description: 'Cares deeply about the experience on the other side of the interface. Every tap, scroll, and transition is a decision.',
    evidence: 'Built compound product browsing for 100k+ SKUs at Kohira with filters across metal, stamp, shape, and collection, and delivered 25% faster checkout.',
  },
  {
    id: 'owner',
    label: 'Owner',
    description: 'Takes full accountability from requirements to production. Not just a contributor, a stakeholder in the outcome.',
    evidence: 'Singlehandedly designed and shipped the in-app business listing feature for KVSC. Led a cross-functional team of designers and backend engineers.',
  },
  {
    id: 'seeker',
    label: 'Seeker',
    description: 'Continuously expands the edge of capability. Each project is a step toward mastery and each constraint is a lesson.',
    evidence: 'Transitioned from Electrical Engineering to software. Built production-grade apps at scale after a 30-week full-stack bootcamp.',
  },
]

export const projects = [
  {
    id: 'kvsc',
    name: 'KVSC',
    tagline: 'Community Management at Scale',
    tech: ['React Native', 'Firebase', 'REST APIs', 'Node.js'],
    scale: '15,000 users',
    problem: 'A 15,000-member Jain community needed a unified digital platform with business listings, personalized notifications, and a daily news feed that felt native to how the community actually works.',
    approach: 'Led a team of designers and backend engineers through 60+ screen flows. Designed the business listing module from scratch, implemented a Firebase notification system with personalized targeting, and built a dynamic community news feed.',
    impact: 'Shipped a centralized community platform where members list businesses, receive personalized push notifications, and stay informed through a single native app. Owned the product from design to production.',
    highlights: ['60+ responsive screens', '15k user notification system', 'In-app business listing feature', 'Community news module'],
    playStore: '',
    comingSoon: false,
    proof: 'Notification reach measured through Firebase Cloud Messaging delivery reports across the 15,000 registered members.',
  },
  {
    id: 'hirexpert',
    name: 'Hirexpert',
    tagline: 'Intelligent Job Matching Platform',
    tech: ['React Native', 'Node.js', 'WebSockets', 'PhonePe API', 'MongoDB'],
    scale: '1,000+ candidates',
    problem: 'Job platforms waste candidate and employer time on irrelevant matches. The signal-to-noise ratio is broken, and monetization in early-stage hiring products is largely unsolved.',
    approach: 'Designed a recommendation schema using tech stack, location, experience, and salary as matching signals. Implemented socket-based real-time messaging and a PhonePe-backed credit system for employer access to candidate profiles.',
    impact: 'Cut time-to-hire by 50% through real-time candidate-employer conversations. Delivered a working monetization model through credit-based contact unlocking where companies buy credits and unlock candidate profiles.',
    highlights: ['Rules-based recommendation engine', '50% reduction in time-to-hire', 'Credit-based monetization', 'Real-time in-app messaging'],
    playStore: '',
    comingSoon: false,
    proof: 'Time-to-hire reduction measured by comparing average days from application to first recruiter contact before and after the real-time messaging rollout.',
  },
  {
    id: 'kohira',
    name: 'Kohira',
    tagline: 'Jewellery E-Commerce at Depth',
    tech: ['React Native', 'PhonePe API', 'REST APIs'],
    scale: '100,000+ products',
    problem: 'Browsing 100,000+ jewellery items is unusable without intelligent filtering. Checkout needed to be frictionless, and the client wanted a custom order flow for bespoke jewellery requests.',
    approach: 'Built compound search filters across metal type, stamp, shape, and collection. Shipped 5+ core e-commerce flows covering product discovery, add-to-cart, wishlist, address selection, and checkout. Integrated PhonePe for secure payments.',
    impact: 'Reduced checkout time by 25%. Delivered a complete shopping experience from browsing 100k+ products to custom jewellery requests with PhonePe payment integration.',
    highlights: ['100k+ product browsing', '25% checkout time reduction', 'Custom jewellery request flow', '5+ core e-commerce features'],
    playStore: '',
    comingSoon: true,
    proof: 'Checkout-time reduction measured from add-to-cart to payment-confirmation events, before and after the custom request flow shipped.',
  },
]

export const personalProjects = [
  {
    id: 'mokshapatam',
    name: 'MokshaPatam',
    tagline: 'The Journey to Nirvana',
    kind: 'Open Source · Game',
    concept:
      'A digital recreation of Mokshapat (Kaivalyapat), the ancient Indian spiritual board game and the philosophical ancestor of Snakes and Ladders. A 285-square board maps the soul’s ascent toward Moksha, where snakes are spiritual falls and ladders are ascents.',
    detail:
      'A self-initiated study in game state, animation, and faithful systems design. The engine models the full 285-square board with death, rebirth, off-board hells, and realm transitions, driving a luminous soul token that moves square by square across a pinch-zoom, pan-enabled viewport.',
    tech: ['React Native', 'TypeScript', 'React 19', 'Zustand', 'Reanimated', 'React Navigation'],
    highlights: [
      '285-square board engine',
      'Snakes, ladders, death and rebirth rules',
      'Pinch-zoom and pan viewport',
      'Heritage saffron and gold theme',
    ],
    github: 'https://github.com/Harshvyas2704/MokshaPatam-The-Journey-to-Nirvan',
    apk: '',
  },
]

export const experience = [
  {
    company: 'Weingenious Technocrats',
    role: 'Application Development Engineer',
    period: 'April 2024 - Present',
    summary: 'Lead developer across multiple production React Native apps. Responsible for architecture decisions, team coordination, and end-to-end feature ownership across three shipped products.',
    highlights: [
      'Led a cross-functional team of designers and backend engineers through 60+ screen flows for KVSC',
      'Singlehandedly designed and shipped the in-app business listing feature for a 15k-user community platform',
      'Built a rules-based job recommendation engine and real-time socket messaging for Hirexpert',
      'Delivered a complete e-commerce experience with 100k+ product browsing and PhonePe integration for Kohira',
    ],
    tech: ['React Native', 'Node.js', 'Firebase', 'MongoDB', 'WebSockets', 'PhonePe API'],
  },
  {
    company: 'Om InfoWave',
    role: 'Application Developer',
    period: 'June 2023 - March 2024',
    summary: 'Native Android and React Native development. Sole developer for Cheers!, a social media app built with Kotlin for Android.',
    highlights: [
      'Developed Cheers! social media app using Native Android with Kotlin',
      'Designed 20+ intuitive screens with complete UI and API integration',
      'Integrated RESTful APIs for media sharing with robust error handling',
      'Delivered production-grade performance across diverse Android devices',
    ],
    tech: ['Kotlin', 'Native Android', 'React Native', 'RESTful APIs'],
  },
]

export const skills = {
  Mobile: ['React Native', 'Kotlin', 'Native Android', 'Native iOS', 'App Deployment'],
  Frontend: ['React.js', 'Next.js', 'TypeScript', 'HTML', 'CSS'],
  Backend: ['Node.js', 'Express', 'Java', 'Spring Boot'],
  Database: ['MySQL', 'MongoDB'],
  AI: ['OpenAI API', 'AI Integration', 'LangChain', 'Prompt Engineering'],
  Tools: ['Git', 'Firebase', 'WebSockets', 'PhonePe API', 'Postman', 'REST APIs'],
}
