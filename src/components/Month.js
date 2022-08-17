import React, { useEffect } from 'react'
import Day from './Day'

const Month = ({ date }) => {
  let firstDay = (new Date(date.getFullYear(), date.getMonth(), 1)).getDay();
  let daysInMonth = 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
  return (<>
    <div className='grid grid-cols-7 w-fit justify-center items-center'>
      <div className='text-xs sm:text-base font-semibold text-center'>Sun</div>
      <div className='text-xs sm:text-base font-semibold text-center'>Mon</div>
      <div className='text-xs sm:text-base font-semibold text-center'>Tues</div>
      <div className='text-xs sm:text-base font-semibold text-center'>Wed</div>
      <div className='text-xs sm:text-base font-semibold text-center'>Thurs</div>
      <div className='text-xs sm:text-base font-semibold text-center'>Fri</div>
      <div className='text-xs sm:text-base font-semibold text-center'>Sat</div>


      {Array.from({ length: daysInMonth }, (v, i) => i + 1).map((day) => (<Day firstDay={day === 1 ? firstDay + 1 : null} date={new Date(date.getYear(), date.getMonth(), day)} />))}
    </div>
  </>
  )
}

export default Month