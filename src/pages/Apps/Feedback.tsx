import { Link } from 'react-router-dom';
import { Fragment, useEffect, useRef, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconCode from '../../components/Icon/IconCode';
//import { options } from '@fullcalendar/core/preact';
import Select from 'react-select';
import axios from 'axios';
import { FaPersonCircleCheck, FaPersonCircleXmark } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { number } from 'yup';
import { string } from 'yup/lib/locale';
import { Transition, Dialog } from '@headlessui/react';
import ReactPlayer from 'react-player';
import IconX from '../../components/Icon/IconX';
import DataTable from 'react-data-table-component';
import React from 'react';

const Layouts = () => {
    interface RowData {
        _id: any;
        question: string;
        option: string;
    }

    const [dialog, setDialog] = useState(false);
    const [refername, setrefername] = useState('');
    const [refer_mobile, setrefer_mobile] = useState('');
    const [referwhats, setreferwhats] = useState('');
    const [referemail, setreferemail] = useState('');
    const [referaddress, setreferaddress] = useState('');
    const [referbadge, setreferbadge] = useState('');
    const [questionInput, setQuestionInput] = useState(true);
    const [editInput, setEditInput] = useState(false);
    const [existvalue, setexistvalue] = useState('');
    const [existoption, setexistoption] = useState('');
    const [id, setid] = useState('');
    const [random, setrandom] = useState(0);

    const [values, setValues] = useState({
        question: '',
        option: 'Yes/No',
    });

    const columns: any = [
        {
            name: 'Question',
            selector: (row: RowData) => row.question,
            wrap: true, // Enable word wrap
            minWidth: '200px',
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
        },
        // {
        //     name: 'Email',
        //     selector: (row: RowData) => row.email,
        // },
        // {
        //     name: 'address',
        //     selector: (row: RowData) => row.address,
        // },
        // {
        //     name: 'Badge',
        //     selector: (row: RowData) => row.badge,
        // },
    ];

    const [data, setData] = useState<RowData[]>([]);
    const [search, setSearch] = useState<string>('');
    const [filter, setFilter] = useState<RowData[]>([]);
    const componentRef = useRef<any>();

    const getProduct = async () => {
        try {
            const res = await axios.get('http://localhost:3004/question/list');
            console.log('ui', res);
            setData(res.data);
            setFilter(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

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
        setValues({ ...values, [event.target.name]: event.target.value });
        //setexistvalue('');
    };

    const handleoption = (event: any) => {
        setValues({ ...values, option: event.value });
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Layouts'));
    });
    const [codeArr, setCodeArr] = useState<string[]>(['code1,code2,code3,code4,code5,code6,code7,code8']);

    const toggleCode = (name: string) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };

    const options: any = [
        { value: 'Yes/No', label: 'Yes/No' },
        { value: 'Fill ', label: 'Fill ' },
    ];

    // const handlecoledit = async (id: any) => {
    //     const newdata = await data.filter((item) => item._id == id);
    //     setValues({
    //         ...values,
    //         question: newdata[0].question,
    //         option: newdata[0].option,
    //     });
    //     setexistoption(newdata[0].option);
    //     setexistvalue(newdata[0].question);
    //     console.log('newdarta', newdata);
    //     setQuestionInput(false);
    //     setEditInput(true);
    //     setid(id);
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    // };
    const handlecoledit = async (id: any) => {
        const newdata = await data.filter((item) => item._id == id);
        setValues({
            ...values,
            question: newdata[0].question,
            option: newdata[0].option,
        });

        setexistoption(newdata[0].option); // Update existoption with newdata[0].option
        setexistvalue(newdata[0].question); // Update existvalue with newdata[0].question
        console.log('newdarta', newdata);
        setQuestionInput(false);
        setEditInput(true);
        setid(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlesubmit = (event: any) => {
        console.log(values.question);
        axios
            .post('http://localhost:3004/question', values)
            .then((res) => {
                console.log('Questions', res.data.data.question);
                toast.success('Question Added Successfully');
            })
            .catch((err: any) => {
                console.log('question error', err);
            });

        event.preventDefault();
    };
    const handlesubmitedit = (e: any) => {
        axios
            .post(`http://localhost:3004/edit/question?id=${id}`, values)
            .then((res) => {
                console.log('changed', res);
            })
            .catch((err) => {
                console.log('not changed', err);
            });
        e.preventDefault();
        setQuestionInput(true);
        setEditInput(false);
        getProduct();
    };
    const handleEdit = () => {
        setQuestionInput(true);
        setEditInput(false);
    };

    return (
        <div>
            <div className="pt-5 ">
                {/* Registration */}
                <div className="panel" id="registration_form">
                    <div className="mb-10">
                        <h1 className="text-3xl font-extrabold !leading-snug text-primary md:text-4xl">Feedback Form</h1>
                    </div>
                    {questionInput ? (
                        <>
                            <div className="mb-5">
                                <form className="space-y-5" onSubmit={handlesubmit}>
                                    {/* <div>
                                <input type="text" placeholder="Add Question" required name="name" onChange={handleName} className="form-input sm:w-1/2 " />
                            </div> */}
                                    <div>
                                        <label htmlFor="ctnTextarea">Add New Feedback Question</label>
                                        <textarea id="ctnTextarea" rows={5} name="question" className="form-textarea sm:w-1/2" onChange={handlequestion} placeholder="Add Question" required></textarea>
                                    </div>
                                    <div className="mb-5">
                                        <Select defaultValue={options[0]} options={options} name="option" onChange={handleoption} isSearchable={false} className="sm:w-1/2" />
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
                                    {/* <div>
                                <input type="text" placeholder="Add Question" required name="name" onChange={handleName} className="form-input sm:w-1/2 " />
                            </div> */}
                                    <div>
                                        <label htmlFor="ctnTextarea">Edit Form</label>
                                        <textarea
                                            id="ctnTextarea"
                                            rows={2}
                                            name="question"
                                            className="form-textarea sm:w-1/2"
                                            onChange={handlequestion}
                                            placeholder="Edit Question"
                                            required
                                            value={values.question || existvalue}
                                        ></textarea>
                                    </div>
                                    <div className="mb-5">
                                        <Select
                                            defaultValue={{ label: existoption, value: existoption }}
                                            //defaultValue={options[0]}
                                            options={options}
                                            name="option"
                                            onChange={handleoption}
                                            isSearchable={false}
                                            className="sm:w-1/2"
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

            <h1 className="text-lg font-semibold  p-4 pl-0">Question List</h1>
            <DataTable
                customStyles={tableHeaderstyle}
                columns={columns}
                data={filter}
                pagination
                //selectableRows
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
