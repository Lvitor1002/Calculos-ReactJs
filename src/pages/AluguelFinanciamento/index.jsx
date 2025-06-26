import './AluguelFinanciamento.css'
export default function AluguelFinanciamento(){
    return(
        <div className="controleAluguelFinanciamento">
            
            <h1>Simule o aluguel ou financiamento de um imóvel: </h1>

            <form className="formulario">
                

                <div className="controleEntradas">

                    <label htmlFor="idValorImovel">Valor do imóvel(R$)</label>
                
                    <input 
                        type="number" 
                        id='idValorImovel' 
                        placeholder='500.000,00'
                        />
                </div>
                

                <div className="controleEntradas">
                    
                    <label htmlFor="idValorAlugel">Valor do aluguel(R$)</label>
                    
                    <input 
                        type="number" 
                        id='idValorAlugel' 
                        placeholder='2.000,00'
                        />
                </div>
                

                <div className="controleEntradas">
                    
                    <label htmlFor="idValorizacaoAnual">Valorização anual (%)</label>
                    
                    <input 
                        type="number" 
                        id='idValorizacaoAnual' 
                        placeholder='4,00'
                        
                        />
                        
                </div>
                

                <div className="controleEntradas">
                    
                    <label htmlFor="idIGPMAnual">IGPM anual (%)</label>
                    
                    <input 
                        type="number" 
                        id='idIGPMAnual' 
                        placeholder='7,65'
                        />
                </div>
                

                <div className="controleEntradas">
                    
                    <label htmlFor="idEntrada">Entrada (R$)</label>
                    
                    <input 
                        type="number" 
                        id='idEntrada' 
                        placeholder='100.000,00'
                        />
                </div>
                
                <div className="controleEntradas">
                    
                    <label htmlFor="idCustosFinanciamento">Custos do financiamento (R$)</label>
                    
                    <input 
                        type="number" 
                        id='idCustosFinanciamento' 
                        placeholder='15.000,00'
                        />
                </div>
                
                <div className="controleEntradas">
                    
                    <label htmlFor="idPrazo">Prazo (meses)</label>
                    
                    <input 
                        type="number" 
                        id='idPrazo' 
                        placeholder='12'
                        />
                </div>
                
                <div className="controleEntradas">
                    
                    <label htmlFor="idTaxaAnual">Taxa anual (%)</label>
                    
                    <input 
                        type="number" 
                        id='idTaxaAnual' 
                        placeholder='7,00'
                        />
                </div>
                
                <div className="controleEntradas">
                    
                    <label htmlFor="idRentabilidadeAnual">Rentabilidade anual (%)</label>
                    
                    <input 
                        type="number" 
                        id='idRentabilidadeAnual' 
                        placeholder='10,00'
                        />
                </div>

                <div className="controle-btn-limpar">
                    
                    <button type='submit'>Calcular</button>
                    <p>Limpar</p>

                </div>

                <div className="campoResultado">
                    <h2>resultado aqui</h2>
                </div>

            </form>
        </div>
    )
}