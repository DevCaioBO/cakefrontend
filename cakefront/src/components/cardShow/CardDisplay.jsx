import { useState, useEffect, useRef } from "react";
import '../../css/Sun/CardDisplay.css'
import penEdit from '../../assets/img/penEdit.png'
import api from "../../services/api";
export default function CardDisplay({ inputRevenuesValue, countShowNone, setCountShowNone }) {
    const [imageShow, setImageShow] = useState([]);
    const [revenueIngredients, setRevenuesIngredients] = useState([]);
    const [revenuesById, setRevenuesById] = useState([])
    const [nameIngredient, setNameIngredient] = useState("")
    const [CountForm, setCountForm] = useState(0)
    const [qtdIngredient, setQtdIngredient] = useState("")
    const [ideCaker, setIdeCaker] = useState(0)
    const [selectedFile, setSelectedFile] = useState(null)
    const [prepareMode, setPrepareMode] = useState("");
    const [nameRevenue, setNameRevenue] = useState("");
    const [idIng, setIdeIng] = useState(0)
    const [qtdIngredientModify, setQtdIngredientModify] = useState("")
    const [nameIngredientModify, setNameIngredientModify] = useState("")

    // Encontrar a receita correspondente e configurar os valores iniciais
    useEffect(() => {
        const selectedRecipe = imageShow.find((recipe) => recipe.id_Caker === ideCaker);
        if (selectedRecipe) {
            setPrepareMode(selectedRecipe.descricao);
            setNameRevenue(selectedRecipe.nomeReceita);
        }
    }, [imageShow, ideCaker]);
    useEffect(() => {
        const selectedRecipe = revenuesById.find((recipe) => recipe.id_Ingrediente === idIng);

        if (selectedRecipe) {
            setQtdIngredientModify(selectedRecipe.nr_Qtd);
            setNameIngredientModify(selectedRecipe.nome_Ingrediente);
        }
    }, [revenuesById, idIng]);

    // const [countShowNone,setCountShowNone] = useState(0)

    const showFormIngredient = (ide) => {
        setIdeCaker(ide)
        getterLoadById(ide)

        // const ingredientButton =  document.querySelector("#ingredientButton")
        // // console.log(ingredientButton)



        setCountShowNone(4)

    }
    const showFormPrepareMode = (ides) => {
        setIdeCaker(ides)
        setCountShowNone(2)
    }
    const showFormModify = (ides) => {
        setIdeCaker(ides)
        setCountShowNone(3)


    }
    const showCadIng = () => {
        setCountShowNone(1)
    }
    const showFormedit = () => {
        // setIdeCaker(ides)
        setCountForm(4)
    }

    const showFormIngredientCancel = () => {
        setCountShowNone(0)


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

        const getterRevenuesIngredients = await api.get("/crud/getCake/" + id);
        setRevenuesIngredients(getterRevenuesIngredients.data);

    };
    const deleteCake = async (ide) => {
        await api.delete("/crud/deleteCake/" + ide)
        getterLoad();
        setCountShowNone(0)
    }
    const deleteCakeIng = async (ide) => {
        await api.delete("/crud/ingredientes/" + ide)

        getterLoadById(ideCaker)
        setCountShowNone(6)
        showFormIngredient(ideCaker)

        // getterLoadById(ideCaker)
    }

    const postIngredients = async (e) => {
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
                'Id_Cake': ideCaker
            }

        )
        setNameIngredient("");
        setQtdIngredient("")

        getterLoadById(ideCaker)
        setCountShowNone(6)
        showFormIngredient(ideCaker)

    }





    const handleChangeImage = (event) => {
        setSelectedFile(event.target.files[0])

        const file = event.target.files[0];
        console.log(file)
        if (file) {

            // const elImg = createElement("img")
            const displayImageView = document.querySelector("#file-target-choose-change")
            const reader = new FileReader();

            reader.addEventListener('load', function (e) {
                const readerGetter = e.target

                const img = document.createElement('img')
                img.src = readerGetter.result


                img.classList.add("picture-image-style")
                displayImageView.innerHTML = ""
                displayImageView.appendChild(img);



            })
            reader.readAsDataURL(file)

        }

    };


    const handleUpload = async (event) => {

        event.preventDefault();



        const formData = new FormData();
        if (selectedFile) {
            formData.append('imagemReceita', selectedFile);
        }
        // if(selectedFile && nameRevenue && !prepareMode){
        // formData.append('imagemReceita', selectedFile);
        // formData.append('nomeReceita', nameRevenue);
        // // formData.append('descricao', prepareMode);
        // }
        // else if(selectedFile && !nameRevenue && prepareMode){
        //     formData.append('imagemReceita', selectedFile);
        //     formData.append('descricao', prepareMode);
        // }
        // else if(selectedFile && nameRevenue && prepareMode){
        //     formData.append('imagemReceita', selectedFile);
        //     formData.append('nomeReceita', nameRevenue);
        //     formData.append('descricao', prepareMode);
        // }
        // else if(!selectedFile && nameRevenue && prepareMode){
        //     formData.append('nomeReceita', nameRevenue);
        //     formData.append('descricao', prepareMode);
        // }else if(!selectedFile && !nameRevenue && prepareMode){

        //     formData.append('descricao', prepareMode);
        // }
        // else if(!selectedFile && nameRevenue && !prepareMode){
        //     formData.append('nomeReceita', nameRevenue);
        //     formData.append('descricao', prepareMode);
        // }
        // else if(selectedFile && !nameRevenue && !prepareMode){
        //     formData.append('imagemReceita', selectedFile);
        // }

        formData.append('nomeReceita', nameRevenue);
        formData.append('descricao', prepareMode);
        try {
            if (selectedFile) {
                const response = await api.put('/crud/putCake/' + ideCaker, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },

                });
                console.log('File uploaded successfully:', response.data);
            } else {
                const response = await api.put('/crud/putCake/' + ideCaker, formData);
                console.log('File uploaded successfully:', response.data);
            }

            // Recarrega as imagens após o upload
            location.reload()
            // Limpa os campos após o upload
            setSelectedFile(null);
            setName('');
            setDescription('');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    const showEditModeIngredient = (idIng) => {

        setCountShowNone(5)


        setIdeIng(idIng)

    }
    const showDeleteModeIngredient = (idIng) => {
        setCountShowNone(6)
        setIdeIng(idIng)
    }
    const hideEditModeIngredientAndSend = async (e) => {
        e.preventDefault();
        await api.put("/crud/ingredientes/" + idIng,
            {
                'nome_Ingrediente': nameIngredientModify,
                'nr_Qtd': qtdIngredientModify,
                'Id_Cake': ideCaker
            }

        )
        setNameIngredient("");
        setQtdIngredient("")
        setIdeCaker(ideCaker)
        // getterRevenuesById(ideCaker);
        setCountShowNone(4);
        getterLoadById(ideCaker)

    }
    const showDeleteRevenue = (ide) => {
        setCountShowNone(7)
        setIdeCaker(ide)
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
                countShowNone == 1 ? <div className="display-register-ingredient">
                    <div className="row-card-aligment-ingredient">
                        <h3>Cadastro de ingrediente </h3>
                        <button type="submit" className="closeButton" onClick={showFormIngredientCancel} >X</button>
                    </div>
                    <div className="register-ingredient-p">
                        {imageShow.map((jsons) => (
                            ideCaker == jsons.id_Caker ?
                                <p key={ideCaker} >{jsons.nomeReceita}</p> : ""

                        ))}
                    </div>
                    <div className="inputs-register-ingredient">
                        <div>
                            <label htmlFor="name-input-ingredient-register">Nome do ingrediente:</label>
                            <input type="text" value={nameIngredient} onChange={(e) => setNameIngredient(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="">quantidade:</label>
                            <input type="text" id="qtd-ingredient" value={qtdIngredient} onChange={(e) => setQtdIngredient(e.target.value)} />
                        </div>
                    </div>

                    <button type="submit" className="new-ingredient-button" onClick={postIngredients} >+</button>


                </div>
                    : countShowNone == 2 ? imageShow.map((itensDesc) => (
                        itensDesc.id_Caker == ideCaker ?
                            <div key={itensDesc.id_Caker} className="display-register-ingredient">
                                <div className="row-card-aligment-ingredient">
                                    <h2>Modo de Preparo:</h2>
                                    <button type="button" className="closeButton" onClick={showFormIngredientCancel} >X</button>
                                </div>
                                <div className="register-ingredient-p">
                                    <h3>{itensDesc.nomeReceita}</h3>
                                </div>
                                <div className="register-ingredient-p-prepare-mode">
                                    <p>{itensDesc.descricao}</p>
                                </div>


                            </div> : ""
                    )) : countShowNone == 3 ? <form className="card-change-credentials" onSubmit={handleUpload}>
                        <div className="row-card-aligment-ingredient">
                            <h3>Modificar Receita</h3>

                            <button type="submit" className="closeButton" onClick={showFormIngredientCancel} >X</button>
                        </div>
                        {imageShow.map((objects) => (
                            objects.id_Caker == ideCaker ?
                                <div className="alignment-body-update-credentials" key={objects.id_Caker}>
                                    <p className="titleChanging">{objects.nomeReceita}</p>
                                    <div className="capsule-inputs-correctly">
                                        <label htmlFor="change-prepare-mode">Modo de Preparo:</label>
                                        <textarea name="" id="change-prepare-mode" value={prepareMode} onChange={(e) => setPrepareMode(e.target.value)}></textarea>
                                    </div>
                                    <div className="capsule-inputs-correctly">
                                        <label htmlFor="name-revenue-change">Nome:</label>
                                        <input type="text" id="name-revenue-change" value={nameRevenue} onChange={(e) => setNameRevenue(e.target.value)} placeholder="Digite o titulo da receita" />

                                    </div>
                                    <div>
                                        <label htmlFor="input-change-image">
                                            <span id="file-target-choose-change"><img src={"data:image/png;base64," + objects.imagemReceita} alt="" /></span>
                                        </label>

                                    </div>
                                    <input type="file" accept="image/*" onChange={handleChangeImage} id="input-change-image" />
                                </div> : ""

                        ))}



                        {/* Input de files */}


                        <button type="submit" className="submit-form-modify-ingredient">Modificar</button>

                    </form> : countShowNone == 4 ? <div className="overflow-y">
                    <div className="button-modal-register-ingredient">
                                    <div  className="buttons-register-close">
                                        <button onClick={showCadIng}>Tela Cadastro</button>
                                        <button type="button" className="closeButton" onClick={showFormIngredientCancel}>X</button>
                                    </div>
                                    <div className="p-column-name-revenue-ingrediente">
                                        {imageShow.map((itens) => (
                                            itens.id_Caker == ideCaker ?
                                                <div key={itens.id_Caker}>
                                                    <p>{itens.nomeReceita}</p>
                                                </div> : ""
                                        ))}
                                    </div>
                                </div>
                        <div >

                            {revenuesById.map((els) => (

                                <div key={els.id_Ingrediente} className="table-design-generated">
                                    <div className="tableConstruct">
                                        <div className="alignment-center-controller-ingredient">
                                            <div className="row-ingredient-weight">
                                                <p >{els.nr_Qtd}</p>
                                                <p >{els.nome_Ingrediente}</p>
                                            </div>
                                            <div className="button-row-alignment-ingredient">
                                                <button onClick={() => showEditModeIngredient(els.id_Ingrediente)}><img src={penEdit} alt="" /></button>
                                                <button onClick={() => showDeleteModeIngredient(els.id_Ingrediente)}>X</button>
                                            </div>

                                        </div>





                                    </div>

                                </div>


                            ))}
                        </div></div> : countShowNone == 5 ? <div className="overflow-y">
                        <div className="button-modal-register-ingredient">
                                    <div  className="buttons-register-close">
                                        <button onClick={showCadIng}>Tela Cadastro</button>
                                        <button type="button" className="closeButton" onClick={showFormIngredientCancel}>X</button>
                                    </div>
                                    <div className="p-column-name-revenue-ingrediente">
                                        {imageShow.map((itens) => (
                                            itens.id_Caker == ideCaker ?
                                                <div key={itens.id_Caker}>
                                                    <p>{itens.nomeReceita}</p>
                                                </div> : ""
                                        ))}
                                    </div>
                                </div>
                            
                            <div >

                                {revenuesById.map((els) => (
                                    els.id_Ingrediente == idIng ?
                                        <form onSubmit={hideEditModeIngredientAndSend} key={els.id_Ingrediente} className="table-design-generated">
                                            <div className="tableConstruct">
                                                <div className="alignment-center-controller-ingredient">
                                                    <div className="row-ingredient-weight editingIngrediente">
                                                        <div>
                                                            <label htmlFor={els.id_Ingrediente + "qtd"}>Quantidade:</label>
                                                            <input type="text" id={els.id_Ingrediente + "qtd"} value={qtdIngredientModify} onChange={(e) => setQtdIngredientModify(e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <label htmlFor={els.id_Ingrediente + "nome"}>Nome:</label>
                                                            <input type="text" id={els.id_Ingrediente + "nome"} value={nameIngredientModify} onChange={(e) => setNameIngredientModify(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="button-row-alignment-ingredient">
                                                        <button type="submit" >MANDAR</button>
                                                        <button type="button" onClick={showEditModeIngredient}>
                                                            Cancelar
                                                        </button>
                                                    </div>

                                                </div>





                                            </div>

                                        </form> : <div key={els.id_Ingrediente} className="table-design-generated">
                                            <div className="tableConstruct">
                                                <div className="alignment-center-controller-ingredient">
                                                    <div className="row-ingredient-weight">
                                                        <p >{els.nr_Qtd}</p>
                                                        <p >{els.nome_Ingrediente}</p>
                                                    </div>
                                                    <div className="button-row-alignment-ingredient">
                                                        <button type='button' onClick={() => showEditModeIngredient(els.id_Ingrediente)}><img src={penEdit} alt="" /></button>
                                                        <button onClick={() => showDeleteModeIngredient(els.id_Ingrediente)}>X</button>
                                                    </div>

                                                </div>





                                            </div>

                                        </div>



                                ))}
                            </div> </div> : countShowNone == 6 ? <div className="overflow-y">

                            <div className="button-modal-register-ingredient">
                                    <div  className="buttons-register-close">
                                        <button onClick={showCadIng}>Tela Cadastro</button>
                                        <button type="button" className="closeButton" onClick={showFormIngredientCancel}>X</button>
                                    </div>
                                    <div className="p-column-name-revenue-ingrediente">
                                        {imageShow.map((itens) => (
                                            itens.id_Caker == ideCaker ?
                                                <div key={itens.id_Caker}>
                                                    <p>{itens.nomeReceita}</p>
                                                </div> : ""
                                        ))}
                                    </div>
                                </div>

                                <div >

                                    {revenuesById.map((els) => (
                                        els.id_Ingrediente == idIng ?

                                            <div key={els.id_Ingrediente} className="table-design-generated">
                                                <div className="tableConstruct">
                                                    <div className="alignment-center-controller-ingredient">
                                                        <div className="row-ingredient-weight">
                                                            <p >{els.nr_Qtd}</p>
                                                            <p >{els.nome_Ingrediente}</p>
                                                        </div>
                                                        <div className="button-row-alignment-ingredient">
                                                            <button onClick={()=>showFormIngredient(els.id_Cake) }>Cancelar</button>
                                                            <button type="button" onClick={() => deleteCakeIng(els.id_Ingrediente)}>Deletar?</button>
                                                        </div>

                                                    </div>





                                                </div>


                                            </div> : ""


                                    ))}
                                </div></div> : countShowNone == 7 ? <div className="display-delete-revenue">
                                    {imageShow.map((titles) => (
                                        titles.id_Caker == ideCaker ?
                                            <div key={titles.id_Caker} className="dele-revenue-controller-question">

                                                <h3>Deletar Receita? <br></br> - {titles.nomeReceita} </h3>
                                                <div className="del-cancel-choose-buttons">
                                                    <button className="closeButton" onClick={() => deleteCake(titles.id_Caker)}>Excluir</button>
                                                    <button type="button" className="closeButton" onClick={showFormIngredientCancel} >Cancelar</button>
                                                </div>

                                            </div> : ""
                                    ))}



                                </div> : ""




            }


            {imageShow.filter((values) => values.nomeReceita.includes(inputRevenuesValue)).map((e, index) => (
                <div key={e.id_Caker} className="card-exists-imager">
                    <div key={e.id_Caker} className="card-exists-image" style={{ '--quantity': imageShow.length }} >
                        <div className="image-revenues-justify">
                            <img src={"data:image/png;base64," + e.imagemReceita} alt={`Receita ${e.id_Cake}`} className='picture-img' />
                        </div>

                        <div className="p-card-construction" style={{ '--position': index }}>
                            <p >{e.nomeReceita}</p>
                        </div>
                        <div className="p-card-ingredients">
                            <button id="ingredientButton" onClick={() => showFormIngredient(e.id_Caker)}>Ingredientes</button>
                            <button onClick={() => showFormPrepareMode(e.id_Caker)}>Modo de Preparo</button>
                        </div>

                    </div>
                    <div className="painel-crud">
                        <button className="closeButton" onClick={() => showDeleteRevenue(e.id_Caker)}>X</button>
                        <button className="editButton" onClick={() => showFormModify(e.id_Caker)}>Editar</button>
                    </div>

                </div>
            ))}



        </div>
    )


}