
import React from 'react'
import Kibo from '../index'

React.render(
  <Kibo text='kibo'>
    <input type='text' style={{fontSize: '3em'}} />
  </Kibo>,
  document.querySelector('.demo'))
