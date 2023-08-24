import Form from '@/app/addToDoForm'
import ToDos from './ToDos';
import { Suspense } from 'react';
import Loader from './Loader';


export default async function Home() {
  
  return (
    <div className="container">
      <Form/>
      <Suspense fallback={<Loader/>}>
        <ToDos/>
      </Suspense>
    </div>
  )
}
