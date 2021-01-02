export interface HelloCommand {
  command: 'hello'
  protocols: string[]
}

export interface UrlCommand {
  command: 'url'
  url: string
}

export function parseLiveReloadMessage(message: string) {
  const data = safeJSONParse(message)
  if (typeof data === 'object' && data !== null) {
    const command: unknown = Reflect.get(data, 'command')
    switch (command) {
      case 'hello':
        return data as HelloCommand
      case 'url':
        return data as UrlCommand
    }
    return undefined
  }
}

function safeJSONParse(data: string): unknown {
  try {
    return JSON.parse(data)
  } catch {
    return undefined
  }
}
