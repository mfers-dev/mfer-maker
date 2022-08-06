import fs from 'fs-extra'
import NodeCanvas from 'canvas'
const { createCanvas, loadImage } = NodeCanvas
import { mfers } from 'mfers'
import sharp from 'sharp'

const width = 1000
const height = 1000

export async function draw(image_src_arr, output_path){
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')
  ctx.quality = 'best'
  return Promise.all(image_src_arr.map( src => loadImage(`./optimized-layers/${src}`))).then(images => {
    images.forEach(image => {
      ctx.drawImage(image,0,0,width,height)
    })
    fs.ensureFileSync(output_path)
    return sharp(canvas.toBuffer('image/png'))
      .pipelineColorspace('rgb16')
      .png({
        colors: 256,
        compressionLevel: 9,
        effort: 10
      })
      .withMetadata({ icc: 'p3'})
      .toFile(output_path)
  })
}

export function head_layers(i=3664){
  let mfer = mfers[i]
  let layers = []
  Object.keys(mfer.traits).forEach(trait_type => {
    let variant = mfer.traits[trait_type]
    if(trait_type != 'shirt' && trait_type != 'chain' && trait_type != '4:20 watch' && trait_type != 'background' && trait_type != '1/1'){
      if(trait_type == 'type'){
        layers.push(`heads/${variant}.png`)
      } else if (trait_type == 'hat over headphones' && variant == 'hoodie'){
        layers.push(`heads/hoodie.png`)
      } else {
        layers.push(`${trait_type.replace(':','_')}/${variant.replace('/','--')}.png`)
      }
    }
    if(trait_type == '1/1'){
      layers.push(`1--1-heads/${variant}.png`)
    }
  })
  return layers
}

export function body_layers(i=3664){
  let mfer = mfers[i]
  let layers = []
  Object.keys(mfer.traits).forEach(trait_type => {
    let variant = mfer.traits[trait_type]
    if(trait_type != 'background' && trait_type != '1/1'){
      if(trait_type == 'type'){
        layers.push(`setting/body.png`)
        layers.push(`heads/${variant}.png`)
      } else {
        layers.push(`${trait_type.replace(':','_')}/${variant.replace('/','--')}.png`)
      }
    }
    if(trait_type == '1/1'){
      layers.push(`setting/body.png`)
      layers.push(`1--1-heads/${variant}.png`)
    }
  })
  return layers
}

export function mfer_layers(i=3664,transparent = false){
  let mfer = mfers[i]
  let layers = []
  Object.keys(mfer.traits).forEach(trait_type => {
    let variant = mfer.traits[trait_type]
    if((!transparent || trait_type != 'background') && trait_type != '1/1'){
      if(trait_type == 'type'){
        layers.push(`setting/chair.png`)
        layers.push(`setting/sartoshi.png`)
        layers.push(`setting/body.png`)
        layers.push(`heads/${variant}.png`)
      } else {
        layers.push(`${trait_type.replace(':','_')}/${variant.replace('/','--')}.png`)
      }
    }
    if(trait_type == '1/1'){
      if(transparent){
        layers.push(`setting/chair.png`)
        layers.push(`setting/sartoshi.png`)
        layers.push(`setting/body.png`)
        layers.push(`1--1-heads/${variant}.png`)
      } else {
        layers.push(`1--1/${variant}.png`)
      }
    }
  })
  return layers
}