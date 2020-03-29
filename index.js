#!/usr/bin/env node

const inquirer = require('inquirer')
const chalk = require('chalk')
const figlet = require('figlet')
const shell = require('shelljs')

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync('lucuucas', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  )
}

const askQuestion = () => {
  const questions = [
    {
      name: 'filename',
      type: 'input',
      message: 'Type the filename'
    },
    {
      name: 'extension',
      type: 'list',
      message: 'whats the extension?',
      choices: ['.rb', '.py', '.js'],
      filter: val => val.split('.')[1]
    }
  ]
  return inquirer.prompt(questions)
}

const createFiles = (filename, extension) => {
  const filePath = `${process.cwd()}/${filename}.${extension}`
  shell.touch(filePath)
  return filePath
}

const success = filePath => {
  console.log(
    chalk.white.bgGreenBright.bold(`Done => ${filePath}`)
  )
}

const run = async () => {
  init()
  const answers = await askQuestion()
  const { filename, extension } = answers
  const filePath = createFiles(filename, extension)
  success(filePath)
}

run()
