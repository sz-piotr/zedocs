// eslint-disable-next-line @typescript-eslint/no-var-requires
export const version = require('../../package.json').version

export const usage = `Zedocs (version ${version})

usage:

    zedocs [--version, -v] [--help, -h]
    zedocs build [-c, --config CONFIG]
    zedocs serve [-c, --config CONFIG] [-p, --port PORT]

commands:

    build                 Compile the documentation
    serve                 Run a development web server

arguments:

    --version, -v         Print the current version
    --help, -h            Print this message
    -c, --config CONFIG   Path to the config file. Defaults to ./zedocs.json
    -p, --port PORT       Port to use for the development web server
`
