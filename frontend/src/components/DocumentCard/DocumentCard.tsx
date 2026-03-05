'use client'

import { StatusBadge } from '@/components/StatusBadge/StatusBadge'
import { deleteDocument, updateStatus } from '@/service/api'
import { Document } from '@/types/document'
import { formatDate } from '@/util/formatDate'
import { useState } from 'react'
import styles from './DocumentCard.module.css'

interface Props {
  doc: Document
  onUpdated: (doc: Document) => void
  onDeleted: (id: string) => void
  onError: (msg: string) => void
}

export function DocumentCard({ doc, onUpdated, onDeleted, onError }: Props) {
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const nextStatus = doc.status === 'PENDENTE' ? 'ASSINADO' : 'PENDENTE'
  const nextLabel = doc.status === 'PENDENTE' ? 'Marcar como Assinado' : 'Reverter para Pendente'

  async function handleToggleStatus() {
    setLoadingStatus(true)
    try {
      // const updated = await documentService.updateStatus(doc.id, { status: nextStatus })
      // const updated = await updateStatus(doc.id, { status: nextStatus })
      const updated = await updateStatus(doc.id)
      status: nextStatus
      // onUpdated(updated)
    } catch (err: any) {
      onError(err.message || 'Erro ao atualizar status.')
    } finally {
      setLoadingStatus(false)
    }
  }

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true)
      setTimeout(() => setConfirmDelete(false), 3000)
      return
    }
    setLoadingDelete(true)
    try {
      await deleteDocument(doc.id)
      onDeleted(doc.id)
    } catch (err: any) {
      onError(err.message || 'Erro ao deletar documento.')
      setLoadingDelete(false)
    }
  }

  return (
    <article className={`${styles.card} ${doc.status === 'ASSINADO' ? styles.signed : ''}`}>
      <div className={styles.top}>
        <StatusBadge status={doc.status} />
        <time className={styles.date}>{formatDate(doc.criado_em)}</time>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{doc.titulo}</h3>
        <p className={styles.desc}>{doc.descricao}</p>
      </div>

      <div className={styles.footer}>
        <button
          className={`${styles.btn} ${styles.statusBtn} ${doc.status === 'ASSINADO' ? styles.revertBtn : styles.signBtn}`}
          onClick={handleToggleStatus}
          disabled={loadingStatus}
          title={nextLabel}
        >
          {loadingStatus ? (
            <span className={styles.spinner} />
          ) : doc.status === 'PENDENTE' ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          )}
          {doc.status === 'PENDENTE' ? 'Assinar' : 'Reverter'}
        </button>

        <button
          className={`${styles.btn} ${styles.deleteBtn} ${confirmDelete ? styles.confirmingDelete : ''}`}
          onClick={handleDelete}
          disabled={loadingDelete}
          title={confirmDelete ? 'Clique novamente para confirmar' : 'Deletar documento'}
        >
          {loadingDelete ? (
            <span className={styles.spinner} />
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          )}
          {confirmDelete ? 'Confirmar?' : 'Deletar'}
        </button>
      </div>
    </article>
  )
}
