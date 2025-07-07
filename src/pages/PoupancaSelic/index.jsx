import './PoupancaSelic.css'

export default function PoupancaSelic(){
    
    return(
        <div className="controlePoupancaSelic">

            <h1>Simulador de Poupanca Selic</h1>

            <form className="formularioPoupancaSelic" >
                

                <div className="controleEntradasPoupancaSelic">

                    <label htmlFor="idValorInicial">Valor inicial (R$)</label>
                
                    <input 
                        type="number" 
                        id='idValorInicial' 
                        placeholder='2000,00'
                        
                    />

                </div>
                

                <div className="controleEntradasPoupancaSelic">
                    
                    <label htmlFor="idValorMensal">Valor mensal (R$)</label>
                    
                    <input 
                        type="number" 
                        id='idValorMensal' 
                        placeholder='10000,00'
                        
                    />
                </div>
                
                <div className="controleEntradasPoupancaSelic controleperiodoSelic">
                    
                    <label htmlFor="idPeriodo">Período</label>
                    
                    <input 
                        type="number" 
                        id='idPeriodo' 
                        placeholder='Ex: 12'
                        
                        
                    />
                    <select 
                        id="idPeriodo"
                        >
                        <option value="ano">Anos</option>
                        <option value="mes">Meses</option>
                    </select>
                </div>

                <div className="controleEntradasPoupancaSelic controleInfo">
                    <h4>Poupança: 7.17% a.a | Taxa Selic: 14.75% a.a</h4>
                </div>
                
                <div className="controleEntradasPoupancaSelic btnsSelic">
                    
                    <button type='submit'>Calcular</button>
                    
                    <button type='button'>Limpar</button>

                </div>
                

                <div className="campoResultadoPoupancaSelic">

                    <h3>Total acumulado na Poupança: R$<span>  </span>
                    </h3>


                    <h3>Total acumulado na Selic: R$<span> </span>  
                    </h3>

                    <h3>Diferença de rentabilidade: R$<span> </span> 
                    </h3>

                    
                    <div className="controleListaPoupancaSelic">
                        <table>

                            <thead>
                                <tr>
                                    <th>Mês</th>
                                    <th>Rentabilidade Poupança (R$)</th>
                                    <th>Rentabilidade Selic (R$)</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* {dadosTabela.map(dado =>(
                                    <tr key={dado.index}>
                                        <td>{dado.mes}</td>
                                        <td>{dado.juros}</td>
                                        <td>{dado.totalInvestido}</td>
                                        <td>{dado.totalJuros}</td>
                                        <td>{dado.total}</td>
                                    </tr>
                                ))} */}

                            </tbody>

                        </table>
                    </div>

                </div>

            </form>
        </div>
    )
}