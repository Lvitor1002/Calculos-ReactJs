import { AiFillHome } from "react-icons/ai";
import { ImAccessibility } from "react-icons/im";
import { BsCurrencyDollar } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import { ImCalculator } from "react-icons/im";
import { RiPercentLine } from "react-icons/ri";
import { BsGraphUpArrow } from "react-icons/bs";
import { BsPiggyBankFill } from "react-icons/bs";



export const Sidebar = [
    {
        titulo: 'Home',
        rota: '/',
        icone: <AiFillHome/>,
        classe: 'itens'
    },
    {
        titulo: 'Financiamento',
        rota: '/Financiamento',
        icone: <BsCurrencyDollar />,
        classe: 'itens'
    },
    {
        titulo: 'Aposentadoria',
        rota: '/',
        icone: <ImAccessibility/>,
        classe: 'itens'
    },
    {
        titulo: 'Investimento Renda Fixa',
        rota: '/',
        icone: <VscGraph />,
        classe: 'itens'
    },
    {
        titulo: 'Juros Composto',
        rota: '/',
        icone: <ImCalculator />,
        classe: 'itens'
    },
    {
        titulo: 'Juros Simples',
        rota: '/',
        icone: <RiPercentLine />,
        classe: 'itens'
    },
    {
        titulo: 'Poupança X Selic',
        rota: '/',
        icone: <BsGraphUpArrow />,
        classe: 'itens'
    },
    {
        titulo: 'Reserva Emergência',
        rota: '/',
        icone: <BsPiggyBankFill/>,
        classe: 'itens'
    },
]







