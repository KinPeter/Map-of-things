import { NavLink } from 'react-router-dom'

const Demo = () => {
  return (
    <div>
      <p>demo</p>
      <p>
        <NavLink to="/generator">Generator</NavLink>
      </p>
      <p>
        <NavLink to="/tile-editor">TileEditor</NavLink>
      </p>
    </div>
  )
}

export default Demo
