## Rodando localmente

Instale as dependências

```bash
  npm install
```

Inicie o server das APIs

```bash
  npm run dev
```

## Documentação da API

### Retorna os hábitos resumidos
```http
  GET /summary
```
_Preview:_
```json
[
  {
    "id": "60c15fd6-e556-4e62-8e0e-5937df7fbcfa",
    "date": "2023-01-06T03:00:00.000Z",
    "amount": 1,
    "complete": 0
  },
]
```

### Retorno todos os hábitos do dia e concluidos
```http
  GET /day?date=2023-01-04T22:00:00.000z
```
| Parâmetro | Tipo | Descrição |
| :- | :- | :-|
| `date` | `string` | **Obrigatório**. A data para retorno dos hábitos 

_Preview:_
```json
{
	"possibleHabits": [
		{
			"id": "00880d75-a933-4fef-94ab-e05744435297",
			"title": "Exercitar",
			"created_at": "2023-01-03T06:00:00.000Z"
		},
	],
	"completedHabits": [
		"00880d75-a933-4fef-94ab-e05744435297",
	]
}
```

### Adiciona Hábitos
```http
  POST /habits
```
_Body:_
```json
{
	"title": "Exemplo de Hábitos",
	"weekDays": [0, 1, 2]
}
```
| Parâmetro | Tipo | Descrição |
| :- | :- | :- |
| `title` | `string` | **Obrigatório**. Nome do hábito |
| `weekDays` | `number[]` | **Obrigatório**. Dia da semana para a recorrência do hábito. Domingo = 0 ... Sábado = 6 |

### Toggle de hábitos
```http
  PATCH /habits/:id/toggle
```
| Parâmetro | Tipo | Descrição |
| :- | :- | :- |
| `id` | `string` | **Obrigatório**. Id do hábito a ser alterado o estado de concluído |