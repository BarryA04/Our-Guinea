# Our Guinea

An existing Expo/React Native/TypeScript project. Read PRODUCT.md, DESIGN_SYSTEM.md, ROADMAP.md, DECISIONS.md and CONTENT_REVIEW.md before changing direction. GUINEA_APP_MASTER_BRIEF.md retains earlier context.

## Run on Windows
From PowerShell in this folder:

```powershell
npm.cmd install
npm.cmd run web
```

For the existing preview port: `npm.cmd run web -- --port 8082`. Keep the server alive. Localhost is a local preview, not a public deployment. `npm.cmd run dev` and `npm.cmd start` start Expo too.

For Android, run `npm.cmd start`, connect the phone and PC to the same Wi-Fi, and scan the terminal QR code in Expo Go. A localhost-only server is for the PC browser; use the LAN start command for the phone.

## Checks
`npm.cmd run typecheck` checks TypeScript. `npm.cmd test` runs the local state/content checks once implemented. Export with `npx.cmd expo export --platform web` or `--platform android`. Test the real phone separately. Browser checks do not prove native audio or storage behavior.

## Recovery
No destructive Git commands. The original implementation is preserved in `.checkpoints/before-vertical-slice-2026-09-27.zip`; extract into a separate folder to compare or recover, rather than overwriting current files. Git has no configured identity/commits. Configure an author deliberately before making commits.

If the app breaks, stop adding features, inspect the first actual error, compare with the checkpoint, make the smallest fix, then rerun checks and the browser. Do not use npm audit fix --force. Dependencies previously reported moderate vulnerabilities; review before release.

The new slice is a content-labelled demonstration until authentic Pular material is reviewed. No accounts or family recordings. Local progress may be lost when app/browser data is cleared; private browsing or denied storage may prevent saving.
