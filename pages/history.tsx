import NotFound from "@/components/alerts/notFound"
import Layout from "@/components/layout/Layout"
import FullPageLoader from "@/components/spinners/fullPageLoader"
import { getAllInvoice } from "@/components/store/invoiceHistory"
import { AppDispatch, AppState } from "@/components/store/store"
import HistoryTable from "@/components/tables/historyTable"
import { invoiceHistoryType } from "@/types/types"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"

const History = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { error, invoice, isLoading } = useSelector<AppState>(state => state.history) as invoiceHistoryType

    useEffect(() => {
        dispatch(getAllInvoice())
    }, [])

    useEffect(() => {
        if (error.message !== '') toast.error(error.message)
    }, [error.message])

    return (
        <Layout>
            {
                isLoading ? <FullPageLoader /> : invoice.length === 0 ? <NotFound title="Empty!" description='' /> : (
                    <HistoryTable />
                )
            }
        </Layout >
    )
}

export default History