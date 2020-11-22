import { expect } from 'earljs'
import { parseCliOptions, CliOptions } from '../../src/cli/options'

describe('parseCliOptions', () => {
  const successCases: { args: string[]; result: CliOptions }[] = [
    {
      args: ['-h'],
      result: { help: true },
    },
    {
      args: ['--help'],
      result: { help: true },
    },
    {
      args: ['foo', 'bar', '-z', 'x', '--help'],
      result: { help: true },
    },
    {
      args: ['-v'],
      result: { version: true },
    },
    {
      args: ['--version'],
      result: { version: true },
    },
    {
      args: ['-c', 'aaa'],
      result: { config: 'aaa' },
    },
    {
      args: ['--config', 'aaa'],
      result: { config: 'aaa' },
    },
    {
      args: ['build'],
      result: { command: 'build' },
    },
    {
      args: ['serve'],
      result: { command: 'serve' },
    },
    {
      args: ['-v', '-c', 'aaa', 'build'],
      result: { command: 'build', config: 'aaa', version: true },
    },
    {
      args: ['serve', '--config', 'aaa'],
      result: { command: 'serve', config: 'aaa' },
    },
  ]
  for (const { args, result } of successCases) {
    it(`parses "${args.join(' ')}"`, () => {
      const options = parseCliOptions(args)
      expect(options).toEqual(result)
    })
  }

  const errorCases = [
    {
      args: ['foo', 'bar'],
      error: 'Too many arguments. See "zedocs --help".',
    },
    {
      args: ['-x'],
      error: 'Invalid option specified: x. See "zedocs --help".',
    },
    {
      args: ['--xxx'],
      error: 'Invalid option specified: xxx. See "zedocs --help".',
    },
    {
      args: ['-c', '--config'],
      error: 'Both -c and --config specified.',
    },
    {
      args: ['foo'],
      error: 'Unknown command "foo". See "zedocs --help".',
    },
    {
      args: ['-v', '3'],
      error: 'The version argument does not take a value. See "zedocs --help".',
    },
    {
      args: ['-c', '3'],
      error: 'Invalid config value passed as argument. See "zedocs --help".',
    },
  ]
  for (const { args, error } of errorCases) {
    it(`errors on "${args.join(' ')}"`, () => {
      expect(() => parseCliOptions(args)).toThrow(error)
    })
  }
})
