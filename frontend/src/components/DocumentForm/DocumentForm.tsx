'use client'

import { createDocument } from '@/service/api'
import { Document } from '@/types/document'
import { useState } from 'react'
import styles from './DocumentForm.module.css'

interface Props {
  onSuccess: (doc: Document) => void
  onCancel: () => void
}

export function DocumentForm({ onSuccess, onCancel }: Props) {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    if (!titulo.trim() || !descricao.trim()) {
      setError('Preencha todos os campos.')
      return
    }

    setLoading(true)
    setError('')
    try {
      const doc = await createDocument({ titulo: titulo.trim(), descricao: descricao.trim() })
      onSuccess(doc)
    } catch (err: any) {
      setError(err.message || 'Erro ao criar documento.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="titulo">Título</label>
        <input
          id="titulo"
          className={styles.input}
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ex: Contrato de Prestação de Serviços"
          autoFocus
          disabled={loading}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          className={styles.textarea}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descreva o conteúdo ou finalidade do documento…"
          rows={4}
          disabled={loading}
        />
      </div>

      {error && (
        <p className={styles.error}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </p>
      )}

      <div className={styles.actions}>
        <button type="button" className={styles.cancelBtn} onClick={onCancel} disabled={loading}>
          Cancelar
        </button>
        <button type="submit" className={styles.submitBtn} disabled={loading || !titulo.trim() || !descricao.trim()}>
          {loading ? (
            <span className={styles.spinner} />
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
          {loading ? 'Criando…' : 'Criar Documento'}
        </button>
      </div>
    </form>
  )
}