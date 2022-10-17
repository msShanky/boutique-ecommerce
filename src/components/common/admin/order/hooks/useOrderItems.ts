import { useGetOrderItemsByOrderIdQuery } from '@/reducer/breezeBaseApi';
import { useState, useEffect } from 'react';

export function useOrderItems(id: number) {
    const orderItemsResponse = useGetOrderItemsByOrderIdQuery(id.toString());
    const [orderItems, setOrderItems] = useState<OrderItemWithRelations[]>([])

    useEffect(() => {
        if (orderItemsResponse.status === 'fulfilled' && orderItemsResponse?.data?.body) {
            setOrderItems(orderItemsResponse.data.body)
        }
    }, [orderItemsResponse])

    return orderItems;
}
