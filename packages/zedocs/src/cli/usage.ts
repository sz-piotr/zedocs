// eslint-disable-next-line @typescript-eslint/no-var-requires
export const version = require('../../package.json').version

export const usage = `ZeDocs version ${version}

usage:

    zedocs [--version, -v] [--help, -h]
    zedocs build [config]
    zedocs serve [config]

commands:

    build           Compile the documentation
    serve           Run a development web server

arguments:

    --version, -v   Print the current version
    --help, -h      Print this message
    config          Path to the config file. Defaults to ./zedocs.json
`
