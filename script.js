const { select, input, checkbox } = require('@inquirer/prompts')

let goal = {
  value: 'Drink 3 liters of water a day',
  checked: false,
}
let goals = [ goal ]

const registerGoal = async () => {
  const goal = await input({ message: "Enter a goal:" })

  if(goal.length == 0) {
    console.log("The goal can't be empty!");
    return
  }

  goals.push({ 
    value: goal,
    checked: false,
   })
}

const listGoal = async () => {
  const answers = await checkbox({
    message: "Use <arrows> to navigate, press <space> to select and <enter> to proceed.",
    choices: [...goals],
    instructions: false,
  })

  if(answers.length == 0) {
    console.log("No goal selected!");
    return
  }

  goals.forEach((objective) => {
    objective.checked = false
  })

  answers.forEach((answer) => {
    const goal = goals.find((objective) => {
      return objective.value == answer
    })

    goal.checked = true
  })

  console.log("Goals marked as completed!");
}

const start = async () => {
   
  while(true) {

    const option = await select({
      message: "Menu >",
      choices: [
        {
          name: "Register goal",
          value: "register"
        },
        {
          name: "List goal",
          value: "list"
        },
        {
          name: "Exit",
          value: "exit"
        }
      ]
    })

    switch (option) {
      case "register":
        await registerGoal();
        console.log(goals);
        break;
      case "list":
        await listGoal();
        break;
      case "exit":
        console.log("See you soon!");
        return
    }
  }
  // console.log("Starting")
}

start()