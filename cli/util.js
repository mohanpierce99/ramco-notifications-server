const ora = require('ora')
const cliCursor = require('cli-cursor')
const CFonts = require('cfonts')
const clear = require('clear')
cliCursor.hide()

function drawIntro() {
  CFonts.say('RAMCO', {
    font: 'tiny',
    align: 'left',
    colors: ['#4b85f2'],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '15',
    independentGradient: false,
    transitionGradient: false,
    env: 'node'
  })
}

function progressBar(data = '') {
  const spinner = ora({
    text: data,
    spinner: 'triangle',
    color: 'green'
  })
  return {
    setText: data => {
      spinner.text = data
    },
    start: () => {
      spinner.start()
    },
    done: () => {
      spinner.succeed()
    },
    stop: () => {
      spinner.stop()
    }
  }
}

function isEmpty(empty) {
  return Object.keys(empty).length === 0 && empty.constructor === Object
}

module.exports = {
  progressBar,
  drawIntro,
  clear,
  isEmpty
}
