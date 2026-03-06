import { documentRepository } from "../repository/documentRepository"

export const documentService = {
  async create(data: any) {
    return documentRepository.create(data)
  },

  async list() {
    return documentRepository.findAll()
  },

  async updateStatus(id: string, status: string) {
    if (!["pendente", "assinado"].includes(status)) {
      throw new Error("Status inválido")
    }
    return documentRepository.updateStatus(id, status)
  },

  async delete(id: string) {
    return documentRepository.delete(id)
  }
}