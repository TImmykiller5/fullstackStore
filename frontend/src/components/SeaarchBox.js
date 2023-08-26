import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'



function SeaarchBox() {

    const navigate = useNavigate()

    const location = useLocation()

    // const {search} = useLocation()
    // const urlParams = Object.fromEntries([...new URLSearchParams(search)])
    const[keyword, setKeyword] = useState('')

    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword){
            navigate(`/?keyword=${keyword}&page=1`)

        }else{
            navigate(location.pathname)
        }
    }

  return (
   <Form onSubmit={submitHandler} className='d-inline w-sm-100 w-50 ' inline>
    <Form.Control
    type='text'
    name='q'
    onChange={e => setKeyword(e.target.value)}
    className='d-inline mr-2  mr-sm-2 ml-sm-5 w-75'>
    </Form.Control>
    <Button
    type='submit'
    variant='outline-success'
    className='p-2 mx-3 d-inline'
    >
        Submit
    </Button>
   </Form>
  )
}

export default SeaarchBox