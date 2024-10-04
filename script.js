const { select } = require('@inquirer/prompts')

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
        console.log("Let's register!");
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