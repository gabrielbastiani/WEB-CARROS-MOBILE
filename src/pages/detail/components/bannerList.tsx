import { FlatList, TouchableOpacity } from "react-native";
import { Banner } from "./banner";

interface BannerListProps {
    images: string[];
    handleOpenImage: (set: string) => void;
}

export function BannerList({ images, handleOpenImage }: BannerListProps) {
    return(
        <FlatList
            data={images}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={0.9} onPress={() => handleOpenImage(item)}>
                    <Banner url={item} />
                </TouchableOpacity>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
        />
    )
}
