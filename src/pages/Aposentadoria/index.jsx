
import './Aposentadoria.css'
// import Swal from 'sweetalert2'


export default function Aposentadoria(){

    

    return(
        <div className="controleAposentadoria">
            
            <h1>Simulador de Aposentadoria</h1>

            <form className="formulario" >
                
                <div className="controleInputs">

                </div>
                <div className="controleEntradas">

                    <label htmlFor="idSalario">Quanto você ganha por mês? (R$)</label>
                
                    <input 
                        type="number" 
                        id='idSalario' 
                        placeholder='5000,00'
                    />
                </div>
                

                <div className="controleEntradas">
                    
                    <label htmlFor="idInvestido">Quanto você já tem investido? (R$)</label>
                    
                    <input 
                        type="number" 
                        id='idInvestido' 
                        placeholder='10000,00'
                    />
                </div>
                

                <div className="controleEntradas">
                    
                    <label htmlFor="idPatrimonio">Com quanto de patrimônio(R$) você deseja se aposentar?</label>
                    
                    <input 
                        type="number" 
                        id='idPatrimonio'
                        placeholder='1 000 000,00' 
                    />
                </div>
                
                <div className="controleEntradas">
                    
                    <label htmlFor="idRendaInvestida">Quantos % de sua renda você investe?</label>
                    
                    <input 
                        type="number" 
                        id='idRendaInvestida' 
                        placeholder='10'
                    />
                </div>

                <div className="controleEntradas">
                    
                    <label htmlFor="idIdadeAtual">Qual sua idade atual?</label>
                    
                    <input 
                        type="number" 
                        id='idIdadeAtual' 
                        placeholder='32' 
                    />
                </div>
                
                <div className="controleEntradas">
                    
                    <label htmlFor="idIdadeAposentadoria">Com quantos anos você deseja se aposentar?</label>
                    
                    <input 
                        type="number" 
                        id='idIdadeAposentadoria' 
                        placeholder='65'
                    />
                </div>

                <div className="controleEntradas">
                    
                    <label htmlFor="idRentabilidade">Sua rentabilidade total anual projetada:</label>
                    
                    <input 
                        type="number" 
                        id='idRentabilidade'
                        placeholder='10' 
                    />
                </div>

                <div className="controleEntradas">
                    
                    <label htmlFor="idGastoPorMes">Quanto você pretende gastar por mês aposentado?</label>
                    
                    <input 
                        type="number" 
                        id='idGastoPorMes' 
                        placeholder='9000,00'
                    />
                </div>
                
                <div className="controleEntradas btns">
                    
                    <button type='submit'>Calcular</button>
                    
                    <button type='submit'>Limpar</button>

                </div>
                

                <div className="campoResultado">
                    <h3>Valor em posse ao se aposentar: <span>100.000,00</span></h3>
                    <h3>Herança estimada: <span>500.000,00</span></h3>
                    <h3>Gasto aceito por mês: <span>5.000,00</span></h3>
                    <h3>Meta ultrapassada em: <span>215.300,00</span> Parabéns!</h3>
                </div>

            </form>


        </div>
    )
}