import './Jogo.css';
import clouds from "../../assets/clouds.png";
import pipe from "../../assets/pipe.png";
import mario from "../../assets/mario.gif";
import game_over from "../../assets/game-over.png";
import { useRef, useState } from "react";

function Jogo() {
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

    setInterval(function () {
        const valor = marioEstaNoCano();

        console.log("Mário está no cano?", valor);

    }, 100);

    document.onkeydown = function () {
        // console.log("On Key Down");
        // Atualizamos o estado para true
        // setEstaPulando(true);

        // // 700ms = 0.7s
        // setTimeout(function () {
        //     // Voltamos o estado para o valor inicial
        //     setEstaPulando(false);
        // }, 700);
    };

    // console.log(15, { estaPulando })
    
    // Por padrão, o elemento tem a classe `.mario`
    let marioClassName = "mario";

    // Caso esteja pulando (valor true), a classe será `.mario`
    // e `.mario-pulo`
    if (estaPulando) {
        // marioClassName = "mario mario-pulo";
    }

    return (
        <div className="jogo">
        
        <img className="nuvens" src={clouds} alt="Nuvens" />

        <img ref={canoRef} className="cano" src={pipe} alt="Cano" />
        {/* <img className="cano" src={pipe} alt="Cano" /> */}

        {/* <img className="mario" src={mario} alt="Mário" /> */}
        
        <img ref={marioRef} className={marioClassName} src={mario} alt="Mário" />

        <div className="chao"></div>
    </div>
    );
}

export default Jogo;