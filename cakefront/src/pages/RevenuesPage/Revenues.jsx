import Header from "../../components/cabecalho/Header.jsx"
import SectionOne from '../../components/SectionOne/SectionOne.jsx'
import CrownLogo from '../../assets/img/crown.svg'
import Lupa from '../../assets/img/searchwhite.png'
import MoonIcon  from '../../assets/img/switch.png'
import SunIcon  from '../../assets/img/togglemode.png'
import '../../css/Sun/RevenuesSun.css'
import '../../css/Moon/RevenuesMoon.css'
import Skeleton from "../consumo/Skeleton.jsx"
import { useState,useEffect} from "react"
import CardDisplay from "../../components/cardShow/CardDisplay.jsx";
export default function Revenues(){
    const [Mode,setMode] = useState(SunIcon)
    const [inputRevenuesValue,setInputRevenuesValue] = useState("");
    const [countShowNone,setCountShowNone] = useState(0)
    const [imageShow,setImageShow] = useState([])
  
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
                    <Header image={CrownLogo} lupa={Lupa} SunIcon={Mode} toggleMode={toggleMode} inputRevenuesValue={inputRevenuesValue} setInputRevenuesValue={setInputRevenuesValue}/>
                    <div className={Mode==SunIcon?'header-input-sun-responsive':'header-input-moon-responsive'}>
                        <input type="text" id='search-input-sun-responsive' value={inputRevenuesValue} onChange={(e) =>setInputRevenuesValue(e.target.value)}/>
                        <div className='lupa-icon-search-responsive'>
                        <label htmlFor="search-input-sun-responsive"><img src={Lupa} alt="" /></label>
                        </div>
                    </div>
                    
                    <main>
                        
                        <div>
                            
                            {inputRevenuesValue ==""?<SectionOne countShowNone={countShowNone} setCountShowNone={setCountShowNone} SunIcon={Mode} setImageShow={setImageShow} imageShow={imageShow}/>:""
                            }
                            <p className="allRevenues">Todas as Receitas</p>
                        <CardDisplay  inputRevenuesValue={inputRevenuesValue} countShowNone={countShowNone} setCountShowNone={setCountShowNone} setImageShow={setImageShow} imageShow={imageShow}/>
                        </div>
                        
                    </main>

                    <footer className="footer-sunMode">
                        <div className="footer-credits">
                    <div>@DevCaioBO</div>
                    <div>@Lara Magalhães</div>
                    </div>
                        <p>@ 2024 Cake King. Todos os direitos reservados</p>
                    
                    </footer>
        </div>
    )
}