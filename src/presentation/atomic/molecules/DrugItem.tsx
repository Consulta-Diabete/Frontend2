import Button from "../atoms/Button";

export interface Drug {
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
    <div className="card item">
      <span className="title">{drug.title}</span>
      <div className="actions">
        <Button size="sm" onClick={() => onEdit(drug)}>
          Editar
        </Button>
        <Button size="sm" variant="danger" onClick={() => onDelete(drug.id)}>
          Excluir
        </Button>
      </div>
    </div>
  );
}
