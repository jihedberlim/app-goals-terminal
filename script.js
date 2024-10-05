const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let message = "Welcome to the Goals App";

let goals

const loadGoals = async () => {
  try {
    const data = await fs.readFile("goals.json", "utf-8")
    goals = JSON.parse(data)
  }
  catch(error) {
    goals = []
  }
}

const saveGoals = async () => {
  await fs.writeFile("goals.json", JSON.stringify(goals, null, 2))
}

const registerGoal = async () => {
  const goal = await input({ message: "Enter a goal:" })

  if (goal.length == 0) {
    message = "The goal can't be empty!";
    return
  }

  goals.push({
    value: goal,
    checked: false,
  })

  message = "Goal successfully registered!"
}

const listGoal = async () => {
  if(goals.length == 0) {
    message = "There are no goals!"
    return
  }

  const answers = await checkbox({
    message: "Use <arrows> to navigate, press <space> to select and <enter> to proceed.",
    choices: [...goals],
    instructions: false,
  })

  goals.forEach((objective) => {
    objective.checked = false
  })

  if (answers.length == 0) {
    message = "No goal selected!";
    return
  }

  answers.forEach((answer) => {
    const goal = goals.find((objective) => {
      return objective.value == answer
    })

    goal.checked = true
  })

  message = "Goals marked as completed!";
}

const realizedGoal = async () => {
  if(goals.length == 0) {
    message = "There are no goals!"
    return
  }

  const realized = goals.filter((goal) => {
    return goal.checked
  })

  if (realized.length == 0) {
    message = "No targets achieved!";
    return
  }

  await select({
    message: "Realized Goals: " + realized.length,
    choices: [...realized]
  })
}

const openGoal = async () => {
  if(goals.length == 0) {
    message = "There are no goals!"
    return
  }

  const opened = goals.filter((goal) => {
    return goal.checked != true
  })

  if (opened.length == 0) {
    message = "No open goals!";
    return
  }

  await select({
    message: "Open Goals: " + opened.length,
    choices: [...opened]
  })
}

const deleteGoal = async () => {
  if(goals.length == 0) {
    message = "There are no goals!"
    return
  }

  const unmarkedGoals = goals.map((goal) => {
    return { value: goal.value, checked: false }
  })

  const itemsToDelete = await checkbox({
    message: "Press <space> to select an item to delete and <enter> to proceed.",
    choices: [...unmarkedGoals],
    instructions: false,
  })

  if(itemsToDelete.length == 0) {
    message = "No items to delete";
    return
  }

  itemsToDelete.forEach((item) => {
    goals = goals.filter((goal) => {
      return goal.value != item
    })
  })

  message = "Goals successfully deleted!";
}

const showMessage = () => {
  console.clear();

  if(message != "") {
    console.log(message)
    console.log("")
    message = ""
  }
}

const start = async () => {
  await loadGoals()

  while (true) {
    showMessage()
    await saveGoals()

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
          name: "Realized goal",
          value: "realized"
        },
        {
          name: "Open goal",
          value: "open"
        },
        {
          name: "Delete goal",
          value: "delete"
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
        break;
      case "list":
        await listGoal();
        break;
      case "realized":
        await realizedGoal();
        break;
      case "open":
        await openGoal();
        break;
      case "delete":
        await deleteGoal();
        break;
      case "exit":
        console.log("See you soon!");
        return
    }
  }
  // console.log("Starting")
}

start()