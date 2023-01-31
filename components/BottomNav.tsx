import React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import { useState } from "react";

const DashRoute = () => <Text>Dashboard</Text>;

const PantryRoute = () => <Text>Pantry</Text>;

const WasteRoute = () => <Text>Waste</Text>;

const AddRoute = () => <Text>Add Item</Text>;

export default function BottomNav() {
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState<any>([
    { key: "dashboard", title: "Dashboard" },
    { key: "pantry", title: "Pantry" },
    { key: "waste", title: "Waste" },
    { key: "add", title: "Add Item" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    dashboard: DashRoute,
    pantry: PantryRoute,
    waste: WasteRoute,
    add: AddRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
