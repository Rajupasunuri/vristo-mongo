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
        status: number;
    }

    const [questionInput, setQuestionInput] = useState(true);
    const [editInput, setEditInput] = useState(false);
    const [existvalue, setexistvalue] = useState('');
    const [existoption, setexistoption] = useState('');
    const [id, setid] = useState('');

    const [values, setValues] = useState({
        question: '',
        option: 'Yes/No',
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
            name: 'Question',
            selector: (row: RowData) => row.question,
            wrap: true, // Enable word wrap
            // minWidth: '200px',
        },
        {
            name: 'Option',
            selector: (row: RowData) => row.option,
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
            const res = await axios.get('http://localhost:3004/question/list9');
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

        if (event.target.value.length == 0) {
            setValues({ ...values, question: '' });
        }
    };

    const handleoption = (selectedOption: any) => {
        setValues({ ...values, option: selectedOption.value });
        setoption1((prevOption) => ({ ...prevOption, value: selectedOption.value }));
        setoption1((prevOption) => ({ ...prevOption, label: selectedOption.value }));
    };

    const handlecoledit = async (id: any) => {
        const newdata = await data.filter((item) => item._id == id);
        const news1 = options.find((option: any) => option.value === newdata[0].option);
        setValues({
            ...values,
            question: newdata[0].question,
            option: news1.value,
        });
        setoption1((prevOption) => ({ ...prevOption, value: news1.value }));
        setoption1((prevOption) => ({ ...prevOption, label: news1.value }));

        setexistoption(newdata[0].option);
        setexistvalue(newdata[0].question);
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
            .post('http://localhost:3004/question9', values)
            .then((res) => {
                console.log('Questions', res.data.data.question);
                toast.success('Question Added Successfully');
                setValues({ ...values, question: '' });
            })
            .catch((err: any) => {
                console.log('question error', err);
            });

        event.preventDefault();
    };

    const handlesubmitedit = (e: any) => {
        axios
            .post(`http://localhost:3004/edit/question9?id=${id}`, values)
            .then((res) => {
                console.log('changed', res);
                toast.success('Question Edited successfully');
                setValues({ ...values, question: '' });
            })
            .catch((err) => {
                console.log('not changed', err);
            });
        e.preventDefault();
        setQuestionInput(true);
        setEditInput(false);
    };

    return (
        <div>
            <div className="pt-5 ">
                <div className="panel" id="registration_form">
                    <div className="mb-10">
                        <h1 className="text-3xl font-extrabold !leading-snug text-primary md:text-4xl">Mobile Application</h1>
                    </div>
                    {questionInput ? (
                        <>
                            <div className="mb-5">
                                <form className="space-y-5" onSubmit={handlesubmit}>
                                    <div>
                                        <label htmlFor="ctnTextarea">Add New Feedback Question</label>
                                        <input type="text" name="question" className="form-input sm:w-1/2" value={values.question} onChange={handlequestion} placeholder="Add Question" required />
                                    </div>
                                    <div className="mb-5">
                                        <Select value={option1} options={options} name="option" onChange={handleoption} isSearchable={false} className="sm:w-1/2" />
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
                                        <label htmlFor="ctnTextarea">Edit Form</label>
                                        <input
                                            type="text"
                                            name="question"
                                            className="form-input sm:w-1/2"
                                            onChange={handlequestion}
                                            placeholder="Edit Question"
                                            required
                                            value={values.question || existvalue}
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <Select value={option1} options={options} name="option" onChange={handleoption} isSearchable={false} className="sm:w-1/2" />
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
            <h1 className="text-lg font-semibold  p-4 pl-0">Question List</h1>
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
