import { Button } from '@mui/material';
import React from 'react'

const CustomButton = ({type, onclick}) => {
    const style ={
        backgroundColor: "#97d700",
        borderColor: "#97d700",
        "&:hover": {
            backgroundColor: "#81b800",
            color: "#000000",
        },
    }
    const CustomButton = styled(Button) < ButtonProps > ({
        backgroundColor: "#97d700",
        borderColor: "#97d700",
        "&:hover": {
            backgroundColor: "#81b800",
            color: "#000000",
        },
    });
    return (
        <>
            <CustomButton type={type} variant="contained" onClick={onclick}></CustomButton>
        </>
    )
}

export default CustomButton