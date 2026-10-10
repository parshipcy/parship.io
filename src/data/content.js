import linuxFoundationLogo from '../assets/The Linux Foundation.png';
import resumePdf from '../assets/Parship-Resume.pdf';

const DISCORD_ID = '1320056783334539305';

export const CONFIG = {
  name: 'Parship Chowdhury',
  headline: 'Software Developer',
  email: 'parshipchowdhury@gmail.com',
  intro:
    'I enjoy building web apps and contributing to open-source projects. I care about writing clean code and building useful things that solve real problems.',
  discordId: DISCORD_ID,
  quote: {
    text: 'The only way to make sense out of change is to plunge into it, move with it, and join the dance.',
    by: '- Alan Watts',
  },
  githubUsername: 'parshipcy',
  resumePdf,
  resumeFileName: 'Parship-Resume.pdf',
  socials: [
    { id: 'github', label: 'GitHub', url: 'https://github.com/parshipcy' },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/parshipcy',
    },
    {
      id: 'discord',
      label: 'Discord',
      url: `https://discord.com/users/${DISCORD_ID}`,
    },
  ],
};

export const EXPERIENCE = [
  {
    company: 'The Linux Foundation',
    logo: linuxFoundationLogo,
    program: 'LFX Mentorship Term 3, 2026',
    role: 'Mentor',
    period: 'Sep 2026 - Present',
    location: 'Remote',
    current: true,
  },
  {
    company: 'The Linux Foundation',
    logo: linuxFoundationLogo,
    program: 'LFX Mentorship Term 1, 2026',
    role: 'Mentee',
    period: 'Mar 2026 - May 2026',
    location: 'Remote',
  },
];

export const PROJECTS = [
  {
    title: 'PaperLite',
    description: 'A lightweight real-time collaborative document editor.',
    url: 'https://github.com/parshipcy/paperlite',
  },
  {
    title: 'Secure API',
    description: 'An Express REST API with JWT auth and RBAC.',
    url: 'https://github.com/parshipcy/secure-api',
  },
];

export { BLOGS } from './blogs';

export const VISIBLE = { experience: 3, blog: 2 };
