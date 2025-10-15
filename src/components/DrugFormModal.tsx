import { useState, useEffect } from "react";

interface DrugFormModalProps {
  onClose: () => void;
  onSubmit: (title: string) => void;
  initialTitle?: string;
}

export default function DrugFormModal({
  onClose,
  onSubmit,
  initialTitle = "",
}: DrugFormModalProps) {
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  const handleSubmit = () => {
    if (title.trim() !== "") {
      onSubmit(title.trim());
      setTitle("");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{initialTitle ? "Editar Medicamento" : "Novo Medicamento"}</h2>
        <input
          type="text"
          placeholder="Nome do medicamento"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="modal-actions">
          <button className="btn-primary" onClick={handleSubmit}>
            {initialTitle ? "Salvar" : "Cadastrar"}
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
