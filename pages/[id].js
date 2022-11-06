import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import "@material/list/dist/mdc.list.css"
import Link from "next/link"
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

export const getServerSideProps = async (context) => {
    const { id } = context.params;
    const response = await fetch(`https://api.kinopoisk.dev/person?token=ZQQ8GMN-TN54SGK-NB3MKEC-ZKB8V06&limit=200&field=id&search=${id}`);
    const data = await response.json();
  
    if (!data) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: { actor: data },
    }
  };


const Actor = ({ actor }) => (
    <>
        <AppBar  position="static">
            <Toolbar className='appbar'>
            <Typography
                variant="h6"
                style={{
                flexGrow: 1,
                }}
            >
                Актер
            </Typography>
            </Toolbar>
        </AppBar>
        <div className="cont">
            <h1>{actor.name}</h1>
            <h4>{actor.enName}</h4>
            <p>Возраст: {actor.age}</p>
            <p>Пол: {actor.sex}</p>
        </div>
      
    </>
  );
  
  export default Actor;
