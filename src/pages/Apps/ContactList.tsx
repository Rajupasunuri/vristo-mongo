// import React, { useEffect, useState, useRef } from 'react';
// import DataTable from 'react-data-table-component';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import ReactToPrint from 'react-to-print';
// import axios from 'axios';

// export default function Product() {
//     const columns: any = [
//         // {
//         //     name: 'Sr.No',
//         //     selector: (row: { id: any }) => row.id,
//         // },
//         {
//             name: 'Name',
//             selector: (row: { name: any }) => row.name,
//         },
//         {
//             name: 'Mobile',
//             selector: (row: { mobile: any }) => row.mobile,
//         },
//         {
//             name: 'Whatsapp',
//             selector: (row: { whatsapp: any }) => row.whatsapp,
//         },
//         {
//             name: 'Email',
//             selector: (row: { email: any }) => row.email,
//         },
//         {
//             name: 'address',
//             selector: (row: { address: any }) => row.address,
//         },
//         {
//             name: 'Badge',
//             selector: (row: { badge: any }) => row.badge,
//         },
//         // {
//         //     name: 'Image',
//         //     selector: (row: { image: string | undefined; title: string | undefined }) => <img height={70} width={80} src={row.image} alt={row.title} />,
//         // },
//         // {
//         //     name: 'Action',
//         //     cell: (row: { id: any }) => (
//         //         <button className="btn btn-danger" onClick={() => handleDelete(row.id)}>
//         //             Delete
//         //         </button>
//         //     ),
//         // },
//     ];

//     const [data, setData] = useState([]);
//     const [search, setSearch] = useState('');
//     const [filter, setFilter] = useState([]);
//     const componentRef = useRef();

//     const getProduct = async () => {
//         axios
//             .get('http://localhost:3004/list')
//             .then((res: any) => {
//                 setData(res);
//                 setFilter(res);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     };

//     useEffect(() => {
//         getProduct();
//     }, []);

//     // useEffect(() => {
//     //     const result = data.filter((item) => item.title.toLowerCase().match(search.toLowerCase()));
//     //     setFilter(result);
//     // }, [search]);

//     // const handleDelete = (val: any) => {
//     //     const newdata = data.filter((item) => item.id !== val);
//     //     setFilter(newdata);
//     // };

//     const tableHeaderstyle = {
//         headCells: {
//             style: {
//                 fontWeight: 'bold',
//                 fontSize: '14px',
//                 backgroundColor: '#ccc',
//             },
//         },
//     };

//     // const exportToPdf = () => {
//     //     const unit = 'pt';
//     //     const size = 'A4'; // Use A4 size for the PDF

//     //     const orientation = 'portrait'; // 'portrait' or 'landscape'
//     //     const marginLeft = 40;
//     //     const doc = new jsPDF(orientation, unit, size);

//     //     doc.setFontSize(12);

//     //     const title = 'Product List';
//     //     const headers = columns.map((column) => column.name);
//     //     const data = filter.map((row) => columns.map((column) => row[column.selector]));

//     //     doc.text(title, marginLeft, 40);
//     //     doc.autoTable({
//     //         startY: 50,
//     //         head: [headers],
//     //         body: data,
//     //     });

//     //     doc.save('product-list.pdf');
//     // };

//     return (
//         <React.Fragment>
//             <h1>Product List</h1>
//             <DataTable
//                 customStyles={tableHeaderstyle}
//                 columns={columns}
//                 data={filter}
//                 pagination
//                 selectableRows
//                 fixedHeader
//                 selectableRowsHighlight
//                 highlightOnHover
//                 subHeader
//                 subHeaderComponent={<input type="text" className="w-25 form-control" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />}
//                 //subHeaderAlign="right"
//                 //actions={<ReactToPrint trigger={() => <button className="btn btn-success">Export Pdf</button>} content={() => componentRef.current} />}
//             />
//             {/* <div style={{ display: 'none' }}>
//                 <div ref={componentRef}>
//                     <DataTable customStyles={tableHeaderstyle} columns={columns} data={filter} noHeader pagination={false} />
//                 </div>
//             </div> */}
//         </React.Fragment>
//     );
// }
import React, { useEffect, useState, useRef } from 'react';
import DataTable from 'react-data-table-component';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import ReactToPrint from 'react-to-print';
import Select from 'react-select';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

interface RowData {
    _id: any;
    name: string;
    mobile: string;
    whatsapp: string;
    email: string;
    address: string;
    badge: string;
    refer_mobile: number;
}

