import fs from "fs"

let recipeString = ""


recipeString = fs.readFileSync("data/fullRecipes.json", "utf8")

let recipes = JSON.parse(recipeString).recipes;



export { recipes }


