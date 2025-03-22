import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div>
                <div className="absolute inset-0 opacity-10">
                  <img src={assets.background} alt="Sidebar Background" className="w-full h-full object-cover" />
                </div>

    </div>
  )
}

export default Header