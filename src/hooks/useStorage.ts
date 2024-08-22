import AsyncStorage from "@react-native-async-storage/async-storage";
import { CarProps } from "../types/cars.type";

const key = "@webcars"

const useStorage = () => {

    const getItem = async (): Promise<CarProps[]> => {
        try {
            const cars = await AsyncStorage.getItem(key);
            return cars && JSON.parse(cars) || [];
        } catch (error) {
            console.log(error);
            return []
        }
    }

    const saveItem = async (newCar: CarProps) => {
        try {
            let cars = await getItem();
            let findCar = cars.find(car => car.id === newCar.id);
            if (findCar) {
                return
            }
            cars.push(newCar);
            await AsyncStorage.setItem(key, JSON.stringify(cars));
        } catch (error) {
            console.log("ERRO AO SALVAR ", error);
        }
    }

    const removeItem = async (id: string): Promise<CarProps[] | []> => {
        try {
            let cars = await getItem();
            let updateCarList = cars.filter(car => {
                return (car.id !== id)
            });
            await AsyncStorage.setItem(key, JSON.stringify(updateCarList));
            return updateCarList
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    return {
        getItem,
        saveItem,
        removeItem,
    }
}

export default useStorage;