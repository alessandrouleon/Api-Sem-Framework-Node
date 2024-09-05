# Estrutura do Projeto

Este projeto segue os princípios de Clean Architecture e SOLID, utilizando Node.js e TypeScript "Sem framwork". Abaixo está a estrutura das pastas e uma breve descrição de cada uma delas.

## Estrutura de Pastas

```plaintext
📁src/
│
├── 📁 application/
│   ├── 📁 dtos/
|   |   ├── 📁 users/
│   │   |   └── 📄 CreateUserDTO.ts
|   |   |   └── 📄 UpdateUserDTO.ts
│   ├── 📁 repositories/
│   │   └── 📄 UserRepository.ts
│   ├── 📁 services/
│   │   └── 📄 EncryptionService.ts
│   ├── 📁 useCases/
│   |   ├── 📁 users/
│   │   |   └── 📄 CreateUserUseCase.ts
│   │   |   └── 📄 DeleteUserUseCase.ts
│   │   |   └── 📄 GetUserUseCase.ts
│   │   |   └── 📄 UpdateUserUseCase.ts
|   ├── 📁 validators/
│   │   └── 📄 UserValidator.ts
|
├── 📁 domain/
│   ├── 📁 entities/
│   |   ├── 📁 users/
│   |   |   ├── 📁 valueObjects
|   |   |   |   └── 📄 Email.ts
|   |   |   |   └── 📄 Password.ts
│   │   |   └── 📄 UserEntity.ts
│   ├── 📁 repositories/
│   │   └── 📄 IUserRepository.ts
│
├── 📁 infraestrutura/
│   ├── 📁 database/
│   │   ├── 📁 queries/
│   │   │   └── 📄 UserQueries.ts
│   │   ├── 📁 scripts/
│   │   │   └── 📄 create_table.sql
|   |   └── 📄 PostgresConnection.ts
│   ├── 📁 errors/
│   │   └── 📄 AppError.ts
│   ├── 📁 http/
│   │   ├── 📁 controllers/
│   │   │   └── 📄 UserController.ts
│   │   ├── 📁 routes/
│   │   │   └── 📄 user.routes.ts
│   │   └── 📄 index.ts
│   └── 📄 server.ts
|
├── ├── 📁 utils/
│   |   └── 📄 customRouter.ts
|   |   └── 📄 httpHelpers.ts
