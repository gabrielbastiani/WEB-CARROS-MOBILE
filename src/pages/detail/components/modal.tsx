import { View, Text, StyleSheet, Pressable, TouchableWithoutFeedback, Image } from "react-native";

interface ModalBannerProps {
    closeModal: () => void;
    imageUrl: string;
}

export function ModalBanner({ imageUrl, closeModal }: ModalBannerProps) {
    return (
        <View style={styles.container}>
            <Pressable style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.buttonText}>Fechar</Text>
            </Pressable>
            <TouchableWithoutFeedback>
                <Image
                    src={"http://192.168.9.140:3333/files/" + imageUrl}
                    style={styles.image}
                />
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0, 0.9)"
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    closeButton: {
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 14,
        paddingRight: 14,
        padding: 8,
        position: 'absolute',
        top: 100,
        zIndex: 99,
        borderRadius: 4
    },
    buttonText: {
        fontSize: 16
    }
})