export default function Product(): JSX.Element {
    const columns: any = [
        {
            name: 'Name',
            selector: (row: RowData) => row.name,
        },
        {
            name: 'Mobile',
            selector: (row: RowData) => row.mobile,
        },
        {
            name: 'Whatsapp',
            selector: (row: RowData) => row.whatsapp,
        },
        {
            name: 'Referred',
            selector: (row: RowData) => row.refer_mobile,
        },
        {
            name: 'Email',
            selector: (row: RowData) => row.email,
        },
        {
            name: 'address',
            selector: (row: RowData) => row.address,
        },
        {
            name: 'Badge',
            selector: (row: RowData) => row.badge,
        },
        {
            name: 'Action',
            cell: (row: any) => (
                <button className="btn btn-primary" onClick={() => handlecoledit(row._id)}>
                    Edit
                </button>
            ),
        },
    ];

    const options = [
        { value: 'New Client', label: 'New Client' },
        { value: 'Contact', label: 'Contact' },
    ];

    const [values, setValues] = useState({
        name: '',
        refer_mobile: 0,
        mobile: 0,
        whatsapp: 0,
        email: '',
        address: '',
        badge: 'New Client',
    });

    const [data, setData] = useState<RowData[]>([]);
    const [search, setSearch] = useState<string>('');
    const [filter, setFilter] = useState<RowData[]>([]);
    const [show, setshow] = useState(false);
    const [id, setid] = useState('');
    const componentRef = useRef<any>();

    const getProduct = async () => {
        try {
            const res = await axios.get('http://localhost:3004/list');
            setData(res.data);
            setFilter(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        // Function to be executed every one second
        const interval = setInterval(() => {
            getProduct();
        }, 100); // 1000 milliseconds = 1 second

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

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

    const [option1, setoption1] = useState({ value: 'New Client', label: 'New Client' });

    const handlecoledit = async (id: any) => {
        setshow(true);
        const newdata = await data.filter((item) => item._id == id);
        console.log('contactlist', newdata);
        const news1 = options.find((option: any) => option.value === newdata[0].badge);
        console.log('news1', news1);
        if (news1) {
            setValues({
                ...values,
                name: newdata[0].name,
                refer_mobile: newdata[0].refer_mobile,
                mobile: parseInt(newdata[0].mobile),
                whatsapp: parseInt(newdata[0].whatsapp),
                email: newdata[0].email,
                address: newdata[0].address,

                badge: news1.value,
            });

            setoption1((prevOption) => ({ ...prevOption, value: news1.value }));
            setoption1((prevOption) => ({ ...prevOption, label: news1.value }));
        }
        setid(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlesubmit = (event: any) => {
        axios
            .post(`http://localhost:3004/contact/update?id=${id}`, values)
            .then((res) => {
                setshow(false);
                console.log('client data', res);
                toast.success('Contact Details Edited Successfully');
            })
            .catch((err: any) => {
                console.log('client error', err);
            });

        event.preventDefault();
    };

    const handleBadge = (event: any) => {
        setValues({ ...values, badge: event.value });
        //  setValues({ ...values, option: selectedOption.value });
        setoption1((prevOption) => ({ ...prevOption, value: event.value }));
        setoption1((prevOption) => ({ ...prevOption, label: event.value }));
    };
    const handleName = (event: any) => {
        setValues({ ...values, name: event.target.value });
    };

    const handleMobile = (event: any) => {
        setValues({ ...values, mobile: event.target.value });
    };
    const handleWhatsapp = (event: any) => {
        setValues({ ...values, whatsapp: event.target.value });
    };

    const handleEmail = (event: any) => {
        setValues({ ...values, email: event.target.value });
    };
    const handleAddress = (event: any) => {
        setValues({ ...values, address: event.target.value });
    };

    return (
        <React.Fragment>
            {show ? (
                <>
                    <div className="pt-5 ">
                        {/* Registration */}
                        <div className="panel" id="registration_form">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold !leading-snug text-primary md:text-4xl">Edit Contact Details</h1>
                            </div>
                            <div className="mb-5">
                                <form className="space-y-5" onSubmit={handlesubmit}>
                                    <div>
                                        <input type="text" placeholder="Enter Full Name *" required name="name" value={values.name} onChange={handleName} className="form-input sm:w-1/2 " />
                                    </div>
                                    <div className="flex justify-start items-center space-x-1 ">
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            placeholder="Enter Referred Mobile *"
                                            value={values.refer_mobile == 0 ? '' : values.refer_mobile}
                                            name="refer_mobile"
                                            className="form-input sm:w-1/2 "
                                            //onChange={handleRefer}
                                        />
                                    </div>
                                    <div className="flex justify-start items-center space-x-2">
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            placeholder="Enter Mobile Number *"
                                            required
                                            name="mobile"
                                            value={values.mobile == 0 ? '' : values.mobile}
                                            className="form-input sm:w-1/2 "
                                            onChange={handleMobile}
                                        />
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            placeholder="Enter WhatsApp Number *"
                                            name="whatsapp"
                                            value={values.whatsapp == 0 ? '' : values.whatsapp}
                                            required
                                            // value={values.whatsapp !== 0 ? values.whatsapp : ''}
                                            onChange={handleWhatsapp}
                                            className="form-input sm:w-1/2"
                                        />
                                    </div>

                                    <div>
                                        <input type="email" placeholder="Enter Email Address *" required name="email" value={values.email} onChange={handleEmail} className="form-input sm:w-1/2" />
                                    </div>
                                    <div>
                                        <input type="text" placeholder="Enter Full Address *" required name="address" onChange={handleAddress} value={values.address} className="form-input sm:w-1/2" />
                                    </div>
                                    <div className="mb-5">
                                        <Select value={option1} options={options} name="badge" onChange={handleBadge} isSearchable={false} className="sm:w-1/2" />
                                    </div>

                                    <button type="submit" className="btn btn-primary !mt-6">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}

            <h1 className="text-lg font-semibold  p-4 pl-0">Contact List</h1>
            <DataTable
                customStyles={tableHeaderstyle}
                columns={columns}
                data={filter}
                pagination
                selectableRows
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                subHeader
                striped
                subHeaderComponent={<input type="text" className="w-auto form-input  " placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />}
            />

            <ToastContainer position="top-center" autoClose={2000} />
        </React.Fragment>
    );
}
