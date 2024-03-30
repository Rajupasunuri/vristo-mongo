import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layouts = () => {
    interface RowData {
        _id: any;
        question: string;
        option: string;
        mode: string;
        url: string;
        username: string;
        status: string;
    }

    const [questionInput, setQuestionInput] = useState(true);
    const [editInput, setEditInput] = useState(false);
    const [existvalue, setexistvalue] = useState('');
    const [existoption, setexistoption] = useState('');
    const [id, setid] = useState('');
    const [commmode, setcommmode] = useState('');
    const [commurl, setcommurl] = useState('');
    const [commusername, setcommusername] = useState('');

    const [values, setValues] = useState({
        question: '',
        option: 'Yes/No',
    });

    const [values1, setValues1] = useState({
        mode: '',
        url: '',
        username: '',
        status: 1,
    });

    const [option1, setoption1] = useState({ value: 'Yes/No', label: 'Yes/No' });

    const [data, setData] = useState<RowData[]>([]);
    const [search, setSearch] = useState<string>('');
    const [filter, setFilter] = useState<RowData[]>([]);
    const componentRef = useRef<any>();

    const options: any = [
        { value: 'Yes/No', label: 'Yes/No' },
        { value: 'Fill in the blank ', label: 'Fill in the blank' },
    ];

    const columns: any = [
        {
            name: 'Communication Mode',
            selector: (row: RowData) => row.mode,
            wrap: true, // Enable word wrap
            // minWidth: '200px',
        },
        {
            name: 'URL',
            selector: (row: RowData) => row.url,
        },
        {
            name: 'Username',
            selector: (row: RowData) => row.username,
        },
        {
            name: 'Action',
            cell: (row: any) => (
                <button className="btn btn-primary" onClick={() => handlecoledit(row._id)}>
                    Edit
                </button>
            ),
        },
        {
            name: 'Status',
            //selector: (row: RowData) => row.whatsapp,
            cell: (row: any) => (
                <>
                    <div className="flex space-x-0.5 relative justify-start pl-0">
                        <button className=" border text-white bg-green-600 p-2 rounded-md">Active</button>
                        <button className="border text-white bg-red-600 p-2 rounded-md">InActive</button>
                    </div>
                </>
            ),
        },
    ];

    useEffect(() => {
        // Function to be executed every one second
        const interval = setInterval(() => {
            getProduct();
        }, 100); // 1000 milliseconds = 1 second

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        console.log('option1', values.option);
        getProduct();
    }, [values]);
    const getProduct = async () => {
        try {
            const res = await axios.get('http://localhost:3004/question/list1');
            console.log('ui', res);
            setData(res.data);
            setFilter(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const tableHeaderstyle = {
        headCells: {
            style: {
                fontWeight: 'bold',
                fontSize: '14px',
                backgroundColor: '#ccc',
            },
        },
    };

    const handlequestion = (event: any) => {
        setValues({ ...values, question: event.target.value });
    };

    const handleoption = (selectedOption: any) => {
        setValues({ ...values, option: selectedOption.value });
        setoption1((prevOption) => ({ ...prevOption, value: selectedOption.value }));
        setoption1((prevOption) => ({ ...prevOption, label: selectedOption.value }));
    };

    const handlecoledit = async (id: any) => {
        const newdata = await data.filter((item) => item._id == id);
        //const news1 = options.find((option: any) => option.value === newdata[0].option);

        setValues1({ ...values1, mode: newdata[0].mode, url: newdata[0].url, username: newdata[0].username });
        console.log('mode', newdata);
        setcommmode(newdata[0].mode);
        setcommurl(newdata[0].url);
        setcommusername(newdata[0].username);
        setQuestionInput(false);
        setEditInput(true);
        setid(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        console.log('New value of existoption:', existoption);
        setexistoption(existoption);
    }, [existoption]);

    const handlesubmit = (event: any) => {
        axios
            .post('http://localhost:3004/question1', values1)
            .then((res) => {
                console.log('Questions', res.data.data.question);
                toast.success('Social Media Added Successfully');
                setValues1({ ...values1, mode: '', url: '', username: '' });
                // setValues1({ ...values1, mode: '' });
                // setValues1({ ...values1, url: '' });
                // setValues1({ ...values1, username: '' });
            })
            .catch((err: any) => {
                console.log('question error', err);
            });

        event.preventDefault();
    };

    const handlesubmitedit = (e: any) => {
        axios
            .post(`http://localhost:3004/edit/question1?id=${id}`, values1)
            .then((res) => {
                console.log('changed', res);
                toast.success('Social Media Edited successfully');
                setValues1({ ...values1, mode: '', url: '', username: '' });
            })
            .catch((err) => {
                console.log('not changed', err);
            });
        e.preventDefault();
        setQuestionInput(true);
        setEditInput(false);
    };

    const handlecommunication = (event: any) => {
        setValues1({ ...values1, [event.target.name]: event.target.value });
    };

    const handlecommunicationmode = (event: any) => {
        setValues1({ ...values1, [event.target.name]: event.target.value });

        if (values1.mode.length === 1) {
            setcommmode('');
        }
    };
    const handlecommunicationurl = (event: any) => {
        setValues1({ ...values1, [event.target.name]: event.target.value });

        if (values1.url.length === 1) {
            setcommurl('');
        }
    };
    const handlecommunicationusername = (event: any) => {
        setValues1({ ...values1, [event.target.name]: event.target.value });

        if (values1.username.length === 1) {
            setcommusername('');
        }
    };

    return (
        <div>
            <div className="pt-5 ">
                <div className="panel" id="registration_form">
                    <div className="mb-10">
                        <h1 className="text-3xl font-extrabold !leading-snug text-primary md:text-4xl">Social Media Modes</h1>
                    </div>
                    {questionInput ? (
                        <>
                            <div className="mb-5">
                                <form className="space-y-5" onSubmit={handlesubmit}>
                                    <div>
                                        <label htmlFor="ctnTextarea">Add Communication Mode</label>
                                        <input type="text" placeholder="Communication Mode" name="mode" value={values1.mode} onChange={handlecommunication} className="form-input sm:w-1/2" required />
                                    </div>
                                    <div>
                                        <input
                                            type="url"
                                            pattern="https?://.+"
                                            placeholder="Enter URL"
                                            name="url"
                                            value={values1.url}
                                            onChange={handlecommunication}
                                            className="form-input sm:w-1/2"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Enter Username"
                                            name="username"
                                            value={values1.username}
                                            onChange={handlecommunication}
                                            className="form-input sm:w-1/2"
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary !mt-6">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : null}
                    {editInput ? (
                        <>
                            <div className="mb-5">
                                <form className="space-y-5" onSubmit={handlesubmitedit}>
                                    <div>
                                        <label htmlFor="ctnTextarea">Edit Communication Mode</label>
                                        <input
                                            type="text"
                                            placeholder="Communication Mode"
                                            value={values1.mode || commmode}
                                            name="mode"
                                            onChange={handlecommunicationmode}
                                            className="form-input sm:w-1/2"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="url"
                                            pattern="https?://.+"
                                            placeholder="Enter URL"
                                            value={values1.url || commurl}
                                            name="url"
                                            onChange={handlecommunicationurl}
                                            className="form-input sm:w-1/2"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Enter Username"
                                            value={values1.username || commusername}
                                            name="username"
                                            onChange={handlecommunicationusername}
                                            className="form-input sm:w-1/2"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary !mt-6">
                                        Edit
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
            <h1 className="text-lg font-semibold  p-4 pl-0">Social Media List</h1>
            <DataTable
                customStyles={tableHeaderstyle}
                columns={columns}
                data={filter}
                pagination
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                subHeader
                striped
                className="whitespace-nowrap  overflow-auto"
                subHeaderComponent={<input type="text" className="w-auto form-input  " placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />}
            />
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
};

export default Layouts;
