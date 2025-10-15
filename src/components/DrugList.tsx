import DrugItem from "./DrugItem";

interface Drug {
  id: number;
  title: string;
}

interface DrugListProps {
  drugs: Drug[];
  onEdit: (drug: Drug) => void;
  onDelete: (id: number) => void;
}

export default function DrugList({ drugs, onEdit, onDelete }: DrugListProps) {
  return (
    <div className="drug-list">
      {drugs.map((drug) => (
        <DrugItem
          key={drug.id}
          drug={drug}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
