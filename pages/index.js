import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import "@material/list/dist/mdc.list.css"
import Link from "next/link"
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

export const getStaticProps = async() => {
  const res = await fetch('https://api.kinopoisk.dev/person?token=ZQQ8GMN-TN54SGK-NB3MKEC-ZKB8V06&limit=200&field=id&search=1-200')
  const data = await res.json()
  const res_add = await fetch('https://api.kinopoisk.dev/person?token=ZQQ8GMN-TN54SGK-NB3MKEC-ZKB8V06&limit=200&field=id&search=201-400')
  const data_add = await res_add.json()
  return{
    props:{
      actors: data.docs,
      actors_to_add: data_add.docs
    }
  }
}

const Home = ({actors, actors_to_add})  =>{
  
  const [persons, setPersons] = useState(actors);

 const addPerson = () => {
    const rnd = Math.floor(Math.random() * 200);
    setPersons(pp => [...pp, actors_to_add[rnd]]);
 }

 const removePerson = (idx) => {
    setPersons( (pp) => pp.filter((person) => person.id !== idx));
   
 }

  return (
    <div>
      <AppBar  position="static">
        <Toolbar className='appbar'>
          <Typography
            variant="h6"
            style={{
              flexGrow: 1,
            }}
          >
            Список актеров
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={styles.container}>

        <button className={styles.add} onClick={addPerson}>Добавить актера</button>

        <ul className="mdc-deprecated-list mdc-deprecated-list--two-line">
          {persons.map(({id, name, age}) => (
            <li className="mdc-deprecated-list-item" key={id}>
              <span className="mdc-deprecated-list-item__ripple"></span>
            
              <span className="mdc-deprecated-list-item__text">
              <Link key={id} href={`/${id}`}>
                <div>
                  <span className="mdc-deprecated-list-item__primary-text">{name}</span>
                  <span className="mdc-deprecated-list-item__secondary-text">Возраст: {age}</span>
                </div>
                </Link>
                <button className="mdc-deprecated-list-item__meta" onClick={() => removePerson(id)}>Удалить</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
     
    
  ); 
}

export default Home;
