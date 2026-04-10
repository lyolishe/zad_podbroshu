# zad_podbroshu

Backend-сервис на NestJS для приложения социального бесплатного такси. 
## Технологии

- Node.js
- TypeScript
- NestJS 11
- Jest
- ESLint
- Prettier

## Структура проекта

В проекте используется DDD и Clean Architecture.

## Установка

```bash
npm install
```

## Запуск

```bash
# обычный запуск
npm run start

# dev-режим с watch
npm run start:dev

# production-сборка и запуск
npm run build
npm run start:prod
```

Приложение слушает порт из `PORT`, если переменная задана. Иначе используется `3000`.

## Тесты и проверка

```bash
# unit tests
npm test

# e2e tests
npm run test:e2e

# coverage
npm run test:cov

# lint с автоисправлением
npm run lint
```

Фактический статус проверки на момент анализа:

- `npm test -- --runInBand` проходит
- `npm run build` не проходит
