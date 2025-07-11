import { useState } from 'react'
import './ComparadorRendaFixa.css'
import Swal from 'sweetalert2'


export default function ComparadorRendaFixa(){

    const [tipoInvestimento, setTipoInvestimento] = useState("")
    const [tipoRentabilidade, setTipoRentabilidade] = useState("") // 'PRE', 'CDI' ou 'IPCA'
    const [rentabilidadeLiquida, setRentabilidadeLiquida] = useState(0)
    const [periodoRentabilidadeLiquida, setPeriodoRentabilidadeLiquida] = useState(0)
    const [inputsValores, setInputsValores] = useState({
        inputRentabilidade:'',
        inputPeriodo:''
    })
    //Para exibir a frase isento
    const [isentoIR, setIsentoIR] = useState(false);


    const processarCalculo = (e) => {
        
        e.preventDefault()

        const valorRentabilidade = parseFloat(inputsValores.inputRentabilidade.replace(",",".")) || 0
        const periodo = parseFloat(inputsValores.inputPeriodo.replace(",",".")) || 0

        if(!tipoInvestimento){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Escolha um tipo de Investimento!`,
            })
            return 
        }
        if(!tipoRentabilidade){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Escolha um dos botões de tipo de Rentabilidade [PRE, CDI ou IPCA]`,
            })
            return 
        }
        if(!valorRentabilidade || isNaN(valorRentabilidade) || valorRentabilidade < 0){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Entrada inválida para o campo de Rentabilidade!`,
            })
            return 
        }
        if(!periodo || periodo < 0 || periodo > 600 || isNaN(periodo)){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Entrada inválida para o campo de Tempo de investimento! Obs: Max. 600 meses!`,
            })
            return 
        }

        const rentabilidade = calcularRentabilidadeLiquida(valorRentabilidade,periodo,tipoRentabilidade,tipoInvestimento)
        setRentabilidadeLiquida(rentabilidade.toFixed(2))
        setPeriodoRentabilidadeLiquida(periodo.toFixed(0))
    }

    const calcularRentabilidadeLiquida = (rentabilidade,periodoMeses,tiporentabilidade,tipoinvestimento) =>{
        
        // Determina alíquota com base no período
        let aliquota

        if(periodoMeses <= 6) {
            aliquota = 0.225 // Até 180 dias
        }      
        else if(periodoMeses <= 12) {
            aliquota = 0.20  // 181-360 dias
        }
        else if(periodoMeses <= 24) {
            aliquota = 0.175 // 361-720 dias
        } 
        else {
            aliquota = 0.15  // Acima de 720 dias
        }                       


        // Aplica isenção para alguns investimentos]
        //verifica se o valor de [tipoinvestimento] existe dentro do array.
        const isento = ["LCA", "LCI", "CRI", "CRA"].includes(tipoinvestimento)
        const percentualIR = isento ? 0 : aliquota
        setIsentoIR(isento);


        rentabilidade = rentabilidade / 100

        let rentabilidadeAnual

        switch(tiporentabilidade){
            case 'PRE':
                rentabilidadeAnual = rentabilidade
                break

            case 'CDI':
                rentabilidadeAnual = rentabilidade * 0.1465
                break

            case 'IPCA':
                rentabilidadeAnual = rentabilidade + 0.045
                break

            default:
                rentabilidadeAnual = rentabilidade
        }

        // Aplica desconto do IR
        const rentabilidadeliquida = rentabilidadeAnual * (1 - percentualIR) 

        return rentabilidadeliquida 

    }
    
    const handleTipoRentabilidade = (tipo) =>{
        setTipoRentabilidade(tipo)
    }

    const styleBtn = (tipo) =>{
        return tipoRentabilidade === tipo ? 
            {
                border: '.5px solid rgb(255, 72, 0)',
                background: 'transparent',
                color: 'rgb(255, 72, 0)'
            } : 
            {} 
    }

    const formatarPorcentagem = (valor) => {
        return (valor * 100).toFixed(2) + '%'
    }

    const limparCampo = () =>{
        setInputsValores({
            inputRentabilidade:'',
            inputPeriodo:''
        })
        setTipoInvestimento('')
        setTipoRentabilidade('')
        setRentabilidadeLiquida('')
        setPeriodoRentabilidadeLiquida('')
        setIsentoIR(false)
    }


    return(
        <>
            <div className="controleTitulo">
                <h1>Comparador de Renda Fixa</h1>
            </div>

            <div className="controleComparadorRendaFixa">

                <form className="formularioComparador" onSubmit={processarCalculo}>

                    <div className="controleEntradasComparador">

                        <label htmlFor="idSelect">Tipo de Investimento</label>

                        <select 
                                id='idSelect'
                                value={tipoInvestimento}
                                onChange={e=>setTipoInvestimento(e.target.value)}
                            >
                                <option defaultValue>Selecione o tipo de investimento:</option>    
                                <option value="CDB">CDB</option>    
                                <option value="LCA">LCA</option>    
                                <option value="LCI">LCI</option>    
                                <option value="CRI">CRI</option>    
                                <option value="CRA">CRA</option>    
                                <option value="DEBENTURE">DEBÊNTURE</option>    
                                <option value="DEBENTUREINCENTIVADA">DEBÊNTURE INCENTIVADA</option>    
                                <option value="TESOURODIRETO">TESOURO DIRETO</option>    
                        </select>

                    </div>

                    <p>A rentabilidade está em:</p>
                    <div className="controleEntradasComparador controleBtnRentabilidade">
                        
                        <button
                            type='button'
                            style={styleBtn('PRE')}
                            onClick={()=> handleTipoRentabilidade('PRE')} 
                            >
                            PRÉ-FIXADO
                        </button>
                        
                        <button
                            type='button'
                            style={styleBtn('CDI')}
                            onClick={()=> handleTipoRentabilidade('CDI')} 
                            >
                            % do CDI
                        </button>
                        
                        <button
                            type='button'
                            style={styleBtn('IPCA')}
                            onClick={()=> handleTipoRentabilidade('IPCA')} 
                        >
                            TAXA FIXADA + IPCA
                        </button>
                    </div>

                    <div className="controleEntradasComparador">

                        <label htmlFor="idCusto">Rentabilidade (R$)</label>
                    
                        <input 
                            type="number" 
                            id='idCusto' 
                            placeholder='5000,00'
                            value={inputsValores.inputRentabilidade}
                            onChange={e=>setInputsValores(prev=>({
                                ...prev,
                                inputRentabilidade: e.target.value
                            }))}
                        />
                    </div>
                    

                    <div className="controleEntradasComparador">
                        
                        <label htmlFor="idSalario">Tempo de investimento (meses)</label>
                        
                        <input 
                            type="number" 
                            id='idSalario' 
                            placeholder='5'
                            value={inputsValores.inputPeriodo}
                            onChange={e=>setInputsValores(prev=>({
                                ...prev,
                                inputPeriodo:e.target.value
                            }))}
                        />
                    </div>
                    

                    <p>Valores base utilizados: CDI 14.65%, IPCA 4.5%</p>

                    <div className="controle-btn-limpar btnsComparador">
                        
                        <button type='submit'>Calcular</button>
                        
                        <button type='button' onClick={limparCampo}>Limpar</button>

                    </div>

                    <div className="campoResultadoComparador">

                        { tipoInvestimento && (
                            <h2>Tipo de Investimento: <span>{tipoInvestimento}</span></h2>
                        )}
                        
                        {rentabilidadeLiquida > 0 && (
                            <h3> 
                                Rentabilidade Líquida (a.a): <span> {formatarPorcentagem(rentabilidadeLiquida)} </span>
                                <br />
                                Período: <span>{periodoRentabilidadeLiquida} meses</span>
                            </h3> 
                        )}
                        

                        {isentoIR === true && (
                            <p>Este investimento é isento de Imposto de Renda.</p>
                        )}

                    </div>

                </form>
                <form className="formularioComparador" onSubmit={processarCalculo}>


                    <div className="controleEntradasComparador">

                        <label htmlFor="idSelect">Tipo de Investimento</label>

                        <select 
                                id='idSelect'
                                value={tipoInvestimento}
                                onChange={e=>setTipoInvestimento(e.target.value)}
                            >
                                <option defaultValue>Selecione o tipo de investimento:</option>    
                                <option value="CDB">CDB</option>    
                                <option value="LCA">LCA</option>    
                                <option value="LCI">LCI</option>    
                                <option value="CRI">CRI</option>    
                                <option value="CRA">CRA</option>    
                                <option value="DEBENTURE">DEBÊNTURE</option>    
                                <option value="DEBENTUREINCENTIVADA">DEBÊNTURE INCENTIVADA</option>    
                                <option value="TESOURODIRETO">TESOURO DIRETO</option>    
                        </select>

                    </div>

                    <p>A rentabilidade está em:</p>
                    <div className="controleEntradasComparador controleBtnRentabilidade">
                        
                        <button
                            type='button'
                            style={styleBtn('PRE')}
                            onClick={()=> handleTipoRentabilidade('PRE')} 
                            >
                            PRÉ-FIXADO
                        </button>
                        
                        <button
                            type='button'
                            style={styleBtn('CDI')}
                            onClick={()=> handleTipoRentabilidade('CDI')} 
                            >
                            % do CDI
                        </button>
                        
                        <button
                            type='button'
                            style={styleBtn('IPCA')}
                            onClick={()=> handleTipoRentabilidade('IPCA')} 
                        >
                            TAXA FIXADA + IPCA
                        </button>
                    </div>

                    <div className="controleEntradasComparador">

                        <label htmlFor="idCusto">Rentabilidade (R$)</label>
                    
                        <input 
                            type="number" 
                            id='idCusto' 
                            placeholder='5000,00'
                            value={inputsValores.inputRentabilidade}
                            onChange={e=>setInputsValores(prev=>({
                                ...prev,
                                inputRentabilidade: e.target.value
                            }))}
                        />
                    </div>
                    

                    <div className="controleEntradasComparador">
                        
                        <label htmlFor="idSalario">Tempo de investimento (meses)</label>
                        
                        <input 
                            type="number" 
                            id='idSalario' 
                            placeholder='5'
                            value={inputsValores.inputPeriodo}
                            onChange={e=>setInputsValores(prev=>({
                                ...prev,
                                inputPeriodo:e.target.value
                            }))}
                        />
                    </div>
                    

                    <p>Valores base utilizados: CDI 14.65%, IPCA 4.5%</p>

                    <div className="controle-btn-limpar btnsComparador">
                        
                        <button type='submit'>Calcular</button>
                        
                        <button type='button' onClick={limparCampo}>Limpar</button>

                    </div>

                    <div className="campoResultadoComparador">

                        { tipoInvestimento && (
                            <h2>Tipo de Investimento: <span>{tipoInvestimento}</span></h2>
                        )}
                        
                        {rentabilidadeLiquida > 0 && (
                            <h3> 
                                Rentabilidade Líquida (a.a): <span> {formatarPorcentagem(rentabilidadeLiquida)} </span>
                                <br />
                                Período: <span>{periodoRentabilidadeLiquida} meses</span>
                            </h3> 
                        )}
                        

                        {isentoIR === true && (
                            <p>Este investimento é isento de Imposto de Renda.</p>
                        )}

                    </div>

                </form>
            </div>
        </>
    )
}