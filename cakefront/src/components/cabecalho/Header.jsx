import '../../css/Sun/HeaderSun.css'
import '../../css/Moon/HeaderMoon.css'
import Sun from '../../assets/img/sunMode.svg'
import Moon from '../../assets/img/moon.svg'
import { useState } from 'react'
// import '../../css/Moon/HeaderMoon.css'

export default function Header({image,lupa,SunIcon,toggleMode,inputRevenuesValue,setInputRevenuesValue}) {

    function handleChangeRevenue(e) {
        setInputRevenuesValue(e.target.value);
    }
    

    return(
    <div id={SunIcon==Sun?'header-component-box-sun':'header-component-box-moon'} >
        <div className="group-box-first-row">
            <img src={image} alt="" className='img' />
            <p className={SunIcon==Sun?'p-sun-mode-one':'p-moon-mode-one'}>KOALU KING</p>
            <div className={SunIcon==Sun?'header-input-sun':'header-input-moon'}>
            <input type="text" id='search-input-sun' value={inputRevenuesValue} onChange={handleChangeRevenue}/>
            <div className='lupa-icon-search'>
               <label htmlFor="search-input-sun"><img src={lupa} alt="" /></label>
            </div>
        </div>
        </div>

        <div className="group-box-second-row">
         
            <img src={SunIcon} alt="" onClick={toggleMode} />
            
        </div>
    </div>
    )
}
