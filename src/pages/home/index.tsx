import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import axios from "axios";
import { setupAPIClient } from "../../services/api";
import { CarProps } from "../../types/cars.type";
import { CarItem } from "../../components/carlist";

export function Home() {

    const [cars, setCars] = useState<CarProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [loading, setLoading] = useState(true);

    const initialFilters = {
        filter: '',
        limit: 10
    };

    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        async function loadStoreProducts() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/list_all_cars_home`, {
                    params: {
                        page: currentPage,
                        limit: filters.limit,
                        filter: filters.filter
                    },
                });

                setCars(response?.data?.cars || []);
                setTotalPages(response?.data?.totalPages);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error.response?.data);
                } else {
                    console.error("Erro desconhecido", error);
                }
            }
            finally {
                setLoading(false);
            }
        }
        loadStoreProducts();
    }, [currentPage, filters.filter, filters.limit]);

    const updateFilter = (filter: string, value: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filter]: value,
        }));
    };


    return (
        <>
            <Header />

            <View style={styles.container}>
                <View style={styles.inputArea}>
                    <Input
                        placeholder="Procurando algum carro?"
                        value={filters.filter}
                        onChangeText={(value) => updateFilter('filter', value)}
                    />
                </View>

                {loading && (
                    <ActivityIndicator style={{ marginTop: 14 }} size="large" color="#000" />
                )}

                <FlatList
                    data={cars}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CarItem data={item} widthScreen={ cars.length <= 1 ? "100%" : "49%" } />}
                    style={styles.list}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    contentContainerStyle={{ paddingBottom: 14 }}
                    showsVerticalScrollIndicator={false}
                />

            </View>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f3f5f8",
        flex: 1,
        paddingLeft: 14,
        paddingRight: 14,
        alignItems: 'center'
    },
    inputArea: {
        width: '100%',
        marginTop: 14,
        padding: 8,
        backgroundColor: '#FFF',
        borderRadius: 8,
    },
    list: {
        flex: 1,
        marginTop: 4,
        paddingTop: 14
    }
});