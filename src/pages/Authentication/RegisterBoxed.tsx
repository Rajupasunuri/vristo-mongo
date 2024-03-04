import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconUser from '../../components/Icon/IconUser';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';
import axios from 'axios';

const RegisterBoxed = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Register Boxed'));
    });
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        username: '',
        section: '',
        country: '',
        address: '',
        district: '',
        state: '',
        phone: '',
    });
    const [passs, setPasss] = useState('');
    const [names, setNames] = useState('');
    const [emails, setEmails] = useState('');
    const [emails1, setEmails1] = useState('');
    const [user1, setUser1] = useState('');
    const [error, setError] = useState(false);
    const [passs1, setPasss1] = useState('');
    const [userError1, setuserError1] = useState('');
    const [usererror, setUsererror] = useState('');
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState(themeConfig.locale);

    const handleChange = (event: any) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    const handleChange1 = (event: any) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        setEmails('');
    };
    const handleChange2 = (event: any) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        setuserError1('');
        const userinput = event.target.value;
        setUsererror(userinput);
        if (userinput.includes(' ')) {
            setUsererror('Username should not contain spaces');
        } else {
            setUsererror('');
        }
    };
    const handleChange3 = (event: any) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: any) => {
        console.log('hello');
        axios
            .post('http://localhost:3004/signup', values)
            .then((res) => {
                console.log('Registered Successfully');
                navigate('/');
            })
            .catch((err: any) => {
                setError(true);
                console.log(err.response.data.error);
                if (err.response.data.errormail) setEmails(err.response.data.errormail);
                if (err.response.data.erroruser) setuserError1(err.response.data.erroruser);
                //console.log(err.response.data);
                // const { name, email, password } = err.response.data.errors.msg;
                // const [{ msg: name }, { msg: email }, { msg: password }] =
                //   err.response.data.errors;
                if (err.response && err.response.data) {
                    console.log('hi error');
                    const { errors } = err.response.data;
                    console.log(errors);
                    console.log('length', errors.length);
                    console.log(errors[0].path);
                    errors.forEach((error: any) => {
                        switch (error.path) {
                            case 'name':
                                setNames(error.msg);

                                break;
                            // case 'email':
                            //     setEmails(error.msg);
                            //     break;
                            case 'password':
                                setPasss(error.msg);
                                break;
                            case 'username':
                                setUser1(error.msg);
                                break;
                            default:
                                break;
                        }
                    });
                } else {
                    console.log('Unexpected error occurred:', err);
                }
            });
        event.preventDefault();
    };

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign Up</h1>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="Name">Name</label>
                                    <div className="relative text-white-dark">
                                        <input id="Name" type="text" placeholder="Enter Name" name="name" onChange={handleChange} className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconUser fill={true} />
                                        </span>
                                    </div>
                                    <p className="text-danger">{names}</p>
                                </div>
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        <input id="Email" type="email" placeholder="Enter Email" name="email" className="form-input ps-10 placeholder:text-white-dark " onChange={handleChange1} />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                    <p className="text-danger">{emails}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Username">Username</label>
                                    <input type="text" placeholder="Enter username" name="username" className="form-input ps-10 placeholder:text-white-dark" onChange={handleChange2} />
                                    <span className="text-red-500">{userError1}</span>
                                </div>
                                <p className="text-danger">{user1}</p>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Password"
                                            type="password"
                                            placeholder="Enter Password"
                                            name="password"
                                            onChange={handleChange3}
                                            className="form-input ps-10 placeholder:text-white-dark"
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                    <p className="text-danger">{passs}</p>
                                </div>

                                <div>
                                    <label htmlFor="Section">Section</label>
                                    <div className="relative text-white-dark">
                                        <input id="Section" type="text" placeholder="Enter Section" name="section" onChange={handleChange} className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconUser fill={true} />
                                        </span>
                                    </div>
                                    <p className="text-danger">{names}</p>
                                </div>
                                <div>
                                    <label htmlFor="Country">Country</label>
                                    <div className="relative text-white-dark">
                                        <input id="Country" type="text" placeholder="Enter Country" name="country" onChange={handleChange} className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconUser fill={true} />
                                        </span>
                                    </div>
                                    <p className="text-danger">{names}</p>
                                </div>
                                <div>
                                    <label htmlFor="Address">Address</label>
                                    <div className="relative text-white-dark">
                                        <input id="Address" type="text" placeholder="Enter Address" name="address" onChange={handleChange} className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconUser fill={true} />
                                        </span>
                                    </div>
                                    <p className="text-danger">{names}</p>
                                </div>
                                <div>
                                    <label htmlFor="District">District</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="District"
                                            type="text"
                                            placeholder="Enter District"
                                            name="district"
                                            onChange={handleChange}
                                            className="form-input ps-10 placeholder:text-white-dark"
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconUser fill={true} />
                                        </span>
                                    </div>
                                    <p className="text-danger">{names}</p>
                                </div>
                                <div>
                                    <label htmlFor="State">State</label>
                                    <div className="relative text-white-dark">
                                        <input id="State" type="text" placeholder="Enter State" name="state" onChange={handleChange} className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconUser fill={true} />
                                        </span>
                                    </div>
                                    <p className="text-danger">{names}</p>
                                </div>
                                <div>
                                    <label htmlFor="Phone">Phone</label>
                                    <div className="relative text-white-dark">
                                        <input id="Phone" type="text" placeholder="Enter Phone Number" name="phone" onChange={handleChange} className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconUser fill={true} />
                                        </span>
                                    </div>
                                    <p className="text-danger">{names}</p>
                                </div>

                                <div>
                                    <label className="flex cursor-pointer items-center">
                                        <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                        <span className="text-white-dark">Subscribe to weekly newsletter</span>
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Sign Up
                                </button>
                            </form>
                            <div className="relative my-7 text-center md:mb-9">
                                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                            </div>
                            <div className="mb-10 md:mb-[60px]">
                                <ul className="flex justify-center gap-3.5 text-white">
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconInstagram />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconFacebookCircle />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconTwitter fill={true} />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconGoogle />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="text-center dark:text-white">
                                Already have an account ?&nbsp;
                                <Link to="/auth/boxed-signin" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    SIGN IN
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterBoxed;
