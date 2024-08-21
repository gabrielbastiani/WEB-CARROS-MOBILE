import axios from "axios";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, ScrollView, Pressable, Modal } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { setupAPIClient } from "../../services/api";
import { CarDetailProps } from "../../types/cars.type";
import { Feather } from '@expo/vector-icons';
import { BannerList } from "./components/bannerList";
import { BannerLoading } from "./components/banner";
import { Label } from "./components/label";
import * as Linking from 'expo-linking';
import { ModalBanner } from "./components/modal";

type RouteDetailParams = {
    detail: {
        id: string;
    }
}

type DetailRouteProps = RouteProp<RouteDetailParams, 'detail'>;

export function Detail() {

    const route = useRoute<DetailRouteProps>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

    const [car, setCar] = useState<CarDetailProps>();
    const [loading, setLoading] = useState(true);
    const [modalVisibile, setModalVisibile] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        if (!route.params.id) {
            return;
        }
        const apiClient = setupAPIClient();
        async function loadCar() {
            try {
                const response = await apiClient.get(`/car_details_home?car_id=${route.params.id}`);
                if (!response.data) {
                    navigation.goBack();
                }
                setCar(response?.data || []);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error.response?.data);
                } else {
                    console.error("Erro desconhecido", error);
                }
            } finally {
                setLoading(false);
            }
        }

        loadCar();

    }, [route.params.id]);

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#000" />
            </SafeAreaView>
        );
    }

    async function handleCallPhone() {
        await Linking.openURL(`tel:${car?.whatsapp}`)
    }

    function opemImage(set: string) {
        setModalVisibile(true);
        setSelectedImage(set);
    }

    function handleCloseModal() {
        setModalVisibile(false);
        setSelectedImage("");
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView>
                <View style={styles.container}>
                    <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={36} color="#000" />
                    </Pressable>

                    {loading && <BannerLoading />}

                    {!loading && car?.image_car.set && (
                        <BannerList
                            images={car.image_car.set}
                            handleOpenImage={(set) => opemImage(set) }
                        />
                    )}

                    <View style={styles.header}>
                        <Pressable style={styles.saveContent}>
                            <Feather size={22} color="#FFF" name="bookmark" />
                        </Pressable>

                        <Text style={styles.title}>{car?.name}</Text>
                        <Text>{car?.model_car}</Text>
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.price}>{car?.price_car}</Text>

                        <View style={styles.labels}>
                            <Label label="Cidade" name={car?.city} />
                            <Label label="Ano" name={car?.year_car} />
                        </View>

                        <View style={styles.labels}>
                            <Label label="KM Rodados" name={car?.km_car} />
                            <Label label="Telefone" name={car?.whatsapp} />
                        </View>

                        <Text style={styles.description}>Descrição completa:</Text>
                        <View
                            style={styles.descriptionArea}
                        >
                            <Text>{car?.description_car}</Text>
                        </View>

                        <Pressable style={styles.callButton} onPress={handleCallPhone}>
                            <Text style={styles.callText}>Conversar com o vendedor</Text>
                        </Pressable>
                    </View>

                    <Modal visible={modalVisibile} transparent={true}>
                        <ModalBanner
                            closeModal={handleCloseModal}
                            imageUrl={selectedImage}
                        />
                    </Modal>

                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3f5f8',
        alignItems: 'center',
        paddingBottom: 16,
    },
    backButton: {
        width: 52,
        height: 52,
        borderRadius: 50,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 24,
        top: 44,
        zIndex: 99
    },
    header: {
        backgroundColor: '#FFF',
        position: 'relative',
        width: '90%',
        borderRadius: 8,
        gap: 4,
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 8,
        paddingRight: 8,
        top: -34,
        zIndex: 999
    },
    saveContent: {
        backgroundColor: "#EF4444",
        position: 'absolute',
        zIndex: 99,
        padding: 12,
        borderRadius: 99,
        right: 8,
        top: -24
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    content: {
        alignSelf: 'flex-start',
        paddingLeft: 14,
        paddingRight: 14,
        marginTop: -14,
        width: '100%'
    },
    price: {
        fontSize: 26,
        fontWeight: 'bold',
        color: "#000"
    },
    labels: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 24,
        marginTop: 14,
    },
    description: {
        fontSize: 18,
        marginTop: 14,
        marginBottom: 8,
        fontWeight: 'bold',
        color: "#000"
    },
    descriptionArea: {
        backgroundColor: "#FFF",
        padding: 4,
        borderRadius: 4
    },
    callButton: {
        width: '100%',
        padding: 8,
        backgroundColor: "#08c168",
        marginTop: 14,
        marginBottom: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    callText: {
        fontSize: 16,
        fontWeight: '500'
    }
});