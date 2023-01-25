import { View, StyleSheet, Text } from "react-native"



export default function Homepage() {
    return(
        <View style={styles.header}>
            <Text>fuud.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignSelf: "center",
    }
})