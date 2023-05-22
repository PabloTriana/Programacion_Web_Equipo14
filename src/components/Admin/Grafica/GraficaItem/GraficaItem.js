import React from 'react'
import logicalimg from "../../../../assets/monitoreo/logicalSize.png"
import networdimg from "../../../../assets/monitoreo/network.png"
import opencoun from "../../../../assets/monitoreo/Opcounters.png"
import "../GraficaItem/GraficaItem.scss"


export default function GraficaItem() {
  return (
    <div>
      <img src={networdimg} className='logo' />
      <img src={logicalimg} className='logo' />
      <img src={opencoun} className='logo' />
    </div>
  )
}
