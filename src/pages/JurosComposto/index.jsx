
import './JurosComposto.css'
export default function JurosComposto(){
    return(
        <div className="controleJuros">

            <h1>Simulador de Juros Compostos</h1>

            <form className="formularioJuros" >
                
                <div className="controleInputsJuros">

                </div>
                <div className="controleEntradasJuros">

                    <label htmlFor="idSalario">Valor inicial (R$)</label>
                
                    <input 
                        type="number" 
                        id='idSalario' 
                        placeholder='5000,00'
                    />

                </div>
                

                <div className="controleEntradasJuros">
                    
                    <label htmlFor="idInvestido">Valor mensal (R$)</label>
                    
                    <input 
                        type="number" 
                        id='idInvestido' 
                        placeholder='10000,00'
                        
                    />
                </div>
                

                <div className="controleEntradasJuros">
                    
                    <label htmlFor="idPatrimonio">Taxa de juros (%)</label>
                    
                    <input 
                        type="number" 
                        id='idPatrimonio'
                        placeholder='1 000 000,00'
                        
                    />
                </div>
                
                <div className="controleEntradasJuros">
                    
                    <label htmlFor="idRendaInvestida">Período</label>
                    
                    <input 
                        type="number" 
                        id='idRendaInvestida' 
                        placeholder='10'
                        
                    />
                </div>

                
                
                <div className="controleEntradasJuros btns">
                    
                    <button type='submit'>Calcular</button>
                    
                    <button type='button' >Limpar</button>

                </div>
                

                <div className="campoResultadoJuros">

                    <h3>Valor total final: R$5.290,89
                    </h3>

                    

                    <h3>Valor total investido R$28,90  
                    </h3>

                    <h3>Total em juros R$5.261,99  
                    </h3>

                    
                    <div className="controleListaJuros">
                        <table>

                            <thead>
                                <tr>
                                    <th>Mês</th>
                                    <th>Juros (R$)</th>
                                    <th>Total Investido (R$)</th>
                                    <th>Total Juros (R$)</th>
                                    <th>Total Acumulado (R$)</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* {parcelas.map((parcela)=>(

                                    <tr key={parcela.mes}>

                                        <td>{parcela.mes}</td>
                                        <td>{parcela.prestacao}</td>
                                        <td>{parcela.amortizacao}</td>
                                        <td>{parcela.juros}</td>
                                        <td>{parcela.saldoDevedor}</td>

                                    </tr>
                                ))} */}

                                <tr>
                                    <td>000</td>
                                    <td>000</td>
                                    <td>000</td>
                                    <td>000</td>
                                    <td>000</td>
                                </tr>
                                <tr>
                                    <td>000</td>
                                    <td>000</td>
                                    <td>000</td>
                                    <td>000</td>
                                    <td>000</td>
                                </tr>
                                <tr>
                                    <td>000</td>
                                    <td>000</td>
                                    <td>000</td>
                                    <td>000</td>
                                    <td>000</td>
                                </tr>
                                
                            </tbody>

                        </table>
                    </div>

                </div>

            </form>
        </div>
    )
}
