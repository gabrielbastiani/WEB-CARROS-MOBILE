import { View, Text, StyleSheet, Pressable, DimensionValue, Image } from "react-native";
import { CarProps } from "../../types/cars.type";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../routes";

interface CarItemProps {
    data: CarProps;
    widthScreen: DimensionValue;
    enableRemove?: boolean;
    removeItem?: () => Promise<void>;
}

export function CarItem({ data, widthScreen, enableRemove = false, removeItem }: CarItemProps) {

    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

    function handleNavigate() {
        navigation.navigate("detail", { id: data.id });
    }

    async function handleRemove() {
        if (!removeItem) return;
        await removeItem();
    }

    return (
        <Pressable
            style={[styles.container, { width: widthScreen }]}
            onPress={handleNavigate}
            onLongPress={enableRemove ? handleRemove : () => { }}
        >
            <Image
                style={styles.cover}
                src={"http://192.168.9.140:3333/files/" + data.image_car.set[0]}
                resizeMode="cover"
            />

            <Text style={styles.title}>{data.name}</Text>
            <Text style={styles.text}>{data.year_car} - {data.km_car} km</Text>
            <Text style={[styles.title, { marginTop: 14, }]}>R$ {data.price_car}</Text>

            <View style={styles.divisor}></View>
            <Text style={[styles.text, { marginTop: 4 }]}>{data.city}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#FFF",
        padding: 4,
        borderRadius: 4,
        marginBottom: 14
    },
    cover: {
        width: '100%',
        height: 140,
        borderRadius: 4,
        marginBottom: 8,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 8
    },
    text: {
        marginBottom: 4,
        fontSize: 12
    },
    divisor: {
        width: '100%',
        height: 1,
        backgroundColor: "#d9d9d9"
    }
})