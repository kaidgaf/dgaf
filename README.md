# DGAF Studio

DGAF Studio is a private, dark editorial workspace for chat, image generation, and video generation. This first pass focuses on a polished frontend shell that makes the product direction tangible while keeping provider wiring replaceable.

## Product plan

### Phase 1 — Studio shell (implemented)

- Persistent workspace navigation for Chat, Image Studio, and Video Studio.
- A focused chat canvas with keyboard-friendly composer, suggestion starters, streaming-style response state, and session controls.
- Image/video prompt builders with model, aspect ratio, negative prompt, generation, and recent library surfaces.
- Credit balance display and usage estimate to establish the billing/ledger mental model.
- Provider routing UI with a primary OpenRouter route and Together AI fallback for text, plus model surfaces for Flux and Wan-style media generation.
- Community feed with image/video posts, visible creation prompts, prompt copy actions, likes, and send-bonus-credit interactions.
- Persistent light/dark theme switching with a top-bar toggle and light-mode surface overrides.
- Settings workspace with profile details, personalization context, credit balance, usage by project, and an admin foundation tab.
- Curated Skills library that indexes selected MIT-licensed Claude Skills packages without vendoring the full repository into the client bundle.
- Responsive behavior for smaller screens and toast feedback for placeholder flows.

### Phase 2 — Application logic

- Add a server-backed app scaffold with authentication, PostgreSQL, and object storage.
- Introduce provider adapters behind a stable internal interface: `chat`, `image.generate`, and `video.generate`.
- Keep provider credentials server-side. The current static shell intentionally does not access secrets or call external AI APIs.

### Phase 3 — Credits and generation lifecycle

- Implement an append-only transaction ledger with idempotency keys.
- Reserve credits before generation, settle on success, and release on provider failure.
- Track generation status (`queued`, `processing`, `complete`, `failed`) and output metadata.
- Add background polling/queue support for asynchronous video generation.

### Phase 4 — Launch hardening

- Add rate limits, request logging, provider cost tracking, error reporting, and content policy controls appropriate to the final deployment.
- Add CI checks for typecheck, build, and tests.
- Add a deployment workflow after the hosting target and secrets are chosen.

## Provider strategy

The interface intentionally keeps options visible rather than hard-coding one vendor. Text routing is represented by OpenRouter (primary) and Together AI (fallback). Media controls are vendor-neutral so Fal.ai and Replicate adapters can be added without changing the UI contract. API keys and server-side orchestration are not included in this frontend-only pass.

## Skills integration decision

The referenced [Claude Skills repository](https://github.com/alirezarezvani/claude-skills) is MIT-licensed and contains hundreds of self-contained `SKILL.md` packages plus optional scripts and references. DGAF should not clone the entire repository into the frontend: that would increase bundle size, create a large update surface, and expose capabilities users did not ask to activate. The current UI uses a curated registry with source paths and activation affordances. The recommended backend implementation is an allowlisted manifest that fetches only selected `SKILL.md` packages on demand, caches them server-side, records the pinned commit, and exposes only the normalized metadata/context needed by the prompt orchestrator.

## Admin foundation decision

The minimum viable admin control plane should cover four areas: users and roles, model/provider registry, the append-only credit/audit ledger, and operations health. Model records should include provider priority, capability flags, pricing, limits, and health. User records should support search, suspension, roles, and balance inspection. Every credit mutation, bonus transfer, refund, model change, and operator action should be auditable. This is represented in the Settings UI now and should become a protected server-backed surface in the next application phase.

## Local development

```bash
pnpm install
pnpm dev
```

Validation commands:

```bash
pnpm check
pnpm build
```

## Design direction

The visual system uses warm paper typography against graphite surfaces, a restrained electric-coral accent, thin quiet borders, and a small amount of orbital/gradient texture. The goal is a calm, premium tool that feels closer to a creative instrument than a generic dashboard.
