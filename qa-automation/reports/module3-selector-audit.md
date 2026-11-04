# Аудит локаторів і DOM Tasteorama

## Крок 2. Пріоритет атрибутів: форма входу
| Елемент | Доступні атрибути | Пріоритет за шкалою | Обраний локатор | Чому саме він |
| --- | --- | --- | --- | --- |
| Поле email | `id="email"`, `placeholder="email@gmail.com"`, `type="email"`, `name="email"`, `class="LoginPage-module_input_A0yfe LoginPage-module_inputError_Df4zj"` | 2 — `id` | `#email` | `data-testid` відсутній, тому обрано стабільний `id`; перевірка повернула 1 елемент. |
| Поле пароля | `id="password"`, `placeholder="*********"`, `type="password"`, `name="password"`, `class="LoginPage-module_input_A0yfe"` | 2 — `id` | `#password` | `data-testid` відсутній, тому обрано стабільний `id`; перевірка повернула 1 елемент. |
| Кнопка входу | `type="submit"`, `class="LoginPage-module_loginBtn_asHm3"` | 4 — атрибут `type` | `button[type="submit"]` | Атрибути вищого пріоритету відсутні, тому обрано `type`; перевірка повернула 1 елемент. |

## Крок 3. DOM-дерево карток рецептів: три питання і комбінатор
### Чекліст читання DOM-дерева кнопки збереження

- Однакових сусідів: 1 - кнопка `Learn more` того самого тегу `button`.
- Найближчий унікальний предок: `article` конкретної картки, яку можна визначити за назвою рецепта.
- Кнопка збереження є глибшим нащадком `article`, а не прямою дитиною, тому що між ними є вкладені `div`.

| Пара | Правильний комбінатор | Перевірка в Console | Результат |
| --- | --- | --- | --- |
| `article` → назва рецепта | пробіл — глибший нащадок | `article > p[data-testid='Recipe title']` → 0; `article p[data-testid='Recipe title']` → 12 | Назва вкладена всередину через `div`, тому потрібен пробіл. |
| `article` → кнопка збереження | пробіл — глибший нащадок | `article > button[data-testid='Save recipe button']` → 0; `article button[data-testid='Save recipe button']` → 12 | Кнопка вкладена всередину через `div`, тому потрібен пробіл. |
## Крок 4. DevTools-діагностика: сценарій «неправильний пароль»
### Результат перевірки неправильного пароля

- Введено email `goit@gmail.com` і неправильний пароль `wrong123`.
- Після натискання `Login` з’явилося сповіщення `UnauthorizedError`.
- Селектор сповіщення: `.Toastify__toast--error[role="alert"]`.
- Перевірка `$$('.Toastify__toast--error[role="alert"]').length` повернула `1`.
- У Console з’явився червоний запис: `POST http://localhost:4040/api/auth/login 401 (Unauthorized)`. Жовтих записів застосунку не було.
- Окремий запис `favicon.ico 404` не стосується сценарію входу.
- У Network запит `login` мав статус `401` і час `101 ms`.

## Крок 5. CSS-селектори реєстрації: атрибути, комбінатори, псевдокласи
| Що перевірено | Команда в Console | Результат |
| --- | --- | --- |
| Усі поля пароля | `$$('input[type="password"]').length` | 2 |
| Конкретне поле повторного пароля | `$$('#repeatPassword').length` | 1 |
| Чекбокс як пряма дитина `label` | `$$('label > input[type="checkbox"]').length` | 1 |
| `span` одразу після чекбокса | `$$('input[type="checkbox"] + span').length` | 1 |
| Стан `:checked` до кліку | `$$('input[type="checkbox"]:checked').length` | 0 |
| Стан `:checked` після кліку | `$$('input[type="checkbox"]:checked').length` | 1 |
| Усі неактивні кнопки на першій сторінці без активних фільтрів | `$$('button:disabled').length` | 2 |
| Неактивна стрілка попередньої сторінки | `$$('button[aria-label="previous page"]:disabled').length` | 1 |

## Підсумкова таблиця
| Елемент | Сторінка | Обраний CSS-селектор | Чому саме він |
| --- | --- | --- | --- |
| Поле email | Login | `#email` | Стабільний унікальний `id`. |
| Поле пароля | Login | `#password` | Стабільний унікальний `id`. |
| Кнопка входу | Login | `button[type="submit"]` | Атрибути вищого пріоритету відсутні, а селектор повертає один елемент. |
| Назва рецепта всередині картки | Головна | `article p[data-testid="Recipe title"]` | Назва є глибшим нащадком `article` і має `data-testid`. |
| Кнопка збереження всередині картки | Головна | `article button[data-testid="Save recipe button"]` | Кнопка є глибшим нащадком картки та має `data-testid`. |
| Повідомлення про помилку входу | Login | `.Toastify__toast--error[role="alert"]` | Знаходить одне сповіщення саме з помилкою. |
| Поле повторного пароля | Register | `#repeatPassword` | `id` звужує два поля пароля до одного. |
| Чекбокс усередині `label` | Register | `label > input[type="checkbox"]` | `>` перевіряє пряме вкладення чекбокса. |
| `span` після чекбокса | Register | `input[type="checkbox"] + span` | `+` знаходить найближчого наступного сусіда. |
| Вибраний чекбокс | Register | `input[type="checkbox"]:checked` | `:checked` перевіряє стан галочки. |
| Неактивна стрілка назад | Головна | `button[aria-label="previous page"]:disabled` | `aria-label` визначає потрібну кнопку, а `:disabled` — її стан. |