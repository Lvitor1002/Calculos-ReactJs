
import { useState } from 'react'
import './JurosComposto.css'
export default function JurosComposto(){

    const [valoresInputs, setValoresInputs] = useState({
        inputValorInicial:'',
        inputValorMensal:'',
        inputTaxaJuros:'',
        inputPeriodo:'',
    })

    const [tipoTaxa, setTipoTaxa] = useState('ano') 
    const [tipoTempo,setTipoTempo] = useState('ano')
    const [valorTotalFinal,setValorTotalFinal] = useState('')
    // const [totalInvestido,setTotalInvestido] = useState('')
    // const [totalJuros,setTotalJuros] = useState('')

    function processarCalculo(e){

        e.preventDefault()

        const valorInicial= parseFloat(valoresInputs.inputValorInicial.replace(",",".")) || 0
        const valorMensal=parseFloat(valoresInputs.inputValorMensal.replace(",",".")) || 0
        let taxaJuros=parseFloat(valoresInputs.inputTaxaJuros.replace(",",".")) / 100
        let periodo=parseFloat(valoresInputs.inputPeriodo.replace(",",".")) || 0

        // Converter período para meses se necessário
        if(tipoTempo === 'ano'){
            periodo = periodo * 12
        }

        // Converter taxa para mensal se necessário
        if(tipoTaxa === 'ano'){
            taxaJuros = taxaJuros / 12
        }

        const montante = calcularMontante(valorInicial, valorMensal, taxaJuros, periodo)

        setValorTotalFinal(montante)

    }


    // Valor total final
    function calcularMontante(valorInicial, valorMensal, taxaJuros, meses){

        let montante = valorInicial

        for(let i = 0; i < meses;i++){
            montante = montante * (1 + taxaJuros)

            montante += valorMensal
        }
        return montante.toFixed(2)

    }

    // Valor total investido R$28,90
    // function calcularTotalInvestido(){
        
    // }

    // Total em juros
    // function calcularTotalJuros(){
        
    // }

    function limparCampos() {

        setValoresInputs({
            inputValorInicial: '',
            inputValorMensal: '',
            inputTaxaJuros: '',
            inputPeriodo: '',
        })
        setValorTotalFinal(0)
    }

    return(
        <div className="controleJuros">

            <h1>Simulador de Juros Compostos</h1>

            <form className="formularioJuros" onClick={processarCalculo}>
                
                <div className="controleInputsJuros">

                </div>
                <div className="controleEntradasJuros">

                    <label htmlFor="idValorInicial">Valor inicial (R$)</label>
                
                    <input 
                        type="number" 
                        id='idValorInicial' 
                        placeholder='5000,00'
                        value={valoresInputs.inputValorInicial}
                        onChange={(e=>setValoresInputs(prev => ({
                            ...prev,
                            inputValorInicial: e.target.value
                        })))}
                    />

                </div>
                

                <div className="controleEntradasJuros">
                    
                    <label htmlFor="idValorMensal">Valor mensal (R$)</label>
                    
                    <input 
                        type="number" 
                        id='idValorMensal' 
                        placeholder='10000,00'
                        value={valoresInputs.inputValorMensal}
                        onChange={e=>setValoresInputs(prev => ({
                            ...prev,
                            inputValorMensal: e.target.value
                        }))}
                    />
                </div>
                

                <div className="controleEntradasJuros">
                    
                    <label htmlFor="idTaxaMensal">Taxa de juros (%) 
                    </label>
                    
                    <input 
                        type="number" 
                        id='idTaxaMensal'
                        placeholder='Ex: 1.5'
                        value={valoresInputs.inputTaxaJuros}
                        onChange={e=>setValoresInputs(prev=>({
                            ...prev,
                            inputTaxaJuros: e.target.value
                        }))}
                    />
                    <select 
                        id="idTaxaMensal"
                        value={tipoTaxa}
                        onChange={e=>setTipoTaxa(e.target.value)}
                        >
                        <option value="ano">Anual</option>
                        <option value="mes">Mensal</option>
                    </select>
                </div>
                
                <div className="controleEntradasJuros">
                    
                    <label htmlFor="idPeriodo">Período</label>
                    
                    <input 
                        type="number" 
                        id='idPeriodo' 
                        placeholder='Ex: 12'
                        value={valoresInputs.inputPeriodo}
                        onChange={e=>setValoresInputs(prev=>({
                            ...prev,
                            inputPeriodo: e.target.value
                        }))}
                        
                    />
                    <select 
                        id="idPeriodo"
                        value={tipoTempo}
                        onChange={(e)=>setTipoTempo(e.target.value)}
                        >
                        <option value="ano">Anos</option>
                        <option value="mes">Mensal</option>
                    </select>
                </div>

                
                
                <div className="controleEntradasJuros btns">
                    
                    <button type='submit'>Calcular</button>
                    
                    <button type='button' onClick={limparCampos}>Limpar</button>

                </div>
                

                <div className="campoResultadoJuros">

                    <h3>Valor total final: R$<span> {valorTotalFinal}</span>
                    </h3>


                    <h3>Valor total investido: R$0,00  
                    </h3>

                    <h3>Total em juros: R$0,00  
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
