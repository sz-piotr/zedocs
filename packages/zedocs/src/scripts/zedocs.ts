main()
function main() {
  announce()
  darkModeSupport()
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
