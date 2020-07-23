const shell = require('shelljs')
const NAME = 'cookie-8'
const EMAIL = 'hllzjy@qq.com'

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git')
  shell.exit(1)
}

const name = shell.exec('git config user.name', { silent: true }).stdout
const email = shell.exec('git config user.email', { silent: true }).stdout

if (!name.includes(NAME) || !email.includes(EMAIL)) {
  shell.echo('PLease set name and email !')
  shell.exit(1)
}

shell.exec('lint-staged')
