
import { useState } from 'react'
import './JurosComposto.css'
import Swal from 'sweetalert2'


export default function JurosComposto(){

    const [valoresInputs, setValoresInputs] = useState({
        inputValorInicial:'',
        inputValorMensal:'',
        inputTaxaJuros:'',
        inputPeriodo:'',
    })

    const [tipoTaxa, setTipoTaxa] = useState('ano') 
    const [tipoTempo,setTipoTempo] = useState('ano')
    const [valorTotalFinal,setValorTotalFinal] = useState("0.00")
    const [totalInvestido,setTotalInvestido] = useState("0.00")
    const [totalJuros,setTotalJuros] = useState("0.00")
    const [dadosTabela, setDadosTabela] = useState([])

    function processarCalculo(e){

        e.preventDefault()

        const valorInicial= parseFloat(valoresInputs.inputValorInicial.replace(",",".")) || 0
        const valorMensal=parseFloat(valoresInputs.inputValorMensal.replace(",",".")) || 0
        let taxaJuros=parseFloat(valoresInputs.inputTaxaJuros.replace(",",".")) / 100
        let periodo=parseFloat(valoresInputs.inputPeriodo.replace(",",".")) || 0

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
        if(!taxaJuros || isNaN(taxaJuros) || taxaJuros < 0){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Entrada para taxa juros incorreta.. Tente novamente.`,
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
        // Converter período para meses se necessário
        if(tipoTempo === 'ano'){
            
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


        // Converter taxa para mensal se necessário
        if(tipoTaxa === 'ano'){
            taxaJuros = taxaJuros / 12
        }


        const montante = calcularMontante(valorInicial, valorMensal, taxaJuros, periodo)
        setValorTotalFinal(montante)
        
        const totalInvestido = calcularTotalInvestido(valorInicial,valorMensal,periodo)
        setTotalInvestido(totalInvestido.toFixed(2))
        
        // Total em juros
        const tJuros = montante - totalInvestido
        setTotalJuros(tJuros.toFixed(2)) 



        //Dados Tabela
        const dados = gerarDadosTabela(valorInicial,periodo,taxaJuros,valorMensal)
        setDadosTabela(dados)

    }


    // Valor total final
    function calcularMontante(valorInicial, valorMensal, taxaJuros, periodo){

        let montante = valorInicial

        for(let i = 0; i < periodo;i++){
            montante = montante * (1 + taxaJuros)

            montante += valorMensal
        }
        return montante.toFixed(2)

    }

    //Valor total investido 
    function calcularTotalInvestido(valorInicial,valorMensal, periodo){
        return valorInicial + valorMensal * periodo
    }




    // Gerar dados para a tabela mês a mês
    function gerarDadosTabela(valorInicial,periodo,taxaJuros,valorMensal){
        let montante = valorInicial
        let totalInvestido = valorInicial
        let totalJurosAcumulado = 0
        const dados = []


        for(let mes = 1; mes <= periodo; mes++){
    
            // Calcula os juros do mês sobre o montante atual
            const jurosMes = montante * taxaJuros
            totalJurosAcumulado += jurosMes

            // Atualiza o montante com os juros
            montante = montante * (1 + taxaJuros)

            // Adiciona o aporte mensal
            montante += valorMensal

            // Atualiza o total investido
            totalInvestido += valorMensal

            // Adiciona os dados do mês
            dados.push({
                mes: mes,
                juros: jurosMes.toFixed(2),
                totalInvestido: totalInvestido.toFixed(2),
                totalJuros: totalJurosAcumulado.toFixed(2),
                totalAcumulado: montante.toFixed(2)
            })
        }
        return dados
    }




    function limparCampos() {

        setValoresInputs({
            inputValorInicial: '',
            inputValorMensal: '',
            inputTaxaJuros: '',
            inputPeriodo: '',
        })
        setValorTotalFinal("0.00")
        setTotalInvestido("0.00")
        setTotalJuros("0.00")
        setDadosTabela([])
    }

    return(
        <div className="controleJuros">

            <h1>Simulador de Juros Compostos</h1>

            <form className="formularioJuros" onSubmit={processarCalculo}>
                
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
                
                <div className="controleEntradasJuros controleperiodo">
                    
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
                        <option value="mes">Meses</option>
                    </select>
                </div>

                
                
                <div className="controleEntradasJuros btns">
                    
                    <button type='submit'>Calcular</button>
                    
                    <button type='button' onClick={limparCampos}>Limpar</button>

                </div>
                

                <div className="campoResultadoJuros">

                    <h3>Valor total final: R$<span> {valorTotalFinal}</span>
                    </h3>


                    <h3>Valor total investido: R$<span> {totalInvestido}</span>  
                    </h3>

                    <h3>Total em juros: R$<span> {totalJuros}</span> 
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
                                {dadosTabela.map(dado =>(
                                    <tr key={dado.tempo}>
                                        <td>{dado.mes}</td>
                                        <td>{dado.juros}</td>
                                        <td>{dado.totalInvestido}</td>
                                        <td>{dado.totalJuros}</td>
                                        <td>{dado.totalAcumulado}</td>
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



