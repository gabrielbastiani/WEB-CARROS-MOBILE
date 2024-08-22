export interface CarProps {
    id: string;
    name: string;
    model_car: string;
    year_car: string;
    km_car: string;
    whatsapp: string;
    city: string;
    price_car: string;
    description_car: string;
    image_car: {
        set: string[] | [null]
    }
}

export interface CarDetailProps {
    id: string;
    name: string;
    model_car: string;
    year_car: string;
    km_car: string;
    whatsapp: string;
    city: string;
    price_car: string;
    description_car: string;
    created_at: string;
    image_car: {
        map(arg0: (item: any) => any): string;
        set: string[];
    }
}