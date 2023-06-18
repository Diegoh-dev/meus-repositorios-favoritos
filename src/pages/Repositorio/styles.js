import styled from "styled-components";

export const Container = styled.div`
  max-width: 43.75rem;
  background-color: #fff;
  border-radius: 4px;
  margin: 5rem auto;
  padding: 1.875rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

export const HeaderRepositorio = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 150px;
      height: 150px;
    }
  }
`;

export const ContainerBtns = styled.div`
  margin: 30px 0;
  display: flex;
  gap: 1rem;

  button {
    padding: 0.5rem;
    border-radius: 20px;
  }
`;

export const ContainerListIssues = styled.ul`
  list-style: none;

  /* li {
    display: flex;
    flex-direction: column;
    gap: 20px;

   div{
    display:flex;
    align-items: center;
    gap:20px;

    img{
      width: 50px;
      border-radius: 50%;
    }
   }


   p{
    margin-left: 30px;
   }
  } */

  li {
    display: flex;
    flex-direction: column;
    gap: 20px;

    div {
      div {
        display: flex;
        align-items: center;
        gap: 20px;

        img {
          width: 50px;
          border-radius: 50%;
        }
      }

      p{
        margin-left: 70px;
      }
    }
  }
`;
