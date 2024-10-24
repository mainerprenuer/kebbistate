import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TiNews } from "react-icons/ti";
import News from "@/components/News";

export default function EditProduct() {

    const router = useRouter()

    const { id } = router.query;

    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/api/news?id=' + id).then(response => {
                setProductInfo(response.data)
            })
        }
    }, [id])

    return <>
        <Head>
            <title>Update News</title>
        </Head>

        <div className="newspage">
        <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Edit <span>{productInfo?.title}</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                <TiNews /><span>/</span> <span>Edit News</span>
                </div>
            </div>
            <div className="mt-3">
                {
                    productInfo && (
                        <News {...productInfo} />
                    )
                }
            </div>
        </div>
         
    </>
}