import { useEffect, useRef, useState } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

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
  const [title, setTitle] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) onClose();
  };
  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const value = title.trim();
    if (value) onSubmit(value);
  };

  return (
    <div
      className="modal-backdrop"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      onMouseDown={handleBackdropClick}
    >
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <h2 style={{ marginTop: 0 }}>
          {initialTitle ? "Editar Medicamento" : "Novo Medicamento"}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <Input
            itemRef={inputRef as any}
            placeholder="Nome do medicamento"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div
            className="modal-actions"
            style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
          >
            <Button type="submit" variant="primary">
              {initialTitle ? "Salvar" : "Cadastrar"}
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
