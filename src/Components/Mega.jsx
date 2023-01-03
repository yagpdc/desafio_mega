import "./Mega.css";
import React, { useState } from "react";
import Buttons from "./Buttons";

export default (props) => {
  function gerarNumeroNaoContido(min, max, array) {
    const aleatorio = parseInt(Math.random() * (max + 1 - min)) + min;
    return array.includes(aleatorio)
      ? gerarNumeroNaoContido(min, max, array)
      : aleatorio;
  }

  function gerarNumeros(qtde) {
    const numeros = Array(qtde)
      .fill(0)
      .reduce((nums) => {
        const novoNumero = gerarNumeroNaoContido(1, 60, nums);
        return [...nums, novoNumero];
      }, [])
      .sort((n1, n2) => n1 - n2);

    return numeros;
  }

  const [qtde, setQtde] = useState(props.qtde || 7);
  const numerosIniciais = gerarNumeros(qtde);
  const [numeros, setNumeros] = useState(numerosIniciais);
  const screen = numeros.map((n) => {
    return <span className="sortNum">{n}</span>;
  });

  return (
    <div className="Mega">
      <h2>Mega</h2>
      <h3>{screen}</h3>
      <div>
        <label>Qtde de Números</label>
        <input
          min="5"
          max="10"
          type="number"
          value={qtde}
          onChange={(e) => {
            setQtde(+e.target.value);
            setNumeros(gerarNumeros(+e.target.value));
          }}
        />
      </div>
      <button onClick={(_) => setNumeros(gerarNumeros(qtde))}>
        Gerar Números
      </button>
      <h3>
        <Buttons></Buttons>
      </h3>
    </div>
  );
};
