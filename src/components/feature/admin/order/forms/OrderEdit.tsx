import React from 'react'
import { FormErrors, useForm } from "@mantine/form";
import { Select, Button, LoadingOverlay, TextInput, Divider } from '@mantine/core';
import { useOrderStatus } from '../hooks';
import { OrderData, OrderEditFormValues } from '../types';
import { OrderDetails } from '../data-display';

interface OrderEditProps {
  orderDetails: OrderData
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  onSubmit: (values: OrderEditFormValues, event: React.FormEvent<HTMLFormElement>) => void,
  onError: (errors: FormErrors, values: OrderEditFormValues, event: React.FormEvent<HTMLFormElement>) => void
}

const OrderEdit = (props: OrderEditProps) => {
  const { isLoading, isSuccess, isError, onSubmit, onError, orderDetails } = props
  const { id: order_id, shipment_ref, status: { id: status_id } } = orderDetails

  const orderStatusOptions = useOrderStatus();

  const orderEditForm = useForm<OrderEditFormValues>({
    initialValues: {
      status_id,
      id: order_id,
      shipment_ref,
    },
  });

  const InputStyles = {
    root: {
      display: 'flex',
      alignItems: 'center',
      "& > div": {
        flex: '60%'
      }
    },
    label: {
      marginRight: '10px',
      flex: '40%'
    }
  }

  return (
    <div>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <OrderDetails orderDetails={orderDetails} />

      <Divider my="sm" />

      <form className="mt-4 space-y-4" onSubmit={orderEditForm.onSubmit(onSubmit, onError)}>
        {/* <TextInput
          {...orderEditForm.getInputProps("payment_ref")}
          label="Payment Reference"
          styles={InputStyles}
        /> */}
        <TextInput
          {...orderEditForm.getInputProps("shipment_ref")}
          label="Shipment Reference"
          styles={InputStyles}
        />
        <Select
          {...orderEditForm.getInputProps("status_id")}
          label="Order Status"
          data={orderStatusOptions}
          styles={InputStyles}
        />
        <Button className="text-black bg-primary hover:bg-secondary" type="submit" disabled={!orderEditForm.isDirty()}>
          Modify
        </Button>
      </form>
    </div>
  )
}

export default OrderEdit