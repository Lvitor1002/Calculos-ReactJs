import './Financiamento.css'
export default function Financiamento(){
    return(
        <div className="controleFinanciamento">
            
            <h1>Simulador de financiamento</h1>

            <form className="formulario">
                

                <div className="controleEntradas">

                    <label htmlFor="idValor">Valor (R$)</label>
                
                    <input 
                        type="number" 
                        id='idValor' 
                        placeholder='200.000,00'
                        />
                </div>
                

                <div className="controleEntradas">
                    
                    <label htmlFor="idEntrada">Entrada (R$)</label>
                    
                    <input 
                        type="number" 
                        id='idEntrada' 
                        placeholder='50.000,00'
                        />
                </div>
                

                <div className="controleEntradas">
                    
                    <label htmlFor="idTaxaJuros">Taxa de Juros (%)</label>
                    
                    <input 
                        type="number" 
                        id='idTaxaJuros' 
                        placeholder='7,00'
                        />
                </div>
                
                
                <div className="controleEntradas">
                    
                    <label htmlFor="idPrazo">Prazo (anos)</label>
                    
                    <input 
                        type="number" 
                        id='idPrazo' 
                        placeholder='5'
                        />
                </div>
                
                

                <div className="controle-btn-limpar">
                    
                    <select>
                        <option selected value="">Formato Financimaneto</option>
                        <option value="sac">SAC</option>    
                        <option value="price">Price</option>    
                    </select>
                    
                    <button type='submit'>Calcular</button>

                    <p>Limpar</p>
                </div>

                <h2>Valor financiado: </h2> {/* [valor - entrada] */}

                <div className="campoResultado">
                    
                    <h3>Lista de Parcelas</h3>
                    
                    <div className="controleLista">
                        <table>

                            <thead>
                                <tr>
                                    <th>Mês</th>
                                    <th>Prestação (R$)</th>{/* [valor variavel considerando o juros] */}
                                    <th>Amortização (R$)</th>{/* [valor fixo] */}
                                    <th>Juros (R$)</th>{/* [valor fixo] */}
                                    <th>Saldo Devedor (R$)</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>R$ 10,45</td>
                                    <td>R$ 60,00</td>
                                    <td>2</td>
                                    <td>25</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>R$ 10,45</td>
                                    <td>R$ 60,00</td>
                                    <td>2</td>
                                    <td>25</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>R$ 10,45</td>
                                    <td>R$ 60,00</td>
                                    <td>2</td>
                                    <td>25</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>

                </div>

            </form>
        </div>
    )
}