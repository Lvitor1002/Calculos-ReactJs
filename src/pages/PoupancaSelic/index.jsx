import { useState } from 'react'
import './PoupancaSelic.css'
import Swal from 'sweetalert2'


export default function PoupancaSelic(){

    const [totalAcumuladoPoupanca,setTotalAcumuladoPoupanca] = useState(0)
    const [totalAcumuladoSelic,setTotalAcumuladoSelic] = useState(0)
    const [diferencaRentabilidade,setDiferencaRentabilidade] = useState(0)
    const [tipoPeriodo, setTipoPeriodo] = useState("ano")
    const [valoresInputs, setValoresInputs] = useState({
        inputValorInicial:'',
        inputValorMensal:'',
        inputPeriodo:''
    })
    const [dados, setDados] = useState([])


    function processarCalculoPS(e){
        e.preventDefault()

        const valorInicial = parseFloat(valoresInputs.inputValorInicial.replace(",",".")) || 0
        const valorMensal = parseFloat(valoresInputs.inputValorMensal.replace(",",".")) || 0
        let periodo = parseInt(valoresInputs.inputPeriodo) || 0

        if(!valorInicial || isNaN(valorInicial) || valorInicial < 0){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Entrada para o valor inicial incorreto.. Tente novamente.`,
            })
            return 
        }

        if(!valorMensal || isNaN(valorMensal) || valorMensal < 0){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Entrada para o valor mensal incorreto.. Tente novamente.`,
            })
            return 
        }

        if(!periodo || isNaN(periodo) || periodo <= 0){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Entrada para o periodo incorreto.. Tente novamente.`,
            })
            return 
        }
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
        
        const montanteSelic = calcularAcumuladoSelic(valorInicial,periodo,valorMensal)
        setTotalAcumuladoSelic(montanteSelic)


        // Converter para números antes de calcular a diferença
        const montantePoupancaNum = parseFloat(montante.replace(',', '.'))
        const montanteSelicNum = parseFloat(montanteSelic.replace(',', '.'))
        const diferenca = montanteSelicNum - montantePoupancaNum
        setDiferencaRentabilidade(diferenca.toFixed(2))


        const dadosTabela = gerarDadosTabelaSelic(valorInicial, periodo, valorMensal)
        setDados(dadosTabela)
        
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

    function calcularAcumuladoSelic(valorInicial,periodo,valorMensal){
        const taxaAnual = 14.75/100
        const taxaDiaria = Math.pow(1+taxaAnual, 1/252) - 1

        // Converter para taxa diária (252 dias úteis/ano)
        let montanteSelic = valorInicial
        const diasPorMes = 21 // Média de dias úteis por mês

        for(let mes = 0; mes<=periodo; mes++){
            
            // Adiciona aporte mensal no início do mês
            montanteSelic += valorMensal

            // Aplica juros compostos diários por 21 dias úteis
            for(let dia = 0; dia < diasPorMes; dia++){
                montanteSelic *= (1+taxaDiaria)
            }
        }
        return montanteSelic.toFixed(2)

    }

    function gerarDadosTabelaSelic(valorInicial, periodo, valorMensal){

        const dados = []

        let acumuladoPoupanca = valorInicial
        const taxaAnualP = 7.17/100
        const taxaMensalP = Math.pow(1+taxaAnualP,1/12) - 1


        let acumuladoSelic = valorInicial 
        const taxaAnualS = 14.75 / 100
        const taxaDiariaS = Math.pow(1+taxaAnualS,1/252) - 1
        const diasPorMes = 21

        for(let mes = 1; mes <= periodo; mes++){

            // Cálculo Poupança (aporte + juros mensais)
            acumuladoPoupanca += valorMensal
            acumuladoPoupanca *= (1 + taxaMensalP)

            // Cálculo Selic (aporte + juros diários)
            acumuladoSelic += valorMensal

            // Aplica juros compostos diários por 21 dias úteis
            for(let dia = 0; dia < diasPorMes; dia++){
                acumuladoSelic *= (1+taxaDiariaS)
            }

            dados.push({
                mes:mes,
                rentabilidadeP: acumuladoPoupanca.toFixed(2),
                rentabilidadeS: acumuladoSelic.toFixed(2)
            })
        }

        return dados
    }

    function limparCampos(){
        setValoresInputs({
            inputValorInicial: '',
            inputValorMensal: '',
            inputPeriodo:''
        })
        setTotalAcumuladoPoupanca(0)
        setTotalAcumuladoSelic(0)
        setDiferencaRentabilidade(0)
        setDados([])
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
                        placeholder='500,00'
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

                    <h3>Diferença de rentabilidade: <span> {formatarValores(diferencaRentabilidade)}</span> 
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
                                {dados.map(dado =>(
                                    <tr key={dado.index}>
                                        <td>{dado.mes}</td>
                                        <td>{dado.rentabilidadeP}</td>
                                        <td>{dado.rentabilidadeS}</td>
                                    </tr>
                                ))}

                            </tbody>

                        </table>
                    </div>

                </div>

            </form>
        </div>
    )
}