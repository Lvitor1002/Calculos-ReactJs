import { useState } from 'react'
import './Financiamento.css'
import Swal from 'sweetalert2'


export default function Financiamento(){

    const [inputsFormularios, setInputsFormularios] = useState({
        valor:'',
        entrada:'',
        taxa:'',
        tempo:'',
    })
    const [tipoAmortizacao,setTipoAmortizacao] = useState('')
    const [parcelas, setParcelas] = useState([])
    const [valorFinanciado,setValorFinanciado] = useState(0)
    



    
    function processarCalculo(evento){

        evento.preventDefault()
        
        const valorInicial=parseFloat(inputsFormularios.valor.replace(',','.'))
        const entrada=parseFloat(inputsFormularios.entrada.replace(',','.'))
        const taxa=parseFloat(inputsFormularios.taxa.replace(',','.')) / 100
        const tempo=parseInt(inputsFormularios.tempo)


        if(!valorInicial || isNaN(valorInicial) || valorInicial <= 0){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Entrada para valor(R$) incorreto..`,
            })
            return
        }
        if(isNaN(entrada) || entrada < 0 || entrada >= valorInicial){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Valor de entrada(R$) incorreto..`,
            })
            return
        }
        if(!taxa || isNaN(taxa) || taxa <= 0){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Entrada para taxa(%) incorreto..`,
            })
            return
        }
        if(!tempo || isNaN(tempo) || tempo <= 0 || tempo > 50){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Entrada para tempo(anos) incorreto..`,
            })
            return
        }
        if(!tipoAmortizacao){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Escolha um sistema de Amortização: SAC ou Price`,
            })
            return
        }

        const valorFinanciadoCalculo = valorInicial - entrada
        setValorFinanciado(valorFinanciadoCalculo.toFixed(2))

        //Chamando uma das funções abaixo com base na escolha do [tipoAmortizacao]
        const novasParcelas = tipoAmortizacao === 'sac' 

            ? calcularSAC(valorFinanciadoCalculo, taxa, tempo) 
            : calcularPrice(valorFinanciadoCalculo, taxa, tempo)
        
        setParcelas(novasParcelas)
    }

    function calcularSAC(valor,taxa,tempo){

        const parcelas = []
        
        //Em meses para realizar a conta
        const meses = tempo * 12

        //Valor restante da dívida que ainda precisa ser pago no financiamento, sem contar os juros futuros.
        let saldoDevedor = valor

        // Calcula a amortização constante, ou seja, quanto do valor total será pago por mês (sem contar os juros)
        const amortizacao = valor / meses

        for(let mes = 1; mes <= meses; mes++){

            // Calcula os juros do mês atual com base no saldo devedor restante
            const juros = saldoDevedor * taxa 

            const prestacao = amortizacao + juros

            parcelas.push({
                mes,
                prestacao: prestacao.toFixed(2),
                amortizacao: amortizacao.toFixed(2),
                juros: juros.toFixed(2),
                saldoDevedor: saldoDevedor.toFixed(2),
            })

            // Subtrai a amortização do saldo devedor, simulando o pagamento dessa parte do valor
            saldoDevedor -= amortizacao
        }

        return parcelas
    }

    function calcularPrice(valor, taxa, tempo){

        const parcelas = []
        const meses = tempo * 12
        let saldoDevedor = valor

        const prestacao = valor * (taxa * Math.pow(1 + taxa, meses)) / (Math.pow(1 + taxa, meses) - 1)

        for(let mes = 1; mes <= meses;mes ++){
            const juros = saldoDevedor * taxa 
            const amortizacao = prestacao - juros

            parcelas.push({
                mes,
                prestacao: prestacao.toFixed(2),
                amortizacao: amortizacao.toFixed(2),
                juros: juros.toFixed(2),
                saldoDevedor: saldoDevedor.toFixed(2),
            })

            saldoDevedor -= amortizacao
        }

        return parcelas

    }



    function limparFormulario(){
        
        setInputsFormularios({
            valor:'',
            entrada:'',
            taxa:'',
            tempo:'',
        })
        setTipoAmortizacao('')
        setValorFinanciado(0)
        setParcelas([])
    }


    return(
        <div className="controleFinanciamento">
            
            <h1>Simulador de financiamento</h1>

            <form className="formularioFinanciamento" onSubmit={processarCalculo}>
                

                <div className="controleEntradasF">

                    <label htmlFor="idValor">Valor (R$)</label>
                
                    <input 
                        type="number" 
                        id='idValor' 
                        placeholder='200000,00'

                        // Define o valor atual do input com base no estado `inputsFormularios.valor`.
                        value={inputsFormularios.valor}

                        // Função chamada sempre que o usuário altera o valor do input.
                        onChange={(evento) => setInputsFormularios(prev => ({

                            // Copia todos os campos anteriores do objeto `inputsFormularios`.
                            ...prev,
                            // Atualiza apenas o campo `valor` com o novo valor digitado pelo usuário.
                            valor: evento.target.value
                        }))}
                    />
                </div>
                

                <div className="controleEntradasF">
                    
                    <label htmlFor="idEntrada">Entrada (R$)</label>
                    
                    <input 
                        type="number" 
                        id='idEntrada' 
                        placeholder='5000,00   ou   0'
                        value={inputsFormularios.entrada}
                        onChange={(evento) => setInputsFormularios(prev => ({
                            ...prev,
                            entrada: evento.target.value
                        }))}
                    />
                </div>
                

                <div className="controleEntradasF">
                    
                    <label htmlFor="idTaxaJuros">Taxa de Juros (%)</label>
                    
                    <input 
                        type="number" 
                        id='idTaxaJuros' 
                        placeholder='2.5'
                        value={inputsFormularios.taxa}
                        onChange={(evento) => setInputsFormularios(prev => ({
                            ...prev,
                            taxa: evento.target.value
                        }))}
                    />
                </div>
                
                
                <div className="controleEntradasF">
                    
                    <label htmlFor="idTempo">Tempo (anos)</label>
                    
                    <input 
                        type="number" 
                        id='idTempo' 
                        placeholder='5'
                        value={inputsFormularios.tempo}
                        onChange={(evento) => setInputsFormularios(prev => ({
                            ...prev,
                            tempo: evento.target.value
                        }))}
                    />
                </div>
                
                

                <div className="controle-btn-limpar">
                    
                    <select 
                        title='Sistema de Amortização'
                        value={tipoAmortizacao} 
                        onChange={(evento)=> setTipoAmortizacao(evento.target.value)}
                    >
                        <option defaultValue>Sistema</option>    
                        <option value="sac">SAC</option>    
                        <option value="price">Price</option>    
                    </select>
                    
                    <button type='submit'>Calcular</button>
                    
                    <button type='button' onClick={limparFormulario}>Limpar</button>

                </div>

                <h2>Valor financiado: <span>R$ {valorFinanciado}</span></h2> 

                <div className="campoResultadoF">
                    
                    <h3>Lista de Parcelas</h3>
                    
                    <div className="controleLista">
                        <table>

                            <thead>
                                <tr>
                                    <th>Mês</th>
                                    <th>Prestação (R$)</th>
                                    <th>Amortização (R$)</th>
                                    <th>Juros (R$)</th>
                                    <th>Saldo Devedor (R$)</th>
                                </tr>
                            </thead>

                            <tbody>
                                {parcelas.map((parcela)=>(

                                    <tr key={parcela.mes}>

                                        <td>{parcela.mes}</td>
                                        <td>{parcela.prestacao}</td>
                                        <td>{parcela.amortizacao}</td>
                                        <td>{parcela.juros}</td>
                                        <td>{parcela.saldoDevedor}</td>

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