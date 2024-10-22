
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Spinner from './Spinner';
import { text } from '@cloudinary/url-gen/qualifiers/source';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { ReactSortable } from 'react-sortablejs';
import { MdDeleteForever } from 'react-icons/md';

export default function News(
    {
        _id
    }
) {
    
    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState([]);
    const [images, setImages] = useState([])
    const [description, setDescription] = useState('');
    const [newscategory, setNewsCategory] = useState([]);
    const [tags, setTags] = useState([]);
    const [status, setStatus] = useState('');

    // for images uploading
    const [isUploading, setIsUploading] = useState(false);
    const uploadImagesQueue = [];

    async function createNews(ev) {
        ev.preventDefault();

        if(isUploading) {
            await Promise.all(uploadImagesQueue)
        }

        const data = {
            title,
            slug,
            images,
            description,
            newscategory,
            tags,
            status
        };
        if (_id) {
            await axios.put('/api/news', {...data, _id})
            toast.success('Data Updated Successfully')
        } else {
            await axios.post('/api/news', data)
            toast.success('News Created Successfully')
        }

        setRedirect(true);
    };

    async function uploadImages(ev) {
        const files = ev.target?.files;
        if(files?.length > 0) {
            setIsUploading(true);

            for (const file of files) {
                const data = new FormData();
                data.append('file', file);

                //use the axios.post method and push the promise to the queue
                uploadImagesQueue.push(
                    axios.post('/api/upload', data).then(res => {
                        setImages(oldImages => [...oldImages, ...res.data.links])
                    })
                )
            }

            //wait for all images to finish uploading

            await Promise.all(uploadImagesQueue);

            setIsUploading(false);
            toast.success('Images Uploaded Successfully')
        } else {
            toast.error('Error uploading Images!')
        } 
    }

    if(redirect) {
        router.push('/news')
        return null;
    }

    function updateImagesOrder(images) {
        setImages(images)
    } 

    function handleDeleteImage(index) {
        const updatedImages = [...images]
        updatedImages.splice(index, 1);
        setImages(updatedImages);
        toast.success('Image Deleted Successfully')
    }

    // for slug url
    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        const newSlug = inputValue.replace(/\s+/g, '-') //replace spaces with hyphens

        setSlug(newSlug);
    }

    return <>
       <form className='addWebsiteform' onSubmit={createNews}>
        {/* news title */}
        <div className='w-100 flex flex-col flex-left mb-2'>
            <label htmlFor='title'>Title</label>
            <input 
            type='text' 
            id='title' 
            placeholder='Enter small title'
            value={title}
            onChange={ev => setTitle(ev.target.value)}
            />
        </div>

        {/* blog slug url */}
        <div className='w-100 flex flex-col flex-left mb-2'>
            <label htmlFor='slug'>Slug (seo friendly url)</label>
            <input 
            type='text' 
            id='slug' 
            placeholder='Enter slug url'
            value={slug}
            onChange={ev => setSlug(ev.target.value)}
            />
        </div>

        {/* blog category */}
        <div className='w-100 flex flex-col flex-left mb-2'>
            <label htmlFor='category'>Select Category (for multi select press ctr + mouse left key)</label>
            <select 
            onChange={(e) => setNewsCategory(Array.from(e.target.selectedOptions, option => option.value))}
            value={newscategory}
            name='category' 
            id='category' 
            multiple
            >
                <option value="Power Supply">Power Supply</option>
                <option value="Water Supply">Water Supply</option>
                <option value="Salary">Salary</option>
                <option value="Education">Education</option>
                <option value="Empowerment">Empowerment</option>
                <option value="Charity">Charity</option>
                <option value="Jobs">Jobs</option>
            </select>
        </div>

        {/* news images */}
        <div className='w-100 flex flex-col flex-left mb-2'>
            <div className='w-100'>
                <label htmlFor='images'>Images (first image will be shown as thumbnail, you can drag)</label>
                <input 
                    type='file' 
                    id='fileInput' 
                    className='mt-1' 
                    accept='image/*' 
                    multiple
                    onChange={uploadImages} />
            </div>
            <div className='w-100 flex flex-left mt-1'>
                {isUploading && (<Spinner />)}
            </div>
        </div>

        {/* image preview and image sortable with delete image */}
        {!isUploading && (
            <div className='flex'>
                <ReactSortable 
                    list={Array.isArray(images) ? images : []}
                    setList={updateImagesOrder}
                    animation={200}
                    className='flex gap-1'
                >
                    {images?.map((link, index) => (
                        <div key={link} className='uploadedimg'>
                            <img src={link} alt='image' className='object-cover' />
                            <div className='deleteimg'>
                                <button onClick={() => handleDeleteImage(index)}><MdDeleteForever /></button>
                            </div>
                        </div>
                    ))}
                </ReactSortable>
            </div>
        )}

        {/* markdown description */}
        <div className='description w-100 flex flex-col flex-left mb-2'>
            <label htmlFor='description'>News Content (for image: first upload and copy link and paste in ![alt text](link)) </label>
            <MarkdownEditor 

            value={description}
            onChange={(ev) => setDescription(ev.text)}

            style={{width: '100%', height:'400px'}} 

            renderHTML={(text) => (
                <ReactMarkdown components={{
                    code: ({node, inline, className, children, ...props}) => {
 
                        //for code
                        const match = /language-(\w+)/.exec(className || '');

                        if (inline) {
                            return <code>{children}</code>
                        } else if(match) {
                            return (
                                <div style={{position: 'relative'}}>
                                    <pre style={{padding: '0', borderRadius: '5px', overflowX:'auto',
                                        whiteSpace: 'pre-wrap'}} {...props}>
                                            <code>{children}</code>
                                        </pre>
                                        <button style={{position:'ab solute', top: '0', right: '0', zIndex: '1'}} onClick={() => navigator.clipboard.writeText(children)}>
                                            copy code
                                        </button>
                                </div>
                            )
                        } else {
                            return <code{...props}>{children}</code>
                        }
                    }
                }}>
                    {text}
                </ReactMarkdown>
            )}
            />
        </div>

        {/* tags */}
        <div className='w-100 flex flex-col flex-left mb-2'>
            <label htmlFor='tags'>Tags</label>
            <select
            value={tags}
            onChange= {(e) => setTags(Array.from(e.target.selectedOptions, option => option.value))} 
            name='tags' 
            id='tags' 
            multiple
            >
                <option value="skills acquisition">Skills acquisition</option>
                <option value="orphans">Orphans</option>
                <option value="widows">Widows</option>
                <option value="enterprenuership">Enterprenuership</option>
                <option value="sports">Sports</option>
                <option value="business">Business</option>
            </select>
        </div>

        {/* blog status */}
        <div className='w-100 flex flex-col flex-left mb-2'>
            <label htmlFor='status'>Status</label>
            <select 
            value={status}
            onChange= {ev => setStatus(ev.target.value)}
            name='status' 
            id='status'
            >
                <option value="">No select</option>
                <option value="draft">Draft</option>
                <option value="publish">Publish</option>
            </select>
        </div>

        <div className='w-100 mb-1'>
            <button type='submit' className='w-100 addwebbtn flex-center'>Save News</button>
        </div>
       </form>
    </>
}

