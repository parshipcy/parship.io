import { Icon } from './Icon';

export function SocialLink({ social }) {
  const external = social.url.startsWith('http');
  return (
    <a
      href={social.url}
      aria-label={social.label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <Icon name={social.id} />
    </a>
  );
}
