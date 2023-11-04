/*********************************************************************************
*  WEB422 – Assignment 4
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: _Shubh Jani Student ID: ____153660212 Date: 3 Nov 2023*
********************************************************************************/ 

import Container from "react-bootstrap/Container"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"

export default function Layout(props) {
  return (
    <>
      <div className="main">
        <MainNav />
        <br />
        <Container>{props.children}</Container>
        <br />
        <Footer />
      </div>
    </>
  )
}
