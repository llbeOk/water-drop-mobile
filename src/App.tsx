import { useState } from 'react'
import './App.css'
import { useMutation, useQuery } from '@apollo/client'
import { FIND } from './graphql/demo'
import { Button, Divider, Form, Input } from 'antd-mobile'
import { FormItem } from 'antd-mobile/es/components/form/form-item'

const App = () => {
  const {data,loading } = useQuery(FIND, {
    variables: {
      id:'47419d43-2ea7-4d82-b57f-9ba57491f1f7'
    }
  });
  return (<div>
    <p>data:{JSON.stringify(data)}</p>
    <p>loading:{`${loading}`}</p>
    <Form footer={(
        <Button block type='submit' color='primary' size='large'>
          提交
        </Button>
    )}>
    <FormItem name='name' label='姓名'>
      <Input/>
    </FormItem>
    <FormItem name='desc' label='描述'>
      <Input/>
    </FormItem>
    </Form>
  </div>)
}

export default App
