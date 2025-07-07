import { useState } from 'react'
import './PoupancaSelic.css'
import Swal from 'sweetalert2'


export default function PoupancaSelic(){

    const [totalAcumuladoPoupanca,setTotalAcumuladoPoupanca] = useState(0)
    const [totalAcumuladoSelic,settotalAcumuladoSelic] = useState(0)
    const [tipoPeriodo, setTipoPeriodo] = useState("ano")
    const [valoresInputs, setValoresInputs] = useState({
        inputValorInicial:'',
        inputValorMensal:'',
        inputPeriodo:''
    })


    function processarCalculoPS(e){
        e.preventDefault()

        const valorInicial = parseFloat(valoresInputs.inputValorInicial.replace(",",".")) || 0
        const valorMensal = parseFloat(valoresInputs.inputValorMensal.replace(",",".")) || 0
        let periodo = parseInt(valoresInputs.inputPeriodo) || 0

        if(tipoPeriodo === 'ano'){
            if(periodo > 50){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Entrada para o período ultrapassou 50 anos.. Tente novamente.`,
                })
                return 
            }
            periodo = periodo * 12
        }
        else
        {
            if(periodo > 600){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Entrada para o período ultrapassou 600 meses.. Tente novamente.`,
                })
                return 
            }
        }

        const montante = calcularAcumuladoPoupanca(valorInicial,periodo,valorMensal)
        setTotalAcumuladoPoupanca(montante)
        
    }

    function calcularAcumuladoPoupanca(valorInicial,periodo,valorMensal){
        const taxaAnual = 7.17/100
        const taxaMensal = Math.pow(1+taxaAnual, 1/12) - 1

        // Calcula o montante do valor inicial
        const montanteInicial = valorInicial * Math.pow(1 + taxaMensal, periodo)
    
        // Calcula o montante das contribuições mensais
        let montanteMensal = 0
        if(taxaMensal > 0)
        {
            montanteMensal = valorMensal * (Math.pow(1+taxaMensal,periodo)-1) / taxaMensal
        }
        else
        {
            montanteMensal = valorMensal * periodo
        }

        const montante = montanteInicial + montanteMensal

        return montante.toFixed(2)
    }

    // function calcularAcumuladoSelic(){
    //     aqui
    // }

    function limparCampos(){
        setValoresInputs({
            inputValorInicial: '',
            inputValorMensal: '',
            inputPeriodo:''
        })
        setTotalAcumuladoPoupanca(0)
    }

    const formatarValores = (valor) =>{
        return new Intl.NumberFormat('pt-BR',{
            style:"currency",
            currency:"BRL"
        }).format(valor)
    }
    
    return(
        <div className="controlePoupancaSelic">

            <h1>Simulador de lucratividade - Poupanca X Selic</h1>

            <form className="formularioPoupancaSelic" onSubmit={processarCalculoPS}>
                

                <div className="controleEntradasPoupancaSelic">

                    <label htmlFor="idValorInicial">Valor inicial (R$)</label>
                
                    <input 
                        type="number" 
                        id='idValorInicial' 
                        placeholder='2000,00'
                        value={valoresInputs.inputValorInicial}
                        onChange={e=>setValoresInputs(prev=>({
                            ...prev,
                            inputValorInicial: e.target.value 
                        }))}
                    />

                </div>
                

                <div className="controleEntradasPoupancaSelic">
                    
                    <label htmlFor="idValorMensal">Valor mensal (R$)</label>
                    
                    <input 
                        type="number" 
                        id='idValorMensal' 
                        placeholder='10000,00'
                        value={valoresInputs.inputValorMensal}
                        onChange={e=>setValoresInputs(prev=>({
                            ...prev,
                            inputValorMensal: e.target.value
                        }))}
                    />
                </div>
                
                <div className="controleEntradasPoupancaSelic controleperiodoSelic">
                    
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
                        value={tipoPeriodo}
                        onChange={e=>setTipoPeriodo(e.target.value)}
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
                    
                    <button type='button' onClick={limparCampos}>Limpar</button>

                </div>
                

                <div className="campoResultadoPoupancaSelic">

                    <h3>Total acumulado na Poupança: <span> {formatarValores(totalAcumuladoPoupanca)} </span>
                    </h3>


                    <h3>Total acumulado na Selic: <span> {formatarValores(totalAcumuladoSelic)} </span>  
                    </h3>

                    <h3>Diferença de rentabilidade: <span> </span> 
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