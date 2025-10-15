interface Drug {
  id: number;
  title: string;
}

interface DrugItemProps {
  drug: Drug;
  onEdit: (drug: Drug) => void;
  onDelete: (id: number) => void;
}

export default function DrugItem({ drug, onEdit, onDelete }: DrugItemProps) {
  return (
    <div className="drug-item">
      <span>{drug.title}</span>
      <div>
        <button className="btn-small" onClick={() => onEdit(drug)}>
          Editar
        </button>
        <button
          className="btn-small btn-danger"
          onClick={() => onDelete(drug.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
