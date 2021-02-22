#!/usr/bin/env node

const inquirer = require('inquirer')
const program = require('commander')
const color = require('colors')
const path = require('path')
const { progressBar, drawIntro, clear } = require('./util')
const fs = require('fs')
const api = require('./apiCall')
let final = null

program
  .description('Type node cli.js -f `filename`.json')
  .option('-u, --upload <file>', 'Add the JSON file path')
  .action(async data => {
    const options = program.opts()
    drawIntro()
    if (options.upload) {
      try {
        let filePath = path.join(__dirname, options.upload)
        let result = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' })
        final = JSON.parse(result)
        console.log('\n')
        console.log('--------------------'.blue)
        console.log('\n')
        await sleep(1000)
        displayMenu(final)
      } catch (err) {
        console.log('Invalid file format / file type', err)
        displayMenu(null)
      }
    } else {
      await sleep(800)
      displayMenu(final)
    }
  })
program.parse(process.argv)

function createStringQuestion(str, nameIt) {
  return { type: 'string', message: str, name: nameIt }
}
function sleep(timeInMs) {
  return new Promise(resolve => setTimeout(resolve, timeInMs))
}

async function question(questions) {
  let prmpt = inquirer.prompt(questions)
  const answers = await prmpt
  return answers
}

async function list(choices, message = 'Select option') {
  let prmpt = inquirer.prompt([
    {
      type: 'list',
      message: message,
      name: 'selectOption',
      choices: choices,
      validate: function(answer) {
        if (answer.length < 1) {
          return 'You must choose at least one option.'
        }
        return true
      }
    }
  ])
  const answer = await prmpt
  let data = answer['selectOption']
  return data
}

async function getStuff(entity) {
  let i = 1
  let allData = []
  while (i) {
    try {
      let data = await api.get(`/api/${entity}/` + i)
      allData.push(data)
    } catch (err) {
      break
    }
    i += 1
  }
  return allData
}

async function displayMenu(final) {
  clear()
  if (final) {
    const bar = progressBar('Uploading orders')
    let baseText = 'Orders created  => '
    bar.start()
    await sleep(1000)
    for (let ord of final) {
      let result = await api.post('/api/order/create', ord)
      baseText = baseText + ' ' + color.cyan(result.id)
      bar.setText(baseText)
      await sleep(500)
    }
    bar.stop('Successfully uploaded all orders 🚀')
    final = null
    await sleep(600)
  }
  let dict = {}
  let whchoice = ['Update order status', 'Update item price']
  let choice = await list(whchoice)
  console.log('\n')
  if (~choice.indexOf('status')) {
    let uploaded = await getStuff('order')
    let modFinal = uploaded.map(order => {
      const str = `Order ${order.id} - ${order.status}`
      dict[str] = order.id
      return str
    })
    let choice = await list(modFinal, 'Select an order to update status for!')

    let ans = await question([
      createStringQuestion(`Type the new status for ${choice} \n`, 'order')
    ])
    const orderId = dict[choice]
    const bar = progressBar('Updating status')
    bar.start()
    await sleep(1000)
    bar.setText('Notifying via websockets')
    await sleep(2000)
    await api.post('/api/order/update', { id: orderId, status: ans.order })
    bar.stop('Operation completed')
    console.log(color.green('Success 🚀') + '  Moving back to Main menu'.white)
    await sleep(1200)
    displayMenu(final)
  } else {
    let items = await getStuff('item')
    let modItems = items.map(item => {
      const str = `${item.name} => Price : ${item.value}₹`
      dict[str] = item.id
      return str
    })
    let choice = await list(modItems, 'Select an item')
    let ans = await question([
      createStringQuestion(
        `Type the new price for ${choice.split(' ')[0]} \n`,
        'price'
      )
    ])
    const prodId = dict[choice]
    const bar = progressBar('Updating status')
    bar.start()
    await sleep(1000)
    bar.setText('Notifying via websockets')
    await sleep(000)
    await api.post('/api/item/update', { id: prodId, value: ans.price })
    bar.stop('Operation completed')
    console.log(color.green('Success 🚀') + '  Moving back to Main menu'.white)
    await sleep(1200)
    displayMenu(final)
  }
}
