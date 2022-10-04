import { definitions } from "types/supabase"

interface OrderEditFormValues {
    status_id: number
    id: number
    payment_ref: string | undefined;
    shipment_ref: string | undefined;
}

type OrderFilterFormValues = Omit<definitions['user_order'], "id"> & { id?: number }

type OrderData = definitions['user_order'] & { status: definitions['order_status'] }
