import styled from 'styled-components'

export const Header = styled.header`
    display: flex;
    width: 100%;
    height: 3.5rem;
    justify-content: center;
    align-items: center;
    background-color: white;
`

export const HeaderBox = styled.div`
    display: flex;
    align-items: center;
    width: 70%;
    height: 100%;
`

export const Image = styled.img`
  height: 3.5rem;
`;

export const Search = styled.input`
    height: 1rem;
    padding: 0.5rem;
    border: none;
    background-color: #F2F2F2;
    width: 50%;
    border-radius: 5px;
    margin-left: 20px;
    &:focus {
        outline: none;
    }
`

export const Nav = styled.div`
    display: flex;
    width: 25%;
    align-items: center;
    justify-content: space-between;
    margin-left: auto;
`