"use client"
import {RxAvatar} from 'react-icons/rx'

import { Rating } from '@mui/material'
/* import Avatar from '../general/Avatar' */

const Comment = ({prd}: {prd : any}) => {

  return (
    <div className='border w-full md:w-1/3 p-2 rounded-lg my-3'>
      {/* <Avatar image={prd?.user?.image}/> güzel gözükmedi*/}
       <div className='flex items-center gap-1'>
         <RxAvatar size="45"/>
         <div>
            <div>{prd?.user?.name}</div>
            <Rating name="read-only" value={prd?.user?.rating} readOnly />
         </div>
       </div>
       <div className='text-slate-500'>{prd.comment} </div>
    </div>
  )
}

export default Comment