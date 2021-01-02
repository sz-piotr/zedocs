import { MoonIcon, SearchIcon, SunIcon } from './icons'
import { Project } from './types'

interface Props {
  project: Project
}

export function Header({ project }: Props) {
  return (
    <header className="header">
      <div className="header__content">
        <a className="header__title" href="/">
          {project.name}
        </a>
        <div className="header__right">
          <button className="dark-mode">
            <MoonIcon />
            <SunIcon />
          </button>
          <div className="search">
            <label className="search__icon" htmlFor="search">
              <SearchIcon />
            </label>
            <input
              className="search__input"
              placeholder="Search..."
              type="text"
              name="search"
              id="search"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
