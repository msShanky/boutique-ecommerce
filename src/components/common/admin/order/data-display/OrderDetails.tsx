import React from 'react'
import { Text, Divider } from '@mantine/core';
import { OrderData } from '../types';
import { useOrderItems } from '../hooks';
import OrderItem from './OrderItem';

interface OrderDetailsProps {
    orderDetails: OrderData
}

const OrderDetails = (props: OrderDetailsProps) => {
    const { created_at, code, id: order_id } = props.orderDetails
    const orderItems = useOrderItems(order_id)

    return (
        <div>
            <Text size="xl">{code}</Text>
            <Text size="sm" weight={300}>{created_at && new Date(created_at).toDateString()}</Text>
            <Divider my="sm" />
            {orderItems.map((orderItem) => <OrderItem orderItem={orderItem} />)}
        </div>
    )
}

export default OrderDetails