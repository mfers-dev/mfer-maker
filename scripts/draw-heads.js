import { draw, head_layers } from "../src/draw.js";
import { mfers } from 'mfers'

async function drawAll(){
  for(let i = 0; i < 10021; i++){
    if(i % 100 == 0){ console.log(`Done drawing: ${i}`) }

    if(mfers[i].traits['1/1'])
    await draw(head_layers(i),`./output/heads/${i}.png`)
  }
}

drawAll()