import React from 'react'
import ReactElasticCarousel from 'react-elastic-carousel';
import AppOverviewGrid from '../grid/AppOverviewGrid';



const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

export const OverviewAplikasi = () => {
  return (
    <div>
        <ReactElasticCarousel breakPoints={breakPoints}>
            <AppOverviewGrid/>
        </ReactElasticCarousel>
    </div>
  )
}
