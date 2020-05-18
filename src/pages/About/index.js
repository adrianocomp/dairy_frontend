import React from 'react';
import {Link} from 'react-router-dom';

export default function About() {
    return(
        <div id="content" className="bg-light">
            <div className="container p-5">
                <header className="mb-5">
                <h1>Projeto</h1>
                <h5 className="text-secondary">Informações sobre este Projeto</h5>
                </header>
                <section className="mb-4">
                    <h3 className="mb-4">SiGQL - Sistema de Gerenciamento da Qualidade do Leite</h3>
                    <p>O Sistema:</p>
                    <p>Tem por função, colaborar com o abastecimento de dados do leite produzido na fazenda, proporcionado ao produtor uma visão da qualidade do seu produto de forma tecnológica e pratica.</p>
                    <p>Assim, o laticínio se conectará em tempo real com as situações dos fornecedores (produtores), no momento da coleta, ou do input dos dados, isto promoverá uma gestão mais eficiente do laticínio junto a sua rede de fornecedores.</p>
                    <p>Com os gráficos e panoramas gerados ambos poderão tomar decisões com firme embasamento para que sejam sugeridas adequações necessárias descritas pelas normativas 76 e 77.</p>
                    <p>Parametros Legais:</p>
                    <ul>
                        <li >CPP (contagem em padrão de placas):
As instruções normativas 76 e 77 de 2018 que substituíram a instrução normativa IN - 62/2011 com as seguintes alterações:
Art. 7º (IN 76) – O Leite cru refrigerado de tanque individual ou comunitário, deve apresentar média geométrica trimestral de CBT/CPP de no máximo 300.000 UFC/mL e de CCS de no máximo 500.000/mL.
</li>
                        <li>Alteração das temperaturas máximas:
Fazenda: de 7ºC para 4ºC, portanto deve-se está com temperatura ATÉ 4ºC.
Na recepção: de 10ºC para 7ºC, assim da mesma forma que na fazenda, de forma rigorosa.
</li>
                        <li>Alizarol: Alteração de 72ºGL para 74ºGL</li>
                    </ul>
                </section>
                <section class="mb-4">
                    <h3 class="mb-4">Autores</h3>
                    <div class="row mb-2">
                        <div class="col">
                            <h5 class="mb-0">Adriano Santos</h5>
                            <span class="text-muted">adriano.santos@ifmg.edu.br</span>
                            <p>Lider de Tecnologia</p>
                            </div>
                        <div class="col">
                            <h5 class="mb-0">Júlio César Benfenatti</h5>
                            <span class="text-muted">julio.ferreira@ifmg.edu.br</span>
                            <p>Lider do projeto</p>
                        </div>
                        <div class="col">
                        <h5 class="mb-0">Richard Leal Ferreira</h5>
                            <span class="text-muted">richardlealf@gmail.com</span>
                            <p>Bolsista</p>
                        </div>
                    </div>
                </section>
                <Link className="back-link"to="/">Voltar para a tela inicial</Link>
            </div>
        </div>
    )
}