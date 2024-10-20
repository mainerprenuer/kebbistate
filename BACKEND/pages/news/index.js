import { TiNews } from "react-icons/ti";


export default function news() {

    return <>
        <div className="newspage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>All Published <span>News</span></h2>
                    <h2>ADMIN PANEL</h2>
                </div>
                <div className="breadcrumb">
                <TiNews /><span>/</span> <span>News</span>
                </div>
            </div>
            <div className="newstable">
                <div className="flex gap-2 mb-1">
                    <h2>Search News:</h2>
                    <input type="text" placeholder="Search by title..." />
                </div>
            </div>
        </div>
    </>
}