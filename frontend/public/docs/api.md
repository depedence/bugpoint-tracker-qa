# Bugpoint API

## Базовый URL

http://localhost:5000/api/bugs

---

## GET /api/bugs

Получить список всех багов.

**Пример ответа:**

```json
[
    {
        "id": "abc123",
        "title": "Ошибка в форме",
        "description": "Не отображается кнопка",
        "priority": "high",
        "status": "open",
        "createdAt": "2025-06-25T10:00:00.000Z"
    }
]
```

## POST /api/bugs

Создание нового тикета.

**Тело запроса:**

```json
{
    "title": "Тестовый баг",
    "description": "Описание тестового бага",
    "status": "open",
    "priority": "low"
}
```

**Пример ответа:**

```json
[
    {
        "id": "50c8edf9-450b-4b83-9771-2b5137aa1a8a",
        "title": "Тестовый баг",
        "description": "Описание тестового бага",
        "status": "open",
        "priority": "low",
        "createdAt": "2025-07-03T11:30:35.796Z"
    }
]
```

## DELETE /api/bugs

Удаление бага по его уникальному `id`

**Тело запроса:**

```json
{
    "id": "{{bugId}}"
}
```

**Пример ответа:**

```json
{
    "message": "Bug deleted successfully"
}
```
