import fs from 'fs-extra'
import https from 'https'
import { mfers } from 'mfers'

const gateway = `https://ipfs.io`

const mfers_json = JSON.parse(fs.readFileSync('./mfers.json'))

async function download_batch(arr=[]){
  fs.ensureDirSync('./output/originals')
  let promises = []
  for(let i = 0; i < arr.length; i++){
    promises.push(new Promise(cb => {
      let index = arr[i]
      let hash = mfers_json[index].image
      https.get(`${gateway}/ipfs/${hash}`, res => {
        if(res.statusCode != 200){
          console.log(`${index} : ${res.statusCode} : ${res.statusMessage}`)
        }
        let p = `./output/originals/${index}.png`
        const writeStream = fs.createWriteStream(p);
        res.pipe(writeStream);
        writeStream.on("finish", () => {
          writeStream.close();
          cb()
        });
      })
    }))
  }
  await Promise.all(promises)
}

async function download_all(){
  for(let i = 0; i < 10021; i += 10){
    let arr = []
    for(let j = i; j < Math.min(i+10,10021); j++){
      arr.push(j)
    }
    console.log(`downloading ${i} - ${Math.min(i+10,10021)}`)
    await download_batch(arr)
  }
}

download_all()
