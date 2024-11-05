import { useState,useEffect,useRef } from "react";
import '../../css/Sun/CardDisplay.css'
import api from "../../services/api";
export default function CardDisplay({ inputRevenuesValue,countShowNone,setCountShowNone}){
    const [imageShow, setImageShow] = useState([]);
    const [revenueIngredients, setRevenuesIngredients] = useState([]);
    const [revenuesById,setRevenuesById] = useState([])
    const [nameIngredient,setNameIngredient] = useState("")
    const [qtdIngredient,setQtdIngredient] = useState("")
    const [ideCaker,setIdeCaker] = useState(0)

    // const [countShowNone,setCountShowNone] = useState(0)

    const showFormIngredient = (ide)=>{
        setIdeCaker(ide)
        getterLoadById(ide)
        // const ingredientButton =  document.querySelector("#ingredientButton")
        // // console.log(ingredientButton)
      
 
   
            setCountShowNone(1)
        
    }

    const showFormIngredientCancel = ()=>{
     
        // const ingredientButton =  document.querySelector("#ingredientButton")
        // // console.log(ingredientButton)
      
        if(countShowNone==1){
        setCountShowNone(0)
        
        }
        else{
            setCountShowNone(1)
        }
    }


    const getterLoadById = async (ide) => {
        const getterRevenuesById = await api.get("/crud/getCake/" + ide);
        setRevenuesById(getterRevenuesById.data);
    };


    const getterLoad = async () => {
        const getterRevenues = await api.get("/crud/getCake");
        setImageShow(getterRevenues.data);
    };

    const getterLoadIngredients = async (id) => {
       
        const getterRevenuesIngredients = await api.get("/crud/getCake/"+id);
        setRevenuesIngredients(getterRevenuesIngredients.data);
        
    };

    const postIngredients = async (e) =>{
        e.preventDefault();
        
        // console.log("ides " + ideCaker)
        
        
     
        if (!qtdIngredient || !nameIngredient) {
          
            return;
        }

        const formData = new FormData();
        formData.append('nome_Ingrediente', nameIngredient);
        formData.append('nr_Qtd', qtdIngredient);
        formData.append('Id_Cake', ideCaker);
        // console.log(formData)
        await api.post("/crud/ingredientes",
            {
            'nome_Ingrediente': nameIngredient,
            'nr_Qtd': qtdIngredient,
            'Id_Cake':ideCaker
            }
            
        )
        setNameIngredient("");
        setQtdIngredient("")
        setIdeCaker("")
        getterLoadById(ideCaker)
        
    }


    useEffect(() => {
        getterLoad();
    }, []);
    // var globalResponseBody = imageShow.map(itens=>(itens));
    // console.log(globalResponseBody.id_Caker)
    return (
        <div className="card-display-show">
            {
                
          
                // revenueIngredients.map((ings)=>(
                   
                // console.log(ings.id_Cake == itens.id_Caker),
            //    document.getElementById(ings.id_Cake) == itens.id_Caker? 
            countShowNone >0?<div  className="display-register-ingredient">
                

                
                <p>Cadastro de ingrediente</p>
                <div>
                    <label htmlFor="name-input-ingredient-register">Nome do ingrediente:</label>
                    <input type="text" value={nameIngredient} onChange={(e)=> setNameIngredient(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">quantidade:</label>
                    <input type="text" id="qtd-ingredient" value={qtdIngredient} onChange={(e)=> setQtdIngredient(e.target.value)} />
                </div>
                <button  type="submit" className="new-ingredient-button" onClick={postIngredients} >+</button>
                <button  type="submit" className="new-ingredient-button" onClick={showFormIngredientCancel} >cancelar</button>
                {revenuesById.map((els) => (
                    <div key={els.id_Ingrediente}>
                    <p >{els.nome_Ingrediente}</p>
                    <p >{els.nr_Qtd}</p>
                    <hr />
                    </div>
                ))}
                </div>
                :""

                
           


            }
            
        {imageShow.filter((values) => values.nomeReceita.includes(inputRevenuesValue)).map((e,index) => (
                   
                   <div key={e.id_Caker} className="card-exists-image" style={{'--quantity':imageShow.length}} >
                

                    <div className="image-revenues-justify">
                       <img src={"data:image/png;base64," +e.imagemReceita} alt={`Receita ${e.id_Cake}`} className='picture-img' />
                    </div>
                    <div className="p-card-construction" style={{'--position':index}}>
                    <p >{e.nomeReceita}</p>
                    </div>
                    <div className="p-card-ingredients">
                    <button id="ingredientButton" onClick={()=> showFormIngredient(e.id_Caker)}>Ingredientes</button>
                    <button onClick={()=> showFormIngredient(e.id_Caker)}>Modo de Preparo</button>

                

                    
                    </div>
                    {revenueIngredients.map((ing)=>(
                       
                       e.id_Caker== ing.id_Cake?

                       <div id={ing.id_Cake} key={ing.id_Ingrediente}>
                       <p >{ing.nome_Ingrediente}</p>
                       <p >{e.descricao}</p>
                       </div>:""
       ))}              
                   </div>
               ))}
               

               </div>
    )


}