

import '../../css/Sun/SectionOne.css'

export default function SectionOne(){
    return(
        <form className="form-sun-mode-body">
            <div className='column-row-sectionone-one'>
                <h2>CADASTRE SUA RECEITA</h2>
            </div>
            <div className='row-forms-styles'>
                <div className='column-register-revenues'>
                        <label htmlFor="">Nome:</label>
                        <input type="text"/>
                        <label htmlFor="">Descrição:</label>
                        <input type="text"/>
                    </div>
                    <div className='files'>
                        <input type="file" accept="image/*" />
                    </div>
                </div>
            <div className='buttons-register-revenues'>
                <button className='register-revenue-button'>Cadastrar receita</button>
                <button className='register-ingredient-button'>Adicionar ingredientes</button>
            </div>
        </form>
    )
}