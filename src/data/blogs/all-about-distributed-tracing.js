export const allAboutDistributedTracing = {
  slug: 'all-about-distributed-tracing',
  title: 'All about distributed tracing',
  description:
    'What distributed tracing is, why teams use it, and the core ideas - spans, traces.',
  date: '2026-09-12',
  blocks: [
    {
      type: 'p',
      text: 'Modern applications are rarely a single program on one machine. A user action might touch an API gateway, three microservices, a cache, and a database - each on different hosts. When something is slow or broken, logs alone often cannot tell you which hop failed. That is where distributed tracing comes in.',
    },
    { type: 'h3', text: 'What is distributed tracing?' },
    {
      type: 'p',
      text: 'Distributed tracing records the path of a request as it moves through your system. Each unit of work becomes a span: a named interval with a start time, duration, and metadata. Spans link together into a trace - a tree that mirrors how work flowed through services.',
    },
    {
      type: 'p',
      text: 'Think of it as a flight recorder for requests. You do not only know that checkout failed; you can see that payment took four seconds because the inventory service waited on a downstream call that never returned.',
    },
    { type: 'h3', text: 'Spans, traces, and context' },
    {
      type: 'ul',
      items: [
        'Span - one operation (HTTP handler, DB query, queue publish) with timing and attributes.',
        'Trace - the full journey of one logical request, made of parent and child spans.',
        'Context propagation - trace and span IDs passed across network calls so every service attaches its work to the same story.',
      ],
    },
    {
      type: 'p',
      text: 'Without propagation, each service would produce isolated spans you cannot connect. Standards like W3C Trace Context (and historically B3 headers in systems such as Jaeger) exist so libraries and proxies can pass that context automatically.',
    },
    { type: 'h3', text: 'Why teams adopt it' },
    {
      type: 'ol',
      items: [
        'Latency debugging - find which service or query dominates p99, not just average CPU.',
        'Failure analysis - see error flags on the exact span where an exception occurred.',
        'Dependency insight - discover hidden calls between services you forgot were coupled.',
        'Regression checks - compare trace shapes before and after a deploy.',
      ],
    },
    { type: 'h3', text: 'OpenTelemetry and backends' },
    {
      type: 'p',
      text: 'Most new instrumentation uses OpenTelemetry: one API and SDK for traces, metrics, and logs, with exporters that send data to a backend. Jaeger, Zipkin, and vendor platforms all consume the same trace model in different ways.',
    },
    {
      type: 'p',
      text: 'You instrument code (or rely on auto-instrumentation for common frameworks), run a collector or agent, and query traces in a UI. The hard part is not clicking “enable tracing” - it is sampling wisely, keeping cardinality under control, and making trace data actionable for on-call engineers.',
    },
    { type: 'h3', text: 'Practical tips I care about' },
    {
      type: 'ul',
      items: [
        'Name spans for operations, not class names - `GET /orders/:id` beats `OrderController.get`.',
        'Add a few high-signal attributes (user id, order id) rather than logging everything on every span.',
        'Use consistent sampling in production; 100% trace volume can be expensive and noisy.',
        'Correlate traces with structured logs using the same trace id in log lines.',
      ],
    },
    {
      type: 'note',
      text: 'Tracing complements metrics and logs. Metrics tell you that error rate spiked; logs give detail at a point in time; traces show how a single request walked through the system when you need the full path.',
    },
    { type: 'h3', text: 'Closing thought' },
    {
      type: 'p',
      text: 'Distributed tracing changed how I read complex systems. Once you have used a trace view to solve a real incident, it is hard to go back to guessing from log timestamps alone. If you are starting out, pick one critical user flow, instrument it end to end, and follow a few traces in your backend’s UI—you will learn more in an afternoon than from a week of scattered log grep.',
    },
    {
      type: 'p',
      html: 'Further reading: <a href="https://opentelemetry.io/docs/concepts/signals/traces/" target="_blank" rel="noopener noreferrer">OpenTelemetry traces</a>, <a href="https://www.jaegertracing.io/docs/" target="_blank" rel="noopener noreferrer">Jaeger documentation</a>',
    },
  ],
};
