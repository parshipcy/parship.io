import { CONFIG } from '../data/content';
import {
  contributionStats,
  contributionsToWeeks,
  useGitHubContributions,
} from '../hooks/useGitHubContributions';

export function OpenSourceSection() {
  const username = CONFIG.githubUsername;
  const { data, error } = useGitHubContributions(username);
  const weeks = contributionsToWeeks(data?.contributions);
  const stats = contributionStats(data?.contributions, data?.total?.lastYear);
  const profileUrl = `https://github.com/${username}`;

  return (
    <section id="opensource" className="sec" aria-labelledby="h-oss">
      <h2 id="h-oss" className="rv">
        Open Source
      </h2>

      <div className="oss-overview rv">
        {data ? (
          <dl className="oss-stats">
            <div>
              <dt>Last year</dt>
              <dd>{stats.total.toLocaleString()} contributions</dd>
            </div>
            <div>
              <dt>Current streak</dt>
              <dd>
                {stats.currentStreak} day
                {stats.currentStreak === 1 ? '' : 's'}
              </dd>
            </div>
            <div>
              <dt>Longest streak</dt>
              <dd>
                {stats.longestStreak} day
                {stats.longestStreak === 1 ? '' : 's'}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="muted oss-lead">Loading activity overview…</p>
        )}
      </div>

      <a
        className="oss-graph rv"
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${username} on GitHub`}
      >
        {error ? (
          <p className="oss-fallback muted">
            Could not load the graph. View activity on GitHub →
          </p>
        ) : weeks.length ? (
          <>
            <div
              className="contrib-graph"
              role="img"
              aria-label={`GitHub contribution calendar for ${username}`}
            >
              {weeks.map((week, weekIndex) => (
                <div className="contrib-week" key={weekIndex}>
                  {week.map((day) => (
                    <span
                      key={day.date}
                      className={`contrib-day level-${day.level}`}
                      title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="contrib-legend" aria-hidden="true">
              <span>Less</span>
              <span className="contrib-day level-0" />
              <span className="contrib-day level-1" />
              <span className="contrib-day level-2" />
              <span className="contrib-day level-3" />
              <span className="contrib-day level-4" />
              <span>More</span>
            </div>
          </>
        ) : (
          <p className="oss-fallback muted" aria-busy="true">
            Loading contribution graph…
          </p>
        )}
      </a>
    </section>
  );
}
