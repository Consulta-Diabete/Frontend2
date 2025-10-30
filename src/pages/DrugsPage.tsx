import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DrugList from "../presentation/atomic/organisms/DrugList";
import DrugFormModal from "../presentation/atomic/organisms/DrugFormModal";
import { loadDrugs, saveDrugs } from "../utils/storage";
import { useGlucose } from "../context/Glucose";

export interface Drug {
  id: number;
  title: string;
  createdAt?: string;
}

export default function DrugsPage() {
  const navigate = useNavigate();
  const [drugs, setDrugs] = useState<Drug[]>(() => loadDrugs());
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingDrug, setEditingDrug] = useState<Drug | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const {
    getCurrentUserGlucose,
    glucose,
    getGlucoseByIdRequestStatus,
    createGlucose,
    createGlucoseRequestStatus,
  } = useGlucose();

  useEffect(() => {
    saveDrugs(drugs);
  }, [drugs]);

  useEffect(() => {
    getCurrentUserGlucose();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/");
  };

  const handleAddDrug = (title: string) => {
    createGlucose();
    setEditingDrug(null);
    setModalOpen(false);
  };

  const handleEdit = (drug: Drug) => {
    setEditingDrug(drug);
    setModalOpen(true);
  };

  const handleDeleteConfirm = (id: number) => {
    setDeletingId(id);
  };

  const handleDelete = () => {
    if (deletingId) {
      setDrugs((d) => d.filter((x) => x.id !== deletingId));
      setDeletingId(null);
    }
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <header className="page-header">
          <div className="header-content">
            <h1>💊 Medicamentos</h1>
            <p className="subtitle">Gerencie sua lista de medicamentos</p>
          </div>
          <div className="header-actions">
            <button
              className="btn-primary"
              onClick={() => {
                setEditingDrug(null);
                setModalOpen(true);
              }}
            >
              <span className="btn-icon">+</span>
              Adicionar Medicamento
            </button>
            <button
              className="btn-logout"
              onClick={() => setShowLogoutConfirm(true)}
              title="Sair"
            >
              <span className="logout-icon">🚪</span>
              Sair
            </button>
          </div>
        </header>

        {drugs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">💊</div>
            <h2 className="empty-state-title">Nenhum medicamento cadastrado</h2>
            <p className="empty-state-description">
              Comece adicionando seu primeiro medicamento à lista
            </p>
            <button
              className="btn-primary"
              onClick={() => {
                setEditingDrug(null);
                setModalOpen(true);
              }}
            >
              <span className="btn-icon">+</span>
              Adicionar Primeiro Medicamento
            </button>
          </div>
        ) : (
          <DrugList
            drugs={drugs}
            onEdit={handleEdit}
            onDelete={handleDeleteConfirm}
          />
        )}

        {isModalOpen && (
          <DrugFormModal
            onClose={() => setModalOpen(false)}
            onSubmit={handleAddDrug}
            initialTitle={editingDrug?.title ?? ""}
          />
        )}

        {deletingId && (
          <div className="modal-backdrop" onClick={() => setDeletingId(null)}>
            <div
              className="modal modal-confirm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Confirmar exclusão</h2>
              </div>
              <div className="modal-body">
                <p>
                  Tem certeza que deseja excluir este medicamento? Esta ação não
                  pode ser desfeita.
                </p>
              </div>
              <div className="modal-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setDeletingId(null)}
                >
                  Cancelar
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}

        {showLogoutConfirm && (
          <div
            className="modal-backdrop"
            onClick={() => setShowLogoutConfirm(false)}
          >
            <div
              className="modal modal-confirm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Sair da conta</h2>
              </div>
              <div className="modal-body">
                <p>
                  Tem certeza que deseja sair? Você precisará fazer login
                  novamente para acessar o sistema.
                </p>
              </div>
              <div className="modal-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowLogoutConfirm(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-logout-confirm"
                  onClick={handleLogout}
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
