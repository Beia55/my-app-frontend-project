import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import Recaptcha from 'react-recaptcha';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';

export default function FormComponent() {
    // let ex = [];
    // const command = axios.post(`https://countriesnow.space/api/v0.1/countries/states`, {"country": "Romania"});
    
    const [states, setStates] = useState([]);
    
    const getStates = () => {
        axios.post(`https://countriesnow.space/api/v0.1/countries/states`, {"country": "Romania"})
            .then( (response) => {
                console.log(response.data.data.states);
                const myStates = response.data.data.states;
                setStates(myStates);
            }
        )
    }

    useEffect(() => getStates(), []);

    // function fetchData(){
    //     axios.post(`https://countriesnow.space/api/v0.1/countries/states`, {"country": "Romania"}).then(
    //         function (response){
    //             console.log(response.data.data.states);
    //         }
    //     )
    // }
    // fetchData();

    const [recaptchaIsValidated, setrecaptchaIsValidated] = useState(false);
    
    const callback = function () {
        console.log('Recaptcha succesfully loaded');
    };
       
    const verifyCallback = function (response) {
        console.log("RESPONSE - "+response);
        if(response !== ""){
            setrecaptchaIsValidated(true);
        }
    };

    console.log("recaptchaIsValidated -- "+recaptchaIsValidated);

    const initialValues = {
        firstName: "", lastName: "", address1: "", address2: "", city: "", state: "", zipCode: 0, phoneNo: "", email: ""
    }; 

    const validate = (values) => {
        let errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.firstName) {
            errors.firstName = "First Name is required";
        } else if (values.firstName.length > 10) {
            errors.firstName = "Too muny letters";
        }

        if (!values.lastName) {
            errors.lastName = "Last Name is required";
        } else if (values.lastName.length > 30) {
            errors.lastName = "Too muny letters";
        }

        if (!values.address1) {
            errors.address1 = "Address 1 is required";
        } else if (values.address1.length > 70) {
            errors.address1 = "Too muny letters";
        }

        if (values.address2.length > 30) {
            errors.address2 = "Address 2 is required";
        }

        if (!values.city) {
            errors.city = "City is required";
        } else if (values.city.length > 30) {
            errors.city = "Too muny letters";
        }

        if (!values.zipCode) {
            errors.zipCode = "Zip Code is required";
        } else if (`${values.zipCode}`.length > 10) {
            errors.zipCode = "Invalid Zip Code";
        }

        if (!values.phoneNo) {
            errors.phoneNo = "Phone No is required";
        } else if (values.phoneNo.length > 15) {
            errors.phoneNo = "Invalid phone no";
        }
        
        if (!values.email) {
          errors.email = "Email is required";
        } else if (!regex.test(values.email)) {
          errors.email = "Invalid Email";
        }

        return errors;
    };

    console.log(initialValues.state);

    const submitForm = (values) => {
        console.log(values);
    };

    return (
        <div className='form'>
            <Formik initialValues={initialValues} validate={validate} onSubmit={submitForm} >
            {(formik) => {
                const {values, handleChange, handleSubmit, errors, touched, handleBlur, isValid, dirty} = formik;
                return (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <h1>Application Form</h1>
                            
                            <div className='inline-groups'>
                                <div className='field input-custome-size m-right'>
                                    <label htmlFor="fname">First Name:<span>*</span></label>
                                    <input className="name" type="text" name="firstName" id="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur} className={errors.firstName && touched.firstName ?  "input-error" : null} placeholder="First Name"/>
                                    {errors.firstName && touched.firstName && (<span className="error">{errors.firstName}</span>)}
                                </div>

                                <div className='field input-custome-size'>
                                    <label htmlFor="lname">Last Name:<span>*</span></label>
                                    <input className="name" type="text" name="lastName" id="lastName" value={values.lastName} onChange={handleChange} onBlur={handleBlur} className={errors.lastName && touched.lastName ?  "input-error" : null} placeholder="Last Name"/>
                                    {errors.lastName && touched.lastName && (<span className="error">{errors.lastName}</span>)}
                                </div>
                            </div>

                            <h3>Address</h3>

                            <div>
                                <div className='field'>
                                    <label htmlFor="address1">Address Line 1:<span>*</span></label>
                                    <input type="text" name="address1" id="address1" value={values.address1} onChange={handleChange} onBlur={handleBlur} className={errors.address1 && touched.address1 ?  "input-error" : null} placeholder="Street name &#38; number"/>
                                    {errors.address1 && touched.address1 && (<span className="error">{errors.address1}</span>)}
                                </div>

                                <div className='field'>
                                    <label htmlFor="address2">Address Line 2:</label>
                                    <input type="text" name="address2" id="address2" value={values.address2} onChange={handleChange} onBlur={handleBlur} className={errors.address2 && touched.address2 ?  "input-error" : null}   placeholder="Suite, apartament"/>
                                    {errors.address2 && touched.address2 && (<span className="error">{errors.address2}</span>)}
                                </div>

                                <div className='inline-groups'>
                                    <div className='field input-custome-size2 m-right'>
                                        <label htmlFor="city">City:<span>*</span></label>
                                        <input type="text" name="city" id="city" value={values.city} onChange={handleChange} onBlur={handleBlur} className={errors.city && touched.city ?  "input-error" : null} placeholder="City"/>
                                        {errors.city && touched.city && (<span className="error">{errors.city}</span>)}
                                    </div>

                                    <div className='field m-right'>
                                        <label htmlFor="state">State:<span>*</span></label>
                                        <select name="state" id="state" value={values.state} onChange={handleChange} onBlur={handleBlur} className={errors.state && touched.state ?  "input-error" : null} >
                                            {
                                                states.map((state) => (
                                                    <option value={state.name}>{state.name}</option>
                                                ))
                                            }
                                        </select>
                                        {errors.state && touched.state && (<span className="error">{errors.state}</span>)}
                                    </div>

                                    <div className='field input-custome-size2'>
                                        <label htmlFor="zipcode">Zip code:<span>*</span></label>
                                        <input type="number" name="zipCode" id="zipCode" value={values.zipCode} onChange={handleChange} onBlur={handleBlur} className={errors.zipCode && touched.zipCode ?  "input-error" : null}  placeholder="Zip code"/>
                                        {errors.zipCode && touched.zipCode && (<span className="error">{errors.zipCode}</span>)}
                                    </div>
                                </div>
                            </div>

                            <h3>Contact Information</h3>

                            <div className='inline-groups'>
                                <div className='field input-custome-size m-right'>
                                    <label htmlFor="phoneNo">Phone number:<span>*</span></label>
                                    <input type="tel" name="phoneNo" id="phoneNo" value={values.phoneNo} onChange={handleChange} onBlur={handleBlur} className={errors.phoneNo && touched.phoneNo ?  "input-error" : null} placeholder="555-5555"/>
                                    {errors.phoneNo && touched.phoneNo && (<span className="error">{errors.phoneNo}</span>)}
                                </div>

                                <div className='field input-custome-size'>
                                    <label htmlFor="email">Email<span>*</span></label>
                                    <input type="email" name="email" id="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className={errors.email && touched.email ?  "input-error" : null}/>
                                    {errors.email && touched.email && (<span className="error">{errors.email}</span>)}
                                </div>
                            </div>

                            <div className='captcha-margins'>
                                <Recaptcha
                                    sitekey="6LeiN8IdAAAAACk9aS2ewl9yVXkAbmEjaHLkO1Gr"
                                    render="explicit" verifyCallback={verifyCallback} onloadCallback={callback}
                                />
                            </div>

                            <Link to='/last-page'>
                                <button type="submit" className={!(dirty && isValid)  ? "disabled-btn" : "next-btn-nav join-txt"} disabled={!(dirty && isValid && recaptchaIsValidated)}>
                                    Join Us
                                </button>
                            </Link>
                        </form>
                    </div>
                );
            }}
            </Formik>
        </div>
    )
}

