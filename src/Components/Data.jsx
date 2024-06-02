import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './Data.css';
const Data = () => {
  const [courses, setCourses] = useState([]);
  const [web, setWeb] = useState([]);
  const [mobile, setMobile] = useState([]);
  const [devOps, setDevOps] = useState([]);
  const [softwareT, setSoftwareT] = useState([]);
  const [dataS, setDataS] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all'); // Added state to track current category

  const getApi = async () => {
    try {
      let res = await fetch('https://codehelp-apis.vercel.app/api/get-top-courses');
      let data = await res.json();
      console.log('Fetched data:', data);
      setCourses(data.data.Development);
    } catch (err) {
      console.log('API not fetched');
      console.error(err);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const Web = () => {
    let and = courses.filter((course) => course.title.includes('Web Development Fundamentals'));
    setWeb(and);
    setCurrentCategory('web');
  };

  const DS = () => {
    let and = courses.filter((course) => course.title.includes('Data Science Essentials'));
    setDataS(and);
    setCurrentCategory('dataS');
  };

  const ST = () => {
    let and = courses.filter((course) => course.title.includes('Software Testing Fundamentals'));
    setSoftwareT(and);
    setCurrentCategory('softwareT');
  };

  const Mobile = () => {
    let and = courses.filter((course) => course.title.includes('Mobile App Development with React Native'));
    setMobile(and);
    setCurrentCategory('mobile');
  };

  const Devops = () => {
    let and = courses.filter((course) => course.title.includes('DevOps for Agile Teams'));
    setDevOps(and);
    setCurrentCategory('devOps');
  };

  const renderCourses = (courses) => (
    courses.map((course, index) => (
      <div
        key={index}
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          margin: '20px',
          padding: '20px',
          maxWidth: '300px',
          textAlign: 'center',
        }}
      >
        <h1>{course.id}</h1>
        <h2>{course.title}</h2>
        <p>{course.description}</p>
        <img
          src={course.image.url}
          alt={course.image.alt}
          style={{ maxWidth: '100%', borderRadius: '4px' }}
        />
        
      </div>
    ))
  );

  const showAll = () => {
    setCurrentCategory('all');
  };
  return (
      <>
          <Navbar />
      <div  style={{ padding: '20px'  }}  >
      <button className='bg-success' style={{ padding: '20px', margin: '20px' ,width:'150px'}}  onClick={showAll}>ALL</button>
      <button className='bg-success'   style={{padding:'20px',margin:'20px',width:'150px'}}  onClick={Web}>Web D</button>
      <button className='bg-success' style={{padding:'20px',margin:'20px',width:'150px'}}  onClick={DS}>Data Science</button>
      <button className='bg-success' style={{padding:'20px',margin:'20px',width:'150px'}}  onClick={ST}>Software T</button>
      <button className='bg-success' style={{padding:'20px',margin:'20px',width:'150px'}}  onClick={Mobile}>Mobile Apps</button>
      <button className='bg-success' style={{padding:'20px',margin:'20px',width:'150px'}}  onClick={Devops}>DevOps</button>
         
          </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {currentCategory === 'all' && renderCourses(courses)}
        {currentCategory === 'web' && renderCourses(web)}
        {currentCategory === 'dataS' && renderCourses(dataS)}
        {currentCategory === 'softwareT' && renderCourses(softwareT)}
        {currentCategory === 'mobile' && renderCourses(mobile)}
        {currentCategory === 'devOps' && renderCourses(devOps)}
      </div>
    </>
  );
};

export default Data;
