import fs from "fs"

let recipeString = ""

fs.readFile("data/fullRecipes.json", "utf8", (err, data) => {
  if (err) {
    console.log(err)
    return
  } 
  recipeString = data
  console.log(recipeString)
})

let recipes = JSON.parse(recipeString)

console.log(recipes)