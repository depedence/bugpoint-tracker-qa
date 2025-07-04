# JSON-структура бага

Все баги хранятся в файле `bugs.json` в виде массива.

## Пример записи

```json
{
  "id": "abc123",
  "title": "Ошибка при регистрации",
  "description": "Не приходит подтверждение на email",
  "status": "open",
  "priority": "high",
  "createdAt": "2025-06-25T14:30:00.000Z"
}
```

| Поле          | Тип    | Описание                         |
| ------------- | ------ | -------------------------------- |
| `id`          | string | Уникальный идентификатор бага    |
| `title`       | string | Название бага                    |
| `description` | string | Подробное описание               |
| `status`      | string | `open` или `closed`              |
| `priority`    | string | `low`, `medium`, `high`          |
| `createdAt`   | string | Дата и время создания (ISO-8601) |
