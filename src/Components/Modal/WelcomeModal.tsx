import { InfoModal } from './index'

const WelcomeModal = () => {
  return (
    <InfoModal>
      <>
        <h1>Welcome!</h1>
        <p>
          This tiny application has been created to demonstrate how to create an interactive,
          zoomable, pannable, filterable "map of things". Other than the demo page you are on right
          now, it also includes the tools to create a similar map using basically any kind of
          images.
        </p>
        <p>
          This demo uses the Google Material Icons as a resource, you can filter the map by
          categories by opening the menu in the top-left corner.
        </p>
      </>
    </InfoModal>
  )
}

export default WelcomeModal
