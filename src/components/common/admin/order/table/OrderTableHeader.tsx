import React from 'react'
import { Group, Text } from '@mantine/core';

interface OrderTableHeaderProps {
    children: React.ReactNode;
    colSpan?: number;
}

const OrderTableHeader = ({ children, colSpan }: OrderTableHeaderProps) => {
    return (
        <th colSpan={colSpan || 1} className='bg-violet'>
            <Group>
                <Text className='text-white' weight={500} size="sm" sx={{ textTransform: 'uppercase' }}>
                    {children}
                </Text>
            </Group>
        </th>
    );
}

export default OrderTableHeader