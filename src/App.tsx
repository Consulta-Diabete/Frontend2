import { useState } from "react";
import DrugList from "./presentation/atomic/organisms/DrugList";
import DrugFormModal from "./presentation/atomic/organisms/DrugFormModal";

// Tipo para o medicamento
interface Drug {
  id: number;
  title: string;
}

export default function App() {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [editingDrug, setEditingDrug] = useState<Drug | null>(null);

  const handleAddDrug = (title: string) => {
    if (editingDrug) {
      setDrugs(
        drugs.map((d) => (d.id === editingDrug.id ? { ...d, title } : d))
      );
    } else {
      setDrugs([...drugs, { id: Date.now(), title }]);
    }
    setEditingDrug(null);
    setModalOpen(false);
  };

  const handleEdit = (drug: Drug) => {
    setEditingDrug(drug);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDrugs(drugs.filter((d) => d.id !== id));
  };

  return (
    <div className="container">
      <h1>💊 Lista de Medicamentos</h1>
      <button
        className="btn-primary"
        onClick={() => {
          setEditingDrug(null);
          setModalOpen(true);
        }}
      >
        + Cadastrar Novo
      </button>
      <DrugList drugs={drugs} onEdit={handleEdit} onDelete={handleDelete} />
      {isModalOpen && (
        <DrugFormModal
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddDrug}
          initialTitle={editingDrug?.title || ""}
        />
      )}
    </div>
  );
}
