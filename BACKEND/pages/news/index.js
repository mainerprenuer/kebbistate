import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { useState } from "react";
import { TiDelete, TiNews } from "react-icons/ti";
import { TiEdit } from 'react-icons/ti'


export default function News() {

    //pagination
    const [currentPage, setCurrentPage] = useState(1); // for page 1
    const [perPage] = useState(7);

    // search
    const [searchQuery, setSearchQuery] = useState('');


    // fetch news data
    const { allData, loading } = useFetchData('/api/news');

    //function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    //total number of news
    const allNews = allData.length;

    //filter all data based on search query
    const filteredNews = searchQuery.trim() === '' ? allData : allData.filter(
        news => news.title.toLowerCase().includes(searchQuery.toLowerCase()));

    //calculate index of the first blog displayed on the current page
    const indexOfFirstNews = (currentPage -1) * perPage;
    const indexOfLastNews = currentPage * perPage;

    //get the current page's news
    const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

    const publishedNews = currentNews.filter(ab => ab.status === 'publish');
    console.log("hahahah", publishedNews)

    const pageNumbers = [0];

    for(let i=1; i<= Math.ceil(allNews / perPage); i++) {
        pageNumbers.push(i);
    }

    return <>
        <div className="newspage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>All Published <span>News</span></h2>
                    <h3>ADMIN PANEL</h3>
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
                <table className="table table-styling">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                       { loading ? <>
                            <tr>
                                <td>
                                    <Dataloading />
                                </td>
                            </tr>
                       </> : <>
                        { publishedNews.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center">No News Found</td>
                            </tr>
                        ) : (
                            publishedNews.map((news, index) => {
                                <tr key={news._id}>
                                    <td>{indexOfFirstNews + index + 1}</td>
                                    <td><img src={news.images[0]} width={180} alt="image" /></td>
                                    <td><h3>{news.title}</h3></td>
                                    <td>
                                        <div className="flex gap-2 flex-center">
                                            <Link href={'/news/edit/' + news._id }><button><TiEdit /></button></Link>
                                            <Link href={'/news/delete/' + news._id }><button><TiDelete /></button></Link>
                                        </div>
                                    </td>
                                </tr>
                                })
                        )} 
                       </>}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}