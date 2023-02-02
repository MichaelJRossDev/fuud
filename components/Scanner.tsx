import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { getItemInfoByBarcode } from "../src/pantry";

export default function Scanner({setOpenScanner, setName, setQuantity,  setUnit, setShow}) {
    const [hasPermission, setHasPermission] = useState<any>(null);
    const [scanned, setScanned] = useState<boolean>(false);
    

    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      };
      getBarCodeScannerPermissions();
    }, []);
    const handleBarCodeScanned = ({ data }) => {
      setScanned(true);
      setOpenScanner(false);
      const getItem = async () => {
        const barcodeItem = await getItemInfoByBarcode(data);
        setName(barcodeItem.name)
        setQuantity(barcodeItem.quantity)
        setUnit(barcodeItem.unit);
      }
      getItem();
      alert("Set Expiry Date")      
    };
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

      return (
        <View style={StyleSheet.absoluteFillObject}>
          <BarCodeScanner
            style={styles.scanner}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
          <TouchableOpacity
            onPress={() => {
              setOpenScanner(false);
            }}
            style={styles.scannerCancelBtn}
          >
            <Text style={styles.cancelText}> Cancel </Text>
          </TouchableOpacity>
        </View>
      );
    }


const styles = StyleSheet.create({
  scanner: {
    height: "80%",
  },

  scannerCancelBtn: {
    width: "80%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d08651",
    height: "10%",
    alignSelf: "center",
    },
  
  cancelText: {
    color: "#f5f6f4",
  },
});