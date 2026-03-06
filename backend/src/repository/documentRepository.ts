import { prisma } from "../lib/prisma"


export const documentRepository = {
  create(data: any) {
    return prisma.document.create({ data })
  },


  findAll() {
    return prisma.document.findMany({
      orderBy: { criado_em: "desc" }
    })
  },


  updateStatus(id: string, status: string) {
    return prisma.document.update({
      where: { id },
      data: { status }
    })
  },


  delete(id: string) {
    return prisma.document.delete({
      where: { id }
    })
  }
}