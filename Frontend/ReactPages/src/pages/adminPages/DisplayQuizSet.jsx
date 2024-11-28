import React,  { useEffect, useState }  from 'react';
import {useNavigate, Link} from 'react-router-dom';

const DisplayQuizSet = () => {
  const [quizSet,setQuizSet] = useState([]);
  const [loading,setLoading] = useState(true);

//   const quizSet = isHome ? courses.slice(0,3) : courses;

  useEffect(()=>{
    const fetchQuiz = async () => {
      try{
        const res = await fetch('http://localhost:3000/displayquizset');
        const data = await res.json();
        console.log(data);
        setQuizSet(data);
        
      } catch(error){
        console.log('Error fetching courses:',error);
      } finally{
        setLoading(false);
      }
    };
    fetchQuiz();
  },[]);

  if(loading) {
    return <h1 className='text-center mt-10'>Loading...</h1>
  }

  return (
    <div className="quiz-container flex flex-wrap justify-center">
      {quizSet.map((quiz) => (
        <div
          key={quiz.dbquizId} // Assuming dbquizId is unique
          className="bg-purple-100 rounded-md shadow-2xl flex flex-col items-center justify-center mx-5 my-5 py-10 w-60"
        >
          <Link to={`/quizdetails/${quiz.quizId}`} className="font-bold text-lg text-purple-900">{quiz.category}</Link>
          <p className="text-blue-500 font-semibold group-hover:text-white my-2 mx-5">Difficulty: {quiz.difficulty}</p>
          <p className="text-black group-hover:text-white my-2 mx-5">Number of Questions: {quiz.questionCount}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayQuizSet;