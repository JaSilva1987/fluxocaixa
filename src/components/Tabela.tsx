import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tabela.css";
import Formulario from "./Formulario";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faFile,
  faTableColumns,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

interface TabelaProps {
  dados: any[];
  atualizarDados: () => void;
}

const Tabela: React.FC<TabelaProps> = ({ dados, atualizarDados }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const formatData = (dataString: string) => {
    return format(new Date(dataString), "dd/MM/yyyy");
  };

  const formatValor = (valorString: string) => {
    const valor = parseFloat(valorString.replace(",", "."));
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3001/Releases/${id}`);
    atualizarDados();
  };

  const openRelatorioInNewTab = () => {
    window.open("/relatorio", "_blank");
  };

  useEffect(() => {
    console.log("atualiza");
  }, []);

  return (
    <div className="table-container">
      <div>
        <button onClick={openModal} className="cadastro-button">
          <FontAwesomeIcon
            icon={faTableColumns}
            style={{ marginRight: "5px" }}
          />
          Cadastrar
        </button>
        <button
          onClick={openRelatorioInNewTab}
          className="relatorio-button"
          title="Abrir Relatório em Nova Aba"
        >
          <FontAwesomeIcon icon={faFile} style={{ marginRight: "5px" }} />
          Relatório
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>TIPO</th>
            <th>DESCRIÇÃO</th>
            <th>DATA DE VENCIMENTO</th>
            <th>VALOR</th>
            <th>DATA DE CRIAÇÃO</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item: any) => (
            <tr key={item.ID}>
              <td>{item.ID}</td>
              <td>{item.TIPO}</td>
              <td>{item.DESCRICAO}</td>
              <td>{formatData(item.DATAVENCTO)}</td>
              <td>{formatValor(item.VALOR)}</td>
              <td>{formatData(item.DATACRACAO)}</td>
              <td>
                <button
                  onClick={() => handleDelete(item.ID)}
                  className="delete-button"
                  title="Deletar item"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal">
          <button onClick={closeModal} className="modal-botao">
            <FontAwesomeIcon icon={faClose} style={{ marginRight: "10px" }} />
          </button>
          <Formulario atualizarDados={atualizarDados} />
        </div>
      )}
    </div>
  );
};

export default Tabela;
