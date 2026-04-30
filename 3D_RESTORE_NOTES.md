# 3D RESTORE NOTES

## Critical Rule: Rubber Graph

The 3D map in `src/components/MindMap3D.tsx` must stay a live, elastic force graph.

Do not replace it with a fixed/static layout.

Do not pin nodes with `fx`, `fy`, `fz` as the main composition method.

Do not disable node dragging permanently with `enableNodeDrag={false}`.

The graph should keep its original rubber-like behavior: nodes can move, links stretch, physics settles naturally, and the user can rotate, zoom, and interact with the scene.

## Allowed 3D Improvements

- Improve materials, lighting, glow, sphere depth, particles, labels, and popup UX.
- Tune force parameters carefully, but keep the graph elastic.
- Use visual weighting and camera behavior to make the composition closer to the DALL-E reference.
- A geographic Eurasia layer is allowed as a base plane, but only as a gentle anchor. It must not replace the elastic graph.
- Popups may be redesigned, but they must not block the graph excessively and must remain compact by default.

## Geo Layer Rules

- Geo coordinates may initialize or gently attract nodes, but never hard-pin them.
- Use `x/y/z` and weak custom forces only; do not use `fx/fy/fz` for the main layout.
- The Eurasia map must stay visually subordinate: thin coastline lines, low opacity, no bright filled map.
- The 3D spheres remain above the map; the map is a context layer below.
- Always keep a markdown backup note before major geo experiments.
- If the geo layer makes the scene less readable, roll it back immediately.
- Current conclusion: a combined Eurasia-underlay + force-graph is visually confusing for this project. If geographic storytelling is needed, build it as a separate map mode, not mixed into the main 3D graph.
- Revised approach: a flat cinematic Eurasia image may be used only as a background atmosphere behind the 3D scene. It should not drive layout or add physical map lines.
- Region highlights should be DOM/CSS glow overlays behind the WebGL graph, connected to node selection by opacity, not by extra 3D strings.
- The background map must remain darker than the spheres and links. It supports context; it does not compete for attention.

## Popup UX Rules

- Compact first, expanded on demand.
- Close button must always be visible.
- Long descriptions must not push controls off-screen.
- Mobile must use safe width and scrollable content.
- Popup should feel attached to selected node but never break interaction with the graph.

## Visual Stability Rules

- Avoid noisy shimmer. If particles or layered transparent shells flicker, remove them before adding more effects.
- Do not stack several transparent glow meshes around the same sphere unless the result is stable in production build.
- Prefer crisp glass highlights, controlled material values, and stable links over weak halos.
- The DALL-E reference is glossy and cinematic, not noisy: use depth, contrast, and composition first; bloom-like effects second.