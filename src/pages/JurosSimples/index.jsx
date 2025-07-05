
import { useState } from 'react'
import './JurosSimples.css'
import Swal from 'sweetalert2'


export default function JurosSimples(){

    const [valoresInputs, setValoresInputs] = useState({
        inputValorInicial:'',
        inputTaxa:'',
        inputTempo:''
    })
    const [valorTotal,setValorTotal] = useState(0)
    const [totalJuros,setTotalJuros] = useState(0)
    const [tipoPeriodo, setTipoPeriodo] = useState("ano")
    const [tipoTaxa, setTipoTaxa] = useState("ano")
    const [dadosTabela,setDadosTabela] = useState([])


    function processarCalculo(e){
        
        e.preventDefault()

        const valorInicial = parseFloat(valoresInputs.inputValorInicial.replace(",",".")) || 0
        let taxa = parseFloat(valoresInputs.inputTaxa.replace(",",".")) / 100
        let periodo = parseFloat(valoresInputs.inputTempo.replace(",",".")) || 0

        if(tipoPeriodo === "ano"){
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
        else{
            if(periodo > 600){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Entrada para o período ultrapassou 600 meses.. Tente novamente.`,
                })
                return 
            }
        }

        if(tipoTaxa === "ano"){
            taxa = taxa / 12
        }
        
        const valorFinal = calcularValorFinal(valorInicial, taxa, periodo)
        setValorTotal(valorFinal.toFixed(2))

        // Total em juros
        const jurosT = calcularTotalJuros(valorFinal,valorInicial)
        setTotalJuros(jurosT.toFixed(2))

        //Dados Tabela
        const dados = gerandoDadosTabela(valorInicial,periodo,taxa)
        setDadosTabela(dados)
    }

    //Valor total final
    function calcularValorFinal(valorInicial,taxa,periodo){
        return valorInicial * (1 + (taxa * periodo))
    }

    //Total em juros
    function calcularTotalJuros(valorFinal, valorInicial){
        return valorFinal - valorInicial
    }

    //Dados para tabela
    function gerandoDadosTabela(valorInicial,periodo,taxa){

        let totalJurosAcumulado = 0
        let totalAcumulado  = valorInicial
        const dados = []

        for(let mes = 1; mes <= periodo; mes++){
            
            // Juros do mês (sempre calculado sobre o valor inicial)
            const jurosMes = valorInicial * taxa 
            totalJurosAcumulado += jurosMes

            totalAcumulado = valorInicial + totalJurosAcumulado

            // Adiciona os dados do mês
            dados.push({
                mes: mes,
                juros: jurosMes.toFixed(2),
                totalInvestido: valorInicial.toFixed(2),
                totalJuros: totalJurosAcumulado.toFixed(2),
                total: totalAcumulado.toFixed(2)
            })
        }
        return dados
    }


    function limparTodos(){

        setValoresInputs({
            inputValorInicial:'',
            inputTaxa:'',
            inputTempo:''
        })
        setValorTotal(0)
        setTotalJuros(0)
        setDadosTabela([])
    }

    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat('pt-BR',{
            
            style:"currency",
            currency:"BRL"

        }).format(valor)
    }

    return(
        <div className="controleJurosSimples">

            <h1>Simulador de Juros Simples</h1>

            <form className="formularioJurosSimples" onSubmit={processarCalculo}>
                
                <div className="controleInputsJurosSimples">

                </div>
                <div className="controleEntradasJurosSimples">

                    <label htmlFor="idValorInicial">Valor inicial (R$)</label>
                
                    <input 
                        type="number" 
                        id='idValorInicial' 
                        placeholder='8000,00'
                        value={valoresInputs.inputValorInicial}
                        onChange={e=>setValoresInputs(prev=>({
                            ...prev,
                            inputValorInicial:e.target.value
                        }))}
                    />

                </div>
                

                <div className="controleEntradasJurosSimples">
                    
                    <label htmlFor="idTaxaMensal">Taxa de juros (%) 
                    </label>
                    
                    <input 
                        type="number" 
                        id='idTaxaMensal'
                        placeholder='Ex: 20'
                        value={valoresInputs.inputTaxa}
                        onChange={e=>setValoresInputs(prev=>({
                            ...prev,
                            inputTaxa: e.target.value
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
                
                <div className="controleEntradasJurosSimples controleperiodoSimples">
                    
                    <label htmlFor="idPeriodo">Período</label>
                    
                    <input 
                        type="number" 
                        id='idPeriodo' 
                        placeholder='Ex: 12'
                        value={valoresInputs.inputTempo}
                        onChange={e=>setValoresInputs(prev=>({
                            ...prev,
                            inputTempo:e.target.value
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

                
                
                <div className="controleEntradasJurosSimples btnsSimples">
                    
                    <button type='submit'>Calcular</button>
                    
                    <button type='button' onClick={limparTodos}>Limpar</button>

                </div>
                

                <div className="campoResultadoJurosSimples">

                    <h3>Valor total final: R$<span> {formatarMoeda(valorTotal)} </span>
                    </h3>


                    <h3>Valor Inicial: R$<span> {formatarMoeda(valoresInputs.inputValorInicial)}</span>  
                    </h3>

                    <h3>Total em juros: R$<span> {formatarMoeda(totalJuros)} </span> 
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
                                {dadosTabela.map(dado =>(
                                    <tr key={dado.index}>
                                        <td>{dado.mes}</td>
                                        <td>{dado.juros}</td>
                                        <td>{dado.totalInvestido}</td>
                                        <td>{dado.totalJuros}</td>
                                        <td>{dado.total}</td>
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