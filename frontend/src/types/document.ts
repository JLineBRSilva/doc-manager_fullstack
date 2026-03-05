export type DocumentStatus = 'PENDENTE' | 'ASSINADO'

export interface Document {
  id: string
  titulo: string
  descricao: string
  status: DocumentStatus
  criado_em: string
}

export interface NewDocument {
  titulo: string
  descricao: string
}

export interface UpdateDocumentStatus {
  status: DocumentStatus
}
