import styled from 'styled-components'
import { useState } from 'react'
import { Category } from '../../Data/categories'
import { useContextMap } from '../../Context/mapContext'
import SVG from 'react-inlinesvg'
import { useNavigate } from 'react-router-dom'

const MenuWrapper = styled.div`
  font-size: 14px;
  position: absolute;
  top: 5vh;
  left: -13em;
  transition: left 0.3s ease;

  @media (min-height: 700px) {
    font-size: 16px;
  }

  @media (min-height: 1000px) {
    font-size: 18px;
  }

  @media (min-height: 1400px) {
    font-size: 20px;
  }

  &.open {
    left: 0;
  }

  .toggle-button {
    font-size: inherit;
    position: absolute;
    top: 0;
    left: 13em;
    height: 5em;
    width: 5em;
    border: none;
    background-color: var(--color-black-90);
    border-top-right-radius: 1.5em;
    border-bottom-right-radius: 1.5em;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }

  .menu {
    width: 13em;
    max-height: 90vh;
    overflow: auto;
    background-color: var(--color-black-90);
    border-bottom-right-radius: 1.5em;
    color: white;
    padding: 1em;

    h1 {
      font-size: 1.2em;
      margin: 0 0 0.5em;

      &:not(:first-of-type) {
        margin: 0.5em 0 0.5em;
      }
    }

    ul {
      margin: 0;
      list-style-type: none;
      padding-inline-start: unset;
    }

    li button {
      font-size: inherit;
      cursor: pointer;
      background: none;
      border: none;
      color: inherit;
      padding: 0.15em 0.5em;

      @media (min-height: 750px) {
        padding: 0.3em 0.5em;
      }

      &.active {
        color: var(--color-red);
      }
    }
  }
`

const Menu = () => {
  const { applyFilter, filter } = useContextMap()
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false)

  const onClickFilter = (filterIndex: number) => {
    applyFilter(filterIndex)
    setTimeout(() => {
      setOpen(false)
    }, 300)
  }

  return (
    <MenuWrapper className={open ? 'open' : ''}>
      <button className="toggle-button" onClick={() => setOpen(!open)}>
        <SVG src={open ? './mat-icons/chevron_left.svg' : './mat-icons/menu.svg'} />
      </button>
      <div className="menu">
        <h1>Filters</h1>
        <ul>
          {Object.keys(Category)
            .filter(v => isNaN(Number(v)))
            .map((name, index) => (
              <li key={name}>
                <button
                  className={filter === index ? 'active' : ''}
                  onClick={() => onClickFilter(index)}
                >
                  {name}
                </button>
              </li>
            ))}
        </ul>
        <h1>Go to</h1>
        <ul>
          <li>
            <button onClick={() => navigate('/generator')}>MAP GENERATOR</button>
            <button onClick={() => navigate('/tile-editor')}>TILE EDITOR</button>
          </li>
        </ul>
      </div>
    </MenuWrapper>
  )
}

export default Menu
