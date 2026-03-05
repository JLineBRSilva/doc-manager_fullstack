const API_URL = process.env.NEXT_PUBLIC_API_URL

/**
 * BUSCAR TODOS OS DOCUMENTOS
*/
export async function getDocuments() {
  const response = await fetch(`${API_URL}/documents`, {
    cache: "no-store"
  })

  if (!response.ok) {
    throw new Error("Erro ao buscar documentos")
  }

  return response.json()
}

/**
 * CRIAR NOVO DOCUMENTO
*/
export async function createDocument(data: {
  titulo: string
  descricao: string
}) {
  const response = await fetch(`${API_URL}/documents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return response.json()
}

/**
 * ATUALIZAR STATUS DO DOCUMENTO
*/
export async function updateStatus(id: string) {
  await fetch(`${API_URL}/documents/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      status: "assinado"
    })
  })
}

/**
 * APAGAR DOCUMENTO SELECIONADO
 */
export async function deleteDocument(id: string) {
  await fetch(`${API_URL}/documents/${id}`, {
    method: "DELETE"
  })
}
