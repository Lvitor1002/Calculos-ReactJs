
import { useState } from 'react'
import './Aposentadoria.css'
import Swal from 'sweetalert2'


export default function Aposentadoria(){

    const [valoresInputs, setValoresInputs] = useState({
        inputSalarioMes: '',
        inputValorInvestido: '',
        inputPorcentagemInvestimentoMes:'',
        inputPatrimonioDesejado: '',
        inputIdadeAtual:'',
        inputIdadeDesejadoAposentado:'',
        inputRentabilidadeAnual:'',
        inputGastoFuturoAposentado:'',
    })
    const [heranca,setHeranca] = useState('')
    const [rendaMensalAposentado,setRendaMensalAposentado] = useState('')
    const [metaPatrimonio,setMetaPatrimonio] = useState(null)
    const [metaRendaMensal,setMetaRendaMensal] = useState(null)





    function processar(evento){

        evento.preventDefault()

        //Tratando as entradas 

        const inputSalarioMes = parseFloat(valoresInputs.inputSalarioMes.replace(",","."))
        const inputValorInvestido = parseFloat(valoresInputs.inputValorInvestido.replace(",","."))
        const inputPorcentagemInvestimentoMes = parseFloat(valoresInputs.inputPorcentagemInvestimentoMes.replace(",",".")) / 100
        const inputPatrimonioDesejado = parseFloat(valoresInputs.inputPatrimonioDesejado.replace(",","."))
        const inputIdadeAtual = parseInt(valoresInputs.inputIdadeAtual.replace(",","."))
        const inputIdadeDesejadoAposentado = parseInt(valoresInputs.inputIdadeDesejadoAposentado.replace(",","."))
        const inputRentabilidadeAnual = parseFloat(valoresInputs.inputRentabilidadeAnual.replace(",",".")) / 100
        const inputGastoFuturoAposentado = parseFloat(valoresInputs.inputGastoFuturoAposentado.replace(",","."))
    
        if(!inputSalarioMes || isNaN(inputSalarioMes) || inputSalarioMes <= 0){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Entrada para Ganho Mensal(R$) incorreto..`,
            })
            return
        }
        if(!inputValorInvestido || isNaN(inputValorInvestido) || inputValorInvestido <= 0){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Entrada para Valor Investido(R$) incorreto..`,
            })
            return
        }
        if(!inputPorcentagemInvestimentoMes || isNaN(inputPorcentagemInvestimentoMes) || inputPorcentagemInvestimentoMes <= 0){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Entrada para % Investimento incorreto..`,
            })
            return
        }
        if(!inputPatrimonioDesejado || isNaN(inputPatrimonioDesejado) || inputPatrimonioDesejado <= 0){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Entrada para Patrimonio Desejado(R$) incorreto..`,
            })
            return
        }
        if(!inputIdadeAtual || isNaN(inputIdadeAtual) || inputIdadeAtual <= 0 || inputIdadeAtual >= 120){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Entrada para Idade Atual incorreto..`,
            })
            return
        }
        if(!inputIdadeDesejadoAposentado || isNaN(inputIdadeDesejadoAposentado) || inputIdadeDesejadoAposentado <= 0 || inputIdadeDesejadoAposentado >= 120){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Entrada para Idade Desejada para se Aposentar incorreto..`,
            })
            return
        }
        if(!inputRentabilidadeAnual || isNaN(inputRentabilidadeAnual) || inputRentabilidadeAnual <= 0){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Entrada para Rentabilidade Anual(%) incorreto..`,
            })
            return
        }
        if(!inputGastoFuturoAposentado || isNaN(inputGastoFuturoAposentado) || inputGastoFuturoAposentado <= 0){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Entrada para Gasto Futuro Aposentado(R$) incorreto..`,
            })
            return
        }

        //Constante criada para usar como argumento em [metas]
        const herancaCalculada = herancaAposentado(
            inputValorInvestido,
            inputSalarioMes,
            inputPorcentagemInvestimentoMes,
            inputIdadeAtual,
            inputIdadeDesejadoAposentado,
            inputRentabilidadeAnual
        );

        //Constante criada para usar como argumento em [metas]
        const rendaMensalCalculada = salarioAposentado(
            herancaCalculada,
            inputIdadeDesejadoAposentado,
            inputRentabilidadeAnual,
        )

        metas(
            inputPatrimonioDesejado, 
            inputGastoFuturoAposentado, 
            herancaCalculada, 
            rendaMensalCalculada
        )

        //Irá ser chamado apenas se o [gastoFuturoAposentado] for maior que o resultado estimado
        // metaGastoFuturoAposentado(gastoFuturoAposentado)
        
    }
    



    //                          Valor em posse ao se aposentar 
    function herancaAposentado(
        inputValorInvestido,
        inputSalarioMes,
        inputPorcentagemInvestimentoMes,
        inputIdadeAtual,
        inputIdadeDesejadoAposentado,
        inputRentabilidadeAnual
    ){

        const totalMesesRestantes = (inputIdadeDesejadoAposentado - inputIdadeAtual) * 12

        const taxaRetornoMensal = Math.pow(1+inputRentabilidadeAnual,1/12) - 1

        const aporteMensal = inputSalarioMes * inputPorcentagemInvestimentoMes

        //Valor futuro do investimento inicial
        const VFInicial = inputValorInvestido * Math.pow(1+taxaRetornoMensal,totalMesesRestantes)

        //Valor futuro dos aportes mensais 
        const VFaportes = aporteMensal * 
        ((Math.pow(1+taxaRetornoMensal,totalMesesRestantes)-1) / taxaRetornoMensal)
        
        const valorConta = VFInicial + VFaportes  

        setHeranca(valorConta.toFixed(2))

        return valorConta
    }





    //                              Gasto aceito por mês 
    function salarioAposentado(
            patrimonioAcumulado,
            inputIdadeDesejadoAposentado,
            inputRentabilidadeAnual
    ){
        const expectativaVida = 85; 

        //Calcula o período de APOSENTADORIA (não o tempo até aposentar)
        const anosAposentadoria = expectativaVida - inputIdadeDesejadoAposentado 
        const periodoMeses = anosAposentadoria * 12

        //Taxa mensal real
        const taxaRetornoMensal = Math.pow(1+inputRentabilidadeAnual,1/12) - 1

        const gastoMensal = patrimonioAcumulado * (taxaRetornoMensal/(1 - Math.pow(1 + taxaRetornoMensal,-periodoMeses)))

        setRendaMensalAposentado(gastoMensal.toFixed(2))
        return gastoMensal
    }




    //                      Para Metas ultrapassadas ou não!
    function metas(
        inputPatrimonioDesejado, 
        inputGastoFuturoAposentado, 
        herancaCalc, 
        rendaMensalCalc
    ){

        setMetaPatrimonio(null)
        setMetaRendaMensal(null)

        if(herancaCalc > inputPatrimonioDesejado){
            const superado = herancaCalc - inputPatrimonioDesejado
            setMetaPatrimonio(superado)
        }


        if(rendaMensalCalc > inputGastoFuturoAposentado){
            const superado = rendaMensalCalc - inputGastoFuturoAposentado 
            setMetaRendaMensal(superado)
        }


    }



    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat('pt-BR',{
            
            style:"currency",
            currency:"BRL"

        }).format(valor)
    }




    function limparCampos(){
        setValoresInputs({
            inputSalarioMes: '',
            inputValorInvestido: '',
            inputPorcentagemInvestimentoMes:'',
            inputPatrimonioDesejado: '',
            inputIdadeAtual:'',
            inputIdadeDesejadoAposentado:'',
            inputRentabilidadeAnual:'',
            inputGastoFuturoAposentado:'',
        })
        setHeranca('')
        setRendaMensalAposentado('')
        setMetaPatrimonio(null)
        setMetaRendaMensal(null)
    }



    return(
        <div className="controleAposentadoria">
            
            <h1>Simulador de Aposentadoria</h1>

            <form className="formulario" onSubmit={processar}>
                
                <div className="controleInputs">

                </div>
                <div className="controleEntradas">

                    <label htmlFor="idSalario">Quanto você ganha por mês? (R$)</label>
                
                    <input 
                        type="number" 
                        id='idSalario' 
                        placeholder='5000,00'
                        value={valoresInputs.inputSalarioMes}
                        onChange={(e)=> setValoresInputs(prev => ({
                            ...prev,
                            inputSalarioMes: e.target.value
                        }))}
                    />

                </div>
                

                <div className="controleEntradas">
                    
                    <label htmlFor="idInvestido">Quanto você já tem investido? (R$)</label>
                    
                    <input 
                        type="number" 
                        id='idInvestido' 
                        placeholder='10000,00'
                        value={valoresInputs.inputValorInvestido}
                        onChange={(e)=>setValoresInputs(prev => ({
                            ...prev,
                            inputValorInvestido: e.target.value
                        }))}
                    />
                </div>
                

                <div className="controleEntradas">
                    
                    <label htmlFor="idPatrimonio">Com quanto de patrimônio(R$) você deseja se aposentar?</label>
                    
                    <input 
                        type="number" 
                        id='idPatrimonio'
                        placeholder='1 000 000,00'
                        value={valoresInputs.inputPatrimonioDesejado}
                        onChange={(e)=> setValoresInputs(prev => ({
                            ...prev,
                            inputPatrimonioDesejado: e.target.value
                        }))} 
                    />
                </div>
                
                <div className="controleEntradas">
                    
                    <label htmlFor="idRendaInvestida">Quantos % de sua renda você investe?</label>
                    
                    <input 
                        type="number" 
                        id='idRendaInvestida' 
                        placeholder='10'
                        value={valoresInputs.inputPorcentagemInvestimentoMes}
                        onChange={(e)=>setValoresInputs(prev => ({
                            ...prev,
                            inputPorcentagemInvestimentoMes: e.target.value
                        }))}
                    />
                </div>

                <div className="controleEntradas">
                    
                    <label htmlFor="idIdadeAtual">Qual sua idade atual?</label>
                    
                    <input 
                        type="number" 
                        id='idIdadeAtual' 
                        placeholder='32' 
                        value={valoresInputs.inputIdadeAtual}
                        onChange={(e)=>setValoresInputs(prev=>({
                            ...prev,
                            inputIdadeAtual: e.target.value
                        }))}
                    />
                </div>
                
                <div className="controleEntradas">
                    
                    <label htmlFor="idIdadeAposentadoria">Com quantos anos você deseja se aposentar?</label>
                    
                    <input 
                        type="number" 
                        id='idIdadeAposentadoria' 
                        placeholder='65'
                        value={valoresInputs.inputIdadeDesejadoAposentado}
                        onChange={(e)=>setValoresInputs(prev=>({
                            ...prev,
                            inputIdadeDesejadoAposentado:e.target.value
                        }))}
                    />
                </div>

                <div className="controleEntradas">
                    
                    <label htmlFor="idRentabilidade" title='Estimativa do retorno financeiro esperado de um investimento.'>Sua rentabilidade total anual projetada: (%)</label>
                    
                    <input 
                        type="number" 
                        id='idRentabilidade'
                        placeholder='5'
                        value={valoresInputs.inputRentabilidadeAnual}
                        onChange={(e)=>setValoresInputs(prev=>({
                            ...prev,
                            inputRentabilidadeAnual:e.target.value
                        }))} 
                    />
                </div>

                <div className="controleEntradas">
                    
                    <label htmlFor="idGastoPorMes">Quanto você pretende gastar por mês aposentado?</label>
                    
                    <input 
                        type="number" 
                        id='idGastoPorMes' 
                        placeholder='9000,00'
                        value={valoresInputs.inputGastoFuturoAposentado}
                        onChange={(e)=>setValoresInputs(prev=>({
                            ...prev,
                            inputGastoFuturoAposentado:e.target.value
                        }))}
                    />
                </div>
                
                <div className="controleEntradas btns">
                    
                    <button type='submit'>Calcular</button>
                    
                    <button type='button' onClick={limparCampos}>Limpar</button>

                </div>
                

                <div className="campoResultadoAposentadoria">

                    <h3>Patrimônio acumulado estimado: 
                        <span>
                            {heranca ? formatarMoeda(parseFloat(heranca)) : 'R$ 0,00'}
                        </span>
                    </h3>

                    {/* Exibir apenas se meta for ultrapassada */}
                    {metaPatrimonio !== null && (

                        <h3>Você superou sua meta de patrimônio em: 
                            <span>{formatarMoeda(metaPatrimonio)} Reais. Parabéns!</span>
                        </h3>
                    )}
                    

                    <h3>Renda mensal assegurada:  
                        <span>
                            {rendaMensalAposentado ? formatarMoeda(parseFloat(rendaMensalAposentado)): 'R$ 0,00'}
                        </span>

                        <br />

                        <p>(Baseado numa expectativaVida de 85 anos)</p>

                    </h3>


                    {/* Exibir apenas se meta for ultrapassada */}
                    {metaRendaMensal !== null && (
                        <h3>
                            Você superou sua meta de renda mensal em: 
                            <span>
                                {formatarMoeda(metaRendaMensal)} Reais. Parabéns!
                            </span>
                        </h3>
                    )}
                </div>

            </form>


        </div>
    )
}