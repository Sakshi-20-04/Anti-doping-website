const quizData = [
    {
      question: 'Which of the following is NOT a category of prohibited substances according to the World Anti-Doping Agency (WADA)?',
      options: ['S1 - Anabolic Androgenic Steroids (AAS)', 'S2 - Peptide Hormones, Growth Factors, Related Substances and Mimetics','S3 - Beta-2 Agonists', 'S4 - Masking Agents' ],
      answer: 'S4 - Masking Agents',
    },
    {
      question: 'Stimulants like cocaine are prohibited because they:',
      options: ['Increase muscle mass','Enhance endurance','Improve reaction time','All of the above'],  
      answer: 'All of the above',
    },
    {
      question:  'EPO (Erythropoietin) is a synthetic hormone that stimulates the production of:',

      options: ['Testosterone','Red blood cells','Growth hormone','Insulin' ],
      answer: 'Red blood cells',
    },
    {
      question: 'Diuretics are banned because they can be used to:',
      options: ['Enhance recovery','Mask the presence of other drugs','Reduce fatigue','Increase strength'],
      answer: 'Mask the presence of other drugs',
    },
    {
      question: ' Gene doping involves manipulating an athletes genes to:',
      options: [
        'Improve muscle size',
        'Enhance recovery time',
        'Increase oxygen uptake',
        'All of the above'],
      answer: 'All of the above',
    },
    {
      question: ' Which of the following is a legal supplement commonly used by athletes?',
      options: [ 'Erythropoietin (EPO)',
        'Creatine (within allowed limits)',
        'Human Growth Hormone (HGH)',
        'Anabolic Steroids'  
   ],
      answer: 'Creatine (within allowed limits)',
    },
    {
      question: 'Athletes can apply for a Therapeutic Use Exemption (TUE) to use a prohibited substance if:',
      options: [
        'They have a medical condition',
        'The substance has a legitimate therapeutic use',
        'The substance does not enhance performance',
        'All of the above' 
      ],
      answer: 'All of the above',
    },
    {
      question: 'The blood passport program monitors athletes blood profiles to detect:',
      options: [ 
        'Use of stimulants',
        'Abnormal changes in red blood cell count',
        'Presence of masking agents',
        'Use of diuretics ' 
   ],
      answer: 'Abnormal changes in red blood cell count',
    },

    {
      question: 'The maximum number of times an athlete can be tested each year is?',
      options: ['2','4','6','unlimited'],  
      answer: 'unlimited',
    },

  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();