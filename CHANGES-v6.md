# v6 — de-branded, hero rebuilt, trade in brought forward

```bash
node example-shop-v6/server.js 4411
```

Storefront `http://localhost:4411` · Dashboard `http://localhost:4411/dashboard.html`

Safe to hand to a developer. Nothing identifies the client.

---

## 1. De-branded

| Was | Now |
| --- | --- |
| The client's name | **Example Electronics** |
| Wordmark | `EXAMPLE / ELECTRONICS` |
| Real phone number | `+971 50 000 0000` |
| Real district | Generic Dubai locations |
| Promo code | `WELCOME100` |
| Domain in meta and schema | `example-electronics.test` |

Applied across the storefront, the dashboard, all CSS and JS. Verified by
rendering every breakpoint and scanning the visible text: **zero matches**.

The demo customer names in the dashboard were already fictional; their districts
were genericised too.

---

## 2. The mobile hero was genuinely broken, and here is why

This is the important one. I set up headless Chrome so I could screenshot the
page rather than rely on measurements, and the cause was immediately visible.

**`.hero__in`'s grid column computed to 685px inside a 390px screen.**

Flex and grid children default to `min-width: auto`, which means they refuse to
shrink below their content's intrinsic width. The deal image is 522px natural.
That floor propagated up the chain — image → slide → track → grid column — and
forced the column wider than the phone. Every symptom you pointed at was that one
blowout: buttons running off the edge, trust chips clipped mid-word, the product
photo sprawling across the text.

**Why my earlier checks missed it.** `.hero` has `overflow: hidden`, so the spill
was clipped rather than scrolled. `document.scrollWidth` matched `innerWidth`, my
overflow test reported clean, and I believed it. A measurement that only asks
"does the document scroll sideways" cannot see broken layout inside a clipping
parent. The screenshot found it in seconds.

**The fix**, in `assets/css/v6.css`:

- `min-width: 0` on every link in the chain, so children may shrink
- the deal image is now absolutely positioned inside a fixed-height box with
  `object-fit: contain`, instead of relying on `max-height: 100%`, which was
  silently resolving to nothing

Hero column now measures **358px on mobile**, 712px on tablet, two real columns
on desktop.

---

## 3. The price block, rebuilt

You asked for the starting-from price to lead and to look the part. It is now one
block with three tiers instead of competing boxes:

- **STARTING FROM** label, then the instalment at 1.85rem, the largest number in
  the card, with `x4` and the Tabby mark beside it
- **YOU SAVE** on a solid green panel flush to its right, dirham figure and
  percentage
- **Or pay once** on a dashed divider underneath, full price in bold

Instalment leads because 460 reads as affordable where 1,839 reads as a decision.
The full price sits directly beneath it, so "from" is never doing the work alone.

---

## 4. Brand logos moved off the product

The Samsung mark was sitting over the phone. Logos now sit **inline beside the
product name**, sized 12px for Apple and 8px for the Samsung wordmark, at 40%
opacity. Visible, never crowding. On the hero deal the mark moved up to the badge
row instead.

---

## 5. Gift tile: heartbeat and golden aura

Kept in the product grid as the fifth card, where it reads as part of the shelf
rather than an interruption. It now has:

- **Two golden rings** expanding outward on a 2.4s loop, offset 0.6s apart, so the
  pulse never fully stops. They are pseudo-elements on the outer wrapper so they
  can scale past the card without being clipped
- **A subtle heartbeat** on the card itself, a double beat then rest, tuned to
  about 2% scale so it draws the eye without jitter
- A gold glow under the gift icon

Framed as earned, not offered: "FIRST ORDER" label, the value as the headline,
and "Claim my gift" rather than "sign up". `prefers-reduced-motion` stops all of
it and leaves a static gold ring.

---

## 6. Trade in, beside the deals

**Placement.** On desktop the trade in card sits directly to the right of the deal
carousel, genuinely side by side. On mobile it is the very next card, so it is the
second thing anyone sees.

**The visual.** Your exchange photo: a used phone being handed over on the left,
a new one in its box on the right, captioned *Your old phone* and *A newer one*.
The mechanism is legible before a word is read.

**The starter, two taps.** No form, no account, nothing to read:

1. *Which phone do you have now?* — five big targets including "Something else",
   so nobody is excluded
2. *What condition is it in?* — three plain-language options, no grading jargon
3. A dirham figure, then one button: **Lock this price for 7 days**

`Step 1 of 2` is visible throughout so the end is always in sight. The model is
captured on tap one, which means even an abandon leaves the business the single
most useful field.

**The icon.** Your line-art mark, converted to an alpha mask so it takes the gold
from `currentColor`. Tile enlarged to 50px so it reads clearly at a glance.

---

## 7. Things you did not ask for, that the screenshots forced

**Floating buttons were covering calls to action.** The Insight pill sat on top of
"See this deal" and WhatsApp covered the trade in heading. Both now stay hidden
until the visitor scrolls past the hero.

**The grid was loading roughly forty images before anything was readable.** Every
colourway of every card was in the DOM so swatch swapping felt instant. On a phone
that is the wrong trade. Cards now load **one image** and preload that card's other
colours on first touch, so swapping is still instant after the first interaction.
Measured: **22 images to 15, 0.22MB to 0.10MB** on first load.

---

## Verified

Screenshotted and measured at 390, 768 and 1440. **No console errors at any
breakpoint. No layout spill** except the announcement ticker, which scrolls inside
a clipping parent by design.

Trade in flow driven end to end: two taps produce 700 from an iPhone 12 or 13 with
a few scratches, the lock button opens the capture modal. Arithmetic checks out at
850 × 0.82 = 697, rounded to 700.

**Contrast swept across 22 pairs**, including every text colour against the hero
gradient's lightest point rather than its darkest. One failure: the trade in swap
arrow, white on `#B8860B` at 3.25:1. That clears the 3:1 bar for graphical objects
but not the 4.5 I test at, so it was darkened to `#8A6A08`, now 5.07:1.

**One correction to something I reported earlier.** I flagged a blank product image
as a real bug. It was not. `page.screenshot({clip})` does not move the viewport, so
lazy images outside it never load. Re-captured by scrolling the viewport to the
section: zero blank images. The image loading work above still stands on its own
merits, but the blank card was my measurement, not your site.

---

## The two images you attached — now in

Both are wired up.

**The photo** (`assets/img/tradein-hero.webp`, 2000x723 with alpha) replaced the
two-product composition. It is framed at a 3.25:1 crop on mobile and 2.9:1 on
desktop, positioned slightly above centre, so the hands fill the frame instead of
floating in the studio white the source ships with. Captioned *Your old phone* and
*A newer one* underneath. The exchange is legible before a word is read.

**The icon** was black on white with no alpha channel, so it could not take a
colour. I converted it to an alpha mask the same way as the dirham glyph: decode
the PNG, compute  per pixel, crop to the ink bounds
(980x980 down to 643x670, so the glyph fills its tile), re-encode as RGBA. It now
paints with , which is how it picks up the gold and why it will
work on any surface later.

My hand-drawn SVG stand-in is gone.

The two screenshots you also dropped in (, ) were
your bug reports rather than site assets, so they were moved to 
alongside the original icon. Nothing was deleted, and they no longer ship in the
image folder where a developer might mistake them for content.

## Unchanged limits

No backend, refreshing clears everything, prices and stock are invented, and the
three shop interior photos remain placeholders from another company that must be
replaced before this goes anywhere live.
