class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.quizContainer = document.getElementById("quiz-container");
    this.nextButton = document.createElement("button");
    this.nextButton.textContent = "Next";
    this.nextButton.disabled = true;
    this.nextButton.addEventListener("click", this.nextQuestion.bind(this));
    this.quizContainer.appendChild(this.nextButton);

    this.renderQuestion();
  }

  renderQuestion() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const questionSection = document.createElement("section");
    questionSection.classList.add("question");

    const questionTitle = document.createElement("h2");
    questionTitle.textContent = currentQuestion.question;
    questionSection.appendChild(questionTitle);

    currentQuestion.choices.forEach((choice) => {
      const choiceDiv = document.createElement("div");
      choiceDiv.className = "choiceButton";

      // ChoiceDiv click event to check the radio button
      choiceDiv.addEventListener("click", () => {
        const choiceInput = choiceDiv.querySelector("input");
        choiceInput.checked = true;
        this.nextButton.disabled = false;

        let explanationSection = document.getElementById("explanation");
        if (!explanationSection) {
          explanationSection = document.createElement("section");
          explanationSection.id = "explanation";
          this.quizContainer.appendChild(explanationSection);
        }
        explanationSection.textContent = currentQuestion.explanation;

        let imageElement = document.getElementById("questionImage");
        if (!imageElement) {
          imageElement = document.createElement("img");
          imageElement.id = "questionImage";
          imageElement.alt = "Image for question";
          this.quizContainer.appendChild(imageElement);
        }
        imageElement.src = currentQuestion.explanationImage;
      });

      const choiceInput = document.createElement("input");
      choiceInput.type = "radio";
      choiceInput.name = "choice";
      choiceInput.id = choice;
      choiceInput.value = choice;
      choiceInput.addEventListener("change", () => {
        this.nextButton.disabled = false;
      });

      const choiceLabel = document.createElement("label");
      choiceLabel.textContent = choice;
      choiceLabel.htmlFor = choice;

      choiceDiv.appendChild(choiceInput);
      choiceDiv.appendChild(choiceLabel);

      questionSection.appendChild(choiceDiv);
    });

    this.quizContainer.innerHTML = "";
    this.quizContainer.appendChild(questionSection);
    this.quizContainer.appendChild(this.nextButton);
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.renderQuestion();
      this.nextButton.disabled = true;
    } else {
      this.quizContainer.textContent = "End of Quiz";
    }
  }
}

// Fetch questions from JSON file
fetch("./questions.json")
  .then((response) => response.json())
  .then((data) => {
    const quiz = new Quiz(data.questions);
  })
  .catch((error) => console.error("Error fetching questions:", error));
