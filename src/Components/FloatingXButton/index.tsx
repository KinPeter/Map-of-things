import styled from 'styled-components'
import SVG from 'react-inlinesvg'

const Button = styled.button`
  position: fixed;
  top: 6.8vh;
  right: 4vh;
  background: none;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: none;
  padding: 0;
  cursor: pointer;

  @media (min-width: 1000px) {
    width: 50px;
    height: 50px;
  }
  @media (min-width: 1600px) {
    width: 60px;
    height: 60px;
  }
`

interface Props {
  onClick: () => void
}

const FloatingXButton = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick}>
      <SVG src="./mat-icons/x.svg" />
    </Button>
  )
}

export default FloatingXButton
