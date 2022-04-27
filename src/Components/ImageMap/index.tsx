import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import OpenSeadragon, { OSDEvent } from 'openseadragon'
import SVG from 'react-inlinesvg'
import Circles from './map-circles.svg'
import {
  FILTER_OUT_CLASS_SELECTOR,
  MAP_CIRCLE_CLASS_SELECTOR,
  openSeaDragonDefaults as defaults,
} from '../../Data/imageMap'
import { useContextMap } from '../../Context/mapContext'

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  #osd-overlay {
    width: 100%;
    height: 100%;
    overflow: hidden;

    svg {
      width: 100%;
      height: 100%;

      ${MAP_CIRCLE_CLASS_SELECTOR} {
        fill: transparent;
        transition: 1.5s linear;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        // for debug:
        //stroke: black;
        //stroke-width: 1;

        &.filter-out {
          fill: white;
          fill-opacity: 0.85;
          cursor: initial;
        }

        &:focus {
          outline: none !important;
        }
      }
    }
  }
`

const ImageMap = () => {
  const { setTargetedItemId, applyFilter } = useContextMap()

  const handleClick = useCallback(
    (event: OSDEvent<unknown>) => {
      // Unfortunately typing is not perfect for OpenSeaDragon, therefore needs some casting
      const { originalTarget: target, quick: quickEvent } = event as unknown as {
        originalTarget: HTMLElement
        quick: boolean
      }
      // The 'quick' property takes the distance and time thresholds into consideration which are set on the
      // MouseTracker object to distinguish clicks/taps from drag/pinch/pan gestures.
      // We don't want anything to happen if it's a long event, or if the target item is filtered out
      if (!quickEvent || target.matches(FILTER_OUT_CLASS_SELECTOR)) return

      // Here comes the logic we want to do when an image is clicked
      if (target.matches(MAP_CIRCLE_CLASS_SELECTOR) && target.dataset.itemId) {
        setTargetedItemId(target.dataset.itemId)
      }
    },
    [setTargetedItemId]
  )

  useEffect(() => {
    const viewer = OpenSeadragon({
      id: 'osd-container',
      tileSources: './dz-map-01.dzi',
      showNavigationControl: false,
      defaultZoomLevel: defaults.initialZoom,
      maxZoomLevel: defaults.maxZoom,
      minZoomImageRatio: defaults.minZoom,
      visibilityRatio: 0.9,
      overlays: [
        {
          id: 'osd-overlay',
          px: 0,
          py: 0,
          width: 20000,
          height: 10000,
        },
      ],
      gestureSettingsMouse: {
        clickToZoom: false,
      },
      gestureSettingsPen: {
        clickToZoom: false,
      },
    })
    viewer.addHandler('canvas-click', event => {
      handleClick(event)
    })
  }, [handleClick])

  useEffect(() => {
    return () => {
      applyFilter(undefined)
    }
  }, [])

  return (
    <>
      <MapContainer id="osd-container" />

      <div
        key="overlay-container"
        /* This element is needed to wrap the overlay and to have a "unique key" because otherwise
        React can't handle OpenSeadragon taking care of the overlay element in the DOM */
      >
        <div
          id="osd-overlay"
          /* This element will be taken out from here by OpenSeadragon and put inside the map container */
        >
          <SVG src={Circles} />
        </div>
      </div>
    </>
  )
}

export default ImageMap
