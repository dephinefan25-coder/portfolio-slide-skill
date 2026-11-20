---
name: project-portfolio-slide
description: Turn a student's past project materials (decks, code, notes, reports) into a recruiter-ready one-page portfolio PPTX slide, or combine several into one deck.
---

# Project Portfolio Slide

Builds one 16:9 PowerPoint slide per project that a recruiter can read in about 30 seconds. Made for business-school / analytics students applying to Business Analyst, BI, Data Analyst, Financial Analyst and similar roles.

## 1. Gather inputs
Ask the user for (skip what they already gave):
- Project materials: slide deck, report, code (SQL/Python/R/notebooks), spreadsheets, screenshots, their own notes, or a portfolio-website link.
- Target roles (default: BA / BIE / DA / FA).
- Optional: a slide number for the title (e.g. "2.") if it will go into a combined deck.

Read every file before writing. Use ONLY these sources. Never add outside facts.

## 2. Write the content
Title: project name in caps, with a two-tone ending (e.g. "WA ELECTRIC CARS - **COUNTY ANALYSIS**" where the last part is teal).

Four sections, left column:
- **PROBLEM** – 2 short sentences of background, plain language.
- **OBJECTIVE** – 1 sentence.
- **ACTION** – 3 one-line bullets. Start with a strong verb, name the tool/method ("Built a churn model in **Python** (XGBoost)").
- **OUTCOME** – 2-3 one-line bullets, at most ONE number per bullet, lead with the number.

Writing rules:
- Short, plain recruiter language; no jargon walls.
- Bold tools (SQL, Python, Tableau, Excel, Power BI), methods (regression, A/B test, clustering), metrics and all numbers.
- Group projects: write one coherent story. No team names, no split of who did what.
- Honest role: "Led/Built" only for clearly own work, "Contributed to" when shared.
- Keep "estimated/projected" wording; never claim $ business impact for a class project unless the source states it.
- Never invent numbers, results, quotes or tools. If a section has no support, use a clearly marked placeholder like `[RESULT: accuracy?]` and ask.

## 3. Visuals
Right column holds 2 framed visuals (white rounded box, sage border `86A8A0`, caption below starting with "▲"). Prefer, in order:
1. A real image the user supplied (chart, dashboard screenshot, scoreboard) cropped to fit.
2. A simple native chart rebuilt from numbers in the sources (e.g. before/after bar chart).
3. A simple diagram from shapes (e.g. before vs. after process flow).
4. A labeled placeholder box saying exactly which image to drop in.

## 4. Build the slide (pptxgenjs)
Use the pptx skill if available. A full working example is in `examples/make_ev_example.js` (the author's own project, for layout reference only: replace all of its text with the user's sources; its preview is `examples/example_preview.jpg`). `fix.py` next to this file cleans bullet formatting afterwards (`python3 fix.py <file>.pptx`).

Style spec:
- Layout `LAYOUT_WIDE` (13.33 x 7.5 in). Background cream `FBF5EA` – never dark.
- Colors: teal `1F5E57` (headers, accents), ink `1A1A1A` (bold text), body `333333`, grey `A9A9A9`, light teal `E3EEEC`.
- Fonts: headers **Arial Narrow** bold (title ~34pt, section heads ~19pt teal caps); body Calibri ~13.5pt.
- Left text column x≈0.75in, width≈7.85in, starting y≈1.35in. Visuals column x≈8.95in, width≈3.75in, stacked two high.
- Bullets colored teal.
- Put source notes in the speaker notes.

## 5. Check and deliver
- Render to an image (LibreOffice → PDF → JPG) and look at it: no overflow, no overlaps, text fits its box, visuals readable.
- Deliver `<Project>_Portfolio.pptx` plus a preview JPG.
- Below the slide, in the reply (not on the slide):
  - **Sources:** every number used and where it came from (file + slide/line).
  - **Unclear:** anything ambiguous or placeholder for the user to confirm.

## 6. Combined deck (optional)
When the user has several finished slides, keep one build script per project and a combine script that reuses them, numbers titles 1..N in order, and writes `Portfolio_Combined.pptx`. Rebuild the combined deck after editing any single slide.
