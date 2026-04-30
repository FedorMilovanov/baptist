# ARENA HANDOFF CHECKLIST

Use this checklist at the end of every meaningful pass.

## File Count Check

- Run file listing for project root.
- Check that important directories did not shrink unexpectedly:
  - `src/components`
  - `src/data/history`
  - `src/data`
- If a file count decreases, explain exactly why before continuing.

## Build Check

- Always run the official build tool after changes.
- Record the latest `dist/index.html` size and gzip size from the build output.

## Arena Download Warning

- The LM Arena Download button is outside the repository and cannot be directly verified from code.
- If the user needs to download the latest version, warn them after a successful build:
  - wait until the deployment/build indicator finishes;
  - refresh the preview if needed;
  - download only after the newest build output is visible;
  - if Arena appears stale, ask for a fresh deploy/download action.

## Final Report Template

Include:

- file count snapshot;
- build status;
- latest bundle size;
- note whether Download freshness is externally unverified.