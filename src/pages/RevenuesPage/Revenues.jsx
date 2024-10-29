import Header from "../../components/cabecalho/Header.jsx"
import SectionOne from '../../components/SectionOne/SectionOne.jsx'
import CrownLogo from '../../assets/img/crown.svg'
import Lupa from '../../assets/img/lupa.svg'
import SunIcon from '../../assets/img/sunMode.svg'
import MoonIcon from '../../assets/img/moon.svg'
import '../../css/Sun/RevenuesSun.css'
import '../../css/Moon/RevenuesMoon.css'
import Skeleton from "../consumo/Skeleton.jsx"
import { useState,useEffect} from "react"
export default function Revenues(){
    const [Mode,setMode] = useState(SunIcon)

    const toggleMode = () =>{
        if(Mode ==SunIcon){
            setMode(MoonIcon)
        }else{
            setMode(SunIcon)
        }
    }
    useEffect(() => {
        // Define a altura da viewport de forma dinâmica
        const setVhProperty = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setVhProperty();
        window.addEventListener('resize', setVhProperty);

        // Limpa o evento quando o componente desmonta
        return () => window.removeEventListener('resize', setVhProperty);
    }, []);
    
    return(
        <div className={Mode ==SunIcon? 'sun-background':'moon-background'}>
                    <Header image={CrownLogo} lupa={Lupa} SunIcon={Mode} toggleMode={toggleMode}/>
                    <div className={Mode==SunIcon?'header-input-sun-responsive':'header-input-moon-responsive'}>
                        <input type="text" id='search-input-sun-responsive'/>
                        <div className='lupa-icon-search-responsive'>
                        <label htmlFor="search-input-sun-responsive"><img src={Lupa} alt="" /></label>
                        </div>
                    </div>
                    <main>
                        <SectionOne/>
                    </main>
        </div>
    )
}