/* eslint-disable */
main()
function main() {
  announce()
  darkModeSupport()
  initSearch()
}

function announce() {
  console.log('Powered by Zedocs (https://zedocs.org)')
}

function darkModeSupport() {
  let darkModeEnabled = false
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  const saved = localStorage.getItem('zedocs-theme')
  if (prefersDark) {
    darkModeEnabled = true
  }
  if (saved === 'light') {
    darkModeEnabled = false
    document.documentElement.dataset.theme = 'light'
  }
  if (saved === 'dark') {
    darkModeEnabled = true
    document.documentElement.dataset.theme = 'dark'
  }

  function toggleDarkMode() {
    darkModeEnabled = !darkModeEnabled
    const theme = darkModeEnabled ? 'dark' : 'light'
    document.documentElement.dataset.theme = theme
    localStorage.setItem('zedocs-theme', theme)
  }

  const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
    '.dark-mode'
  )
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i]
    button.style.display = 'block'
    button.addEventListener('click', toggleDarkMode)
  }
}

function initSearch() {
  function debounce<T extends (...args: any[]) => void>(
    func: T,
    timeoutMs: number
  ): T {
    let timestamp = 0
    let args: any = [undefined]
    let context: any = undefined
    let timeout: any = undefined

    function later() {
      const last = Date.now() - timestamp

      if (last < timeoutMs && last >= 0) {
        timeout = setTimeout(later, timeoutMs - last)
      } else {
        timeout = undefined
        func.apply(context, args)
        context = undefined
        args = undefined
      }
    }

    return function (this: any) {
      context = this
      args = arguments
      timestamp = Date.now()
      if (!timeout) timeout = setTimeout(later, timeoutMs)
    } as T
  }

  const searchInput = document.querySelector(
    '.search__input'
  ) as HTMLInputElement
  const searchResults = document.querySelector('.results') as HTMLDivElement

  searchInput.value = ''
  let lastSearch = ''
  let focused = false

  function updateSearchVisibility () {
    searchResults.classList.toggle('results--visible', !!lastSearch && focused)
  }

  searchInput.addEventListener('input', (e) => {
    debouncedOnSearch(searchInput.value)
  })
  searchInput.addEventListener('focus', (e) => {
    focused = true
    updateSearchVisibility()
  })
  searchInput.addEventListener('blur', (e) => {
    focused = false
    updateSearchVisibility()
  })

  const debouncedOnSearch = debounce(onSearch, 300)

  async function onSearch(text: string) {
    lastSearch = text
    updateSearchVisibility()

    const searchJson = await getSearchJson()
    console.log(searchJson)
    searchResults.innerHTML = text
  }

  let promise: Promise<any> | undefined
  function getSearchJson() {
    if (!promise) {
      promise = fetch('/search.json').then((res) => res.json())
    }
    return promise
  }
}
