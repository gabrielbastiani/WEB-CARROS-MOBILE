import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import axios from "axios";
import { setupAPIClient } from "../../services/api";
import { CarProps } from "../../types/cars.type";

export function Home() {

    const [cars, setCars] = useState<CarProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [loadImages, setLoadImages] = useState<string[]>([]);

    const initialFilters = {
        filter: '',
        limit: 10
    };

    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        async function fetchCars() {
            await loadStoreProducts();
        }
        fetchCars();
    }, []);

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
    }

    const updateFilter = (filter: string, value: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filter]: value,
        }));
    };


    console.log(cars)


    return (
        <>
            <Header />

            <View style={styles.container}>
                <View style={styles.inputArea}>
                    {/* <Input
                        placeholder="Procurando algum carro?"
                        value={filters.filter}
                        onChange={(e) => updateFilter('filter', e.target.value)}
                    /> */}
                </View>
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
    }
});