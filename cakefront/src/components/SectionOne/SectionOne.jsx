import { createElement, useEffect, useRef, useState } from 'react';
import '../../css/Sun/SectionOne.css';
import '../../css/Moon/SectionOneMoon.css';
import api from '../../services/api';
import Moon  from '../../assets/img/switch.png'
import  Sun from '../../assets/img/togglemode.png'

export default function SectionOne({countShowNone,setCountShowNone,SunIcon}) {
 
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState('');
    const [imageShow, setImageShow] = useState([]);
    const buttonSubmitForm = useRef(null);
    const [isDisabled,setIsDisabled] = useState(false);


    const [description, setDescription] = useState('');
    const showRegisterIngredient = () =>{
        if(countShowNone ==0){
        setCountShowNone(1)
        }else{
            setCountShowNone(0)  
        }
    }
    

    const getterLoad = async () => {
        const getterRevenues = await api.get("/crud/getCake");
        setImageShow(getterRevenues.data);
    };
   





    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
        const file = event.target.files[0];
        
        if(file){
            
        // const elImg = createElement("img")
        const displayImageView = document.querySelector("#file-target-choose")
        const reader = new FileReader();

        reader.addEventListener('load',function(e){
            const readerGetter = e.target
     
            const img = document.createElement('img')
            img.src = readerGetter.result
          
            img.classList.add("picture-image-style")
            displayImageView.innerHTML=""
            displayImageView.appendChild(img);
            

        
        })
        reader.readAsDataURL(file)
        
    }

    };

    const handleUpload = async (event) => {
         setIsDisabled(true);
         
         console.log("desabilitei aqui 68:js")
         debugger;
        event.preventDefault(); 
        
        console.log(description);
        console.log(name);
        console.log(selectedFile)
        if (!selectedFile || !name || !description ) {
            console.error('não colocou nada nos forms');
            setIsDisabled(false);
            console.log("habilitei aqui 76:js")
            debugger;
            return;
        }else if(description.length <20 ||description.length >1200 ||   name.length >45){
            console.error('TA ACHANDO QUE ESSE CAMPO É GIGANTE?' + description.length);
            setIsDisabled(false);
            console.log("habilitei aqui 81:js")
            debugger;
            return;
        }

        const formData = new FormData();
        formData.append('imagemReceita', selectedFile);
        formData.append('nomeReceita', name);
        formData.append('descricao', description);
        

        try {
            const response = await api.post('/crud/postCake', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                
            });
            console.log('File uploaded successfully:', response.data);
            // Recarrega as imagens após o upload
            location.reload()
            // Limpa os campos após o upload
            setSelectedFile(null);
            setName('');
            setDescription('');
            setIsDisabled(false);
            console.log("habilitei aqui 106:js")
            debugger;
           
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <form className={SunIcon==Sun?"form-sun-mode-body":"form-moon-mode-body"} onSubmit={handleUpload}>
            <div className='column-row-sectionone-one'>
                <h2>CADASTRE SUA RECEITA</h2>
            </div>
            <div className='row-forms-styles'>
                <div className='column-register-revenues'>
                <label htmlFor='prepare-mode-input'>Modo de preparo:</label>
                <textarea type="text" id='prepare-mode-input'  value={description} onChange={(e) => setDescription(e.target.value) } />
                    <label htmlFor='prepare-mode-input-name'>Nome:</label>
                    
                    <input type="text" id='prepare-mode-input-name' value={name} onChange={(e) => setName(e.target.value)} />
                    
                </div>
                <label className='files' htmlFor='input-file-multipart' tabIndex={0}>
                    <span className='image-file-choose' id='file-target-choose'></span>

                </label>
                <input
                    type="file"
                    accept="image/*"
                    id='input-file-multipart'
                  
                    onChange={handleFileChange}
                />
                {name !="" && description!="" && selectedFile !=null?
                            <div className='buttons-register-revenues'>
                <button type="submit" className='register-revenue-button' ref={buttonSubmitForm} disabled={isDisabled}>Cadastrar receita</button>
            </div>:""
             }
            </div>


        </form>
        
    );
}