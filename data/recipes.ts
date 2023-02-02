import FileSystem from "expo-file-system"

let recipeString: any;


const parseRecipes = async () => {
    recipeString = await FileSystem.readAsStringAsync("data/fullRecipes.json", "utf8")
    const recipes = await JSON.parse(recipeString).recipes;
    console.log(recipes)
}
parseRecipes()







//export { recipes }


