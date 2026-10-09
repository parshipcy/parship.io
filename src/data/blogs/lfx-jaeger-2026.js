export const lfxJaeger2026 = {
  slug: 'lfx-jaeger-2026',
  title: 'LFX Mentorship 2026 - Jaeger Distributed Tracing Platform',
  description:
    'Upgrading Jaeger UI routing, Jaeger-AI frontend integration, and lessons from three months in open source.',
  date: '2026-05-28',
  blocks: [
    {
      type: 'meta',
      rows: [
        {
          label: 'Project',
          href: 'https://mentorship.lfx.linuxfoundation.org/project/d13df7c9-06d3-4589-bef8-c13e5c79c2a2',
          text: 'Upgrade core routing and state management in Jaeger UI',
        },
        {
          label: 'Mentors',
          links: [
            {
              text: 'Yuri Shkuro',
              href: 'https://mentorship.lfx.linuxfoundation.org/mentor/200b5bfd-1d30-4c41-90af-e24df38ef102',
            },
            {
              text: 'Jonah Kowall',
              href: 'https://mentorship.lfx.linuxfoundation.org/mentor/16a8dc59-d895-46c1-aa75-a92e64b0ed16',
            },
          ],
        },
      ],
    },
    { type: 'h3', text: 'Overview' },
    {
      type: 'p',
      text: 'During the three-month program, I worked on two main tracks:',
    },
    {
      type: 'ol',
      items: [
        'I completed the LFX project — “Upgrade core routing and state management” — within the first month.',
        'After that I collaborated on the new Jaeger-AI backend project for 2026 Term 1, where Nabil Salah led the backend. I handled frontend integration for the backend features.',
      ],
    },
    {
      type: 'p',
      html: 'Nabil’s work: <a href="https://github.com/Nabil-Salah">Nabil Salah on GitHub</a>.',
    },
    { type: 'h3', text: 'Technical learnings' },
    {
      type: 'p',
      text: 'Over these three months I gained experience working in a team within open-source development workflows and with a large frontend architecture. A key lesson was understanding the challenges of migration and refactoring while preserving existing application behavior.',
    },
    {
      type: 'p',
      text: 'I used AI throughout the process, but not as a replacement for my own thinking. I treated it as a partner for researching options, validating ideas, writing tests, refactoring, and fixing bugs.',
    },
    {
      type: 'p',
      text: 'Frontend integration for backend AI features also improved my understanding of cross-team collaboration in an open-source environment.',
    },
    { type: 'h3', text: 'Pull requests' },
    {
      type: 'p',
      text: 'The migration work involved multiple PRs, consolidated in these documents for easier tracking:',
    },
    {
      type: 'ul',
      items: [
        {
          text: 'Upgrade react-router-dom to v7 & Remove history',
          href: 'https://docs.google.com/document/d/1IuJ2dc_GzTLEd4ijzW4YO6Ekkg19hOdBk7a7QbTNJQM/edit?usp=sharing',
        },
        {
          text: 'feat: add Jaeger assistant (AG-UI + assistant-ui)',
          href: 'https://github.com/jaegertracing/jaeger-ui/pull/3930',
        },
      ],
    },
    {
      type: 'note',
      text: 'Many PRs may appear under a ghost account because they were created from my previous GitHub account, which is no longer active. These contributions are still linked to my work and can be verified through commit history.',
    },
    { type: 'h3', text: 'Skills and technologies' },
    {
      type: 'ul',
      items: [
        'JavaScript/TypeScript & React - hooks and component lifecycles',
        'Routing - SPAs and browser history APIs',
        'Testing - React Testing Library (RTL)',
        'AI & agent interfaces - assistant-ui and AG-UI',
      ],
    },
    {
      type: 'cta',
      text: 'Letter of Completion',
      href: 'https://drive.google.com/file/d/1d_tHXFvSEtANprV8fqL3yt0fq9FwawXe/view?usp=sharing',
    },
  ],
};
