import styled from 'styled-components'
import { useState } from 'react'
import { Category } from '../../Data/categories'
import { useContextMap } from '../../Context/mapContext'

const MenuWrapper = styled.div`
  font-size: 16px;
  position: absolute;
  top: 5vh;
  left: -13em;
  transition: left 0.3s ease;

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
    height: 4em;
    width: 4em;
    border: none;
    background-color: rgba(0, 0, 0, 0.9);
    border-top-right-radius: 1.5em;
    border-bottom-right-radius: 1.5em;
    cursor: pointer;
  }

  .menu {
    width: 13em;
    max-height: 90vh;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.9);
    border-bottom-right-radius: 1.5em;
    color: #fff;
    padding: 1em;

    h1 {
      font-size: 1.2em;
      margin: 0 0 1em;

      &:not(:first-of-type) {
        margin: 1em 0 1em;
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
      padding: 0.3em 0.75em;

      &.active {
        :before {
          // TODO change to normal element
          content: '';
          width: 0.4em;
          height: 0.4em;
          background-color: #fff;
          border-radius: 50%;
          position: absolute;
          transform: translate(-0.7em, 0.3em);
        }
      }
    }
  }
`

const Menu = () => {
  const { applyFilter, filter } = useContextMap()
  const [open, setOpen] = useState<boolean>(false)
  return (
    <MenuWrapper className={open ? 'open' : ''}>
      <button className="toggle-button" onClick={() => setOpen(!open)}>
        .
      </button>
      <div className="menu">
        <h1>Filters</h1>
        <ul>
          {Object.keys(Category)
            .filter(v => isNaN(Number(v)))
            .map((name, index) => (
              <li>
                <button
                  className={filter === index ? 'active' : ''}
                  onClick={() => applyFilter(index)}
                >
                  {name}
                </button>
              </li>
            ))}
        </ul>
        <h1>Go to</h1>
        <ul>
          <li>
            <button>MAP GENERATOR</button>
            <button>TILE EDITOR</button>
          </li>
        </ul>
      </div>
    </MenuWrapper>
  )
}

export default Menu
