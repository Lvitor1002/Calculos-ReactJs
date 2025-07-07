

import './ReservaEmergencia.css'

export default function ReservaEmergencia(){
    return(
        <div className="controleReserva">
            
            <h1>Simulador de Reserva de Emergência</h1>

            <form className="formularioReserva" >


                <div className="controleEntradasReserva">

                    <label htmlFor="idSelect">Tipo de Emprego</label>

                    <select 
                            id='idSelect'
                        >
                            <option defaultValue>Selecione o tipo de emprego</option>    
                            <option value="FP">Funcionário Público</option>    
                            <option value="CLT">CLT</option>    
                            <option value="PJ">PJ</option>    
                    </select>

                </div>

                <div className="controleEntradasReserva">

                    <label htmlFor="idCusto">Custo Fixo (R$)</label>
                
                    <input 
                        type="number" 
                        id='idCusto' 
                        placeholder='1000,00'

                        
                    />
                </div>
                

                <div className="controleEntradasReserva">
                    
                    <label htmlFor="idSalario">Salário Mensal (R$)</label>
                    
                    <input 
                        type="number" 
                        id='idSalario' 
                        placeholder='5000,00'
                        
                    />
                </div>
                

                <div className="controleEntradasReserva">
                    
                    <label htmlFor="idTaxaJuros">Quantos (%) do salário é investido por mês? </label>
                    
                    <input 
                        type="number" 
                        id='idTaxaJuros' 
                        placeholder='5'
                        
                    />
                </div>

                <div className="controle-btn-limpar btns">
                    
                    <button type='submit'>Calcular</button>
                    
                    <button type='button' >Limpar</button>

                </div>

                <div className="campoResultadoReserva">


                    <h3>Reserva de Emergência: <span> </span></h3> 

                    <h3>Meses para completar sua reserva: (dias)<br/>Guardando (%) do seu salário.</h3>

                </div>

            </form>
        </div>
    )
}