import { Box } from "@mui/material";
import styled from "styled-components";
import {Link} from "react-router-dom";
import countapi from 'countapi-js';
import { useState,useEffect } from "react";
import VisitorCount from "./Count";
const Wrap=styled(Box)(
    {
        width:'100%',
        alignItems:'baseline',
        textAlign:'center',
        backgroundColor:'grey',
        height:'60px',
        alignItems:'center'
        // justifyContent:'center',
        // alignItems:'center',
        
    }
)




const Footer = () => {

    return ( 
        <>
        {/* <VisitorCount/> */}
        <Wrap>
            
            <p style={{alignItems:"center"}}>Intervista@TnP-(2023-24)</p>
            
             
            
        </Wrap>
        </>
     );
}
 
export default Footer;
