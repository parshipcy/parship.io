import { useEffect, useState } from 'react';

export function useGitHubContributions(username) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!username) return undefined;
    let cancelled = false;

    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((res) => {
        if (!res.ok) throw new Error('contributions fetch failed');
        return res.json();
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { data, error };
}

export function contributionsToWeeks(contributions) {
  if (!contributions?.length) return [];
  const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }
  return weeks;
}

export function contributionStats(contributions, totalLastYear) {
  if (!contributions?.length) {
    return { total: totalLastYear ?? 0, currentStreak: 0, longestStreak: 0 };
  }

  let longest = 0;
  let run = 0;
  for (const day of contributions) {
    if (day.count > 0) {
      run += 1;
      longest = Math.max(longest, run);
    } else {
      run = 0;
    }
  }

  let current = 0;
  for (let i = contributions.length - 1; i >= 0; i--) {
    if (contributions[i].count > 0) current += 1;
    else if (current > 0) break;
  }

  const total =
    typeof totalLastYear === 'number'
      ? totalLastYear
      : contributions.reduce((sum, d) => sum + d.count, 0);

  return { total, currentStreak: current, longestStreak: longest };
}
