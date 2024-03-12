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
        modes: string;
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
        modes: '',
    });

    const [data, setData] = useState<RowData[]>([]);
    const [search, setSearch] = useState<string>('');
    const [filter, setFilter] = useState<RowData[]>([]);
    const componentRef = useRef<any>();

    const columns: any = [
        {
            name: 'Company Type',
            selector: (row: RowData) => row.modes,
            wrap: true, // Enable word wrap
            // minWidth: '200px',
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
    }, [values1]);
    const getProduct = async () => {
        try {
            const res = await axios.get('http://localhost:3004/question/list5');
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

    const handlecoledit = async (id: any) => {
        const newdata = await data.filter((item) => item._id == id);
        //const news1 = options.find((option: any) => option.value === newdata[0].option);

        setValues1({ ...values1, modes: newdata[0].modes });
        console.log('mode', newdata);
        setcommmode(newdata[0].modes);

        setQuestionInput(false);
        setEditInput(true);
        setid(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // useEffect(() => {
    //     console.log('New value of existoption:', existoption);
    //     setexistoption(existoption);
    // }, [existoption]);

    const handlesubmit = (event: any) => {
        axios
            .post('http://localhost:3004/question5', values1)
            .then((res) => {
                console.log('Questions', res.data.data.question);
                toast.success('Communication Details Added Successfully');
                setValues1({ ...values1, modes: '' });
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
            .post(`http://localhost:3004/edit/question5?id=${id}`, values1)
            .then((res) => {
                console.log('changedsss', res);
                toast.success('Communication Details Edited successfully');
                setValues1({ ...values1, modes: '' });
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

        if (values1.modes.length === 1) {
            setcommmode('');
        }
    };

    return (
        <div>
            <div className="pt-5 ">
                <div className="panel" id="registration_form">
                    <div className="mb-10">
                        <h1 className="text-3xl font-extrabold !leading-snug text-primary md:text-4xl">Company Type</h1>
                    </div>
                    {questionInput ? (
                        <>
                            <div className="mb-5">
                                <form className="space-y-5" onSubmit={handlesubmit}>
                                    <div>
                                        <label htmlFor="ctnTextarea">Add Company Type</label>
                                        <input type="text" placeholder="Company Type" name="modes" value={values1.modes} onChange={handlecommunication} className="form-input sm:w-1/2" required />
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
                                        <label htmlFor="ctnTextarea">Edit Company Type</label>
                                        <input
                                            type="text"
                                            placeholder="Company Type"
                                            value={values1.modes || commmode}
                                            name="modes"
                                            onChange={handlecommunicationmode}
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
            <h1 className="text-lg font-semibold  p-4 pl-0">Company Type List</h1>
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
