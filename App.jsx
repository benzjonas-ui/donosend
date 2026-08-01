import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Partners from './pages/Partners'
import Causes from './pages/Causes'
import Dashboard from './pages/Dashboard'
import QRPay from './pages/QRPay'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import SellerProfile from './pages/SellerProfile'
import PublicPay from './pages/PublicPay'

export default function App(){return <Layout><Routes><Route path="/" element={<Home/>}/><Route path="/partner" element={<Partners/>}/><Route path="/organisationen" element={<Causes/>}/><Route path="/dashboard" element={<Dashboard/>}/><Route path="/profil/jonas" element={<SellerProfile/>}/><Route path="/pay/jonas" element={<PublicPay/>}/><Route path="/qr" element={<QRPay/>}/><Route path="/success" element={<Success/>}/><Route path="/cancel" element={<Cancel/>}/></Routes></Layout>}
