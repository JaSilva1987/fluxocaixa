import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import "./Formulario.css";

interface FormularioProps {
  atualizarDados: () => void;
}

const Formulario: React.FC<FormularioProps> = ({ atualizarDados }) => {
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [dataVencimento, setDataVencimento] = useState("");
  const [valor, setValor] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      TIPO: tipo,
      DESCRICAO: descricao,
      DATAVENCTO: dataVencimento,
      VALOR: valor,
      DATACRACAO: new Date().toISOString(),
    };

    await axios.post("http://localhost:3001/Releases", data);

    setDescricao("");
    setTipo("");
    setDataVencimento("");
    setValor("");

    atualizarDados();
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorInput = e.target.value;
    if (/^[0-9]*$/.test(valorInput)) {
      setValor(valorInput);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <div className="campo">
        <label>
          Tipo:
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="select-style"
          >
            <option value="">Selecione...</option>
            <option value="Pagar">Pagar</option>
            <option value="Receber">Receber</option>
          </select>
        </label>
      </div>
      <div className="campo">
        <label>
          Descrição:
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="input-style"
          />
        </label>
      </div>
      <div className="campo">
        <label>
          Data de Vencimento:
          <input
            type="date"
            value={dataVencimento}
            onChange={(e) => setDataVencimento(e.target.value)}
            className="input-style"
          />
        </label>
      </div>
      <div className="campo">
        <label>
          Valor:
          <input
            type="text"
            value={valor}
            onChange={handleValorChange}
            className="input-style"
            pattern="[0-9]*"
            inputMode="numeric"
          />
        </label>
      </div>
      <div className="div-botao">
        <button type="submit" className="botao-inserir">
          <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
          Inserir
        </button>
      </div>
    </form>
  );
};

export default Formulario;
