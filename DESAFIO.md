# SuperSign ▪ Teste Técnico – Desenvolvedor(a) Full Stack
Obrigado por participar do processo seletivo da SuperSign. 

O objetivo deste teste é avaliar:
- Organização de código
- Estrutura arquitetural
- Clareza e legibilidade
- Qualidade técnica
- Capacidade de abstração

#### Prazo de entrega: 4 dias
#### Forma de entrega: Link do repositório no GitHub

## 1. Objetivo do Desafio
Criar uma pequena API e uma interface web para gerenciamento de documentos.

## 2. Backend (Node.js + Fastify)
Criar uma API com a seguinte entidade:

- Entidade: Documento
    - id
    - titulo
    - descricao
    - status (pendente, assinado)
    - criado_em

- Endpoints obrigatórios:
    - Criar documento
    - Listar documentos
    - Atualizar status do documento
    - Deletar documento

#### Banco de dados: PostgreSQL
#### ORM: Prisma

## 3. Frontend (Next.js)
- Criar uma interface que permita:
- Listar documentos
- Criar documento
- Alterar status do documento

Observação: Não é necessário design elaborado. Interface simples é suficiente.

## 4. Critérios de Avaliação
- Obrigatório:
    - Organização de pastas
    - Separação de responsabilidades
    - Uso correto do Prisma
    - Tratamento básico de erros

- Diferenciais:
    - Aplicação de princípios de Arquitetura Limpa ou Hexagonal
    - Separação domain / infra
    - Uso de DTOs
    - Testes automatizados
    - Boas práticas REST

## 5. O que NÃO é necessário
- Deploy da aplicação
- Sistema de autenticação
- Interface sofisticada ou design avançado