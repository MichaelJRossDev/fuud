import fs from "fs"
import { modulePaths } from "../jest.config"

let recipes = {}

fs.readFile("data/fullRecipes.json", "utf8", async (err, data) => {
  if (err) {
    console.log(err)
    return
  } else {
    recipes = await JSON.parse(data)
    console.log(recipes)
  }
})

export { recipes }

