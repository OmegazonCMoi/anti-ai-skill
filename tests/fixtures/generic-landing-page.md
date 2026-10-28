# Fixture: generic landing page

## Context

A landing page generated for "Flowly", a hypothetical tool that helps small accounting firms collect documents from clients. Primary user: an accountant evaluating tools. The page was produced from a generic prompt ("make a modern SaaS landing page") without content discovery.

## Markup

```html
<body class="bg-slate-950 text-white">
  <div class="absolute -top-40 left-1/2 h-96 w-96 rounded-full bg-purple-600/40 blur-3xl"></div>
  <section class="mx-auto max-w-5xl py-32 text-center">
    <span class="badge rounded-full border border-white/10 px-3 py-1 text-xs">✨ AI-powered</span>
    <h1 class="mt-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-6xl font-bold text-transparent">
      Supercharge your workflow
    </h1>
    <p class="mt-4 text-lg text-slate-400">The all-in-one platform for modern teams to collaborate, automate, and grow.</p>
    <a href="/signup" class="mt-8 inline-block rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3">Get started free</a>
    <p class="mt-6 text-sm text-slate-500">Trusted by 10,000+ teams worldwide</p>
  </section>

  <section class="mx-auto max-w-5xl py-24 text-center">
    <span class="eyebrow text-sm uppercase tracking-widest text-purple-400">Features</span>
    <h2 class="mt-2 text-4xl font-bold">Everything you need</h2>
    <p class="mt-3 text-slate-400">Powerful features to help your team ship faster.</p>
    <div class="mt-12 grid grid-cols-3 gap-6">
      <div class="feature-card rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur"><span>⚡</span><h3>Lightning fast</h3><p>Blazing performance at any scale.</p></div>
      <div class="feature-card rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur"><span>🔒</span><h3>Secure by default</h3><p>Enterprise-grade security built in.</p></div>
      <div class="feature-card rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur"><span>🤝</span><h3>Collaborative</h3><p>Work together in real time.</p></div>
      <div class="feature-card rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur"><span>📈</span><h3>Analytics</h3><p>Insights that drive growth.</p></div>
      <div class="feature-card rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur"><span>🔌</span><h3>Integrations</h3><p>Connect your favorite tools.</p></div>
      <div class="feature-card rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur"><span>💬</span><h3>24/7 support</h3><p>We're here when you need us.</p></div>
    </div>
  </section>

  <section class="mx-auto max-w-5xl py-24 text-center">
    <span class="pill text-sm text-purple-400">Ready?</span>
    <h2 class="text-4xl font-bold">Start building today</h2>
    <p class="text-slate-400">Join thousands of teams already using Flowly.</p>
    <a href="/signup" class="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3">Get started</a>
  </section>
</body>
```

## Expected audit outcome

Static signal expectations (checked by `tests/anti-pattern-rules.test.mjs`):

```json
{
  "candidate": ["GEN-001", "GEN-002", "GEN-003", "GEN-004", "GEN-005", "GEN-009", "GEN-011", "GEN-012", "GEN-013", "GEN-023"],
  "absent": [],
  "needsJudgment": []
}
```

Reviewer-level findings expected from a capable model (not all detectable statically):

```json
{ "expectedFindings": ["GEN-001", "GEN-002", "GEN-005", "GEN-008", "GEN-010", "GEN-013", "HIE-001"] }
```

Expected reasoning:

- The badge → gradient headline → paragraph → CTA stack opens all three sections (GEN-001); the "Features" eyebrow restates the heading.
- Six equal cards describe generic qualities ("Lightning fast", "Secure by default") that say nothing about collecting documents from accounting clients (GEN-002). The real differentiator (a client upload portal, reminders) is never shown.
- Dark navy, purple-blue gradient text and buttons, a blurred purple orb, and "platform for modern teams" copy make up the generic SaaS identity (GEN-005, GEN-008, GEN-009).
- "Trusted by 10,000+ teams" is unsourced; for a hypothetical product it is fabricated (GEN-013, High).
- The section sequence (hero, features, CTA band) is a stock template (GEN-010).
- Recommended direction: lead with the client-facing upload request as it appears to a client, plus the accountant's view of what's missing; an editorial list of what Flowly automates; a pricing table if relevant; real proof only when available.
