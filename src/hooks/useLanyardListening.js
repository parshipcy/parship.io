import { useEffect, useState } from 'react';

const MUSIC_NAMES =
  /cider|apple music|itunes|spotify|youtube music|soundcloud|tidal|deezer|amazon music|pandora/i;

function cacheKey(id) {
  return `lanyard-last-track:${id}`;
}

function readCache(id) {
  try {
    const raw = localStorage.getItem(cacheKey(id));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(id, track) {
  try {
    localStorage.setItem(cacheKey(id), JSON.stringify(track));
  } catch {
    /* ignore quota / private mode */
  }
}

function fromActivity(activity) {
  const song = activity.details || activity.assets?.large_text;
  if (!song) return null;
  const artist = activity.state || '';
  return { song, artist, source: activity.name || 'Music' };
}

function pickTrack(data) {
  if (data.spotify?.song) {
    return {
      song: data.spotify.song,
      artist: data.spotify.artist || '',
      source: 'Spotify',
    };
  }

  const activities = Array.isArray(data.activities) ? data.activities : [];
  const listening = activities.find(
    (a) => a.type === 2 && (a.details || a.state),
  );
  if (listening) return fromActivity(listening);

  const named = activities.find(
    (a) => MUSIC_NAMES.test(a.name || '') && (a.details || a.state),
  );
  return named ? fromActivity(named) : null;
}

export function useLanyardListening(discordId) {
  const [state, setState] = useState(() => ({
    live: false,
    track: discordId ? readCache(discordId) : null,
  }));

  useEffect(() => {
    if (!discordId) return undefined;
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(
          `https://api.lanyard.rest/v1/users/${discordId}`,
        );
        if (!res.ok) return;
        const json = await res.json();
        if (cancelled || !json?.success) return;

        const liveTrack = pickTrack(json.data);
        if (liveTrack) {
          writeCache(discordId, liveTrack);
          setState({ live: true, track: liveTrack });
          return;
        }

        setState({ live: false, track: readCache(discordId) });
      } catch {
        if (!cancelled) {
          setState({ live: false, track: readCache(discordId) });
        }
      }
    };

    load();
    const timer = setInterval(load, 15000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [discordId]);

  return state;
}
