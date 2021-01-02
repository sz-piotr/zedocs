import Prism from 'prismjs'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const loadLanguages = require('prismjs/components/index.js')
loadLanguages.silent = true

export function highlight(code: string, language: string) {
  loadLanguages([language])
  if (language && language in Prism.languages) {
    try {
      const highlighted = Prism.highlight(
        code,
        Prism.languages[language],
        language
      )
      const preTag = `<pre data-lang="${language}">`
      const codeTag = `<code class="language-${language}">`
      return `${preTag}${codeTag}${highlighted}</code></pre>`
    } catch {
      // ignore errors
    }
  }
  return ''
}
