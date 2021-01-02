main()
function main() {
  announce()
  darkModeSupport()
}

function announce() {
  console.log('Built with ZeDocs (https://zedocs.org)')
}

function darkModeSupport() {
  const button: HTMLButtonElement | null = document.querySelector('.dark-mode')
  if (button) {
    button.style.display = 'block'

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

    button.addEventListener('click', () => {
      darkModeEnabled = !darkModeEnabled
      const theme = darkModeEnabled ? 'dark' : 'light'
      document.documentElement.dataset.theme = theme
      localStorage.setItem('zedocs-theme', theme)
    })
  }
}
