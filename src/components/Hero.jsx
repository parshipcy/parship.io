import appleMusicLogo from '../assets/apple-music.png';
import floatingCatGif from '../assets/floating-cat.gif';
import { CONFIG } from '../data/content';
import { useLanyardListening } from '../hooks/useLanyardListening';
import { Avatar } from './Avatar';
import { Icon } from './Icon';
import { SocialLink } from './SocialLinks';

export function Hero() {
  const { live, track } = useLanyardListening(CONFIG.discordId);

  return (
    <section id="home" className="hero" aria-labelledby="name">
      <div className="hero-bg" aria-hidden="true">
        <img src={floatingCatGif} alt="" decoding="async" />
      </div>
      <div className="hero-top">
        <Avatar />
        <div>
          <h1 id="name" className="stg">
            {CONFIG.name}
          </h1>
          <p className="headline stg">{CONFIG.headline}</p>
        </div>
      </div>
      <p className="intro stg">{CONFIG.intro}</p>
      <p className="listening stg" hidden={!track}>
        {track ? (
          <>
            <span className="listen-logo">
              <img
                src={appleMusicLogo}
                alt=""
                width={16}
                height={16}
                decoding="async"
              />
            </span>
            {live ? <span className="listen-live" aria-hidden="true" /> : null}
            <span>
              {live ? 'Now playing' : 'Last played'} - {track.song}
              {track.artist ? ` · ${track.artist}` : ''}
            </span>
          </>
        ) : null}
      </p>
      <div className="socials stg">
        {CONFIG.socials.map((s) => (
          <SocialLink key={s.id} social={s} />
        ))}
      </div>
      <div className="resume-dl stg">
        <a
          className="btn resume-dl-btn"
          href={CONFIG.resumePdf}
          download={CONFIG.resumeFileName}
        >
          <Icon name="download" className="resume-dl-icon" />
          <span className="resume-dl-label">Resume</span>
        </a>
      </div>
    </section>
  );
}
