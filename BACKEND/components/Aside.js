import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPostcard } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { FcAbout } from "react-icons/fc"
import { ImNewspaper } from "react-icons/im";
import { RiGovernmentFill } from "react-icons/ri";
import { GrProjects } from "react-icons/gr";
import { GrResources } from "react-icons/gr";
import { FcGallery } from "react-icons/fc";
import { MdConnectWithoutContact } from "react-icons/md";


export default function Aside({ asideOpen, handleAsideOpen }) {

        const router = useRouter();
        const [clicked, setClicked] = useState(false);
        const [activeLink, setActiveLink] = useState('/');

        const handleClick = () => {
                setClicked(!clicked);
        }

        const handleLinkClick = (link) => {
                setActiveLink(prevActive => (prevActive === link ? null : link))
                setClicked(false)
        }

        useEffect(() => {
                //update active link state when the page is loaded4
                setActiveLink(router.pathname)
        },[router.pathname])

        return <>
                <aside className={asideOpen ? 'asideleft active' : 'asideleft'}>
                       <ul>
                       <Link href='/'>
                                <li className="navactive">
                                        <FaHome />
                                        <span>Dashboard</span>
                                </li>
                        </Link>
                        <li className={activeLink === '/about' ? 'navactive flex-col flex-left' : 'flex-col flex-left' }
                                onClick={() => handleLinkClick('/about')}
                        >
                              <div className="flex gap-1">
                                        <FcAbout />    
                                        <span>About</span>
                              </div>  
                              {activeLink === '/about' && (
                                <ul> 
                                                <Link href='/about'><li>About Kebbi</li></Link>
                                                
                                </ul>
                                )}
                        </li> 

                         <li className={activeLink === '/government' ? 'navactive flex-col flex-left' : 'flex-col flex-left' }
                                onClick={() => handleLinkClick('/government')}
                        >
                              <div className="flex gap-1">
                              <RiGovernmentFill />

                                        <span>Government</span>
                              </div>  
                              {activeLink === '/government' && (
                                <ul> 
                                                <Link href='/government/executives'><li>Executives</li></Link>
                                                <Link href='/government/legistlatives'><li>Legislatives</li></Link>
                                                <Link href='/government/judiciary'><li>Judiciary</li></Link>
                                                <Link href='/government/ministries'><li>Ministries</li></Link>
                                                <Link href='/government/parastatals'><li>Parastatals</li></Link>
                                                
                                </ul>
                                )}
                        </li>   

                        <li className={activeLink === '/news' ? 'navactive flex-col flex-left' : 'flex-col flex-left' }
                                onClick={() => handleLinkClick('/news')}
                        >
                              <div className="flex gap-1">
                                  <ImNewspaper />
                                        <span>News</span>
                              </div>  
                              {activeLink === '/news' && (
                                <ul> 
                                                <Link href='/news'><li>All News</li></Link>
                                                <Link href='/news/draft'><li>Draft News</li></Link>
                                                <Link href='/news/addnews'><li>Add news</li></Link>
                                </ul>
                                )}
                        </li>    

                        <li className={activeLink === '/projects' ? 'navactive flex-col flex-left' : 'flex-col flex-left' }
                                onClick={() => handleLinkClick('/projects')}
                        >
                              <div className="flex gap-1">
                                 <GrProjects />    
                                        <span>Projects</span>
                              </div>  
                              {activeLink === '/projects' && (
                                <ul> 
                                                <Link href='/projects'><li>All Projects</li></Link>
                                                <Link href='/projects/draftproject'><li>Draft Projects</li></Link>
                                                <Link href='/projects/addproject'><li>Add Project</li></Link>
                                </ul>
                                )}
                        </li> 
                         
                        <li className={activeLink === '/resources' ? 'navactive flex-col flex-left' : 'flex-col flex-left' }
                                onClick={() => handleLinkClick('/resources')}
                        >
                              <div className="flex gap-1">
                                  <GrResources />
                                        <span>Resources</span>
                              </div>  
                              {activeLink === '/resources' && (
                                <ul> 
                                                <Link href='/resources/budgetdocuments'><li>Budget Documents</li></Link>
                                                <Link href='/resources/debtmanagement'><li>Debt Management</li></Link>
                                                <Link href='/resources/financialdocuments'><li>Financial Documents</li></Link>
                                                <Link href='/resources/kebbie-service'><li>Kebbi State e-services</li></Link>
                                                <Link href='/resources/otherdocuments'><li>Other Documents</li></Link>
                                                
                                </ul>
                                )}
                        </li> 

                        <li className={activeLink === '/gallery' ? 'navactive flex-col flex-left' : 'flex-col flex-left' }
                                onClick={() => handleLinkClick('/gallery')}
                        >
                              <div className="flex gap-1">
                                         <FcGallery />
                                        <span>Gallery</span>
                              </div>  
                              {activeLink === '/gallery' && (
                                <ul> 
                                                <Link href='/gallery'><li>All Photos</li></Link>
                                                <Link href='/gallery/addphoto'><li>Add Photo</li></Link>
                                               
                                                
                                </ul>
                                )}
                        </li>

                        <Link href='/contacts'>
                                <li className={activeLink === '/contacts' ? 'navactive' : ''}
                                onClick={() => handleClick('/contacts')}
                                >
                                         <MdConnectWithoutContact />
                                        <span>Contact</span>
                                </li>
                        </Link>
                                           
                        </ul> 
                        <button className="logoutbtn">Logout</button>                                                                                                                                   .
                </aside>

        </>

 
}