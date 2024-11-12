import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios';
export default function Skeleton() {
    const arrayIngredientes = []
    const [listaResponseBody, setListaResponseBody] = useState([])
    // const [ingredientes, setIngredientes] = useState([])
    const desc = useRef()
    const [nomeReceita, setNomeReceita] = useState('');
    const [listaIngredientes,SetListaIngredientes] = useState([])
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState(null);

    const handleFileChange = (event) => {
        setImagem(event.target.files[0]);
    };

    const loadGetRevenues = async () => {
        const response = await api.get('crud/getCake');
        
        setListaResponseBody(response.data)
      
       
        



    }
    const loadGetIng = async (ide) => {
      
        const ingResponse = await api.get("crud/Ingredientes/" +ide)
 
        SetListaIngredientes(ingResponse.data)
       
        



    }


    useEffect(() => {
        loadGetRevenues();
    }, [])

//    const handleIngredientGet = ((ide)=>{
//         console.log("meu id é =" + ide)
//     })

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (nomeReceita.length < 35) {
            const formData = new FormData();
            formData.append('nomeReceita', nomeReceita);
            formData.append('descricao', descricao);
            formData.append('imagemReceita', imagem);


            const response = await api.post('crud/postCake', formData);
            setListaResponseBody(response.data)
            console.log('Receita criada:', listaResponseBody);
            location.reload()
        } else {
            const formData = new FormData();
            formData.append('nomeReceita', "nome grande demais");
            formData.append('descricao', descricao);
            formData.append('imagemReceita', imagem);


            const response = await api.post('crud/postCake', formData);
            setListaResponseBody(response.data)
            console.log('Receita criada:', listaResponseBody);
            location.reload()
        }

    };

    const handleDeleteTask = async (id_Cake) => {

        await api.delete('crud/deleteCake/' + id_Cake)
        loadGetRevenues();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome da Receita"
                    value={nomeReceita}
                    onChange={(e) => setNomeReceita(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Ingredientes"
                    value={descricao}
                    ref={desc}
                    onChange={(e) => setDescricao(e.target.value)}
                />

                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit">Enviar Receita</button>
            </form>
            {/* <button onClick={handleIncrementer}>ADD</button> */}
            <div className='justifySpawn'>
                {
                    listaResponseBody.map((item) => (
                        <div id={item.id_Cake}  key={item.id_Cake}>
                            <div id='bodyImages' key={item.id_Cake} onDoubleClick={() => handleDeleteTask(item.id_Cake)}>
                                <p className='p_teste'>{item.nomeReceita}</p>

                                <img src={'data:image/jpeg;base64,' + item.imagemReceita} alt="" />
                                <p>{item.descricao}</p>
                                <button className='buttonSaibaMais' onClick={()=>loadGetIng(item.id_Cake)}>Modo de Preparo</button>

                            </div>
                            
                      

                        </div>
                    ))


                }
                <div id='grouperShow'>
                {
                      listaIngredientes.map((itens)=>(
                        console.log(itens),
                            <div key={itens.id_Ingrediente}>
                                <p>{itens.nomeIngrediente}</p>
                            </div>
                            ))
                        }
                </div>
            </div>
        </div>
    );


    // fetch('http://localhost:8080/crud/getCake')
    //     .then( async function(response){
    //         console.log(response)
    //         await response.json();
    //     })
    //     .then(function(data){
    //         console.log(data)
    //     })



}