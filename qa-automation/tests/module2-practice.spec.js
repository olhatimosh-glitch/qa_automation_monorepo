import { test } from '@playwright/test';
const testEmails = [
  'qa@example.com',
  'tester@gmail.com',
  'invalid-email',
  'user@',
  '',
];
// Використовуємо let, тому що значення лічильника буде змінюватися.
let checksPassed = 0;
test('додавання нового email до масиву', async () => {
  console.log('До додавання:', testEmails);
  testEmails.push('another@example.com');
  console.log('Після додавання:', testEmails);
});

test('перевірка кількості рецептів', async () => {
  const recipesFoundText = '12';
  const recipesFound = Number(recipesFoundText);
  const expectedRecipesCount = 12;

  if (recipesFound === 0) {
    console.log('Рецепти не знайдено');
  } else if (recipesFound === expectedRecipesCount) {
    console.log('Кількість рецептів правильна');
  } else {
    console.log('Кількість рецептів інша');
  }
    const recipeAuthor = null;
  const displayedAuthor = recipeAuthor || 'Автор невідомий';

  console.log(displayedAuthor);
});

test('перевірка email у циклі', async () => {
  const emailsToCheck = [...testEmails, 'another@example.com'];

  for (const email of emailsToCheck) {
    if (email === '') {
  console.log('Порожній email пропущено');
  continue;
}
checksPassed++;
console.log('Перевірено:', email);
if (email === 'another@example.com') {
  console.log('Потрібний email знайдено, цикл зупинено');
  break;
}
  }
  console.log('Успішних перевірок:', checksPassed);
});

test('зменшення часу приготування через цикли', async () => {
  let cookingTime = 90;

  while (cookingTime >= 30) {
    cookingTime -= 10;
    console.log('while:', cookingTime);
  }
    let doWhileCookingTime = 90;

  do {
    doWhileCookingTime -= 10;
    console.log('do...while:', doWhileCookingTime);
  } while (doWhileCookingTime >= 30);

  // Якщо початковий час менший за 30, while не виконається, а do...while виконається один раз.
});