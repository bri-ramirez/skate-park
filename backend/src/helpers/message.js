import chalk from "chalk";

export const successMessage = (message) => {
  console.log(chalk.bgGreen.black.bold(message));
}

export const errorMessage = (message) => {
  console.log(chalk.bgRedBright.bold(message));
}

export const titleMessage = (message) => {
  console.log(chalk.bgBlue.white.bold(message));
  console.log();
}

export const tableMessage = (message) => {
  console.table(message);
}