import chalk from "chalk";

class Messager {
  serverMessage(message: string) {
    console.log(chalk.blue("[Server] " + message + " - " + this.getDateTime()))
  }

  databaseMessage(message: string) {
    console.log(chalk.green("[Database] " + message + " - " + this.getDateTime()))
  }

  errorMessage(message: string) {
    console.log(chalk.red("[Error] " + message + " - " + this.getDateTime()))
  }

  private getDateTime() {
    const date: Date = new Date() 
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }
}

export default new Messager();