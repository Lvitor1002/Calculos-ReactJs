
import { useState } from 'react'
import './Aposentadoria.css'
// import Swal from 'sweetalert2'


export default function Aposentadoria(){

    const [valoresInputs, setValoresInputs] = useState({
        salarioMes: '',
        valorInvestido: '',
        porcentagemInvestimentoMes:'',
        patrimonioDesejado: '',
        idadeAtual:'',
        idadeDesejadoAposentado:'',
        rentabilidadeAnual:'',
        gastoFuturoAposentado:'',
    })
    const [valorDisponivel,setValorConta] = useState('0.00')



    function processar(evento){

        evento.preventDefault()

        //Tratando as entradas 

        const salarioMes = parseFloat(valoresInputs.salarioMes.replace(",","."))
        const valorInvestido = parseFloat(valoresInputs.valorInvestido.replace(",","."))
        const porcentagemInvestimentoMes = parseFloat(valoresInputs.porcentagemInvestimentoMes.replace(",",".")) / 100
        const patrimonioDesejado = parseFloat(valoresInputs.patrimonioDesejado.replace(",","."))
        const idadeAtual = parseInt(valoresInputs.idadeAtual.replace(",","."))
        const idadeDesejadoAposentado = parseInt(valoresInputs.idadeDesejadoAposentado.replace(",","."))
        const rentabilidadeAnual = parseFloat(valoresInputs.rentabilidadeAnual.replace(",",".")) / 100
        const gastoFuturoAposentado = parseFloat(valoresInputs.gastoFuturoAposentado.replace(",","."))


       
        valorContaAposentado(
            valorInvestido,
            salarioMes,
            porcentagemInvestimentoMes,
            idadeAtual,
            idadeDesejadoAposentado,
            rentabilidadeAnual
        );

        //Irá ser chamado apenas se o [gastoFuturoAposentado] for maior que o resultado estimado
        // metaGastoFuturoAposentado(gastoFuturoAposentado)
        
    }
    
    //Valor em posse ao se aposentar 
    function valorContaAposentado(
        valorInvestido,
        salarioMes,
        porcentagemInvestimentoMes,
        idadeAtual,
        idadeDesejadoAposentado,
        rentabilidadeAnual
    ){

        const totalMesesRestantes = (idadeDesejadoAposentado - idadeAtual) * 12

        const taxaRetornoMensal = Math.pow(1+rentabilidadeAnual,1/12) - 1

        const aporteMensal = salarioMes * porcentagemInvestimentoMes

        //Valor futuro do investimento inicial
        const VFInicial = valorInvestido * Math.pow(1+taxaRetornoMensal,totalMesesRestantes)

        //Valor futuro dos aportes mensais 
        const VFaportes = aporteMensal * 
        ((Math.pow(1+taxaRetornoMensal,totalMesesRestantes)-1) / taxaRetornoMensal)
        
        const valorConta = VFInicial + VFaportes  

        setValorConta(valorConta.toFixed(2))
    }

    // //Herança estimada 
    // function herancaAposentado(salarioMes,idadeAtual){
    //     alert(`foi`)
    // }

    // //Gasto aceito por mês 
    // function salarioAposentado(salarioMes,idadeAtual){
    //     alert(`foi`)
    // }

    // //Meta ultrapassada!
    // function metaGastoFuturoAposentado(salarioMes,idadeAtual){
    //     alert(`foi`)
    // }

    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat('pt-BR',{
            
            style:"currency",
            currency:"BRL"

        }).format(valor)
    }

    function limparCampos(){
        setValoresInputs({
            salarioMes: 0,
            valorInvestido: 0,
            porcentagemInvestimentoMes:0,
            patrimonioDesejado: 0,
            idadeAtual:0,
            idadeDesejadoAposentado:0,
            rentabilidadeAnual:0,
            gastoFuturoAposentado:0,
        })
        setValorConta('0.00')
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
                        value={valoresInputs.salarioMes}
                        onChange={(e)=> setValoresInputs(prev => ({
                            ...prev,
                            salarioMes: e.target.value
                        }))}
                    />

                </div>
                

                <div className="controleEntradas">
                    
                    <label htmlFor="idInvestido">Quanto você já tem investido? (R$)</label>
                    
                    <input 
                        type="number" 
                        id='idInvestido' 
                        placeholder='10000,00'
                        value={valoresInputs.valorInvestido}
                        onChange={(e)=>setValoresInputs(prev => ({
                            ...prev,
                            valorInvestido: e.target.value
                        }))}
                    />
                </div>
                

                <div className="controleEntradas">
                    
                    <label htmlFor="idPatrimonio">Com quanto de patrimônio(R$) você deseja se aposentar?</label>
                    
                    <input 
                        type="number" 
                        id='idPatrimonio'
                        placeholder='1 000 000,00'
                        value={valoresInputs.patrimonioDesejado}
                        onChange={(e)=> setValoresInputs(prev => ({
                            ...prev,
                            patrimonioDesejado: e.target.value
                        }))} 
                    />
                </div>
                
                <div className="controleEntradas">
                    
                    <label htmlFor="idRendaInvestida">Quantos % de sua renda você investe?</label>
                    
                    <input 
                        type="number" 
                        id='idRendaInvestida' 
                        placeholder='10'
                        value={valoresInputs.porcentagemInvestimentoMes}
                        onChange={(e)=>setValoresInputs(prev => ({
                            ...prev,
                            porcentagemInvestimentoMes: e.target.value
                        }))}
                    />
                </div>

                <div className="controleEntradas">
                    
                    <label htmlFor="idIdadeAtual">Qual sua idade atual?</label>
                    
                    <input 
                        type="number" 
                        id='idIdadeAtual' 
                        placeholder='32' 
                        value={valoresInputs.idadeAtual}
                        onChange={(e)=>setValoresInputs(prev=>({
                            ...prev,
                            idadeAtual: e.target.value
                        }))}
                    />
                </div>
                
                <div className="controleEntradas">
                    
                    <label htmlFor="idIdadeAposentadoria">Com quantos anos você deseja se aposentar?</label>
                    
                    <input 
                        type="number" 
                        id='idIdadeAposentadoria' 
                        placeholder='65'
                        value={valoresInputs.idadeDesejadoAposentado}
                        onChange={(e)=>setValoresInputs(prev=>({
                            ...prev,
                            idadeDesejadoAposentado:e.target.value
                        }))}
                    />
                </div>

                <div className="controleEntradas">
                    
                    <label htmlFor="idRentabilidade" title='Estimativa do retorno financeiro esperado de um investimento.'>Sua rentabilidade total anual projetada: (%)</label>
                    
                    <input 
                        type="number" 
                        id='idRentabilidade'
                        placeholder='5'
                        value={valoresInputs.rentabilidadeAnual}
                        onChange={(e)=>setValoresInputs(prev=>({
                            ...prev,
                            rentabilidadeAnual:e.target.value
                        }))} 
                    />
                </div>

                <div className="controleEntradas">
                    
                    <label htmlFor="idGastoPorMes">Quanto você pretende gastar por mês aposentado?</label>
                    
                    <input 
                        type="number" 
                        id='idGastoPorMes' 
                        placeholder='9000,00'
                        value={valoresInputs.gastoFuturoAposentado}
                        onChange={(e)=>setValoresInputs(prev=>({
                            ...prev,
                            gastoFuturoAposentado:e.target.value
                        }))}
                    />
                </div>
                
                <div className="controleEntradas btns">
                    
                    <button type='submit'>Calcular</button>
                    
                    <button type='submit' onClick={limparCampos}>Limpar</button>

                </div>
                

                <div className="campoResultado">
                    <h3>Valor em posse ao se aposentar: <span>{valorDisponivel ? formatarMoeda(parseFloat(valorDisponivel)) : 'R$ 0,00'}</span></h3>
                    <h3>Herança estimada: <span>0,00</span></h3>
                    <h3>Gasto assegurado por mês: <span>0,00</span></h3>
                    {/* <h3>Meta de pretenção de gasto por mês ultrapassada em: <span>215.300,00</span> Parabéns!</h3> */}
                </div>

            </form>


        </div>
    )
}