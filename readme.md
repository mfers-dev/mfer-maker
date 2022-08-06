# mfer-maker

## Install

```bash
npm install
```

## Usage

All mfers are generated from the layers in `./optimized-layers` and using the metadata from [`mfers`](https://github.com/mfers-dev/mfers). There are (slight) color discrepencies and missing random *sartoshi marks* compared to the original mfers images on IPFS.

The generated images are compressed PNG's to mimimize file size / download speed

Generate mfers:
  - normalized originals `node scripts/draw-mfers`
  - transparent `node scripts/draw-transparents`
  - bodies `node scripts/draw-bodies`
  - heads `node scripts/draw-heads`

To download the original mfers images from IPFS: `node scripts/download-ogs`
  

## CC0 / Public Domain

mfers can do whatever they want with this code + these assets

(we're all mfers)

@~ // [m4rsh](https://m4r.sh)