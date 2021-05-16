import React, { useEffect, useState } from 'react'
import marked from 'marked'
import { useMutation, useQuery } from '@apollo/client'

import { GET_ONE_USER, GET_ALL_USERS } from '../../query/user'
import cls from './Profile.module.sass'
import Feed from '../../fonts/feed.svg'
import Like from '../../fonts/like.svg'
import comp from '../Companies/Companies.module.sass'
import Button from '../../UI/Button'
import Image from '../../images/500x500.png'
import { AppWrapper } from '../../App.module.sass'
import axios from 'axios'
import { CREATE_PROJECT, GET_COMPANY_PROJECTS } from '../../query/project'
import { NavLink } from 'react-router-dom'

function Profile({ _id, likedCompanies }) {
  const { data, loading } = useQuery(GET_ONE_USER, {
    variables: {
      id: _id,
    },
  })

  const {
    data: companyData,
    loading: companyLoading,
    refetch,
  } = useQuery(GET_COMPANY_PROJECTS, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    variables: {
      id: _id,
    },
  })

  const [createProject, { dataAdd }] = useMutation(CREATE_PROJECT)

  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState({})
  const [projects, setProjects] = useState([])
  const [isFormatted, setIsFormatted] = useState(true)
  const [projectConf, setProjectConf] = useState({ name: '', desc: '' })

  useEffect(() => {
    if (!loading) {
      setUser(data.getUser)
    }
    if (!companyLoading) {
      setProjects(companyData.getCompanyProjects)
    }
  }, [data, companyData])

  const changeDesc = (e) => {
    const value = e.target.value
    setUser({ ...user, desc: value })
  }

  const saveDesc = async () => {
    await axios.post('https://guarded-atoll-11219.herokuapp.com/desc', {
      id: _id,
      desc: user.desc,
    })
  }

  const validate = async () => {
    if (!projectConf.desc && !projectConf.name) {
      return false
    }
    try {
      await createProject({
        variables: {
          input: {
            name: projectConf.name,
            desc: projectConf.desc,
            likes: 0,
            companyId: user.id,
          },
        },
      }).catch((err) => console.log(err))
    } catch (e) {
      console.log(e, e.response)
    }
    refetch(companyData)
    setIsOpen(false)
    setProjectConf({ name: '', desc: '' })
  }

  const refetchData = async () => {
    refetch(companyData)
  }
  if (loading) {
    return <h1>Загрузка...</h1>
  }

  console.log(companyData)
  console.log(user)
  return (
    <>
      <div className={AppWrapper}>
        <div className={cls.Profile}>
          {user.role === 'Компания' && isOpen ? (
            <div className={cls.ProjectModal}>
              <div
                className={cls.Overlay}
                onClick={() => setIsOpen(false)}
              ></div>
              <div className={cls.ModalInner}>
                <h3>Создание нового проекта </h3>
                <input
                  value={projectConf.name}
                  onChange={(e) =>
                    setProjectConf({ ...projectConf, name: e.target.value })
                  }
                  type="text"
                  placeholder="Название проекта"
                />
                <textarea
                  value={projectConf.desc}
                  onChange={(e) =>
                    setProjectConf({ ...projectConf, desc: e.target.value })
                  }
                  type="text"
                  placeholder="Описание проекта"
                />
                <button onClick={validate}>Создать</button>
              </div>
            </div>
          ) : null}
          <h1>
            Профиль {user.role === 'Компания' ? 'компании' : 'пользователя'}{' '}
            {user.name} <button onClick={refetchData}>refetch</button>
          </h1>
          <hr />
          <div className={cls.ContentWrapper}>
            <img src={Image} />
            <div className={cls.TextContent}>
              <h3>Описание</h3>
              <div>
                {isFormatted && (
                  <div
                    onClick={() => setIsFormatted(false)}
                    className={cls.Desc}
                    dangerouslySetInnerHTML={{
                      __html: marked(user.desc ?? ''),
                    }}
                  ></div>
                )}
                {!isFormatted && (
                  <textarea
                    value={user.desc}
                    onChange={changeDesc}
                    onBlur={() => setIsFormatted(true)}
                  ></textarea>
                )}

                <Button text="Сохранить описание" click={saveDesc} />
              </div>
            </div>
          </div>
          <div style={{ margin: '30px 0' }}>
            {user.role === 'Компания' && (
              <button onClick={() => setIsOpen(true)}>Создать проект</button>
            )}
          </div>
          <div className={cls.Projects + ' ' + comp.Companies}>
            {projects.map((project, index) => {
              return (
                <div
                  className={comp.Company + ' ' + cls.Project}
                  key={project.id}
                >
                  <div className={comp.CompanyImage + ' ' + cls.ProjectImage}>
                    <img srcSet={`/companies/${index + 1}.png`} />
                    <div className={comp.CompanyStats}>
                      <div style={{ marginLeft: 'auto' }}>
                        <span className={comp.CompanyCount}>
                          {project.likes}
                        </span>
                        <img srcSet={Like} alt={'Feed'} />
                      </div>
                    </div>
                  </div>

                  <div
                    className={comp.CompanyContent + ' ' + cls.ProjectContent}
                  >
                    <h3 className={comp.CompanyName}>{project.name}</h3>
                    <div
                      className={comp.CompanyDesc}
                      dangerouslySetInnerHTML={{
                        __html: marked(project?.desc ?? 'Aboba'),
                      }}
                    ></div>
                    <NavLink
                      to={{
                        pathname: `/projects/${project.id}`,
                        state: {
                          name: project.name,
                          desc: project.desc,
                          likes: project.likes,
                          companyId: user.id,
                        },
                      }}
                    >
                      Смотреть
                    </NavLink>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
