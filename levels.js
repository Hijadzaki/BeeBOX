export const levels = [
  {
    title: "Уровень 1",
    layout: 'flex',
    defaultCSS: 'justify-content: ;',
    correctCSS: 'justify-content: center;',
    flowerPosition: 'right', 
    instruction: 'Используй justify-content, чтобы выровнять пчелку.',
    feedback: 'Отлично!',
    tips: [
      { code: 'flex-start', description: 'применен для пчелки по умолчанию' },
    ]
  },
  {
    title: "Уровень 2",
    layout: 'text-align',
    defaultCSS: 'text-align: ;',
    correctCSS: 'center;',
    flowerPosition: 'left',
    instruction: 'Используй text-align, чтобы выровнять пчелку по центру.',
    feedback: 'Отлично!',
    tips: [
      { code: 'text-align: center', description: 'Применен для пчелки по умолчанию' }
    ]
  },
{
  
  title: "Уровень 3",
  layout: "custom", 
  defaultCSS: "margin-left: ;",
  correctCSS: "margin-left: 70%;",
  flowerPosition: "center-right",
  instruction: "Используй margin или padding, чтобы подвинуть пчёлку ближе к правой стороне, но не до конца.",
  feedback: 'Отлично!',
  tips: [
    { code: "margin-left: 10;", description: "Применен для пчелки по умолчанию" }
  ]
}


];
