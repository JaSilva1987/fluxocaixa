// PaginaRelatorio.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PaginaRelatorio.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPrint } from "@fortawesome/free-solid-svg-icons";

interface Release {
  ID: number;
  TIPO: string;
  DESCRICAO: string;
  DATAVENCTO: string;
  VALOR: string;
  DATACRACAO: string;
}

const PaginaRelatorio: React.FC = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [aReceber, setAReceber] = useState<Release[]>([]);
  const [aPagar, setAPagar] = useState<Release[]>([]);
  const [aReceberTotal, setAReceberTotal] = useState(0);
  const [aPagarTotal, setAPagarTotal] = useState(0);
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:3001/Releases");
        setReleases(result.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const receber = releases.filter((release) => release.TIPO === "Receber");
    const pagar = releases.filter((release) => release.TIPO === "Pagar");

    setAReceber(receber);
    setAPagar(pagar);

    calcularTotais();
  }, [releases]);

  const calcularTotais = () => {
    let totalReceber = 0;
    let totalPagar = 0;

    aReceber.forEach((release) => {
      const valor = parseFloat(release.VALOR.replace(",", "."));
      totalReceber += valor;
    });

    aPagar.forEach((release) => {
      const valor = parseFloat(release.VALOR.replace(",", "."));
      totalPagar += valor;
    });

    setAReceberTotal(totalReceber);
    setAPagarTotal(totalPagar);
    setSaldo(totalReceber - totalPagar);
  };

  const renderTabela = (data: Release[], tipo: string) => {
    return (
      <div className="table-container">
        <h2>{tipo}</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Data de Vencimento</th>
            </tr>
          </thead>
          <tbody>
            {data.map((release) => (
              <tr key={release.ID}>
                <td>{release.DESCRICAO}</td>
                <td>{release.VALOR}</td>
                <td>{release.DATAVENCTO}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Subtotal</td>
              <td>{calcularSubtotal(data)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };

  const renderButtons = () => (
    <div className="buttons-container">
      <button className="print-button" onClick={() => window.print()}>
        <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />{" "}
        Imprimir
      </button>
      <button className="close-button" onClick={() => window.close()}>
        <FontAwesomeIcon icon={faClose} style={{ marginRight: "5px" }} /> Fechar
      </button>
    </div>
  );

  const calcularSubtotal = (data: Release[]) => {
    return data
      .reduce((acc, release) => {
        const valor = parseFloat(release.VALOR.replace(",", "."));
        return acc + valor;
      }, 0)
      .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <div>
      {renderButtons()}
      <h1>Relatório</h1>
      {renderTabela(aReceber, "A Receber")}
      {renderTabela(aPagar, "A Pagar")}
      <div>
        <h2>Total Geral</h2>
        <p>
          {saldo.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
    </div>
  );
};

export default PaginaRelatorio;
