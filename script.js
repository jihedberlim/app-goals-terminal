const { select, input } = require('@inquirer/prompts')

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
        console.log("Let's list!");
        break;
      case "exit":
        console.log("See you soon!");
      
        return
    }
  }
  // console.log("Starting")
}

start()