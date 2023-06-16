import styled from 'styled-components'


export const Container = styled.div`
max-width: 43.75rem;
background-color: #FFF;
border-radius: 4px;
margin: 5rem auto;
padding: 1.875rem;
box-shadow: 0 0 20px rgba(0,0,0,0.2);

h1{
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.625rem;
}


`

export const Form = styled.form`

margin-top: 1.875rem;
display: flex;
gap: .625rem;

input{
  flex: 1;
  border: 1px solid #DDD;
  padding: 0.625rem 0.938rem;
  border-radius: 4px;
  font-size: 1.063rem;

}


`


export const SubmitButton = styled.button.attrs({
  type:'submit'
})`
background-color: #0D2636;
border: none;
border-radius: 50%;
padding: 0 15px;

display: flex;
align-items: center;
justify-content: center;
`