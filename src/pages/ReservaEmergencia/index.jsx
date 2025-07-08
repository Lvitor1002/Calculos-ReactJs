

import { useState } from 'react'
import './ReservaEmergencia.css'
import Swal from 'sweetalert2'


export default function ReservaEmergencia(){


    const [tipoEmprego, setTipoEmprego] = useState()
    const [inputsValores, setInputsValores] = useState({
        inputCustoFixo:'',
        inputSalarioMensal:'',
        inputSalarioInvestido:''
    })

    const [reservaEmergencia, setReservaEmergencia] = useState(0)
    const [mesesRestantesReserva, setMesesReserva] = useState(0)
    const [diasRestantesReserva, setDiasRestantesReserva] = useState(0)

    function processarCalculo(e){

        e.preventDefault()

        const custoFixo = parseFloat(inputsValores.inputCustoFixo.replace(",",".")) || 0
        const salarioMensal = parseFloat(inputsValores.inputSalarioMensal.replace(",",".")) || 0
        const salarioInvestido = parseFloat(inputsValores.inputSalarioInvestido.replace(",",".")) || 0

        
        if(!tipoEmprego){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Escolha um tipo de emprego!`,
            })
            return 
        }
        if(!custoFixo || isNaN(custoFixo) || custoFixo < 0){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Entrada para custo fixo incorreto.. Tente novamente.`,
            })
            return 
        }
        if(!salarioMensal || isNaN(salarioMensal) || salarioMensal < 0 || salarioMensal < custoFixo){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Entrada para salario mensal incorreto.. Tente novamente. Obs: Salário Mensal deve ser maior que o Custo Fixo.`,
            })
            return 
        }
        if(!salarioInvestido || isNaN(salarioInvestido) || salarioInvestido < 0){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Entrada para salario investido incorreto.. Tente novamente.`,
            })
            return 
        }
        
        let mesesRecomendados  = 0

        switch(tipoEmprego) {
            case "FP": 
                mesesRecomendados = 3
                break;
            
            case "CLT": 
                mesesRecomendados = 6
                break;
            
            case "PJ": 
                mesesRecomendados = 12
                break;
            
            default: 
                mesesRecomendados = 6;
        }

        const reserva = custoFixo * mesesRecomendados 
        setReservaEmergencia(reserva)

        const valorInvestidoMensal  = salarioMensal * (salarioInvestido/100)
        let mesesNecessarios = 0
        let diasNecessarios = 0
        
        if(valorInvestidoMensal > 0){

            mesesNecessarios = Math.floor(reserva / valorInvestidoMensal)

            const fracaoMes = (reserva / valorInvestidoMensal) - mesesNecessarios

            diasNecessarios = Math.round(fracaoMes * 30)
        }

        setMesesReserva(mesesNecessarios)
        setDiasRestantesReserva(diasNecessarios)
    }


    function limparCampos(){
        setInputsValores({
            inputCustoFixo:'',
            inputSalarioMensal:'',
            inputSalarioInvestido:''
        })
        setReservaEmergencia(0)
        setMesesReserva(0)
        setDiasRestantesReserva(0)
        setTipoEmprego('')
    }

    const formatarValor = (valor) => {
        return new Intl.NumberFormat('pt-BR',{
            style:'currency',
            currency:"BRL"
        }).format(valor)
    }


    return(
        <div className="controleReserva">
            
            <h1>Simulador de Reserva de Emergência</h1>

            <form className="formularioReserva" onSubmit={processarCalculo}>


                <div className="controleEntradasReserva">

                    <label htmlFor="idSelect">Tipo de Emprego</label>

                    <select 
                            id='idSelect'
                            value={tipoEmprego}
                            onChange={e=>setTipoEmprego(e.target.value)}
                        >
                            <option defaultValue>Selecione o tipo de emprego</option>    
                            <option value="FP">Funcionário Público</option>    
                            <option value="CLT">CLT</option>    
                            <option value="PJ">PJ</option>    
                    </select>

                </div>

                <div className="controleEntradasReserva">

                    <label htmlFor="idCusto">Custo Fixo (R$)</label>
                
                    <input 
                        type="number" 
                        id='idCusto' 
                        placeholder='1000,00'
                        value={inputsValores.inputCustoFixo}
                        onChange={e=>setInputsValores(prev=>({
                            ...prev,
                            inputCustoFixo:e.target.value
                        }))}
                    />
                </div>
                

                <div className="controleEntradasReserva">
                    
                    <label htmlFor="idSalario">Salário Mensal (R$)</label>
                    
                    <input 
                        type="number" 
                        id='idSalario' 
                        placeholder='5000,00'
                        value={inputsValores.inputSalarioMensal}
                        onChange={e=>setInputsValores(prev=>({
                            ...prev,
                            inputSalarioMensal: e.target.value
                        }))}
                    />
                </div>
                

                <div className="controleEntradasReserva">
                    
                    <label htmlFor="idTaxaJuros">Quantos (%) do salário é investido por mês? </label>
                    
                    <input 
                        type="number" 
                        id='idTaxaJuros' 
                        placeholder='5'
                        value={inputsValores.inputSalarioInvestido}
                        onChange={e=>setInputsValores(prev=>({
                            ...prev,
                            inputSalarioInvestido: e.target.value
                        }))}
                    />
                </div>

                <div className="controle-btn-limpar btns">
                    
                    <button type='submit'>Calcular</button>
                    
                    <button type='button' onClick={limparCampos}>Limpar</button>

                </div>

                <div className="campoResultadoReserva">


                    <h3>Reserva de emergência sugerida: <span> {formatarValor(reservaEmergencia)} </span></h3> 

                    {mesesRestantesReserva > 0 || diasRestantesReserva > 0 ? (
                        <h3>
                            Tempo para completar: <span>{mesesRestantesReserva} meses e {diasRestantesReserva} dias</span>
                            <br />
                            Investindo <span>{inputsValores.inputSalarioInvestido}%</span> do salário
                        </h3>
                    ) : (
                        <br />
                    )}

                </div>

            </form>
        </div>
    )
}