import { Dimensions, Image, StyleSheet, View } from "react-native";

const { width: widthScreen } = Dimensions.get("window");

export function Banner({ url }: { url: string }) {
    return (
        <Image
            src={"http://192.168.9.140:3333/files/" + url}
            style={styles.cover}
        />
    )
}

export function BannerLoading() {
    return <View style={styles.loading}></View>
}

const styles = StyleSheet.create({
    cover: {
        width: widthScreen / 1.18,
        height: 330,
        marginLeft: 6,
        marginRight: 6,
        borderRadius: 8,
        marginTop: 8
    },
    loading: {
        width: widthScreen - 16,
        height: 330,
        borderRadius: 8,
        marginTop: 8,
        backgroundColor: "#DDD"
    }
})