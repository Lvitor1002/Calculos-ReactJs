import './ComparadorRendaFixa.css'

export default function ComparadorRendaFixa(){
    return(
        <div className="controleComparadorRendaFixa">

            <h1>Comparador de Renda Fixa</h1>

            <form className="formularioComparador">


                <div className="controleEntradasComparador">

                    <label htmlFor="idSelect">Tipo de Investimento</label>

                    <select 
                            id='idSelect'
                        >
                            <option defaultValue>Selecione o tipo de investimento:</option>    
                            <option value="FP">CDB</option>    
                            <option value="CLT">LCA</option>    
                            <option value="CLT">LCI</option>    
                            <option value="CLT">CRI</option>    
                            <option value="CLT">CRA</option>    
                            <option value="CLT">DEBÊNTURE</option>    
                            <option value="CLT">DEBÊNTURE INCENTIVADA</option>    
                            <option value="CLT">TESOURO DIRETO</option>    
                    </select>

                </div>

                <div className="controleEntradasComparador">

                    <label htmlFor="idCusto">Rentabilidade (R$)</label>
                
                    <input 
                        type="number" 
                        id='idCusto' 
                        placeholder='1000,00'
                    />
                </div>
                

                <div className="controleEntradasComparador">
                    
                    <label htmlFor="idSalario">Tempo de investimento (meses)</label>
                    
                    <input 
                        type="number" 
                        id='idSalario' 
                        placeholder='5000,00'
                    />
                </div>
                

                <p>Valores base utilizados: CDI 14.65%, IPCA 4.5%</p>

                <div className="controle-btn-limpar btnsComparador">
                    
                    <button type='submit'>Calcular</button>
                    
                    <button type='button'>Limpar</button>

                </div>

                <div className="campoResultadoComparador">


                    <h2>Tipo de Investimento: <span> </span></h2>
                    <h3> 
                        Rentabilidade Líquida (a.a): <span></span>
                        <br />
                        Período: <span></span>
                    
                    </h3> 

                    <p>Este investimento é isento de Imposto de Renda.</p>

                </div>

            </form>
        </div>
    )
}