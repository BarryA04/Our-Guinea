# Guinea Heritage App — Master Brief

## Current authority — 2026-09-27

Barry supplied an expanded brief authorizing autonomous development through a polished bilingual playable slice. PRODUCT.md, DESIGN_SYSTEM.md, ROADMAP.md, DECISIONS.md, CONTENT_REVIEW.md and README.md describe the current direction. Their newer decisions supersede historical scope/workflow notes below. Preserve Family work; add clearly labelled unverified audio/content placeholders, a demo choice, family mission and locally saved progress. No invented Pular. Continue without routine approval pauses until the complete slice is ready for review.

Status: Reviewed and accepted by Barry on 2026-09-26. Barry confirmed the minimal Expo starter runs on his Android phone.

Local project folder: `D:\Users\alfa-\Documents\ChatGPT\App`.

## Setup progress

- Windows Node.js v24.21.0 and npm 11.19.0 verified by Barry.
- Barry uses Android and has installed Expo Go.
- Created the official blank TypeScript starter with Expo SDK 57.
- Barry approved “Our Guinea” as the working name and welcome heading, with “Reconnect with your roots.” and “Explore Guinea’s languages, history, and traditions—one story at a time.” Brand availability has not been checked. The internal Expo project name remains “Guinea Heritage”.
- TypeScript checking and Android bundle export passed on 2026-09-26. Barry subsequently confirmed the starter runs on his Android phone through Expo Go.
- npm installation reported 10 moderate dependency vulnerabilities. Review with an online audit before release; no forced dependency upgrades have been applied. An offline audit is not evidence that those findings are resolved.
- Barry confirmed that the “Our Guinea” welcome screen displays on his phone.
- Added an approved “Start exploring” button leading to a Family screen with one original conversation prompt: “What is one memory of Guinea you would like to share with me?” A visible back button and Android's back action return home. This uses React state without an additional navigation package and does not collect answers.
- Barry confirmed opening Family and returning home works on his phone.
- Family now contains six original conversation prompts stored in an array, with a question counter and a “Next question” button. The final question offers “Start again”. Home entry buttons choose the starting question; progress is not saved across app restarts. These are conversation starters, not factual cultural lessons.
- Barry confirmed the initial three-question flow and “Start again” work on his phone.
- Early feedback reported by Barry: the idea of reconnecting with Guinea and childhood memories appealed to the person or people he showed it to. This is preliminary feedback, not proof of repeat use or demand.
- Barry approved adding three childhood-memory prompts about games, food and the person who made it, and a moment that still brings a smile. He confirmed all six questions and the next/restart buttons work on his phone.
- Barry confirmed the “Childhood memories” heading appears above questions 4–6 on his phone.
- Barry confirmed “Previous question” works; it is disabled on question 1.
- Improved the layout with a warm off-white background, white question card, green text and rounded buttons with minimum 52-point touch targets. Previous/Next sit side by side, stacking on narrow screens or with larger text settings. Scrolling remains available. Questions 1–3 use the heading “Our connections”; questions 4–6 retain “Childhood memories”.
- Barry approved the updated layout after viewing it on his phone.
- Added the approved “Keep the conversation going” button to each question. It reveals two related follow-up prompts and toggles to “Hide follow-up prompts”. Moving to another question or restarting collapses the follow-ups. Prompts are stored together with their question; no answers are collected.
- Barry confirmed the follow-up prompts work on his phone.
- Added a Childhood memories card on Home with “Jump to childhood memories”, which opens question 4 (childhood games). “Start exploring” opens question 1. Both entry buttons collapse follow-ups; all six questions remain available through Previous/Next and Start again.
- Current guided step: Barry tests the childhood shortcut, then returns home and tests Start exploring.

## How to use this file

Read GUINEA_APP_MASTER_BRIEF.md first. Treat it as the product requirements. Do not materially change the product direction or architecture without discussing it with Barry.

## Purpose

Help people reconnect with Guinea, learn about their heritage, and share that connection with their family.

The app must address a real user need. Heritage is meaningful, but cultural sentiment alone is not evidence of demand.

Barry confirmed that Guinea's wider heritage is the main focus. Pular and Peul heritage belong within that broader scope; the app should welcome people from across Guinea's communities. “Our Guinea” replaces “Fouta” as the working name; it is not a checked final brand name.

This is initially a learning project, a portfolio project, and a small product experiment. Revenue is not assumed. Barry wants to learn practical AI workflows and basic coding while building something useful.

## Primary audience

- Guinean diaspora adults.
- Parents who want to share their heritage with their family.
- People who want to reconnect with their Guinean heritage.

