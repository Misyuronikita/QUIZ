const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');

const numberOfQuestion =  document.getElementById('number-of-question'),
    numberOfAllQuestions = document.getElementById('number-of-all-questions'); 
let indexOfQuestion,
    indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0;

const correctAnswer = document.getElementById('correct-answer'),
    numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
    btnTryAgain = document.getElementById('btn-try-again');
const questions = [
    {
        question: 'Какое мировоззрение основано на вере в сверхъестественные силы?',
        options: [
            'Научное',
            'Религиозное',
            'Философское',
            'Конспирологическое',
        ],
        rightAnswer: 1
    },
    {
        question: 'Кто был основоположником позитивизма?',
        options: [
            'Дзюма Харингтон',
            'Колос Абрамович',
            'Опост Конт',
            'Грэг Дрэй',
        ],
        rightAnswer: 2
    },
    {
        question: 'Когда философия стала наукой?',
        options: [
            'IX век',
            'XII век',
            'XVIII век',
            'XIX век',
        ],
        rightAnswer: 3
    },
    {
        question: 'Учение о бытие - это?',
        options: [
            'Онтология',
            'Псевастология',
            'Теоварология',
            'Эвиология',
        ],
        rightAnswer: 0
    },
    {
        question: 'Инстинкт жизни - это?',
        options: [
            'Эрос',
            'Танос',
            'Танатос',
            'Регатос',
            
        ],
        rightAnswer: 0
    },
    {
        question: 'Какой философской школы не существовало?',
        options: [
            'Милетской',
            'Геродотской',
            'Элейской',
            'Пифагорской',
            
        ],
        rightAnswer: 1
    },
    {
        question: 'Кому принадлежат эти слова: «Не делай другим того, чего не желаешь себе»"',
        options: [
            'Будда',
            'Конфуций',
            'Сократ',
            'Аристотель',
            
        ],
        rightAnswer: 1
    },
    {
        question: 'Что такое "Даосизм"?',
        options: [
            'Религия в Китае',
            'Мировоззрение в Индии',
            'Культура Шри-Ланки',
            'Философское течение в Японии',
            
        ],
        rightAnswer: 0
    },
    {
        question: 'Подберите синоним к слову "Ренесанс"',
        options: [
            'Гуманизм',
            'Готика',
            'Богослужение',
            'Эпоха возрождения',
            
        ],
        rightAnswer: 3
    },
    {
        question: 'Человек, который отрицает существование Бога?',
        options: [
            'Теист',
            'Атеист',
            'Агностик',
            'Пантеист',
            
        ],
        rightAnswer: 1
    },
];

numberOfAllQuestions.innerHTML = questions.length;

const load = () =>{
    question.innerHTML = questions[indexOfQuestion].question;
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
}

let complitedAnswers = [];
const randomQuestion = () =>{
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if(indexOfPage == questions.length){
        quizOver()
    } else {
        if(complitedAnswers.length > 0){
            complitedAnswers.forEach(item => {
                if (item == randomNumber){
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate){
                randomQuestion();
            }else{
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(complitedAnswers.length == 0){
            indexOfQuestion=randomNumber;
            load();
        }
    }
    complitedAnswers.push(indexOfQuestion);
}

const checkAnswer = el =>{
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    }else{
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}
for(option of optionElements){
    option.addEventListener('click', e => checkAnswer(e));
}

disabledOptions = () =>{
    optionElements.forEach(item =>{
        item.classList.add('disabled')
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer){
            item.classList.add('correct');
        }
    })
}

const enableOptions = () =>{
    optionElements.forEach(item =>{
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () =>{
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status =>{
    answersTracker.children[indexOfPage-1].classList.add(`${status}`);
}

const validate = () =>{
    if(!optionElements[0].classList.contains('disabled')){
        alert('Вам нужно выбрать хотя бы один вариант ответа');
    } else{
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () =>{
   document.querySelector('.quiz-over-modal').classList.add('active');
   correctAnswer.innerHTML = score;
   numberOfAllQuestions2.innerHTML = questions.length;

};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () =>{
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})
