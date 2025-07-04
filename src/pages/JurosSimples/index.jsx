
import './JurosSimples.css'

export default function JurosSimples(){

    return(
        <div className="controleJurosSimples">

            <h1>Simulador de Juros Simples</h1>

            <form className="formularioJurosSimples">
                
                <div className="controleInputsJurosSimples">

                </div>
                <div className="controleEntradasJurosSimples">

                    <label htmlFor="idValorInicial">Valor inicial (R$)</label>
                
                    <input 
                        type="number" 
                        id='idValorInicial' 
                        placeholder='8000,00'
                        />

                </div>
                

                <div className="controleEntradasJurosSimples">
                    
                    <label htmlFor="idTaxaMensal">Taxa de juros (%) 
                    </label>
                    
                    <input 
                        type="number" 
                        id='idTaxaMensal'
                        placeholder='Ex: 20'
                    />
                    <select 
                        id="idTaxaMensal"
                        >
                        <option value="ano">Anual</option>
                        <option value="mes">Mensal</option>
                    </select>
                </div>
                
                <div className="controleEntradasJurosSimples controleperiodoSimples">
                    
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

                
                
                <div className="controleEntradasJurosSimples btnsSimples">
                    
                    <button type='submit'>Calcular</button>
                    
                    <button type='button'>Limpar</button>

                </div>
                

                <div className="campoResultadoJurosSimples">

                    <h3>Valor total final: R$<span> </span>
                    </h3>


                    <h3>Valor Inicial: R$<span> </span>  
                    </h3>

                    <h3>Total em juros: R$<span> </span> 
                    </h3>

                    
                    <div className="controleListaJurosSimples">
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
                                {/* {dadosTabela.map(dado =>(
                                    <tr key={dado.tempo}>
                                        <td>{dado.mes}</td>
                                        <td>{dado.juros}</td>
                                        <td>{dado.totalInvestido}</td>
                                        <td>{dado.totalJuros}</td>
                                        <td>{dado.totalAcumulado}</td>
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