import * as core from '@actions/core'
import * as exec from '@actions/exec'

const projectBase = ' ../prism-ui'

async function run(): Promise<void> {
  // TODO: get this from user input
  const entryPoints = [
    'libraries/account-selector/tsconfig.json',
    'libraries/core/tsconfig.json',
    'libraries/features/tsconfig.json',
    'libraries/test-utils/tsconfig.json'
  ]

  // TODO: get this from user input
  const inputIgnore = [
    '"used in module"',
    '"react-test-utils"',
    '"hooks-test-utils"',
    '"index.ts"',
    '"index.d.ts"',
    '".stories.ts"',
    '".stories.tsx"'
  ]

  const ignorePattern = inputIgnore.join(' | grep -v ')
  const filesToIgnore = `| grep -v ${ignorePattern}`

  core.debug('checking unused files in:')
  core.debug(JSON.stringify(entryPoints))
  core.debug('Ignoring output containing:')
  core.debug(JSON.stringify(inputIgnore))

  for (const entryPoint of entryPoints) {
    core.debug(`UNUSED EXPORTS FOR PROJECT ${entryPoint}`)
    core.debug(`${projectBase}/${entryPoint} ${filesToIgnore}`)
    // TODO this works with shelljs, look at how to get this working with exec
    exec.exec(`ts-prune -p ${projectBase}/${entryPoint} ${filesToIgnore}`)
  }
}

run()
