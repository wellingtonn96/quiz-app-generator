import React from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import theme from '../../styles/theme'

import { useRouter } from 'next/router'
import CardQuiz from '../../components/CardQuiz'
import { ButtonStyled } from '../../components/Button/styled'
import api from '../../services/api'
import { useState } from 'react'
import { useQuiz } from '../../hooks/Quiz'
import FormQuestion from '../../components/FormCreateQuiz/components/FormQuestion'

interface IPropsCreateQuiz {
  indexRightAnswer?: number
}

export const CreateQuizContainer = styled.div<IPropsCreateQuiz>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    outline: 0;
    background: transparent;
    border: 1px solid ${theme.colors.mainBg};
    color: ${theme.colors.contrastText};
    padding: 0 10px;
    font-size: 18px;
    margin: 10px 0;
  }

  textarea {
    width: 100%;
    height: 80px;
    border-radius: 5px;
    outline: 0;
    background: transparent;
    border: 1px solid ${theme.colors.mainBg};
    color: ${theme.colors.contrastText};
    padding: 0 10px;
    font-size: 18px;
    margin: 10px 0;
  }

  button.moreOptions {
    background: transparent;
    display: flex;
    align-items: center;
    height: 40px;
    margin-top: 10px;
    text-transform: uppercase;
    color: ${theme.colors.secondary};
    border: 0;
    font-size: 16px;
    font-weight: bold;

    svg {
      margin-right: 10px;
    }
  }

  div.options {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      width: 75%;
    }

    button {
      width: 50px;
      height: 40px;
      margin-left: 10px;
      background-color: transparent;
      border: 0;
      border-radius: 5px;

      svg {
        color: ${theme.colors.secondary};
        font-weight: bold;
      }

      &:hover {
        svg {
          color: ${theme.colors.success};
        }
      }
    }
  }
`

const CreateQuiz: React.FC<{
  data: any
}> = ({ data }) => {
  const router = useRouter()
  const { setQuizContext, quizContext } = useQuiz()

  return (
    <Layout>
      <CreateQuizContainer>
        {!quizContext.idQuiz ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1>{data.title}</h1>
              <span>{data.description}</span>
            </div>
            <CardQuiz header="Atualizar o quiz!">
              <ButtonStyled
                onClick={() => router.push(`/update/quiz/${router.query.id}`)}
              >
                Atualizar Quiz
              </ButtonStyled>
            </CardQuiz>
            <CardQuiz header="Atualizar o tema">
              <ButtonStyled
                onClick={() => router.push(`/update/theme/${data.theme.id}`)}
              >
                Atualizar Tema
              </ButtonStyled>
            </CardQuiz>
            <CardQuiz header="Atualizar o questões">
              <ButtonStyled
                onClick={() => router.push(`/update/questions/${data.id}`)}
              >
                Atualiazar questões
              </ButtonStyled>
            </CardQuiz>
            <CardQuiz header="Adicionar mais questões">
              <ButtonStyled
                onClick={() =>
                  setQuizContext({
                    idQuiz: data.id,
                    step: undefined,
                  })
                }
              >
                Adicionar mais questões
              </ButtonStyled>
            </CardQuiz>
          </>
        ) : (
          <FormQuestion />
        )}
      </CreateQuizContainer>
    </Layout>
  )
}

export async function getServerSideProps({
  query,
}: {
  query: {
    id: string
  }
}) {
  try {
    const response = await api.get(`/quiz/${query.id}`)

    const data = response.data

    return {
      props: {
        data,
      },
    }
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export default CreateQuiz