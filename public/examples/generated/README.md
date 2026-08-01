# Generated example asset manifest

This folder is the only runtime location for the 12 reviewed example visuals. Files are served at
`/examples/generated/<filename>`. The detailed content, alt text, and safety requirements remain in
[`public/examples/README.md`](../README.md) and `src/content/imageSlots.ts`. The exact built-in
image-generation prompt set is recorded in [`PROMPTS.md`](./PROMPTS.md).

Current status: all 12 master files and all 12 responsive derivatives are present, reviewed, and
enabled in `src/content/imageSlots.ts`. They are educational illustrations, not official Roblox
screenshots or proof of a moderation outcome.

Do not set `available: true` from a plan, prompt, or filename alone. Set it only after the exact WebP
exists here, opens successfully, is 1600 × 1600, and has passed the corresponding safety review.

| Slot ID       | Required disk path                                            | Public URL                                              |
| ------------- | ------------------------------------------------------------- | ------------------------------------------------------- |
| image-slot-01 | `public/examples/generated/toolbox-model-hierarchy.webp`      | `/examples/generated/toolbox-model-hierarchy.webp`      |
| image-slot-02 | `public/examples/generated/hidden-decal-example.webp`         | `/examples/generated/hidden-decal-example.webp`         |
| image-slot-03 | `public/examples/generated/ai-poster-risk.webp`               | `/examples/generated/ai-poster-risk.webp`               |
| image-slot-04 | `public/examples/generated/ai-poster-reviewed.webp`           | `/examples/generated/ai-poster-reviewed.webp`           |
| image-slot-05 | `public/examples/generated/character-framing-comparison.webp` | `/examples/generated/character-framing-comparison.webp` |
| image-slot-06 | `public/examples/generated/ip-lookalike-comparison.webp`      | `/examples/generated/ip-lookalike-comparison.webp`      |
| image-slot-07 | `public/examples/generated/maturity-questionnaire.webp`       | `/examples/generated/maturity-questionnaire.webp`       |
| image-slot-08 | `public/examples/generated/moderation-notice.webp`            | `/examples/generated/moderation-notice.webp`            |
| image-slot-09 | `public/examples/generated/paid-random-item-odds.webp`        | `/examples/generated/paid-random-item-odds.webp`        |
| image-slot-10 | `public/examples/generated/filtered-user-sign.webp`           | `/examples/generated/filtered-user-sign.webp`           |
| image-slot-11 | `public/examples/generated/advertising-integration.webp`      | `/examples/generated/advertising-integration.webp`      |
| image-slot-12 | `public/examples/generated/appeal-form.webp`                  | `/examples/generated/appeal-form.webp`                  |

## Shared safety gate

- Use only fictional, owned, or clearly permitted material.
- Do not include personal data, private project identifiers, working URLs, handles, QR codes, real
  brands, protected characters, or unredacted moderation details.
- Keep `ai-poster-risk.webp` and `ai-poster-reviewed.webp` at the same crop and scale.
- Verify the final pixels, not only the generation prompt, before enabling an asset.

## Responsive derivatives

Each 1600 × 1600 production image has a sibling named `<stem>-800.webp`. `ImageSlot` exposes both
files through `srcset`; the 800-pixel version reduces transfer size on smaller, standard-density
screens while the 1600-pixel source remains available for larger or high-density displays.
