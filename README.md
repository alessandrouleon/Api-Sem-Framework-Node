# Estrutura do Projeto

Este projeto segue os princípios de Clean Architecture e SOLID, utilizando Node.js e TypeScript "Sem framwork". Abaixo está a estrutura das pastas e uma breve descrição de cada uma delas.

## Estrutura de Pastas

```plaintext
src/
│
├── 📁 application/
│   ├── 📁 dtos/
│   │   └── 📄 CreateUserDTO.ts
│   ├── 📁 repositories/
│   │   └── 📄 UserRepository.ts
│   ├── 📁 use-cases/
│   │   └── 📄 CreateUserUseCase.ts
│
├── 📁 domain/
│   ├── 📁 entities/
│   │   └── 📄 UserEntity.ts
│   ├── 📁 repositories/
│   │   └── 📄 IUserRepository.ts
│
├── 📁 infraestrutura/
│   ├── 📁 database/
│   │   ├── 📁 scripts/
│   │   │   └── 📄 create_table.sql
|       └── 📄 PostgresConnection.ts
│   ├── 📁 errors/
│   │   └── 📄 AppError.ts
│   ├── 📁 http/
│   │   ├── 📁 controllers/
│   │   │   └── 📄 userController.ts
│   │   ├── 📁 routes/
│   │   │   └── 📄 user.routes.ts
│   │   └── 📄 index.ts
│   └── 📄 server.ts
│
└── 📁 utils/
