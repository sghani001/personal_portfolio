import React from 'react'
import './Footer.css'
import { Typography } from '@mui/material'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer_left">
        <Typography className="footer_name">{"Syed Ghani"}</Typography>
      </div>
      <div className="footer_right">
        <Typography className="footer_copyright">
          Designed and Developed by <a href="/" target='_blank' rel='noreferrer'>Syed Ghani</a>
        </Typography>
      </div>
    </div>
  )
}

export default Footer
