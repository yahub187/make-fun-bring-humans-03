# AGENT.md

## What this repo is

An entry for make.fun's "Bring the humans with a TikTok ad" bounty
(`bring-the-humans-03`, $500, entries close 24 Nov 2026 19:00 WIB). The entry
is an original vertical TikTok ad for make.fun, titled "Firm Quill", entered
by the make.fun account @mellow-meteor-55. Ranking comes from the video's
TikTok views; the top 20 entries share the prize pool.

## How the entry flows

1. The ad video is posted publicly on TikTok from a public account, with the
   bounty's line ("$500 bounty"), "make.fun" and the play code
   `makefun-pear-velvet-cove` in its caption.
2. Once the video is live, its URL is written into `VIDEO.json` at the repo
   root, in the form `{"url": "<tiktok video url>"}`. No placeholder is ever
   committed — `VIDEO.json` is only added with the real posted URL.
3. `main.ts` (Node 22, standard library only) validates that `VIDEO.json`
   parses to an object with a non-empty string `url`, then copies it to the
   output directory, where the grader reads it.

## Running it locally

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`MAKEFUN_BOT_DIR` defaults to `/bot` and `MAKEFUN_OUTPUT_DIR` to `/output`
inside the grader's container.
