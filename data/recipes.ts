import fs from "fs"

let recipeString = ""
let recipes:Array<object> = []

fs.readFile("data/fullRecipes.json", "utf8", (err, data) => {
  if (err) {
    console.log(err)
    return
  } 
  recipeString = data
  recipes = JSON.parse(recipeString);
  console.log(recipes)
})

export {recipes}


