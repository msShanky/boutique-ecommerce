import React from 'react'
import { useForm } from '@mantine/form';
import { Select, Button, Group } from '@mantine/core';
import { useOrderStatus } from '../hooks';
import { OrderFilterFormValues } from '../types';

interface OrderFilterProps {
    onSubmit: (values: OrderFilterFormValues, event: React.FormEvent<HTMLFormElement>) => void,
    values: OrderFilterFormValues
}

const OrderFilter = (props: OrderFilterProps) => {
    const orderStatusOptions = useOrderStatus();

    const { onSubmit, values } = props

    const orderFilterForm = useForm<OrderFilterFormValues>({
        initialValues: values
    });

    return (
        <form className="my-4 space-y-8" onSubmit={orderFilterForm.onSubmit(onSubmit)}>
            <Group>
                <Select
                    styles={() => ({
                        root: {
                            display: 'flex',
                            alignItems: 'center'
                        },
                        label: {
                            marginRight: '10px'
                        }
                    })}
                    clearable
                    {...orderFilterForm.getInputProps("status_id")}
                    label="Order Status"
                    placeholder='None'
                    data={orderStatusOptions}
                />
                <Button className="bg-pink hover:bg-violet" type="submit" disabled={!orderFilterForm.isDirty()}>
                    Apply
                </Button>
            </Group>


        </form>
    )
}

export default OrderFilter