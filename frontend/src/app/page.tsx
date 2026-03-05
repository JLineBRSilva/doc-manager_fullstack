'use client'

import { DocumentCard } from '@/components/DocumentCard/DocumentCard'
import { DocumentForm } from '@/components/DocumentForm/DocumentForm'
import { Modal } from '@/components/Modal/Modal'
import { Toast, ToastData } from '@/components/Toast/Toast'
import { getDocuments } from '@/service/api'
import { Document, DocumentStatus } from '@/types/document'
import { useCallback, useEffect, useId, useState } from 'react'
import styles from './page.module.css'

type FilterStatus = 'todos' | DocumentStatus

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterStatus>('todos')
  const [showModal, setShowModal] = useState(false)
  const [toasts, setToasts] = useState<ToastData[]>([])
  const toastIdRef = useId()

  const addToast = useCallback((message: string, type: ToastData['type']) => {
    const id = `${toastIdRef}-${Date.now()}`
    setToasts((prev) => [...prev, { id, message, type }])
  }, [toastIdRef])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const fetchDocuments = useCallback(async () => {
    try {
      const data = await getDocuments()
      setDocuments(data)
    } catch {
      addToast('Não foi possível carregar os documentos.', 'error')
    } finally {
      setLoading(false)
    }
  }, [addToast])

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  function handleCreated(doc: Document) {
    setDocuments((prev) => [doc, ...prev])
    setShowModal(false)
    addToast(`"${doc.titulo}" criado com sucesso.`, 'success')
  }

  function handleUpdated(updated: Document) {
    setDocuments((prev) => prev.map((d) => (d.id === updated.id ? updated : d)))
    const label = updated.status === 'ASSINADO' ? 'Documento Assinado.' : 'Status revertido para Pendente.'
    addToast(label, 'success')
  }

  function handleDeleted(id: string) {
    setDocuments((prev) => prev.filter((d) => d.id !== id))
    addToast('Documento Removido.', 'success')
  }

  const filtered = filter === 'todos' ? documents : documents.filter((d) => d.status === filter)

  const counts = {
    todos: documents.length,
    pendente: documents.filter((d) => d.status === 'PENDENTE').length,
    assinado: documents.filter((d) => d.status === 'ASSINADO').length,
  }

  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <span className={styles.brandName}>DocSign</span>
          </div>
          <button className={styles.newBtn}
            onClick={() => setShowModal(true)}>
            Novo documento
          </button>
        </div>
      </header>

      <main className={styles.main}>
        {/* Page title + stats */}
        <div className={styles.hero}>
          <div>
            <h1 className={styles.pageTitle}>Documentos</h1>
            <p className={styles.pageSubtitle}>Gerencie e acompanhe seus documentos</p>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{counts.todos}</span>
              <span className={styles.statLabel}>Total</span>
            </div>
            <div className={`${styles.stat} ${styles.statDivider}`} />
            <div className={styles.stat}>
              <span className={`${styles.statNumber} ${styles.pendingNum}`}>{counts.pendente}</span>
              <span className={styles.statLabel}>Pendentes</span>
            </div>
            <div className={`${styles.stat} ${styles.statDivider}`} />
            <div className={styles.stat}>
              <span className={`${styles.statNumber} ${styles.signedNum}`}>{counts.assinado}</span>
              <span className={styles.statLabel}>Assinados</span>
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className={styles.filters}>
          {(['todos', 'PENDENTE', 'ASSINADO'] as const).map((f) => (
            <button
              key={f}
              className={`${styles.filterTab} ${filter === f ? styles.activeTab : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'todos' ? 'Todos' : f === 'PENDENTE' ? 'Pendentes' : 'Assinados'}
              <span className={styles.filterCount}>
                {f === 'todos' ? counts.todos : counts[f]}
              </span>
            </button>
          ))}
        </div>

        {/* Document grid */}
        {loading ? (
          <div className={styles.loadingGrid}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="13" y2="17" />
              </svg>
            </div>
            <p className={styles.emptyTitle}>
              {filter === 'todos' ? 'Nenhum documento ainda' : `Nenhum documento ${filter}`}
            </p>
            <p className={styles.emptyDesc}>
              {filter === 'todos'
                ? 'Crie seu primeiro documento clicando no botão acima.'
                : 'Tente mudar o filtro ou crie um novo documento.'}
            </p>
            {filter === 'todos' && (
              <button className={styles.emptyBtn} onClick={() => setShowModal(true)}>
                Criar primeiro documento
              </button>
            )}
          </div>
        ) : (
          <div className={`${styles.grid} stagger`}>
            {filtered.map((doc) => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                onUpdated={handleUpdated}
                onDeleted={handleDeleted}
                onError={(msg) => addToast(msg, 'error')}
              />
            ))}
          </div>
        )}
      </main>

      {/* Create modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Novo Documento">
        <DocumentForm onSuccess={handleCreated} onCancel={() => setShowModal(false)} />
      </Modal>

      {/* Toast stack */}
      <div className={styles.toastStack}>
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onDismiss={removeToast} />
        ))}
      </div>
    </div>
  )
}