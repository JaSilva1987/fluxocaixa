import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tabela from "../src/components/Tabela";
import PaginaRelatorio from "../src/components/PaginaRelatorio";

const App: React.FC = () => {
  const [dados, setDados] = useState<any[]>([]);

  const atualizarDados = async () => {
    try {
      const result = await axios.get("http://localhost:3001/Releases");
      setDados(result.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    atualizarDados();
  }, []);

  return (
    <Router>
      <div>
        <h1>Fluxo de Caixa</h1>
        <Routes>
          <Route
            path="/"
            element={<Tabela dados={dados} atualizarDados={atualizarDados} />}
          />
          <Route path="/relatorio" element={<PaginaRelatorio />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
