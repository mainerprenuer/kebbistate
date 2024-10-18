import News from "@/components/News";
import { TiNews } from "react-icons/ti";


export default function Addnews() {



    return <>
       <div className="addnewspage">
        <div className="titledashboard flex flex-sb">
            <div>
                <h2>Add <span>News</span></h2>
                <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb">
            <TiNews /><span>/</span> <span>Addnews</span>
            </div>
        </div>
        <div className="newsadd">
                <News />
            </div>
       </div>
    </>
}