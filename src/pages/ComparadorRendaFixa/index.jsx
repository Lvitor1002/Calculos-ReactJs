import { useState } from 'react'
import './ComparadorRendaFixa.css'
import Swal from 'sweetalert2'


export default function ComparadorRendaFixa(){

    //Form 1
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


    //Form 2
    const [tipoInvestimento2, setTipoInvestimento2] = useState("")
    const [tipoRentabilidade2, setTipoRentabilidade2] = useState("") // 'PRE', 'CDI' ou 'IPCA'
    const [rentabilidadeLiquida2, setRentabilidadeLiquida2] = useState(0)
    const [periodoRentabilidadeLiquida2, setPeriodoRentabilidadeLiquida2] = useState(0)
    const [inputsValores2, setInputsValores2] = useState({
        inputRentabilidade2:'',
        inputPeriodo2:''
    })
    //Para exibir a frase isento
    const [isentoIR2, setIsentoIR2] = useState(false);

    const processarCalculo1 = (e) =>{
        e.preventDefault()
        processarCalculo(e,1)
    }
    const processarCalculo2 = (e) =>{
        e.preventDefault()
        processarCalculo(e,2)

    }

    const processarCalculo = (e, formId) => {

        if(formId === 1){

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
    
            const {rentabilidadeLiquida: rentabilidade, isento} = calcularRentabilidadeLiquida(valorRentabilidade,periodo,tipoRentabilidade,tipoInvestimento)
            setRentabilidadeLiquida(rentabilidade)
            setPeriodoRentabilidadeLiquida(periodo)
            setIsentoIR(isento)
        }
        else
        {
            const valorRentabilidade = parseFloat(inputsValores2.inputRentabilidade2.replace(",",".")) || 0
            const periodo = parseFloat(inputsValores2.inputPeriodo2.replace(",",".")) || 0
    
            if(!tipoInvestimento2){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Escolha um tipo de Investimento!`,
                })
                return 
            }
            if(!tipoRentabilidade2){
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
    
            const {rentabilidadeLiquida: rentabilidade, isento} = calcularRentabilidadeLiquida(valorRentabilidade,periodo,tipoRentabilidade2,tipoInvestimento2)
            setRentabilidadeLiquida2(rentabilidade)
            setPeriodoRentabilidadeLiquida2(periodo)
            setIsentoIR2(isento)
                
        }

    }

    const calcularRentabilidadeLiquida = (rentabilidade, periodoMeses, tipoRentabilidade, tipoInvestimento) => {
        // Determina alíquota com base no período em DIAS
        const periodoDias = periodoMeses * 30;
        let aliquota;

        if (periodoDias <= 180) {
            aliquota = 0.225; // Até 180 dias
        } else if (periodoDias <= 360) {
            aliquota = 0.20;  // 181-360 dias
        } else if (periodoDias <= 720) {
            aliquota = 0.175; // 361-720 dias
        } else {
            aliquota = 0.15;  // Acima de 720 dias
        }

        // Aplica isenção para investimentos específicos
        const isento = ["LCA", "LCI", "CRI", "CRA"].includes(tipoInvestimento);
        const percentualIR = isento ? 0 : aliquota;

        let rentabilidadeAnual;
        
        switch (tipoRentabilidade) {
            case 'PRE':
                // Converte porcentagem para decimal (ex: 10% -> 0.10)
                rentabilidadeAnual = rentabilidade / 100;
                break;

            case 'CDI':
                // CDI anual é 14.65%, então (valor% do CDI * 14.65%)
                rentabilidadeAnual = (rentabilidade / 100) * 0.1465;
                break;

            case 'IPCA':
                // Taxa fixa + IPCA (composição)
                const taxaFixa = rentabilidade / 100;
                const ipca = 0.045;
                rentabilidadeAnual = (1 + taxaFixa) * (1 + ipca) - 1;
                break;

            default:
                rentabilidadeAnual = rentabilidade / 100;
        }

    // Aplica desconto do IR
    const rentabilidadeLiquida = rentabilidadeAnual * (1 - percentualIR);

    return { rentabilidadeLiquida, isento };
};
    
    const handleTipoRentabilidade = (tipo) =>{
        setTipoRentabilidade(tipo)
    }
    const handleTipoRentabilidade2 = (tipo) =>{
        setTipoRentabilidade2(tipo)
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
    const styleBtn2 = (tipo) =>{

        return tipoRentabilidade2 === tipo ? 
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

    const limparCampo2 = () =>{
        setInputsValores2({
            inputRentabilidade2:'',
            inputPeriodo2:''
        })
        setTipoInvestimento2('')
        setTipoRentabilidade2('')
        setRentabilidadeLiquida2('')
        setPeriodoRentabilidadeLiquida2('')
        setIsentoIR2(false)
    }


    return(
        <>
            <div className="controleTitulo">
                <h1>Comparador de Renda Fixa</h1>
            </div>

            <div className="controleComparadorRendaFixa">

                <form className="formularioComparador" onSubmit={processarCalculo1}>

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
                <form className="formularioComparador" onSubmit={processarCalculo2}>


                    <div className="controleEntradasComparador">

                        <label htmlFor="idSelect">Tipo de Investimento</label>

                        <select 
                                id='idSelect'
                                value={tipoInvestimento2}
                                onChange={e=>setTipoInvestimento2(e.target.value)}
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
                            style={styleBtn2('PRE')}
                            onClick={()=> handleTipoRentabilidade2('PRE')} 
                            >
                            PRÉ-FIXADO
                        </button>
                        
                        <button
                            type='button'
                            style={styleBtn2('CDI')}
                            onClick={()=> handleTipoRentabilidade2('CDI')} 
                            >
                            % do CDI
                        </button>
                        
                        <button
                            type='button'
                            style={styleBtn2('IPCA')}
                            onClick={()=> handleTipoRentabilidade2('IPCA')} 
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
                            value={inputsValores2.inputRentabilidade2}
                            onChange={e=>setInputsValores2(prev=>({
                                ...prev,
                                inputRentabilidade2: e.target.value
                            }))}
                        />
                    </div>
                    

                    <div className="controleEntradasComparador">
                        
                        <label htmlFor="idSalario">Tempo de investimento (meses)</label>
                        
                        <input 
                            type="number" 
                            id='idSalario' 
                            placeholder='5'
                            value={inputsValores2.inputPeriodo2}
                            onChange={e=>setInputsValores2(prev=>({
                                ...prev,
                                inputPeriodo2:e.target.value
                            }))}
                        />
                    </div>
                    

                    <p>Valores base utilizados: CDI 14.65%, IPCA 4.5%</p>

                    <div className="controle-btn-limpar btnsComparador">
                        
                        <button type='submit'>Calcular</button>
                        
                        <button type='button' onClick={limparCampo2}>Limpar</button>

                    </div>

                    <div className="campoResultadoComparador">

                        { tipoInvestimento2 && (
                            <h2>Tipo de Investimento: <span>{tipoInvestimento2}</span></h2>
                        )}
                        
                        {rentabilidadeLiquida2 > 0 && (
                            <h3> 
                                Rentabilidade Líquida (a.a): <span> {formatarPorcentagem(rentabilidadeLiquida2)} </span>
                                <br />
                                Período: <span>{periodoRentabilidadeLiquida2} meses</span>
                            </h3> 
                        )}
                        

                        {isentoIR2 === true && (
                            <p>Este investimento é isento de Imposto de Renda.</p>
                        )}

                    </div>

                </form>
            </div>
        </>
    )
}