import { InfoModal } from './index'

const FeatureInfoModal = () => {
  return (
    <InfoModal>
      <>
        <h1>Note:</h1>
        <p>
          To actually use this feature and generate your own map, you have to check out the
          repository and have access to the code while running it locally.
        </p>
        <p>
          Also, this page is not optimized for mobile views. For the best experience, use it on a
          laptop or desktop computer.
        </p>
      </>
    </InfoModal>
  )
}

export default FeatureInfoModal
