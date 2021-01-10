import { DarkMode } from './DarkMode'
import { SearchIcon } from './icons'
import { Project } from './types'

interface Props {
  project: Project
}

export function Header({ project }: Props) {
  const mainLogo = project.logo ?? project.logoDark
  return (
    <header className="header">
      <div className="header__content">
        <a className="header__brand" href="/">
          {mainLogo && (
            <img
              className={
                project.logoDark
                  ? 'header__logo header__logo--light'
                  : 'header__logo'
              }
              src={mainLogo}
              alt={`${project.name} logo`}
            />
          )}
          {project.logoDark && (
            <img
              className="header__logo header__logo--dark"
              src={project.logoDark}
              alt={`${project.name} logo`}
            />
          )}
          {!mainLogo && <span className="header__title">{project.name}</span>}
        </a>
        <div className="header__right">
          <DarkMode />
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
