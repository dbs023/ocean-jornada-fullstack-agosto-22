import './Jogo.css';
import clouds from "../../assets/clouds.png";
import cano from "../../assets/pipe.png";
import mario from "../../assets/mario.gif";
import gameOver from "../../assets/game-over.png";
import { useEffect, useRef, useState } from "react";

function Jogo( props ) {
    /*
    const estaPulando = useState(false);
    const estado = estaPulando[0];
    const dispatch = estaPulando[1];
    // Desconstrução de array
    // const lista = [10, 20, 30];
    // const [numero1, numero2, numero3] = lista;
    const [numero1, numero2, numero3] = [10, 20, 30];
    */

    // Criamos o estado `estaPulando`, com o valor padrão `false`.
    // Primeiro valor é apenas para ler (GET)
    // Segundo valor é para atualizar o estado (SET)
    // No momento que um estado é atualizado, o componente atualiza
    // tudo o que está sendo renderizado

    const [estaPulando, setEstaPulando] = useState(false);

    const [estaMorto, setEstaMorto] = useState(false);
    
    const [pontos, setPontos] = useState(0);

    //Criamos referências para 'mario' e 'cano'
    const marioRef = useRef();
    const canoRef = useRef();

    function marioEstaNoCano() {
        // Acessamos as referÊncias do mario e o cano
        const mario = marioRef.current;
        const cano = canoRef.current;
        if (!mario || !cano) {
            return;
        }  

        // Retorna o valor da lógica que determina se o mário
        // está na mesma posição do cano ou não (com as checagens
        //que consideram toda a área do cano)

        return (
            cano.offsetLeft > mario.offsetLeft &&
            cano.offsetLeft < mario.offsetLeft + mario.offsetWidth &&
            mario.offsetTop + mario.offsetHeight > cano.offsetTop
        );
    }

    useEffect(
        //Effect
        function () {

            const interval = setInterval(function () {
                // Pegamos o valor que determinar se o Mario
                // está no cano ou não
                const estaNoCano = marioEstaNoCano();

                //Se o Mario não estiver no cano, encerramos a função com o return
                if(!estaNoCano || estaMorto) {
                    return;
                }

                //Caso esteja no cano, atualizamos o estado 'estaMorto' para true
                setEstaMorto(true);
                props.onMorrer();
            }, 100);
            // (Opcional) Return mecanismo que desfaz o Effect anterior
            return () => clearInterval(interval);
        },
        // Lista de Dependências
        [estaMorto, props]
    );

    useEffect( 
        function () {
            //Salvar a pontuação
        const interval = setInterval(function () {
            if (estaMorto) {
                return;
            }

            setPontos(pontos + 1);
            props.onPontos(pontos + 1);
            // console.log({ pontos });
        }, 500);
        
        return () => clearInterval(interval);
        },
        [estaMorto, pontos, props]
    );

    /*
        Eibir pontos na tela
    */
    // console.log({ estaMorto });

    document.onkeydown = function () {
        // console.log("On Key Down");
        // Atualizamos o estado para true
        setEstaPulando(true);

        // 700ms = 0.7s
        setTimeout(function () {
        //     // Voltamos o estado para o valor inicial
            setEstaPulando(false);
        }, 700);
    };

    // console.log(15, { estaPulando })
    
    // Por padrão, o elemento tem a classe `.mario`
    let marioClassName = "mario";

    // Caso esteja pulando (valor true), a classe será `.mario`
    // e `.mario-pulo`
    if (estaPulando) {
        marioClassName = "mario mario-pulo";
    }

    // Outra forma de simplificar, mario Ternário


    // No lugar de declarar uma variável e mudar o valor dela em um caso de 'if',
    // como fizemos com a className do Mario, podemos criar uma variável
    // com dois valores, um para caso a condiçãi seja verdadeira, outro para
    // caso a condição seja false
    // Esse é o Operador Ternário!
    const marioImage = estaMorto ? gameOver : mario;

    const pararAnimacao = estaMorto ? "parar-animacao" : "";
    
    return (
        <div className="jogo">
        
        <img 
            className="nuvens" 
            src={clouds} 
            alt="Nuvens" 
        />

        <img 
            ref={canoRef} 
            className={"cano " + pararAnimacao} 
            src={cano} 
            alt="Cano" 
        />
        {/* <img className="cano" src={pipe} alt="Cano" /> */}

        {/* <img className="mario" src={mario} alt="Mário" /> */}
        
        <img 
            ref={marioRef} 
            className={marioClassName} 
            src={marioImage} 
            alt="Mário" 
        />

        <div className="chao"></div>
    </div>
    );
}

export default Jogo;