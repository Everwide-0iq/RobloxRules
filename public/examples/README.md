# Example asset registry

This directory is reserved for locally owned or clearly permitted visual examples used by Before You Publish.
Reviewed WebP files belong in `public/examples/generated/`; the application serves them from
`/examples/generated/<filename>`.

Add a reviewed file with the exact filename below to `public/examples/generated/`, verify that it
exists and opens correctly, then set `available: true` on the matching entry in
`src/content/imageSlots.ts`. `ImageSlot` will replace the intentional white placeholder without
layout or component changes. Leave the flag unset until the file exists so production builds never
request missing media.

The typed source of truth is `src/content/imageSlots.ts`; the delivery manifest is
`public/examples/generated/README.md`. Keep both documents and the registry in the same order
whenever an asset is added or its instructions change. Expected files should use WebP, preserve a
square crop, and remain local to the project.

| Slot ID       | Section     | Expected filename                 | Required content                                                                                                              | Recommended resolution | Alt text                                                                                                      | Safety notes                                                                                                                      |
| ------------- | ----------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| image-slot-01 | blind-spots | toolbox-model-hierarchy.webp      | A neutral model hierarchy with scripts, media, nested asset IDs, and package dependencies clearly marked for inspection.      | 1600 × 1600            | Annotated hierarchy of a third-party model showing descendants that need review.                              | Use a fictional hierarchy. Do not include executable malicious code, real creator names, or private project identifiers.          |
| image-slot-02 | blind-spots | hidden-decal-example.webp         | A safe room prop comparison that reveals a small hidden decal when the object is inspected closely.                           | 1600 × 1600            | Room prop with an inspection callout pointing to a previously hidden decal.                                   | Use harmless fictional artwork in the decal. Do not reproduce moderated, offensive, or rights-unclear imagery.                    |
| image-slot-03 | blind-spots | ai-poster-risk.webp               | A fictional AI-generated poster with suspicious pseudo-text, QR-like shapes, and background details highlighted for review.   | 1600 × 1600            | Fictional generated poster with callouts around pseudo-text and ambiguous graphic details.                    | Do not include a usable URL, handle, QR code, real person, real brand, watermark, or sexualized character.                        |
| image-slot-04 | blind-spots | ai-poster-reviewed.webp           | The safer version of the fictional poster with generated typography removed and manually written fictional copy.              | 1600 × 1600            | Reviewed fictional poster with clear manually written text and simplified background details.                 | Keep all names, marks, dates, and event language fictional. Pair with image-slot-03 at the same crop and scale.                   |
| image-slot-05 | blind-spots | character-framing-comparison.webp | The same clearly adult character shown in a low-angle tight crop that needs review and in a neutral full-body frame.          | 1600 × 1600            | Fully clothed adult character in a tight low-angle crop beside a neutral full-body lower-risk view.           | Use a clearly adult, fully clothed fictional character. Keep the negative example mild and non-explicit; never sexualize a minor. |
| image-slot-06 | blind-spots | ip-lookalike-comparison.webp      | A comparison between a generic lookalike and a meaningfully original fictional character redesigned across identity cues.     | 1600 × 1600            | Original character design comparison highlighting changes to silhouette, colors, clothing, symbols, and name. | Do not use a real protected character, celebrity, athlete, streamer, club identity, product silhouette, or trademark.             |
| image-slot-07 | blind-spots | maturity-questionnaire.webp       | A current Maturity & Compliance questionnaire view or a clearly labeled neutral educational reconstruction.                   | 1600 × 1600            | Content maturity questionnaire with changed experience features marked for re-review.                         | Use a current owner-captured image only when permitted. Remove account data and IDs, and do not imply Roblox endorsement.         |
| image-slot-08 | appeals     | moderation-notice.webp            | A redacted moderation notice showing where to find the action category, affected ID, date, and appeal route.                  | 1600 × 1600            | Redacted moderation notice with callouts for the affected asset ID and appeal instructions.                   | Use an owned, fully redacted notice or a neutral mockup. Remove usernames, emails, IDs, and moderated imagery.                    |
| image-slot-09 | blind-spots | paid-random-item-odds.webp        | A fictional paid random item purchase panel with numerical outcomes, total probability, and an active luck modifier update.   | 1600 × 1600            | Fictional random reward interface showing numerical odds that update with a luck modifier.                    | Use fictional items and currency. Ensure displayed example probabilities total 100% and avoid Roblox branding.                    |
| image-slot-10 | blind-spots | filtered-user-sign.webp           | A safe user-created sign flow showing submission, server-side filtering, player-visible output, report, and removal controls. | 1600 × 1600            | Diagram of player text moving through filtering before appearing on an in-game sign.                          | Use harmless sample text and fictional players. Do not include personal information or examples of filter evasion.                |
| image-slot-11 | blind-spots | advertising-integration.webp      | A fictional in-experience advertising integration with clear disclosure and review checkpoints.                               | 1600 × 1600            | Fictional advertising integration mockup with disclosure, eligibility, and approval checkpoints.              | Use a fictional brand and destination. Do not include a real URL, partial link, QR code, advertiser, or campaign data.            |
| image-slot-12 | appeals     | appeal-form.webp                  | A redacted appeal form or neutral reconstruction showing the factual fields needed for a concise review request.              | 1600 × 1600            | Appeal form mockup with fields for the moderated item, account, ID, corrections, and review request.          | Remove personal data and real case identifiers. Do not present the mockup as an official form or imply a guaranteed result.       |

## Replacement workflow

1. Prepare the asset at the recommended square resolution.
2. Verify ownership or permission and follow the safety notes above.
3. Export it as WebP with the exact expected filename.
4. Place it in `public/examples/generated/`.
5. Confirm that ImageSlot replaces the fallback without changing surrounding layout.
6. Recheck alt text, responsive sizing, lazy loading, and the production build.

Until a reviewed file is available, the interface must render the intentional white ImageSlot fallback rather than a broken image.
