# zad_podbroshu

Backend-сервис на NestJS для приложения социального бесплатного такси. На текущем этапе проект находится в состоянии заготовки: в репозитории есть базовый каркас NestJS и черновая реализация сервиса поездок, но функциональность `rides` ещё не доведена до рабочего состояния.

## Текущее состояние

- Базовый NestJS-приложение запускается через `src/main.ts`.
- Активный и рабочий маршрут сейчас только один: `GET /` возвращает строку `Hello World!`.
- В репозитории есть черновик домена поездок:
  - [`src/rides/rides.controller.ts`](/Users/buttsurfer/Desktop/Projects/zad_podbroshu/src/rides/rides.controller.ts)
  - [`src/rides/rides.service.ts`](/Users/buttsurfer/Desktop/Projects/zad_podbroshu/src/rides/rides.service.ts)
  - [`src/rides/types.ts`](/Users/buttsurfer/Desktop/Projects/zad_podbroshu/src/rides/types.ts)
- Домeн `rides` пока не подключён в [`src/app.module.ts`](/Users/buttsurfer/Desktop/Projects/zad_podbroshu/src/app.module.ts), поэтому его эндпоинты недоступны.
- Сборка проекта сейчас падает из-за типовой ошибки в [`src/rides/rides.controller.ts:11`](/Users/buttsurfer/Desktop/Projects/zad_podbroshu/src/rides/rides.controller.ts:11): контроллер объявлен как синхронный, а сервис возвращает `Promise<Ride[]>`.

## Технологии

- Node.js
- TypeScript
- NestJS 11
- Jest
- ESLint
- Prettier

## Структура проекта

```text
src/
  app.controller.ts
  app.module.ts
  app.service.ts
  main.ts
  data/
    rides.json
  rides/
    rides.controller.ts
    rides.module.ts
    rides.service.ts
    types.ts
test/
  app.e2e-spec.ts
```

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

## Известные проблемы

1. `rides` не импортирован в `AppModule`, поэтому API поездок не опубликован.
2. [`src/rides/rides.module.ts`](/Users/buttsurfer/Desktop/Projects/zad_podbroshu/src/rides/rides.module.ts) пустой.
3. [`src/rides/rides.controller.ts`](/Users/buttsurfer/Desktop/Projects/zad_podbroshu/src/rides/rides.controller.ts) возвращает `Ride[]`, хотя сервис работает асинхронно и возвращает `Promise<Ride[]>`.
4. [`src/rides/rides.service.ts`](/Users/buttsurfer/Desktop/Projects/zad_podbroshu/src/rides/rides.service.ts) читает данные из пути `./rides`, хотя подготовленный JSON-файл лежит в [`src/data/rides.json`](/Users/buttsurfer/Desktop/Projects/zad_podbroshu/src/data/rides.json).
5. Контроллер `rides` реализует только `GET /rides`, хотя сервис уже содержит методы `getRideById`, `createRide`, `updateRideById` и `deleteRideById`.
6. Тесты покрывают только корневой маршрут `GET /`, а домен поездок никак не проверяется.

## Что имеет смысл сделать дальше

1. Создать и подключить полноценный `RidesModule`.
2. Исправить сигнатуры контроллера и довести проект до успешной сборки.
3. Привести файловое хранилище к реальному пути и формату данных.
4. Добавить CRUD-эндпоинты для поездок.
5. Написать unit/e2e-тесты для `rides`.

## Дополнительный контекст

Повторно использовать сведения о проекте удобнее из файла [`PROJECT_CONTEXT.md`](/Users/buttsurfer/Desktop/Projects/zad_podbroshu/PROJECT_CONTEXT.md).
