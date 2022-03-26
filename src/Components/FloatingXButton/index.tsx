import styled from 'styled-components'
import SVG from 'react-inlinesvg'

const Button = styled.button`
  position: fixed;
  top: 60px;
  right: 20px;
  background: none;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: none;
  padding: 0;

  .black-x-svg {
    width: 50%;
    height: 50%;
  }

  @media (min-width: 1000px) {
    width: 50px;
    height: 50px;
    top: 75px;
    right: 30px;
  }
  @media (min-width: 1600px) {
    width: 60px;
    height: 60px;
    top: 100px;
    right: 40px;
  }
`

interface Props {
  onClick: () => void
}

const FloatingXButton = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick}>
      <SVG className="black-x-svg" src="/icons/x.svg" />
    </Button>
  )
}

export default FloatingXButton
