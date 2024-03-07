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
import axios from 'axios';

interface RowData {
    id: number;
    name: string;
    mobile: string;
    whatsapp: string;
    email: string;
    address: string;
    badge: string;
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
    ];

    const [data, setData] = useState<RowData[]>([]);
    const [search, setSearch] = useState<string>('');
    const [filter, setFilter] = useState<RowData[]>([]);
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

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
}
