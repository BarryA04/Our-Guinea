# Design system

Forest #174C3C; gold #D9A441; cream #F7F2E8; terracotta #B94A3D; charcoal #242722; white surfaces. Gold is an accent, not small text on cream. Explicit readable text colours in both themes/platforms.

Use native system typography for body and semibold activity headings; reserve serif type for the Our Guinea wordmark. Spacing scale: 4, 8, 12, 16, 24, 32, 48. Mobile content has 20px gutters; desktop shell is bounded, not stretched edge-to-edge. Buttons have at least 48px targets, wrap translated text and expose accessibility state.

Central tokens and reusable Button, Surface, Heading, StatusLabel and Progress components live in src. A shared bilingual interface uses separate en/fr locale files. Decorative sound bars are abstract audio imagery, never claimed to be an authentic waveform or cultural symbol. No tourism stock images or invented motifs.

Use a brief reduced-motion-aware fade for screen changes. Error and success feedback includes text and icons, not colour alone. Content scrolls on small screens and with large text.

Home presents three icon-and-label choices: Share a story (primary), Childhood and Language demo. Keep introductory copy short. Place purpose, privacy and detailed progress inside the expandable About section. Retain text labels for every icon and 48px or larger touch targets. Children use the family activities with an adult.


Use the shared Ionicons component for navigation and status symbols; decorative icons are hidden from assistive technology and controls retain text labels. Home card descriptions use 15px text. Below 400px or with larger system text, stack Home choices vertically. Language controls have 48px touch targets.

Activity artwork uses rounded native shapes and filled Ionicons in mango, terracotta, forest and sky blue. The shared Artwork component maps each family question to its subject and is decorative. Navigation remains simple. These are generic activity symbols, not claims about Guinean cultural practices.
