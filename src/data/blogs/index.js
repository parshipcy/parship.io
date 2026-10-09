import { allAboutDistributedTracing } from './all-about-distributed-tracing';
import { lfxJaeger2026 } from './lfx-jaeger-2026';

export const BLOGS = [allAboutDistributedTracing, lfxJaeger2026];

export function getBlogBySlug(slug) {
  return BLOGS.find((b) => b.slug === slug);
}
