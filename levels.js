export const levels = [
  {
    title: "Уровень 1",
    layout: 'flex',
    widePond: false, 
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
    widePond: false, // ширина pond (true только для selector-targeting)
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
  widePond: false, // 
  defaultCSS: "margin-left: ;",
  correctCSS: "margin-left: 70%;",
  flowerPosition: "center-right",
  instruction: "Используй margin или padding, чтобы подвинуть пчёлку ближе к правой стороне, но не до конца.",
  feedback: 'Отлично!',
  tips: [
    { code: "margin-left: 10;", description: "Применен для пчелки по умолчанию" }
  ]
},
{
  title: "Уровень 4",
  layout: "selector-targeting",
  defaultCSS: "",
  widePond: true,
  beeColumnAlign: "flex-start",
  flowerColumnAlign: "flex-end",
  beeColors: ["red", "yellow", "blue"],
  flowerColors: ["red", "yellow", "blue"],
  beeAlign: {
    red: 'center',
    yellow: 'left',
    blue: 'left'
  },
  flowerAlign: {
    red: 'right',
    yellow: 'right',
    blue: 'right'
  },
  targetBeeColor: "yellow", // нужный цвет
  feedback: 'Отлично!',
  tips: [
    { code: "Задание:", description: "Нужно посадить  желтую пчелку на желтый цветок" },
    { code: ".bee.red", description: "Выбирает красную пчелу" },
    { code: ".bee.yellow", description: "Выбирает жёлтую пчелу" },
    { code: ".bee.blue", description: "Выбирает синюю пчелу" }
  ]
},
{
  title: "Уровень 5",
  layout: "selector-targeting",
  widePond: true,
  beeColumnAlign: "center",
  flowerColumnAlign: "center",
  beeAlign: {
    red: 'left',
    yellow: 'left',
    blue: 'left'
  },
  flowerAlign: {
    red: 'center',
    yellow: 'center',
    blue: 'center'
  },
  beeColors: ["red", "yellow", "blue"],
  flowerColors: ["red", "yellow", "blue"],
  targetBeeColor: "red", // нужный цвет
  feedback: 'Отлично!',
  tips: [
    { code: "Задание:", description: "Нужно посадить красную пчелку на красный цветок" },
    { code: ".bee.red", description: "Выбирает красную пчелу" },
    { code: ".bee.yellow", description: "Выбирает жёлтую пчелу" },
    { code: ".bee.blue", description: "Выбирает синюю пчелу" }
  ]
},
{
  title: "Уровень 6",
  layout: "selector-targeting",
  widePond: true,
  beeColumnAlign: "center",
  flowerColumnAlign: "center",
  beeAlign: {
    red: 'right',
    yellow: 'right',
    blue: 'right'
  },
  flowerAlign: {
    red: 'left',
    yellow: 'left',
    blue: 'left'
  },
  beeColors: ["red", "yellow", "blue"],
  flowerColors: ["red", "yellow", "blue"],
  targetBeeColor: "blue", // нужный цвет
  feedback: 'Отлично!',
  tips: [
    { code: "Задание:", description: "Нужно посадить голубую пчелку на голубой цветок" },
    { code: ".bee.red", description: "Выбирает красную пчелу" },
    { code: ".bee.yellow", description: "Выбирает жёлтую пчелу" },
    { code: ".bee.blue", description: "Выбирает синюю пчелу" }
  ]
},

{
  title: "Уровень 7",
  layout: 'flex',
  widePond: false,
  defaultCSS: 'justify-content: ;',
  correctCSS: 'justify-content: flex-end;',
  flowerPosition: 'right',
  instruction: 'Используй justify-content, чтобы поместить пчёлку рядом с цветком справа.',
  feedback: 'Отлично!',
  tips: [
    { code: 'flex-end', description: 'Пчёлка окажется справа' }
  ]
},

{
  title: "Уровень 8",
  layout: "custom",
  widePond: false,
  defaultCSS: "padding-left: ;",
  correctCSS: "padding-left: 20%;",
  flowerPosition: "center",
  instruction: "Добавь пчёлке отступ слева с помощью padding, чтобы приблизить её к центру.",
  feedback: 'Отлично!',
  tips: [
    { code: 'padding-left', description: 'Задаёт внутренний отступ слева' }
  ]
},

{
  title: "Уровень 9",
  layout: 'text-align',
  widePond: false,
  defaultCSS: 'text-align: ;',
  correctCSS: 'right;',
  flowerPosition: 'right',
  instruction: 'Используй text-align, чтобы выровнять пчёлку справа.',
  feedback: 'Отлично!',
  tips: [
    { code: 'text-align: right', description: 'Выровняет содержимое по правому краю' }
  ]
},

{
  title: "Уровень 10",
  layout: "selector-targeting",
  widePond: true,
  beeColumnAlign: "center",
  flowerColumnAlign: "center",
  beeAlign: {
    red: 'left',
    yellow: 'left',
    blue: 'left'
  },
  flowerAlign: {
    red: 'center',
    yellow: 'right',
    blue: 'right'
  },
  beeColors: ["red", "yellow", "blue"],
  flowerColors: ["red", "yellow", "blue"],
  checkAllBees: true,
  feedback: 'Отлично!',
  tips: [
    { code: "Задание:", description: "Расположи всех пчёлок на соответствующие цветочки" },
    { code: ".bee.red", description: "Выбирает красную пчелу" },
    { code: ".bee.yellow", description: "Выбирает жёлтую пчелу" },
    { code: ".bee.blue", description: "Выбирает синюю пчелу" }
  ]
},

{
  title: "Уровень 11",
  layout: "custom",
  widePond: false,
  defaultCSS: "margin-left: ;",
  correctCSS: "margin-left: 50%;",
  flowerPosition: "center",
  instruction: "Используй margin-left, чтобы поставить пчёлку точно под цветком.",
  feedback: 'Отлично!',
  tips: [
    { code: 'margin-left', description: 'Смещает элемент вправо' }
  ]
}

];
