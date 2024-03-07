import { Link } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
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

const Layouts = () => {
    const [refer, setRefer] = useState(false);
    const [refermobile, setrefermobile] = useState('');
    const [cmobile, setCmobile] = useState('');
    const [mobile, setMobile] = useState(false);
    const [referverify, setreferverify] = useState('');
    const [whatsresponse, setwhatsresponse] = useState('');
    const [vmobile, setvmobile] = useState(0);
    const [mobileresponse, setmobileresponse] = useState('');
    const [sameAsMobile, setSameAsMobile] = useState(false);
    const [mobileaswhatsapp, setmobileaswhatsapp] = useState(0);
    const [dialog, setDialog] = useState(false);
    const [refername, setrefername] = useState('');
    const [refer_mobile, setrefer_mobile] = useState('');
    const [referwhats, setreferwhats] = useState('');
    const [referemail, setreferemail] = useState('');
    const [referaddress, setreferaddress] = useState('');
    const [referbadge, setreferbadge] = useState('');

    const [values, setValues] = useState({
        name: '',
        refer_mobile: 0,
        mobile: 0,
        whatsapp: 0,
        email: '',
        address: '',
        badge: 'New Client',
    });

    const handleRefer = (event: any) => {
        setValues({ ...values, [event.target.name]: event.target.value });

        setreferverify(event.target.value);
        setwhatsresponse('');

        if (event.target.value.length < 10 || event.target.value.length > 10) {
            setrefermobile('Referrer mobile number should be exactly 10 digits');
            setRefer(false);
        }
        if (event.target.value.length == 0) {
            setrefermobile('');
            setRefer(false);
        }
        if (event.target.value.length == 10) {
            setrefermobile('');
            setRefer(true);
        }
    };

    const handleMobile = (event: any) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        setvmobile(event.target.value);
        setmobileresponse('');

        if (event.target.value.length < 10 || event.target.value.length > 10) {
            setCmobile(' Mobile number should be exactly 10 digits');
            setMobile(false);
        }
        if (event.target.value.length == 0) {
            setrefermobile('');
            setMobile(false);
        }
        if (event.target.value.length == 10) {
            setCmobile('');
            setMobile(true);
        }
        if (event.target.value.length == 0) {
            setCmobile('');
            setMobile(false);
        }
    };

    const handleName = (event: any) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleWhatsapp = (event: any) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleEmail = (event: any) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    const handleAddress = (event: any) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleBadge = (event: any) => {
        setValues({ ...values, badge: event.value });
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

    const options = [
        { value: 'New Client', label: 'New Client' },
        { value: 'Contact', label: 'Contact' },
    ];

    const handlesubmit = (event: any) => {
        axios
            .post('http://localhost:3004/addClient', values)
            .then((res) => {
                console.log('client data', res);
            })
            .catch((err: any) => {
                console.log('client error', err);
            });

        event.preventDefault();
    };

    const verifyrefer = (event: any) => {
        event.preventDefault();
        axios
            .post(`http://localhost:3004/refer?refer=${referverify}`)
            .then((res) => {
                console.log('refer', res);
                setDialog(true);
                setwhatsresponse(res.data.message);
                toast.success('Client Found');

                axios
                    .get(`http://localhost:3004/referdata?refer=${referverify}`)
                    .then((res) => {
                        console.log('referdata', res.data);
                        setrefername(res.data.name);
                        setrefer_mobile(res.data.mobile);
                        setreferwhats(res.data.whatsapp);
                        setreferemail(res.data.email);
                        setreferaddress(res.data.address);
                        setreferbadge(res.data.badge);
                    })
                    .catch((err) => {
                        console.log('refer error', err);
                    });
            })
            .catch((err) => {
                console.log('refererror', err);
                setwhatsresponse(err.response.data);
                toast.error('Client Not Found');
            });
    };

    const verifymobile = (event: any) => {
        event.preventDefault();
        axios
            .post(`http://localhost:3004/mobile?vmobile=${vmobile}`)
            .then((res) => {
                console.log('mobile verify', res);
                setmobileresponse(res.data.message);
                axios
                    .get(`http://localhost:3004/referdata?refer=${vmobile}`)
                    .then((res) => {
                        console.log('referdata', res.data);
                        setrefername(res.data.name);
                        setrefer_mobile(res.data.mobile);
                        setreferwhats(res.data.whatsapp);
                        setreferemail(res.data.email);
                        setreferaddress(res.data.address);
                        setreferbadge(res.data.badge);
                        setDialog(true);
                    })
                    .catch((err) => {
                        console.log('refer error', err);
                    });
            })
            .catch((err) => {
                console.log('mobile error', err.response.data);
                setmobileresponse(err.response.data);
            });
    };

    const handleCheckboxChange = () => {
        setSameAsMobile(!sameAsMobile);
        if (!sameAsMobile) {
            //setmo(values.mobile);
            setValues({ ...values, whatsapp: values.mobile });
        } else {
            setValues({ ...values, whatsapp: 0 });
        }
    };

    return (
        <div>
            <div className="pt-5 ">
                {/* Registration */}
                <div className="panel" id="registration_form">
                    <div className="mb-10">
                        <h1 className="text-3xl font-extrabold !leading-snug text-primary md:text-4xl">New Client</h1>
                    </div>
                    <div className="mb-5">
                        <form className="space-y-5" onSubmit={handlesubmit}>
                            <div>
                                <input type="text" placeholder="Enter Full Name *" required name="name" onChange={handleName} className="form-input sm:w-1/2 " />
                            </div>
                            <div className="flex justify-start items-center space-x-1 ">
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder="Enter Referred Mobile *"
                                    name="refer_mobile"
                                    className="form-input sm:w-1/2 "
                                    onChange={handleRefer}
                                />
                                <div className="relative">
                                    {whatsresponse === 'success' ? (
                                        <>
                                            <FaPersonCircleCheck className="absolute right-4 top-[-6px] w-6 text-green-600" />
                                        </>
                                    ) : null}
                                    {whatsresponse === 'Client not found' ? (
                                        <>
                                            <FaPersonCircleXmark className="absolute right-4 top-[-6px] w-6 text-red-600" />
                                        </>
                                    ) : null}
                                </div>

                                {refer ? (
                                    <>
                                        <button onClick={verifyrefer} className="p-2 rounded-md bg-blue-500 text-white hover:bg-white hover:text-blue-500 hover:border-blue-500 border">
                                            Click
                                        </button>
                                    </>
                                ) : null}
                            </div>
                            <div className="flex justify-start items-center space-x-2">
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder="Enter Mobile Number *"
                                    required
                                    name="mobile"
                                    className="form-input sm:w-1/2 "
                                    onChange={handleMobile}
                                />

                                {mobile ? (
                                    <>
                                        <button onClick={verifymobile} className="p-2  rounded-md bg-blue-500 text-white hover:bg-white hover:text-blue-500 hover:border-blue-500 border">
                                            Click
                                        </button>
                                    </>
                                ) : null}
                            </div>
                            <span className="mt-0 pt-0 text-red-600">{cmobile}</span>
                            {mobileresponse === 'Client already exists' ? (
                                <>
                                    <span className="mt-0 pt-0 text-red-600">Client already exists with this number</span>
                                </>
                            ) : null}
                            {mobileresponse === 'No record found' ? (
                                <>
                                    <label className="flex space-x-2 ">
                                        <input type="checkbox" className="form-checkbox" checked={sameAsMobile} onChange={handleCheckboxChange} />
                                        <span>Same as Mobile Number</span>
                                    </label>
                                    <div>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            placeholder="Enter WhatsApp Number *"
                                            name="whatsapp"
                                            required
                                            value={values.whatsapp !== 0 ? values.whatsapp : ''}
                                            onChange={handleWhatsapp}
                                            className="form-input sm:w-1/2"
                                        />
                                    </div>

                                    <div>
                                        <input type="email" placeholder="Enter Email Address *" required name="email" onChange={handleEmail} className="form-input sm:w-1/2" />
                                    </div>
                                    <div>
                                        <input type="text" placeholder="Enter Full Address *" required name="address" onChange={handleAddress} className="form-input sm:w-1/2" />
                                    </div>
                                    <div className="mb-5">
                                        <Select defaultValue={options[0]} options={options} name="badge" onChange={handleBadge} isSearchable={false} className="sm:w-1/2" />
                                    </div>
                                </>
                            ) : null}
                            <div className="!mt-2">
                                <span className="text-white-dark text-[11px] inline-block">*Required Fields</span>
                            </div>

                            <button type="submit" className="btn btn-primary !mt-6">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Transition appear show={dialog} as={Fragment}>
                <Dialog as="div" open={dialog} onClose={() => setDialog(false)} className="sm:w-[300px] w-[100px]">
                    <Transition.Child as={Fragment} enter="ease-out duration-100" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="slideIn_down_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-black/20">
                        <div className="flex min-h-screen items-start justify-center px-4">
                            <Dialog.Panel className="panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div className="flex items-center justify-between bg-white px-5 py-3 dark:bg-white border-b">
                                    <h5 className="text-lg font-bold">Client Details</h5>
                                    <button onClick={() => setDialog(false)} type="button" className="text-white-dark hover:text-dark">
                                        <IconX />
                                    </button>
                                </div>

                                <div className="panel lg:col-span-2 xl:col-span-3">
                                    <div className="mb-5">
                                        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                            <table className="whitespace-nowrap table-striped">
                                                <thead>
                                                    <tr></tr>
                                                </thead>
                                                <tbody className="dark:text-white-dark border-1.5">
                                                    <tr>
                                                        <td style={{ width: '100px' }}>Client Name</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{refername}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Mobile </td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{refer_mobile}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Whatsapp</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{referwhats}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Email</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{referemail}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Address</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{referaddress}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Badge Status</td>
                                                        <td style={{ width: '10px' }}>:</td>
                                                        <td>{referbadge}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
};

export default Layouts;
