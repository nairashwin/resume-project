import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<any[]>([]);
  const [value, setValue] = useState(0);

  const fetchJobs = async () => {
    const respone = await fetch(url);
    const newJobs = await respone.json();
    setJobs(newJobs);
    setLoading(false);
  }
  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <h1>loading..</h1>
      </section>
    );
  }
  console.log(jobs);

  const { company, dates, duties, title } = jobs[value];

  console.log(duties)
  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* btn-container  */}
        <div className="btn-container">
          {
            jobs.map((item, index) => {
              return (
                <button className={`job-btn ${index === value && "active-btn"}`} key = { item.id } onClick = {() => setValue(index)}>
                {/* <button className={`job-btn ${(index === value)?"active-btn":null}`} key={item.id} onClick={() => setValue(index)}> */}
                  {item.company}
                </button>
              );
            })
          }
        </div>
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty: string, index: number) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon" />
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
    </section >

  );
}

export default App
