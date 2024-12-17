import DetailClient from '@/app/components/detail/DetailClient';
import { products } from '@/utils/Products';
import React from 'react';

type DetailProps = {
    productId?: string;
};

const Detail = async ({ params }: { params: DetailProps }) => {
    const { productId } = params;

    if (!productId) {
        return <div>Ürün bulunamadı.</div>;
    }

    try {
        // Asenkron olarak ürün bulma işlemi
        const product = await products.find((product) => product.id === productId);

        if (!product) {
            return <div>Ürün bulunamadı.</div>;
        }

        return (
            <div>
                <DetailClient product={product} />
            </div>
        );
    } catch (error) {
        console.error("Ürün bulunamadı:", error);
        return <div>Ürün bulunamadı.</div>;
    }
};

export default Detail;