Version 1 is not a children-only app. Children may use it with parents. Keep the experience simple and family-friendly; a dedicated Kids Mode is a possible later feature.

## Product principles

- Keep version 1 deliberately small, useful, and low maintenance.
- Prefer offline-first behavior: core learning content should work without permanent internet.
- Require no account initially and collect minimal personal data.
- Prefer free or low-cost tools.
- Avoid a complicated backend and unnecessary APIs.
- Validate usefulness with real users before expanding the product.

## Version-1 scope

Aim for approximately 10–20 carefully reviewed pieces of content. The exact initial content set and navigation remain to be agreed before implementation.

Possible sections:

1. Home — a simple starting point for learning.
2. Learn — Pular words and practical phrases, with pronunciation/audio when reviewed material is available.
3. Discover — short pieces about Guinea's history, places, traditions, and people; cultural explanations, stories, and sayings.
4. Quiz — short questions based only on reviewed learning content.
5. Family — prompts for conversations with parents or grandparents.

Learning progress is a candidate feature. If included, prefer storing it locally on the device without an account. These candidate sections and features do not all need to appear in the first working prototype.

## Content-quality rules

- Never invent Pular translations, pronunciation, or cultural and historical facts.
- Keep unverified drafts clearly marked and separate from published learning material.
- Record sources and review status for factual and language content.
- Have language material checked by knowledgeable human reviewers before presenting it as authoritative.
- Seek suitable cultural review where cultural authority or interpretation is needed.
- Make relevant language varieties and regional differences explicit when verified; do not imply that one community's practice represents everyone in Guinea.
- Use only content and audio for which reuse permission or an appropriate license is available.
- If reliable content is unavailable, use clearly labeled placeholders during development rather than fabricated lessons.

## Privacy rules

- No account required initially.
- Collect and retain as little personal data as possible.
- Family prompts should work without asking users to upload private family information.
- Prefer local storage for any necessary progress data.
- Any proposal for analytics, cloud storage, or additional personal-data collection must be discussed before implementation.

## What must not be built yet

- A dedicated Kids Mode or children-only product.
- A social network, chat, or public user-content platform.
- Advertising, payments, subscriptions, or other monetisation.
- A complicated backend, account system, or unnecessary API integrations.
- A large content library before the small reviewed set is useful.
- Features added merely because AI can generate them.

## Technical direction

Preferred path: React Native + Expo, with TypeScript and AI-assisted coding.

The PC is the main development machine. The phone is primarily for testing through Expo / Expo Go. After initially removing web support, Barry requested a live web preview on 2026-09-27. Android, iPhone, and web are now enabled. Expo-compatible react-dom, react-native-web, and @expo/metro-runtime are installed. Use npm run web for browser development; npm run dev and npm start both start Expo. A local live preview was started at http://localhost:8082 and Home and Family were verified in the browser. This is not a public deployment; the local server must remain running to use that address.

Do not assume Node.js, Expo, Git, VS Code, Android Studio, or other development tools are installed or configured. Inspect tools only after the brief review and local project-folder step. Install only what the immediate next step requires.

FlutterFlow was considered, but React Native + Expo is preferred to develop transferable coding and AI-assisted development skills.

## Development workflow

Guide Barry one manageable step at a time. For each step:

1. Explain exactly what to click, install, type, or check, or clearly describe the action Codex will perform.
2. Briefly explain why it is needed.
3. Wait for Barry's result before continuing to the next step.

Explain concepts as they become relevant: folders, components, navigation, data, TypeScript, React, and debugging. Introduce Git/GitHub and APIs later when useful. Avoid unexplained code dumps and unnecessary installations. Tell Barry before making destructive changes.

Use general ChatGPT conversations for product thinking, research, audience, content, business validation, and planning. Use Codex for local files, code, commands, debugging, and implementation. Keep confirmed project decisions in this file rather than assuming access to earlier conversations.

## Foundation sequence

1. Create this master brief.
2. Review its contents with Barry.
3. Confirm or create the local app project folder.
4. Check which development tools are installed.
5. Install only necessary missing tools.
6. Create the smallest possible Expo app.
7. Help Barry see that app running on his phone.

Do not jump ahead to building the full heritage app during setup.

## Validation and future decisions

Test a small version with Guinean and diaspora users. Use their feedback to decide whether to continue, modify, or stop. Consider monetisation only after evidence of useful demand.

Decisions to make when relevant include the app name, interface language, initial reviewed content, reviewer arrangements, and the phone platform used for testing. They do not need to be resolved before reviewing this brief.
