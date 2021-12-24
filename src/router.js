import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Home from './components/Home';
import FormComponent from './components/Form';
import LastPage from './components/LastPage';
import Header from './components/Header';
import Footer from './components/Footer';

export default function profile(){
    return (
        <BrowserRouter>
            <Header />
            <div className='container'>
                <Routes>
                    <Route path="/" exact default element={<Home/>}/>
                    <Route path="/form" element={<FormComponent/>}/>
                    <Route path="/last-page" element={<LastPage/>}/>
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    )
}
