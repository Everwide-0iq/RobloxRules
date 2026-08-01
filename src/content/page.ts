export const pageInterface = {
  themeSwitcher: {
    label: 'Choose appearance',
    menuLabel: 'Theme options',
    currentLabel: 'Current theme',
    lightLabel: 'Light',
    darkLabel: 'Dark',
    gameLabel: 'Game',
    changedToLight: 'Light theme enabled.',
    changedToDark: 'Dark theme enabled.',
    changedToGame: 'Game theme enabled.',
  },
  heroLead: 'One careless asset can put an entire project at risk.',
  journeyEyebrow: 'Your release journey',
  journeyTitle: 'Four calm checkpoints before Publish.',
  journeySteps: [
    {
      band: 'lower-risk',
      sectionId: 'responsibility',
      label: 'Prepare',
      detail: 'Know what ships and who reviewed it.',
    },
    {
      band: 'review',
      sectionId: 'blind-spots',
      label: 'Inspect',
      detail: 'Catch the details that are easy to miss.',
    },
    {
      band: 'high-risk',
      sectionId: 'high-risk',
      label: 'Pause',
      detail: 'Stop when the team cannot verify the release.',
    },
    {
      band: 'recovery',
      sectionId: 'appeals',
      label: 'Recover',
      detail: 'Preserve the facts and choose the next safe step.',
    },
  ],
  releaseQuest: {
    eyebrow: 'RELEASE QUEST',
    title: 'Follow the route without losing the thread.',
    intro:
      'The active checkpoint follows your reading. Each stop has one job: prepare, inspect, pause when evidence is missing, and recover from facts.',
    currentLabel: 'Current checkpoint',
    exploredLabel: 'route explored',
    completedLabel: 'Passed',
    activeLabel: 'You are here',
    upcomingLabel: 'Ahead',
  },
  releaseSimulator: {
    eyebrow: 'RELEASE SIMULATOR',
    title: 'Three calls before the Publish button.',
    intro:
      'Choose the action you would take under release pressure. A strong answer unlocks its risk card; a weaker answer explains the remaining blind spot.',
    deckLabel: 'Field deck',
    collectedLabel: 'cards collected',
    availableLabel: 'Open case',
    chooseLabel: 'Choose your move',
    nextLabel: 'Next case',
    resetLabel: 'Reset deck',
    outcomeLabels: {
      risky: 'Risk remains',
      review: 'Closer, but incomplete',
      safe: 'Strong release call',
    },
    completeTitle: 'Field deck complete.',
    completeBody:
      'You identified the safer release decision in all three cases. Keep the cards as a reminder, not as a moderation guarantee.',
    decisions: [
      {
        id: 'toolbox-model',
        cardLabel: 'CARD 01 · ASSETS',
        title: 'The decorative room',
        prompt:
          'A Toolbox room looks normal in the viewport. The release candidate is due tonight. What do you do?',
        correctOptionId: 'full-inspection',
        options: [
          {
            id: 'publish',
            tone: 'risky',
            label: 'Ship it. Toolbox content has already been screened.',
            result:
              'The visible room does not reveal nested scripts, media, asset IDs, packages, or hidden interfaces.',
          },
          {
            id: 'surface-check',
            tone: 'review',
            label: 'Check the visible meshes and textures, then publish.',
            result:
              'That catches surface problems, but descendants and runtime behavior are still unreviewed.',
          },
          {
            id: 'full-inspection',
            tone: 'safe',
            label: 'Isolate it, expand every descendant, and keep only verified parts.',
            result:
              'This turns a trusted-looking model into inspectable source material with a clear review boundary.',
          },
        ],
      },
      {
        id: 'ai-poster',
        cardLabel: 'CARD 02 · GENERATED ART',
        title: 'The harmless poster',
        prompt:
          'An AI poster fits the scene, but its tiny background marks are hard to read. What is the release call?',
        correctOptionId: 'rebuild',
        options: [
          {
            id: 'publish',
            tone: 'risky',
            label: 'Publish it because the prompt contained nothing unsafe.',
            result:
              'Moderation sees the exported pixels, not the intent of the prompt that produced them.',
          },
          {
            id: 'crop',
            tone: 'review',
            label: 'Crop the suspicious corner and keep the generated lettering.',
            result:
              'One mark is gone, but pseudo-text, reflections, faces, symbols, and other details remain unchecked.',
          },
          {
            id: 'rebuild',
            tone: 'safe',
            label: 'Remove generated text, typeset it manually, and inspect the full export.',
            result:
              'The final asset now has controlled copy and a deliberate edge-to-edge review step.',
          },
        ],
      },
      {
        id: 'ip-lookalike',
        cardLabel: 'CARD 03 · IDENTITY',
        title: 'The familiar hero',
        prompt:
          'A character still feels recognizable after the artist changes one color. What should happen before release?',
        correctOptionId: 'redesign',
        options: [
          {
            id: 'rename',
            tone: 'risky',
            label: 'Misspell the name and keep the design.',
            result:
              'A name change does not remove a recognizable silhouette, outfit, symbol set, pose, or story identity.',
          },
          {
            id: 'remove-logo',
            tone: 'review',
            label: 'Remove the logo and change one accessory.',
            result:
              'This removes two cues, but the overall identity may still depend on the original reference.',
          },
          {
            id: 'redesign',
            tone: 'safe',
            label: 'Redesign the silhouette, palette, symbols, outfit, props, and story together.',
            result:
              'The design now grows from its own world instead of a checklist of minor differences.',
          },
        ],
      },
    ],
  },
  workflowEyebrow: '8-step release path',
  workflowTitle: 'Make review part of production.',
  workflowStepLabel: 'Step',
  scenarioCountLabel: 'scenario dossiers',
  caseCountLabel: 'case files',
  auditLoading: 'Preparing the local audit…',
  auditErrorTitle: 'The audit could not load.',
  auditErrorBody: 'Refresh the page to retry. No answers have been sent or stored remotely.',
  auditRetryLabel: 'Refresh and retry',
  appealsImmediateTitle: 'Immediate steps',
  appealsLimitsTitle: 'Current appeal limits',
  finalSignalLabel: 'Review complete. Judgment stays human.',
  footerEdition: 'Independent guide · August 2026 edition',
  sourcePolicyNote: 'Policy wording may change. Read the linked official page before release.',
  share: {
    title: 'Before You Publish',
    text: 'A practical Roblox developer safety guide for reviewing assets before release.',
    shared: 'Share options opened.',
    copied: 'Guide link copied to the clipboard.',
    fallback: 'Copy the current page address and share it with your team.',
    ariaLabel: 'Share Before You Publish with your team',
  },
} as const;
